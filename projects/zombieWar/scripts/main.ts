import { BlockLocation, Dimension, EntityQueryOptions, Player, world } from "mojang-minecraft";

const modName = "Zombie War";

/** The current tick (used to track time in game) */
let tickIndex = 0;
/** Ticks per second */
const seconds = 20;
/** When to start the war */
const startTime = 5 * seconds;
/** When to warn the player */
const informPlayerTime = startTime + 2 * seconds;
const spawn = new BlockLocation(0, -59, 0);
const debug = false;

/**
 * Convert a block location to a command-friendly string representation
 * e.g. locToString({ x: 1, y: 2, z: 3 }) === "1 2 3"
 */
const locToString = (loc: Pick<BlockLocation, "x" | "y" | "z">): string => [loc.x, loc.y, loc.z].join(" ");

/** Shorthand for `overworld.runCommand("say" + message)` */
const say = (message: string): void => {
  world.getDimension("overworld").runCommand(`say ${message}`);
};

/** `say` if in debug mode, else do nothing */
const trace = (x: string): void => {
  if (debug) say(x);
};

/**
 * Audit and run the command.
 * Shorthand for `dimension.runCommand(command)`
 */
const cmd = (dimension: Dimension, command: string): void => {
  trace(command);
  dimension.runCommand(command);
};

/**
 * Create starting conditions for the war.
 * - Teleport player to spawn house
 * - Lock time to midnight
 * - Replace inventory with wooden sword
 * - Survival mode only
 */
const initialize = (overworld: Dimension, player: Player) => {
  const playerName = player.name;

  say(`Welcome to ${modName}!`);

  // Teleport player to spawn house
  cmd(overworld, `tp ${player.name} ${locToString(spawn)}`);

  // Lock time to midnight
  cmd(overworld, "alwaysday true");
  cmd(overworld, "time set midnight");

  // Clear player inventory, use only wooden sword
  cmd(overworld, `clear ${playerName}`);
  cmd(overworld, `give ${playerName} wooden_sword`);

  cmd(overworld, `gamemode survival ${playerName}`);
};

const mainTick = () => {
  tickIndex++;

  // If it's time to start the war...
  if (tickIndex === startTime) {
    trace(`${modName} starting up...`);
    const overworld = world.getDimension("overworld");
    // Get the closes player's name
    let player1: Player | null = null;
    try {
      const playerIterator = overworld.getPlayers({ closest: 1 } as unknown as EntityQueryOptions);
      for (const player of playerIterator) {
        player1 = player;
      }
    } catch {
      say(`${modName} crashed while finding nearest player to spawn`);
    }
    // And initialize the war!
    if (player1) initialize(overworld, player1);
  }

  if (tickIndex === informPlayerTime) {
    say("Survive.");
  }
};

world.events.tick.subscribe(mainTick);
