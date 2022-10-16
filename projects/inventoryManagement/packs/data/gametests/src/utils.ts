import { TickEvent, World } from './minecraft.types';

export const onTickEvent = (tickEvent: TickEvent, world: World): void => {
    const shouldTrigger = tickEvent.currentTick % 100 === 0;
    const playerCount = [...world.getPlayers()].length;
    if (shouldTrigger && playerCount > 0) {
        const seconds = tickEvent.currentTick / 20;
        world
            .getDimension('overworld')
            .runCommand(
                `tellraw @a {"rawtext":[{"text":"It has been ${seconds} seconds"}]}`,
            );
    }
};

export const add = (a: number, b: number) => a + b;
