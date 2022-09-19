# Smelly pack

**This pack works in regular Minecraft 1.19.22, but doesn't work in Minecraft Preview 1.19.40.21**

<details><summary>Blocker details for Minecraft Preview 1.19.40.21</summary>

Blocked on getting compiled pack to load in preview version of Minecraft: "At least one of your behavior packs failed to load" in Minecraft Preview 1.19.40.21 after running `npm run compile "Chat Ranks","Chat Ranks" "Chat Ranks" 5.0.2` and moving the compiled `.mcpack` to `...\AppData\Local\Packages\Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs`, adding behavior pack (the only custom behavior pack) to the world, and joining world. Typing in chat just shows regular chat instead of chat ranks.

</details><br />

---

This add-on uses the [Smelly API v1](https://github.com/Smelly-API/Smelly-API/commit/562efb3453932901c304aaefd531d17999eb6c56) to add JavaScript logic. This unlocks advanced add-on features, I think :D

The pack was created by me following [Smell of Curry](https://github.com/smell-of-curry)'s [YouTube guide](https://www.youtube.com/watch?v=VvJqDT8CClc). The first commit copies the Smelly API v3 code.

## Installation

1. Download this pack's source code from GitHub
1. Unzip
1. Navigate to this folder and run `npm run compile "Chat Ranks","Chat Ranks" "Chat Ranks" 5.0.2`
   - Output should end with `Pack.mcpack Compiled and Outputed in: './build/output/Chat Ranks v5.0.2.zip'`. If not, [open a bug](https://github.com/mark-wiemer/minecraft-bedrock/issues/new).
1. Copy the `.mcpack` to your `C:\Users\__your user (replace this value)__\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs`
1. Open Minecraft (if it was open, close it and re-open it)
1. Create a new world with all experiments enabled
1. Add the behavior pack to the world
   - If you can't find the behavior pack in "My packs", [open a bug](https://github.com/mark-wiemer/minecraft-bedrock/issues/new).
1. Join the world
1. Type something in chat

Expected: The chat output starts with a fancy `[Member]` before your name and message

Note the usual behavior without the pack just prints e.g. `<Curdflappers>: hello`. If you're still seeing this, [open a bug](https://github.com/mark-wiemer/minecraft-bedrock/issues/new).

## Smelly API

This is a wrapper for the MCBE Gamtest Framework, which uses advanced ways to make it easy for all beginners to learn Minecraft's Gamtest Framework and JavaScript. With this wrapper, you can create projects that will inspire, build, and change Minecraft forever. The Smelly API wraps around the gametest framework, making it easier to use and also implementing some key functions for bedrock development.

## Authors

- [@Smell of curry](https://www.github.com/smell-of-curry)

## Features

All of these features come with easy-to-change config files and advanced support for all changes and code.

- Easy to implement Plugins
- Database w/ unlimited storage
- Chat Ranks, Custom Commands
- Player management:
- Formatter, MS, and custom scheduling utilities

## Support

For support, Join the discord https://discord.gg/dMa3A5UYKX.

Want to get better at gametest? Join the offical minecraft gametest discord: https://discord.gg/3GvfCDdTqY

## License

[MIT](https://choosealicense.com/licenses/mit/)
