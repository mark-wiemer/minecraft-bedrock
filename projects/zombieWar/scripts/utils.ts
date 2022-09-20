import { Entity, world } from "mojang-minecraft";
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
