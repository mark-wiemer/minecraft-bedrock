import { BlockLocation, MinecraftBlockTypes, world } from "mojang-minecraft";
import Utilities from "./Utilities.js";

const START_TICK = 100;
const ARENA_X_SIZE = 30;
const ARENA_Z_SIZE = 30;
const ARENA_X_OFFSET = 0;
const ARENA_Y_OFFSET = -60;
const ARENA_Z_OFFSET = 0;

// global variables
let curTick = 0;
let score = 0;
let cottaX = 0;
let cottaZ = 0;
let spawnCountdown = 1;

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

  Utilities.fillBlock(
    MinecraftBlockTypes.air,
    ARENA_X_OFFSET - ARENA_X_SIZE / 2 + 1,
    ARENA_Y_OFFSET,
    ARENA_Z_OFFSET - ARENA_Z_SIZE / 2 + 1,
    ARENA_X_OFFSET + ARENA_X_SIZE / 2 - 1,
    ARENA_Y_OFFSET + 10,
    ARENA_Z_OFFSET + ARENA_Z_SIZE / 2 - 1
  );

  Utilities.fourWalls(
    MinecraftBlockTypes.cobblestone,
    ARENA_X_OFFSET - ARENA_X_SIZE / 2,
    ARENA_Y_OFFSET,
    ARENA_Z_OFFSET - ARENA_Z_SIZE / 2,
    ARENA_X_OFFSET + ARENA_X_SIZE / 2,
    ARENA_Y_OFFSET + 10,
    ARENA_Z_OFFSET + ARENA_Z_SIZE / 2
  );

  overworld.runCommand("tp @p " + String(ARENA_X_OFFSET - 3) + " " + ARENA_Y_OFFSET + " " + String(ARENA_Z_OFFSET - 3));
}

function gameTick() {
  if (curTick === START_TICK) {
    initializeBreakTheTerracotta();
  }

  curTick++;
  if (curTick > START_TICK && curTick % 20 === 0) {
    let overworld = world.getDimension("overworld");

    // no terracotta exists, and we're waiting to spawn a new one.
    if (spawnCountdown > 0) {
      spawnCountdown--;

      if (spawnCountdown <= 0) {
        spawnNewTerracotta();
      }
    } else {
      checkForTerracotta();
    }
  }
}

function spawnNewTerracotta() {
  let overworld = world.getDimension("overworld");

  // create new terracotta
  cottaX = Math.floor(Math.random() * (ARENA_X_SIZE - 1)) - (ARENA_X_SIZE / 2 - 1);
  cottaZ = Math.floor(Math.random() * (ARENA_Z_SIZE - 1)) - (ARENA_Z_SIZE / 2 - 1);

  overworld.runCommand("say Creating new terracotta!");
  overworld
    .getBlock(new BlockLocation(cottaX + ARENA_X_OFFSET, 1 + ARENA_Y_OFFSET, cottaZ + ARENA_Z_OFFSET))
    .setType(MinecraftBlockTypes.yellowGlazedTerracotta);
}

function checkForTerracotta() {
  let overworld = world.getDimension("overworld");

  let block = overworld.getBlock(
    new BlockLocation(cottaX + ARENA_X_OFFSET, 1 + ARENA_Y_OFFSET, cottaZ + ARENA_Z_OFFSET)
  );

  if (block.type !== MinecraftBlockTypes.yellowGlazedTerracotta) {
    // we didn't find the terracotta! set a new spawn countdown
    score++;
    spawnCountdown = 2;
    cottaX = -1;
    overworld.runCommand("scoreboard players set @p score " + score);
    overworld.runCommand("say You broke the terracotta! Creating new terracotta in a few seconds.");
    cottaZ = -1;
  }
}

world.events.tick.subscribe(gameTick);
