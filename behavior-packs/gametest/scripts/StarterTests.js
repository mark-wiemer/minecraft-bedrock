import * as GameTest from "mojang-gametest";
import { BlockLocation, world } from "mojang-minecraft";

function simpleMobTest(test) {
  const attackerId = "fox";
  const victimId = "chicken";

  test.spawn(attackerId, new BlockLocation(5, 2, 5));
  test.spawn(victimId, new BlockLocation(2, 2, 2));

  test.assertEntityPresentInArea(victimId, true);

  // Succeed when the victim dies
  test.succeedWhen(() => {
    test.assertEntityPresentInArea(victimId, false);
  });
}

// Registration code for our test
GameTest.register("MarksTest", "simpleMobTest", simpleMobTest)
  .maxTicks(410)
  .structureName(
    "startertests:mediumglass" // use the mediumglass.mcstructure file
  );

// Send hello world to everyone before any chat message!
world.events.beforeChat.subscribe((bce) =>
  world.getDimension("overworld").runCommand(`tellraw @a hello world!`)
);
