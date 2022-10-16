import { world } from 'mojang-minecraft';
import { onTickEvent } from './utils';

world.events.tick.subscribe((tickEvent) => onTickEvent(tickEvent, world));
