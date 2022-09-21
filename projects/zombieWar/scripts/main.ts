import {
  Dimension,
  EntityHealthComponent,
  EntityHurtEvent,
  Player,
  world,
  BlockLocation,
  World,
} from "mojang-minecraft";
import { addonName } from "./config.js";
import { trace, warn, say, zombieDied, attackingPlayerName, getPlayer, spawnZombie, tryTo } from "./utils";

/** The current tick (used to track time in game) */
let tickIndex = 0;
/** Ticks per second */
const seconds = 20;

// Note multiplication with decimals does not always result in whole numbers due to base 2 vs base 10

/** When to start the war */
// Should be at least 5 seconds to account for player join delay
const startTime = 5 * seconds;
/** When to reset the player */
const clearTime = startTime + 0.5 * seconds;
/** When to equip the player */
const equipTime = clearTime + 0.5 * seconds;
/** When to clear player's hunger */
const emptyHungerTime = equipTime + 0.5 * seconds;
/** How long to apply the hunger effect, in seconds */
const emptyHungerDuration = 3;
/** When to fill player's hunger */
const fillHungerTime = emptyHungerTime + emptyHungerDuration * seconds;
/** How long to apply the hunger effect, in seconds */
const fillHungerDuration = 3;
/** When to spawn some obstacles */
const structureTime = fillHungerTime + fillHungerDuration * seconds;
/** When to warn the player */
const informPlayerTime = structureTime + 2 * seconds;

/** Size of map, in regions. mapSize.width = 7 means the map is 7 regions wide. */
const map = {
  width: 7,
  depth: 7,
};
/** Number of regions in the map. Simple rectangle math */
const regionCount = map.width * map.depth;
/** The offset, in regions, of the northwesternmost region */
// Current logic guarantees map is centered.
const northWestRegionOffset = { x: Math.floor(-map.width / 2), z: Math.floor(-map.depth / 2) };
/** Filename of the structure lto load in */
const structName = "obstacles";
/** side length of bounding square */
const size = 16;
/** delay in ticks between each struct creation */
const structDelay = 5;

const spawn = new BlockLocation(0, -59, 0);
let score = 0;
let previousRegion = { x: 0, z: 0 };

/**
 * Convert a block location to a command-friendly string representation
 * e.g. locToString({ x: 1, y: 2, z: 3 }) === "1 2 3"
 */
const locToString = (loc: { x: number; y: number; z: number }): string => [loc.x, loc.y, loc.z].join(" ");

/**
 * Audit and run the command.
 * Shorthand for `dimension.runCommand(command)`
 */
const cmd = (dimension: Dimension, command: string): void => {
  trace(command);
  dimension.runCommand(command);
};

/** Initialize, display, and reset scores */
const initScore = (dim: Dimension, player: Player): void => {
  // catch in case we've already added this score before.
  try {
    cmd(dim, 'scoreboard objectives add score dummy "Kills"');
  } catch (e) {}
  cmd(dim, "scoreboard objectives setdisplay sidebar score");
  cmd(dim, `scoreboard players set ${player.name} score ${score}`);
};

/**
 * - Teleport player to spawn house
 * - Lock time to midnight
 * - Replace inventory with wooden sword
 * - Survival mode only
 */
const resetPlayer = (player: Player): void => {
  const dim = player.dimension;
  const playerName = player.name;

  cmd(dim, `tp ${playerName} ${locToString(spawn)}`);
  cmd(dim, `gamemode survival ${playerName}`);

  // Reset inventory
  cmd(dim, `clear ${playerName}`);
};

const equipPlayer = (player: Player): void => {
  const dim = player.dimension;
  const playerName = player.name;

  cmd(dim, `give ${playerName} wooden_sword`);
  cmd(dim, `give ${playerName} cooked_beef`);

  // Reset health
  try {
    (player.getComponent("minecraft:health") as EntityHealthComponent).resetToMaxValue();
  } catch {
    warn("Failed to reset player health");
  }
};

/**
 * Create starting conditions for the war.
 * - Reset score
 * - Lock time to midnight
 */
