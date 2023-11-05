import { TicksPerSecond, World } from "./types-1-0-0-beta";

/** Every 5 seconds, announce the total number of seconds that have elapsed */
export const announceSeconds = (tickNum: number, world: World): void => {
  const shouldTrigger = tickNum % 100 === 0;
  const playerCount = [...world.getPlayers()].length;
  if (shouldTrigger && playerCount > 0) {
    const seconds = tickNum / TicksPerSecond;
    world.getDimension("overworld").runCommandAsync(`say It has been ${seconds} seconds`);
  }
};
