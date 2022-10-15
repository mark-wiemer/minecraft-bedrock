## Minecraft Bedrock Edition projects

General repo for add-ons, mods, links, etc. for Minecraft Bedrock

## How to build Minecraft Bedrock add-ons

Ever wanted to mod Minecraft, but not sure where to get started? Here are some links I found that were super helpful for me!

These links are for Minecraft Bedrock Edition. Historically, add-on support (AKA mod support) for this edition has been poor. But as a software engineer I can say I've found great support now! It's definitely worth looking into.

- [Microsoft Learn homepage](https://learn.microsoft.com/en-us/minecraft/creator/): This is the official Microsoft-supported main page for everything creators need to know to get started making resource packs and behavior packs.
- [Getting Started with Add-On Development for Bedrock Edition](https://learn.microsoft.com/en-us/minecraft/creator/documents/gettingstarted): These guides show you exactly how to build your first resource pack and your first behavior pack, from start to finish.
- [Molang: a Beginner's Guide](https://learn.microsoft.com/en-us/minecraft/creator/documents/molangbeginnersguide): Molang is a fancy Mojang programming language that can be useful for writing some advanced add-ons.
- [Introduction to the GameTest Framework](https://learn.microsoft.com/en-us/minecraft/creator/documents/gametestgettingstarted): This is the best way to test games, and it uses JavaScript, the most popular programming language in the world!
- [Build a gameplay experience with TypeScript](https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptinggettingstarted): TypeScript is Microsoft's copy of JavaScript, it's popular and becoming more popular! Writing mods in TypeScript allows you to add any functionality you can imagine to your mod!
- [mojang-minecraft Module](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/mojang-minecraft): This module and the others near it are how we can access Minecraft values with our TypeScript code. It's technical, but a great resource.
- [List and summary of commands (Minecraft fandom)](https://minecraft.fandom.com/wiki/Commands#List_and_summary_of_commands): Most advanced mods will be running some commands. This community-supported wiki is the best resource for learning each and every command
- [Bedrock OSS](https://github.com/Bedrock-OSS): Bedrock OSS is a great centralized community around building Minecraft mods. The Discord is popular, the wiki is awesome, and the supported projects are top-notch. And it's getting better all the time!

And remember -- be patient, ask for help, and always be curious! Modding is hard work, and it'll take a lot of time, energy, and boring research to create something awesome. But I promise it's worth it!

## Other resources

- [Minecraft changelog](https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs): Sometimes when Minecraft changes, our add-ons will break until we make our own changes. Always check the changelog!

### Completed work

Explore the repo to find which pack is used for each bit of work. Also explore the git history for more details.

- Sample resource pack by modifying JSON files and adding a `.png` file
- Sample behavior pack with Molang
- Sample behavior pack with `mcfunction` (in-game commands)
- Using GameTest framework to add functionality, not just tests. See [the Smelly pack](./behavior-packs/smelly-pack/README.md)
- [Using TypeScript](https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptinggettingstarted) instead of JavaScript, Molang, mcfunction, or JSON. See [Project Cotta](./projects/cotta/README.md)
- Getting a custom TS pack to update when player leaves and rejoins the game. See [Project Smooth Stone](./projects/smoothStone/README.md)
- Mastering the project initialization process. See [Project Marble](./projects/marble/README.md)
- Awesome Zombie Fighting add-on! See [Project Z-War](./projects/zombieWar/README.md)

### Current work

- Learn how to use [Regolith](https://github.com/Bedrock-OSS/regolith). See [Project Hello Regolith](./projects/helloRegolith/)
- Inventory management mods in Minecraft Bedrock!