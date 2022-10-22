# Inventory Management

Solving the age-old problem, Necesse-style :)

## Continuous workflow

This project is also my first significant Minecraft Bedrock add-on, so a lot of work will be going into project management. That means setting up a continuous workflow with automated file linting, unit tests, and integration tests. It'll also mean setting up PRs and build actions and GitHub projects and all that other fun stuff. So bear with me if progress is slow at the beginning -- I'm laying a foundation upon which everyone can build awesome Minecraft add-ons!

## Current features

Not much yet!

1. Project framework set up to allow instant unit testing

## Planned features

- Sort items in inventory
  - Player inventory
  - Chest inventory
- "Upload" inventory into current chest
  - Fill stacks: Upload only items to fill existing stacks, not add new stacks
  - Existing only: Upload only items that already are present in that chest
  - Lock slots in inventory: Probably through `!` commands until Ore UI comes out

## Ideal features

- Customize sort order
  - Possible through user adding custom file to the pack, very difficult to use
  - Hopefully easier once Ore UI comes out
- Network sort: Sort across multiple chests at once
  - Hit one chest, that spreads to detect all nearby chests, and "network sorts" so only any given item type is only present in one chest
  - Select a range like `/fill` command and sort according to that range

## Roadmap

1. Sort player inventory
1. Hit chest to sort its inventory
1. Support double chests
1. Basic upload inventory
1. Advanced upload inventory

## Resources

To learn more about how I built this specific add-on, check out these resources:

[Official block inventory manipulation code sample](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/blockinventorycomponent#place_items_in_chestjs)

Slot indexing: Hotbar is 0-8, left-to-right. Then top-left is 9 and bottom right (just above hotbar) is 35, row-major order.
