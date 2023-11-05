import {
  Dimension,
  Entity,
  EntityHealthComponent,
  EntityHitEntityAfterEvent,
  EntityQueryOptions,
  Player,
  Vector3,
  world,
} from "@minecraft/server";
import { addonName, shouldTrace, shouldWarn } from "./config";

/** Shorthand for `world.getDimension("overworld").runCommand("say" + message)` */
export const say = (message: string): void => {
  world.getDimension("overworld").runCommand(`say ${message}`);
};

/** `say` if `shouldTrace`, else do nothing */
export const trace = (x: string): void => {
  if (shouldTrace) say(x);
};

/** `say` if `shouldWarn`, else do nothing */
export const warn = (x: string): void => {
  if (shouldWarn) say(x);
};

/** Prefix `x` with error label, then say `x` */
export const err = (x: string): void => {
  console.warn(`[ERR ${addonName}]: ${x}`);
};

/** Executes a callback safely, returning the fallback value if the callback throws an error. */
export const doSafely = <T extends any[], R>(callback: (...args: T) => R, args: T, fallback: R, msg: string): R => {
  try {
    return callback(...args);
  } catch (e) {
    err(msg);
    return fallback;
  }
};

/**
 * Executes a callback that may throw an error.
 * If callback returns a value (including `void`), this function returns that value.
 * Otherwise it calls `err(msg)` and throws the error that the callback throws.
 */
export const tryTo = <T extends any[], R>(callback: (...args: T) => R, args: T, msg: string): R => {
  try {
    return callback(...args);
  } catch (e) {
    err(msg);
    throw e;
  }
};

export const isZombie = (entity: Pick<Entity, "typeId">): boolean => {
  try {
    const result = entity.typeId.includes("zombie");
    trace(`isZombie(${entity.typeId}): ${result}`);
    return result;
  } catch {
    warn(`Couldn't get entity typeId`);
  }
  return false;
};

export const zombieDied = (hitEvent: EntityHitEntityAfterEvent): boolean => {
  const victim = hitEvent.hitEntity;

  let victimHealth = NaN;
  try {
    victimHealth = (victim.getComponent("minecraft:health") as EntityHealthComponent).currentValue;
  } catch {
    warn(`Couldn't get hurt entity health`);
  }

  const result = victimHealth <= 0 && isZombie(victim);
  trace(`zombieDied(): ${result}`);
  return result;
};

/** Returns name of player that caused the hurt event. If the event wasn't caused by a player, returns empty string. */
export const attackingPlayerName = (hitEvent: EntityHitEntityAfterEvent): string => {
  try {
    return (hitEvent.damagingEntity as Player)?.name;
  } catch {
    return "";
  }
};

/**
 * Get the current player. Designed for single player.
 * @param dim The dimension the player is in
 * @returns The player, if found. Else `undefined`
 */
export const getPlayer = (dim: Dimension): Player =>
  tryTo(
    (dim: Dimension): Player => [...dim.getPlayers({ closest: 1 } as unknown as EntityQueryOptions)][0],
    [dim],
    `Failed to find player`
  );

/** A position behind the player but on their level, ideal for spawning a new zombie. */
export const getZombieSpawnLoc = (player: Player): Vector3 => {
  const distance = 5;
  /** Radians per degree, used like `sin(90 * degrees) === 1` */
  const viewDirection = doSafely(
    (player) => player.getViewDirection(),
    [player],
    { x: 0, y: 0, z: 0 },
    "Couldn't get player view direction"
  );
  /** The 2D dimension where positive is east */
  const normX = viewDirection.x;
  /** The other 2D dimension, where positive is north. Don't think about it too much. */
  const normY = -viewDirection.z;
  /** Player's view direction in radians. 90 = north/-Z, 0 = east/+X, -90 = south/+Z, +-180 = west/-X */
  const viewAngle = Math.atan2(normY, normX);
  const xOffset = -Math.cos(viewAngle) * distance;
  const zOffset = Math.sin(viewAngle) * distance;
  const playerPos = pPos(player);
  const zLoc = { x: playerPos.x + xOffset, y: playerPos.y, z: playerPos.z + zOffset };
  return zLoc;
};

export const pPos = (player: Player): Vector3 =>
  tryTo((player: Player) => player.location, [player], "Failed to get player location");

/** Spawn a zombie 5 blocks behind the player. Watch out! */
export const spawnZombie = (player: Player) => {
  player.dimension.spawnEntity("minecraft:zombie", getZombieSpawnLoc(player));
};
