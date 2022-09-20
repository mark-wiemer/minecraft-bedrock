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
import { trace, warn, say, tryTo, zombieDied, attackingPlayerName, getPlayer, spawnZombie } from "./utils";

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
/** When to warn the player */
const informPlayerTime = fillHungerTime + (fillHungerDuration + 2) * seconds;

const spawn = new BlockLocation(0, -59, 0);
let score = 0;

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
  cmd(dim, `scoreboard players set @p score ${score}`);
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

const mainTick = () => {
  tickIndex++;

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
