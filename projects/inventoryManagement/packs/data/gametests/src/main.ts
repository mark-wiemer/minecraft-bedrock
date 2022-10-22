import {
    EntityInventoryComponent,
    InventoryComponentContainer,
    Items,
    ItemStack,
    // Player,
    world,
} from 'mojang-minecraft';
import { announceSeconds } from './utils';

// const log = (msg: string | number) =>
//     world.getDimension('overworld').runCommandAsync(`say ${msg}`);

world.events.tick.subscribe((tickEvent) => announceSeconds(tickEvent, world));
world.events.tick.subscribe((tickEvent) => {
    const tickNum = tickEvent.currentTick;
    const interval = 5;
    if (tickNum % interval) {
        return;
    }
    const player = [...world.getPlayers()][0];
    if (!player) {
        return;
    }

    const inventory: InventoryComponentContainer = (
        player.getComponent('inventory') as EntityInventoryComponent
    ).container;

    const slot = Math.floor(tickNum / interval) % inventory.size;

    inventory.setItem(slot, new ItemStack(Items.get('minecraft:apple'), slot));
});

// world.events.beforeItemUse.subscribe((event) => {
//     const player = event.source;
//     if (!(player instanceof Player)) {
//         return;
//     }

//     const inventory: InventoryComponentContainer = (
//         player.getComponent('inventory') as EntityInventoryComponent
//     ).container;
// });
