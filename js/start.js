let skriptsLoaded = false;
let canvas;
let world;

function showStartScreen() {
    document.getElementById('overlay-start').style.display = 'block';
}
function hideStartScreen() {
    document.getElementById('overlay-start').style.display = 'none';
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

function init(level) {
    canvas = document.getElementById('canvas');
    // console.log('Level vor checkEnemies & checkCollObj', level);
    level.enemies = checkEnemies(level);
    level.collectableObjects = checkCollObj(level);
    level.win = undefined;
   
    world = new World(canvas, keyboard, level);
    world.character.energy = 100;
    world.character.lastHit = 0;
    world.level.win = undefined;
    level.checkWinOrLoose();
}

function checkEnemies(level) {
    // console.log('Level vor Prüfung', level);
    if(level.copyOfEnemies.length == 0) {
        level.enemies.forEach(enemy => {
            level.copyOfEnemies.push(enemy)
        });    
    }
    level.enemies = [];
    level.copyOfEnemies.forEach(enemy => {
        level.enemies.push(enemy)
    })
    return level.enemies
} 

function checkCollObj(level) {
    // console.log('Level vor Prüfung', level);
    if(level.copyOfCollectableObjects.length == 0) {
        level.collectableObjects.forEach(collObj => {
            level.copyOfCollectableObjects.push(collObj)
        });    
    }
    level.collectableObjects = [];
    level.copyOfCollectableObjects.forEach(collObj => {
        level.collectableObjects.push(collObj)
    })
    return level.collectableObjects
}