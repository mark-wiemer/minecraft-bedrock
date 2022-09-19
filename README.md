## Minecraft Bedrock Edition projects

General repo for add-ons, mods, links, etc. for Minecraft Bedrock

- [Getting started with add-on development for Bedrock Edition](https://learn.microsoft.com/en-us/minecraft/creator/documents/gettingstarted)

### Current work

Using GameTest framework to add functionality, not just tests.

Blocked on getting compiled pack to load in a version of Minecraft. "At least one of your behavior packs failed to load" in Minecraft Preview 1.19.40.21 after running `npm run compile "Chat Ranks","Chat Ranks" "Chat Ranks" 5.0.2` and moving the compiled `.mcpack` to `...\AppData\Local\Packages\Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs`, adding behavior pack (the only custom behavior pack) to the world, and joining world. Typing in chat just shows regular chat instead of chat ranks.
