import { ItemStack, TickEvent, TicksPerSecond, World } from './minecraft.types';

/** Every 5 seconds, announce the total number of seconds that have elapsed */
export const announceSeconds = (tickEvent: TickEvent, world: World): void => {
    const tickNum = tickEvent.currentTick;
    const shouldTrigger = tickNum % 100 === 0;
    const playerCount = [...world.getPlayers()].length;
    if (shouldTrigger && playerCount > 0) {
        const seconds = tickNum / TicksPerSecond;
        world
            .getDimension('overworld')
            .runCommandAsync(`say It has been ${seconds} seconds`);
    }
};

export const add = (a: number, b: number) => a + b;

type SimpleItemStack = Pick<ItemStack, 'amount' | 'id'>;

export const sortInventory = (
    unsortedInventory: SimpleItemStack[],
): SimpleItemStack[] => {
    const sortedInventory: SimpleItemStack[] = [];

    for (let itemStack of unsortedInventory) {
        const sortedStack = sortedInventory.find(
            (sortedStack) => sortedStack.id === itemStack.id,
        );
        if (sortedStack) {
            sortedStack.amount += itemStack.amount;
        } else {
            sortedInventory.push(itemStack);
        }
    }

    return sortedInventory;
};
