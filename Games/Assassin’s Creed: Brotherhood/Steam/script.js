include(["Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Verbs", "d3dx9"]);
include(["Functions", "Verbs", "crypt32"]);

new SteamScript()
    .name("Assassin’s Creed® Brotherhood")
    .editor("UbiSoft")
    .author("Quentin PARIS")
    .appId(48190)
    .preInstall(function(wine) {
        wine.crypt32();
        wine.d3dx9();
    })
    .go();
