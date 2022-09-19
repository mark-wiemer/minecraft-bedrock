import { BlockLocation, Dimension, world } from "mojang-minecraft";

let tickIndex = 0;
const inNeighborhood = false;
const spawn = new BlockLocation(0, -59, 0);

const locToString = (loc: Pick<BlockLocation, "x" | "y" | "z">): string => [loc.x, loc.y, loc.z].join(" ");

const initialize = (overworld: Dimension) => {
  overworld.runCommand(`tp @p ${locToString(spawn)}`);
};

const mainTick = () => {
  tickIndex++;

  if (tickIndex === 100) {
    const overworld = world.getDimension("overworld");
    initialize(overworld);
  }
};

world.events.tick.subscribe(mainTick);
