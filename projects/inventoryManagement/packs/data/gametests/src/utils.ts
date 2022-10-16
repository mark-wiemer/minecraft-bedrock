import { TickEvent, World } from "./minecraft.types";

export const onTickEvent = (tickEvent: TickEvent, world: World): void => {
  let should_trigger = tickEvent.currentTick % 100 == 0;
  let player_count = [...world.getPlayers()].length;
  if (should_trigger && player_count > 0) {
    let seconds = tickEvent.currentTick / 20;
    world
      .getDimension('overworld')
      .runCommand(
        `tellraw @a {"rawtext":[{"text":"It has been ${seconds} seconds"}]}`
      );
  }
}

export const add = (a: number, b: number) => a + b;