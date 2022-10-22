import {
    EntityInventoryComponent,
    Items,
    ItemStack,
    Player,
    world,
} from 'mojang-minecraft';
import { onTickEvent } from './utils';

const log = (msg: string | number) =>
    world.getDimension('overworld').runCommandAsync(`say ${msg}`);

world.events.tick.subscribe((tickEvent) => onTickEvent(tickEvent, world));
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

    const inventory: EntityInventoryComponent = player.getComponent(
        'inventory',
    ) as EntityInventoryComponent;

    const slot = Math.floor(tickNum / interval) % inventory.container.size;

    if (slot === 0) {
        return;
    }

    inventory.container.setItem(
        slot,
        new ItemStack(Items.get('minecraft:apple'), slot),
    );
});

world.events.beforeItemUse.subscribe((event) => {
    const player = event.source;
    if (!(player instanceof Player)) {
        return;
    }

    const inventory: EntityInventoryComponent = player.getComponent(
        'inventory',
    ) as EntityInventoryComponent;

    log(inventory.container.size);

    inventory.container.setItem(
        27,
        new ItemStack(Items.get('minecraft:diamond_hoe')),
    );

    inventory.container.addItem(new ItemStack(Items.get('minecraft:apple')));
});
