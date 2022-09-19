import { world } from "mojang-minecraft";

const START_TICK = 100;

// global variables
let curTick = 0;

function initializeBreakTheTerracotta() {
  const overworld = world.getDimension("overworld");

  // catch in case we've already added this score before.
  try {
    overworld.runCommand('scoreboard objectives add score dummy "Level"');
  } catch (e) {}

  // eliminate pesky nearby mobs
  try {
    overworld.runCommand("kill @e[type=!player]");
  } catch (e) {}

  overworld.runCommand("scoreboard objectives setdisplay sidebar score");
  overworld.runCommand("give @p diamond_sword");
  overworld.runCommand("give @p dirt 64");

  overworld.runCommand("scoreboard players set @p score 0");
  overworld.runCommand("say BREAK THE TERRACOTTA!");
}

function gameTick() {
  if (curTick === START_TICK) {
    initializeBreakTheTerracotta();
  }

  curTick++;
}

world.events.tick.subscribe(gameTick);
