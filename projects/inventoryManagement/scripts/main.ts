import { world } from "mojang-minecraft";

let tickIndex = 0;

function mainTick() {
  tickIndex++;

  // Do this every second
  if (!(tickIndex % 20)) {
    world.getDimension("overworld").runCommand("say Hello from __todo__!");
  }
}

world.events.tick.subscribe(mainTick);
