import { world } from "mojang-minecraft";

let tickIndex = 0;

const mainTick = () => {
  tickIndex++;

  if (tickIndex === 100) {
    world.getDimension("overworld").runCommand("say Hello from Zombie War 2!");
  }
};

world.events.tick.subscribe(mainTick);
