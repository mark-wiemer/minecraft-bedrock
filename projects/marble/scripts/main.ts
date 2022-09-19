import { world } from "mojang-minecraft";

let tickIndex = 0;

function mainTick() {
  tickIndex++;

  if (tickIndex === 100) {
    world.getDimension("overworld").runCommand("say Hello from my first project!!!!");
  }
}

world.events.tick.subscribe(mainTick);
