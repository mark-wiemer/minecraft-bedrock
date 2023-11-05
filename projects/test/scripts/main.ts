import { system } from "@minecraft/server";

const START_TICK = 100;

// global variables
let curTick = 0;

function gameTick() {
  try {
    curTick++;

    if (curTick > START_TICK && curTick % 20 === 0) {
      console.warn("Hi!");
    }
  } catch (e) {
    console.warn("Tick error: " + e);
  }

  system.run(gameTick);
}

system.run(gameTick);
