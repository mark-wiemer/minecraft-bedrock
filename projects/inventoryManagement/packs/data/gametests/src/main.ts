import { World, world } from 'mojang-minecraft';
import { onTickEvent } from './utils';

import {
    MinecraftBlockTypes,
    BlockLocation,
    Items,
    ItemStack,
} from 'mojang-minecraft';

world.events.tick.subscribe((tickEvent) => onTickEvent(tickEvent, world));

// Populate first slot of a chest with 10 apples every 10 seconds
// Adapted from https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/blockinventorycomponent#place_items_in_chestjs
world.events.tick.subscribe((tickEvent) => {
    if (tickEvent.currentTick % 200) {
        return;
    }

    // Fetch block
    const block = world
        .getDimension('overworld')
        .getBlock(new BlockLocation(1, 2, 3));
    // Make it a chest
    block.setType(MinecraftBlockTypes.chest);
    // Get the inventory
    const inventoryComponent = block.getComponent('inventory');
    const inventoryContainer = inventoryComponent.container;
    // Set slot 0 to a stack of 10 apples
    inventoryContainer.setItem(0, new ItemStack(Items.get('apple'), 10, 0));

    // world
    //     .getDimension('overworld')
    //     .runCommandAsync(
    //         'tellraw @a {"rawtext":[{"text":"THE CHEST IS HERE"}]}',
    //     );
});

const log = (world: World, msg: string) =>
    world
        .getDimension('overworld')
        .runCommandAsync(`tellraw @a {"rawtext":[{"text":"${msg}"}]}`);

world.events.beforeItemUse.subscribe(() => log(world, 'beforeItemUse'));
world.events.beforeItemUseOn.subscribe(() => log(world, '.beforeItemUseOn'));
world.events.itemStartUseOn.subscribe(() => log(world, '.itemStartUseOn'));
world.events.itemStopUseOn.subscribe(() => log(world, '.itemStopUseOn'));
world.events.itemUse.subscribe(() => log(world, '.itemUse'));
world.events.itemUseOn.subscribe(() => log(world, '.itemUseOn'));
