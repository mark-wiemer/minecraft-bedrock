export interface World {
  getDimension(dimensionId: string): Dimension;
  /**
   * @remarks
   * Returns all players currently in the world.
   * @param options
   * @returns
   * All players currently in the world.
   * @throws This function can throw errors.
   */
  getPlayers(): PlayerIterator;
}

export interface Dimension {
  runCommandAsync(commandString: string): Promise<unknown>;
}
/**
 * This type is usable for iterating over a set of players.
 * This means it can be used in statements like for...of
 * statements, Array.from(iterator), and more.
 */
export interface PlayerIterator {
  [Symbol.iterator](): Iterator<unknown>;
  /**
   * @remarks
   * Retrieves the next item in this iteration. The resulting
   * IteratorResult contains .done and .value properties which
   * can be used to see the next Player in the iteration.
   */
  next(): IteratorResult<unknown>;
  // protected constructor();
}

/**
 * How many times the server ticks per second of real time.
 */
export const TicksPerSecond = 20;
