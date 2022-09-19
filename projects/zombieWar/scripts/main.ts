import { Dimension, world } from "mojang-minecraft";

let tickIndex = 0;
const inNeighborhood = false;

const initialize = (overworld: Dimension) => {
  overworld.runCommand("say Hello from Zombie War 3!");
  overworld.runCommand("tp @p 0 -59 0");
};

const mainTick = () => {
  tickIndex++;

  if (tickIndex === 100) {
    const overworld = world.getDimension("overworld");
    initialize(overworld);
  }
};

world.events.tick.subscribe(mainTick);
