import {
  Location as mcLocation, // separate from default JS Location
  Dimension,
  Entity,
  EntityHealthComponent,
  EntityHurtEvent,
  EntityQueryOptions,
  Player,
  world,
} from "mojang-minecraft";
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
  say(`[ERR ${addonName}]: ${x}`);
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

export const isZombie = (entity: Pick<Entity, "id">): boolean => {
  try {
    return entity.id.includes("zombie");
  } catch {
    warn(`Couldn't get entity ID`);
  }
  return false;
};

export const zombieDied = (hurtEvent: EntityHurtEvent): boolean => {
  const victim = hurtEvent.hurtEntity;

  let victimHealth = NaN;
  try {
    victimHealth = (victim.getComponent("minecraft:health") as EntityHealthComponent).current;
  } catch {
    warn(`Couldn't get hurt entity health`);
  }

  return victimHealth <= 0 && isZombie(victim);
};

/** Returns name of player that dealt killing blow, else empty string. */
export const attackingPlayerName = (hurtEvent: EntityHurtEvent): string => {
  try {
    return (hurtEvent.damagingEntity as Player)?.name;
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

/** Spawn a zombie 10 blocks above the player. Watch out! */
export const spawnZombie = (player: Player) => {
  const playerPos = tryTo((player: Player) => player.location, [player], "Failed to get player location");
  const dim = player.dimension;
  dim.spawnEntity("minecraft:zombie", new mcLocation(playerPos.x, playerPos.y + 10, playerPos.z));
};
