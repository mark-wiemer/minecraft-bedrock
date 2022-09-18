import * as GameTest from "mojang-gametest";
import { BlockLocation } from "mojang-minecraft";

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
GameTest.register("StarterTests", "simpleMobTest", simpleMobTest)
  .maxTicks(410)
  .structureName(
    "startertests:mediumglass" // use the mediumglass.mcstructure file
  );
