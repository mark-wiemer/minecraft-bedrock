import { BlockLocation, Dimension, EntityQueryOptions, Player, world } from "mojang-minecraft";

const name = "Zombie War";

let tickIndex = 0;
/** Ticks per second */
const seconds = 20;
const startTick = 5 * seconds;
const spawn = new BlockLocation(0, -59, 0);
const debug = true;

const locToString = (loc: Pick<BlockLocation, "x" | "y" | "z">): string => [loc.x, loc.y, loc.z].join(" ");

const say = (x: string): void => {
  world.getDimension("overworld").runCommand(`say ${x}`);
};

/** Say if in debug mode, else do nothing */
const trace = (x: string): void => {
  if (debug) say(x);
};

const initialize = (overworld: Dimension, player: Player) => {
  say(`Welcome to ${name}!`);
  const command = `tp ${player.name} ${locToString(spawn)}`;
  overworld.runCommand(command);
};

const mainTick = () => {
  tickIndex++;

  if (tickIndex === startTick) {
    trace(`${name} starting up...`);
    const overworld = world.getDimension("overworld");
    let player1: Player | null = null;
    try {
      const playerIterator = overworld.getPlayers({ closest: 1 } as unknown as EntityQueryOptions);
      for (const player of playerIterator) {
        player1 = player;
      }
    } catch {
      say(`${name} crashed while finding nearest player to spawn`);
    }
    if (player1) initialize(overworld, player1);
  }
};

world.events.tick.subscribe(mainTick);
