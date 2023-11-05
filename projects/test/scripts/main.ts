import { Dimension, EntityQueryOptions, Player, World, system, world } from "@minecraft/server";
import { addonName } from "./config";

const START_TICK = 100;

// global variables
let curTick = 0;

/** Prefix `x` with error label, then say `x` */
export const err = (x: string): void => {
  console.warn(`[ERR ${addonName}]: ${x}`);
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

/** Haha, get it? Like overworld but it's over(world). So you call `getPlayer(over(world))` and it works! */
const over = (world: World): Dimension => world.getDimension("overworld");

function gameTick() {
  try {
    curTick++;

    if (curTick > START_TICK && curTick % 20 === 0) {
      console.warn(getPlayer(over(world)).name);
    }
  } catch (e) {
    console.warn("Tick error: " + e);
  }

  system.run(gameTick);
}

system.run(gameTick);
