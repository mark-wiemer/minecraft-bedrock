import { BlockLocation, Dimension, EntityQueryOptions, Player, world } from "mojang-minecraft";

let tickIndex = 0;
const spawn = new BlockLocation(0, -59, 0);

const locToString = (loc: Pick<BlockLocation, "x" | "y" | "z">): string => [loc.x, loc.y, loc.z].join(" ");

const initialize = (overworld: Dimension, player: Player) => {
  const command = `tp ${player.name} ${locToString(spawn)}`;
  say(`${command}`);
  overworld.runCommand(command);
};

const say = (x: string): void => {
  world.getDimension("overworld").runCommand(`say ${x}`);
};

const mainTick = () => {
  tickIndex++;

  if (tickIndex === 100) {
    const overworld = world.getDimension("overworld");
    let player1: Player | null = null;
    try {
      say(`Getting player name`);
      const iterator = overworld.getPlayers();
      say(`got all players`);
      const result = iterator.next(); // this is failing
      say(`got all player 1 result`);
      player1 = result.value as Player;
      say(`got player name ${player1.name}`);
    } catch {
      say(`couldn't get name :(`);
      say(`maybe there are no players found?`);
    }
    if (player1) initialize(overworld, player1);
  }
};

world.events.tick.subscribe(mainTick);
