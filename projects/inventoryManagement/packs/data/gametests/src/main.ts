import { World, world } from 'mojang-minecraft';
import { onTickEvent } from './utils';

world.events.tick.subscribe((tickEvent) => onTickEvent(tickEvent, world));

const log = (world: World, msg: string) =>
    world
        .getDimension('overworld')
        .runCommandAsync(`tellraw @a {"rawtext":[{"text":"${msg}"}]}`);

world.events.beforeItemUse.subscribe(() => log(world, 'beforeItemUse'));
