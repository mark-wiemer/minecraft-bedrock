import {
  Location as mcLocation, // separate from default JS Location
  Dimension,
  Entity,
  EntityHealthComponent,
  EntityHurtEvent,
  EntityQueryOptions,
  Player,
  world,
  BlockLocation,
} from "mojang-minecraft";
import { addonName } from "./config.js";
import { trace, warn, say, tryTo, isZombie } from "./utils";

/** The current tick (used to track time in game) */
let tickIndex = 0;
/** Ticks per second */
const seconds = 20;

/** When to start the war */
// Should be at least 5 seconds to account for player join delay
const startTime = 5 * seconds;
/** When to reset the player */
const clearTime = startTime + 0.5 * seconds;
/** When to equip the player */
const equipTime = clearTime + 0.5 * seconds;
/** When to warn the player */
const informPlayerTime = equipTime + 5 * seconds;

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

  // TODO reset hunger
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

/** Spawn a zombie 10 blocks above the player. Watch out! */
const spawnZombie = (player: Player) => {
  const playerPos = tryTo((player: Player) => player.location, [player], "Failed to get player location");
  const dim = player.dimension;
  dim.spawnEntity("minecraft:zombie", new mcLocation(playerPos.x, playerPos.y + 10, playerPos.z));
};

/**
 * Get the current player. Designed for single player.
 * @param dim The dimension the player is in
 * @returns The player, if found. Else `undefined`
 */
const getPlayer = (dim: Dimension): Player =>
  tryTo(
    (dim: Dimension): Player => [...dim.getPlayers({ closest: 1 } as unknown as EntityQueryOptions)][0],
    [dim],
    `Failed to find player`
  );

const mainTick = () => {
  tickIndex++;
  const overworld = world.getDimension("overworld");

  if (tickIndex === startTime) {
    trace(`${addonName} starting up...`);
    const overworld = world.getDimension("overworld");
    let player1 = getPlayer(overworld);
    initialize(player1);
  }

  if (tickIndex === clearTime) {
    resetPlayer(getPlayer(overworld));
  }

  if (tickIndex === equipTime) {
    equipPlayer(getPlayer(overworld));
  }

  if (tickIndex === informPlayerTime) {
    say("Survive.");
  }

  // Spawn zombie every 10 seconds
  if (tickIndex % (10 * seconds) === 0) {
    spawnZombie(getPlayer(overworld));
  }
};

const onEntityHurt = (hurtEvent: EntityHurtEvent): void => {
  const victim = hurtEvent.hurtEntity;

  let victimHealth = NaN;
  try {
    victimHealth = (victim.getComponent("minecraft:health") as EntityHealthComponent).current;
  } catch {
    warn(`Couldn't get hurt entity health`);
  }

  if (victimHealth <= 0 && isZombie(victim)) {
    /** The name of the attacking player. If the attacker is not a player, this is nullish. */
    const attackingPlayerName: string | undefined | null = (hurtEvent.damagingEntity as Player)?.name;
    trace(attackingPlayerName ?? "kill not done by player");
    if (attackingPlayerName) {
      score++;
      const overworld = world.getDimension("overworld");
      cmd(overworld, `scoreboard players set ${attackingPlayerName} score ${score}`);
    }
  }
};

world.events.tick.subscribe(mainTick);
world.events.entityHurt.subscribe(onEntityHurt);