const initialize = (player: Player) => {
  const dim = player.dimension;
  say(`Welcome to ${addonName}!`);
  initScore(dim, player);

  // Lock time to midnight
  cmd(dim, "alwaysday true");
  cmd(dim, "time set midnight");
};

/** Haha, get it? Like overworld but it's over(world). */
const over = (world: World): Dimension => world.getDimension("overworld");

const emptyHunger = (player: Player) => {
  player.dimension.runCommand(`effect ${player.name} hunger ${emptyHungerDuration} 255`);
};

const fillHunger = (player: Player) => {
  player.dimension.runCommand(`effect ${player.name} saturation ${fillHungerDuration} 255`);
};

/**
 * Converts an int into a 2D position on a rectangle.
 * x corresponds to width, z to height.
 * You give me ints, I give you ints.
 * Otherwise we're both in for a world of hurt.
 *
 *
 */
/*
while (i < 35) {
    console.log(tickRegion(i, 3, 5));
    i++;
}
i = 0;
*/
const tickRegion = (num: number, width: number, height: number): { x: number; z: number } => {
  const area = width * height;
  const normalized = num % area;

  return { x: Math.floor(normalized / height), z: normalized % height };
};

/** Spawns a structure in a region if the conditions are right */
const spawnStructure = (dim: Dimension, num: number): void => {
  const timeSinceStart = num - structureTime;
  if (timeSinceStart % structDelay !== 0) return; // do nothing unless it's time

  const { x, z } = tickRegion(Math.floor(timeSinceStart / structDelay), map.width, map.depth);
  const regionOffset = { x: x + northWestRegionOffset.x, z: z + northWestRegionOffset.z };
  const structLoc = new BlockLocation(regionOffset.x * size, -62, regionOffset.z * size);
  if (dim.getBlock(structLoc).id !== "minecraft:obsidian")
    cmd(dim, `structure load ${structName} ${locToString(structLoc)}`);
};

const coordToRegion = (num: number): number => Math.floor(num / size);

const mainTick = () => {
  tickIndex++;

  if (tickIndex > startTime && tickIndex % 5 === 0) {
    const player = getPlayer(over(world));
    const loc = tryTo((player: Player) => player.location, [player], "Failed to get player location");
    const currentRegion = { x: coordToRegion(loc.x), z: coordToRegion(loc.z) };
    if (currentRegion.x !== previousRegion.x || currentRegion.z !== previousRegion.z) {
      say(`player moved to (${currentRegion.x}, ${currentRegion.z})`);
      previousRegion = currentRegion;
    }
  }

  if (tickIndex === startTime) {
    trace(`${addonName} starting up...`);
    let player1 = getPlayer(over(world));
    initialize(player1);
  }

  if (tickIndex === clearTime) {
    resetPlayer(getPlayer(over(world)));
  }

  if (tickIndex === equipTime) {
    equipPlayer(getPlayer(over(world)));
  }

  if (tickIndex === emptyHungerTime) {
    emptyHunger(getPlayer(over(world)));
  }

  if (tickIndex === fillHungerTime) {
    fillHunger(getPlayer(over(world)));
  }

  // If we're in structure spawning duration
  if (tickIndex >= structureTime && tickIndex < structureTime + regionCount * structDelay) {
    spawnStructure(over(world), tickIndex);
  }

  if (tickIndex === informPlayerTime) {
    say("Survive.");
  }

  // Spawn zombie every 10 seconds
  if (tickIndex % (10 * seconds) === 0) {
    spawnZombie(getPlayer(over(world)));
  }
};

const onEntityHurt = (hurtEvent: EntityHurtEvent): void => {
  if (zombieDied(hurtEvent)) {
    /** The name of the attacking player. If the attacker is not a player, this is nullish. */
    const name: string = attackingPlayerName(hurtEvent);
    if (name) {
      score++;
      cmd(over(world), `scoreboard players set ${name} score ${score}`);
    }
  }
};

world.events.tick.subscribe(mainTick);
world.events.entityHurt.subscribe(onEntityHurt);
