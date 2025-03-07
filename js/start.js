let skriptsLoaded = false;

function showStartScreen() {
    document.getElementById('overlay-start').style.display = 'block';
}

document.getElementById('level-1-button').addEventListener('click', function () {
    document.getElementById('overlay-start').style.display = 'none';
    loadGameScripts().then(() => {
        init(level1);
    });
});

async function loadGameScripts() {
    if (skriptsLoaded == false) {
        const scripts = [
            "./models/drawable-object.class.js",
            "./models/statusbar-health.class.js",
            "./models/statusbar-bottle.class.js",
            "./models/statusbar-coin.class.js",
            "./models/statusbar-endboss.class.js",
            "./models/movable-object.class.js",
            "./models/throwable-object.class.js",
            "./models/collectable-bottle.class.js",
            "./models/collectable-coin.class.js",
            "./models/character.class.js",
            "./models/chicken.class.js",
            "./models/chicken-small.class.js",
            "./models/cloud.class.js",
            "./models/background-object.class.js",
            "./models/endboss.class.js",
            "./models/level.class.js", // <--- Level-Klasse kommt vor level1.js!
            "./levels/level1.js",
            "./models/world.class.js",
            "./models/keyboard.class.js",
            "./js/game.js"
        ];
    
        for (const src of scripts) {
            await loadScript(src);
        }
        return skriptsLoaded = true;
    }
   
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(`Fehler beim Laden von ${src}`);
        document.body.appendChild(script);
    });
}
