import {
  BlockLocation,
  Dimension,
  Entity,
  EntityHealthComponent,
  EntityHurtEvent,
  EntityQueryOptions,
  Player,
  world,
} from "mojang-minecraft";

const modName = "Zombie War";

/** The current tick (used to track time in game) */
let tickIndex = 0;
/** Ticks per second */
const seconds = 20;
/** When to start the war */
const startTime = 5 * seconds;
/** When to warn the player */
const informPlayerTime = startTime + 15 * seconds;
const spawn = new BlockLocation(0, -59, 0);
const shouldTrace = false;
const shouldWarn = true;
let score = 0;

/**
 * Convert a block location to a command-friendly string representation
 * e.g. locToString({ x: 1, y: 2, z: 3 }) === "1 2 3"
 */
const locToString = (loc: Pick<BlockLocation, "x" | "y" | "z">): string => [loc.x, loc.y, loc.z].join(" ");

/** Shorthand for `overworld.runCommand("say" + message)` */
const say = (message: string): void => {
  world.getDimension("overworld").runCommand(`say ${message}`);
};

/** `say` if `shouldTrace`, else do nothing */
const trace = (x: string): void => {
  if (shouldTrace) say(x);
};

/** `say` if `shouldWarn`, else do nothing */
const warn = (x: string): void => {
  if (shouldWarn) say(x);
};

/**
 * Audit and run the command.
 * Shorthand for `dimension.runCommand(command)`
 */
const cmd = (dimension: Dimension, command: string): void => {
  trace(command);
  dimension.runCommand(command);
};

/** Initialize, display, and reset scores */
const initScore = (dim: Dimension, player: Player): void => {
  // catch in case we've already added this score before.
  try {
    cmd(dim, 'scoreboard objectives add score dummy "Kills"');
  } catch (e) {}
  cmd(dim, "scoreboard objectives setdisplay sidebar score");
  cmd(dim, `scoreboard players set @p score ${score}`);
};

/**
 * - Teleport player to spawn house
 * - Lock time to midnight
 * - Replace inventory with wooden sword
 * - Survival mode only
 */
const resetPlayer = (dim: Dimension, player: Player): void => {
  const playerName = player.name;

  cmd(dim, `tp ${playerName} ${locToString(spawn)}`);
  cmd(dim, `gamemode survival ${playerName}`);

  // Reset inventory
  cmd(dim, `clear ${playerName}`);
  cmd(dim, `give ${playerName} wooden_sword`);
  cmd(dim, `give ${playerName} cooked_beef`);

  // Reset health
  try {
    (player.getComponent("minecraft:health") as EntityHealthComponent).resetToMaxValue();
  } catch {
    warn("Failed to reset player health");
  }

  // TODO reset hunger
};

/**
 * Create starting conditions for the war.
 * - Reset player position, inventory, health, gamemode, score
 * - Lock time to midnight
 */
const initialize = (dim: Dimension, player: Player) => {
  say(`Welcome to ${modName}!`);
  initScore(dim, player);

  // Lock time to midnight
  cmd(dim, "alwaysday true");
  cmd(dim, "time set midnight");

  resetPlayer(dim, player);
};

const mainTick = () => {
  tickIndex++;

  // If it's time to start the war...
  if (tickIndex === startTime) {
    trace(`${modName} starting up...`);
    const overworld = world.getDimension("overworld");
    // Get the closes player's name
    let player1: Player | null = null;
    try {
      const playerIterator = overworld.getPlayers({ closest: 1 } as unknown as EntityQueryOptions);
      for (const player of playerIterator) {
        player1 = player;
      }
    } catch {
      say(`${modName} crashed while finding nearest player to spawn`);
    }
    // And initialize the war!
    if (player1) initialize(overworld, player1);
  }

  if (tickIndex === informPlayerTime) {
    say("Survive.");
  }
};

const isZombie = (entity: Entity): boolean => entity.id.includes("zombie");

const onEntityHurt = (hurtEvent: EntityHurtEvent): void => {
  const victim = hurtEvent.hurtEntity;

  let victimHealth = NaN;
  try {
    victimHealth = (victim.getComponent("minecraft:health") as EntityHealthComponent).current;
    trace(victimHealth.toString());
  } catch {
    warn(`Couldn't get hurt entity health`);
  }

  if (victimHealth <= 0 && isZombie(victim)) {
    /** The name of the attacking player. If the attacker is not a player, this is nullish. */
    const attackingPlayerName: string | undefined | null = (hurtEvent.damagingEntity as Player)?.name;
    trace(attackingPlayerName ?? "kill not done by player");
    if (attackingPlayerName) {
      score++;
      const overworld = world.getDimension("overworld");
      cmd(overworld, `scoreboard players set @p score ${score}`);
    }
  }
};

world.events.tick.subscribe(mainTick);
world.events.entityHurt.subscribe(onEntityHurt);
