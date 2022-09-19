import { world } from "mojang-minecraft";

let tickIndex = 0;

const mainTick = () => {
  tickIndex++;

  if (tickIndex === 100) {
    const overworld = world.getDimension("overworld");
    overworld.runCommand("say Hello from Zombie War 2!");
    overworld.runCommand("tp @p 0 -59 0");
  }
};

world.events.tick.subscribe(mainTick);
