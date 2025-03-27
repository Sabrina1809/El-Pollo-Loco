let skriptsLoaded = false;
let canvas;
let world;
let isTouch = false;
const infoButton = document.getElementById('button-openinfo');
const soundButton = document.getElementById('button-sound');
const screenButton = document.getElementById('button-screen');
let soundMuted = JSON.parse(localStorage.getItem('polloLocoMuted'));
localStorage.setItem('polloLevel1Open', JSON.stringify(true));
localStorage.setItem('polloLevelActive', JSON.stringify(null));

/**
 * Checks the screen orientation and shows or hides the rotate overlay.
 */
function checkOrientation() {
    let overlayRotate = document.getElementById('overlay-rotate');
    if (window.matchMedia("(orientation: portrait)").matches) {
        overlayRotate.style.display = 'flex';
    } else {
        overlayRotate.style.display = 'none';
    }
}

checkOrientation();

window.addEventListener('resize', checkOrientation);

/**
 * Updates the CSS variable '--real-vh' to match the current window height.
 */
function updateCanvasHeight() {
    document.documentElement.style.setProperty('--real-vh', `${window.innerHeight}px`);
}

updateCanvasHeight();

window.addEventListener('resize', updateCanvasHeight);

/**
 * Initializes sound settings based on local storage and applies the corresponding sound state.
 */
function getSoundState() {
    if (soundMuted == null ) {
        localStorage.setItem('polloLocoMuted', JSON.stringify(true));
    }
    soundMuted = JSON.parse(localStorage.getItem('polloLocoMuted'));
    if (soundMuted) {
        soundOff();
    } else {
        soundOn();
    }
}

/**
 * Mutes all audio elements and updates the sound button UI.
 */
function soundOff() {
    soundButton.classList.add('muted'); 
    document.getElementById('button-sound-img').src = 'img/buttons/icons8-kein-ton-50 (1).png';
    document.querySelectorAll('audio').forEach(audio => {
        audio.muted = true;
    });
}

/**
 * Unmutes all audio elements and updates the sound button UI.
 */
function soundOn() {
    soundButton.classList.remove('muted');
    document.getElementById('button-sound-img').src = 'img/buttons/icons8-hohe-lautstärke-50 (2).png';
    document.querySelectorAll('audio').forEach(audio => {
        audio.muted = false;
    });
}

getSoundState();

/**
 * Toggles the sound state (muted/unmuted) and updates the UI and local storage.
 */
function soundOnOff() {
    soundMuted = !soundMuted;
    localStorage.setItem('polloLocoMuted', JSON.stringify(soundMuted));
    document.getElementById('button-sound-img').src = soundMuted
        ? 'img/buttons/icons8-kein-ton-50 (1).png'
        : 'img/buttons/icons8-hohe-lautstärke-50 (2).png';
    soundButton.classList.toggle('muted', soundMuted);
    document.querySelectorAll('audio').forEach(audio => {
        audio.muted = soundMuted;
    });
}

/**
 * Displays the start screen overlay and hides the home button, then checks the open level after 2 seconds.
 */
function showStartScreen() {
    document.getElementById('overlay-start').style.display = 'block';
    document.getElementById('button-home').style.display = 'none';
    setTimeout(() => {
        checkOpenLevel();
    }, 2000)
}

/**
 * Checks the open levels from local storage and removes the "level-closed" class for unlocked levels.
 */
function checkOpenLevel() {
    if (JSON.parse(localStorage.getItem('polloLevel1Open')) == true) {
        document.getElementById('level-1-button').classList.remove('level-closed');
    }
    setTimeout(() => {
        if (JSON.parse(localStorage.getItem('polloLevel2Open')) == true) {
            document.getElementById('level-2-button').classList.remove('level-closed');
        }
    },300)
    setTimeout(() => {
        if (JSON.parse(localStorage.getItem('polloLevel3Open')) == true) {
            document.getElementById('level-3-button').classList.remove('level-closed');
        }
    },600)
} 

/**
 * Hides the start screen and resets the visibility and state of buttons.
 */
function hideStartScreen() {
    document.getElementById('overlay-start').style.display = 'none';
    document.getElementById('level-1-button').classList.add('level-closed');
    document.getElementById('button-home').style.display = 'flex';
}

/**
 * Sets the isTouch flag to true when a touch event starts.
 */
function handleTouchStart() {
    isTouch = true;
}

/**
 * Prevents default behavior on click event if a touch event was previously detected.
 * Resets the isTouch flag to false.
 * @param {Event} event - The click event.
 */
function handleClick(event) {
    if (isTouch) {
        event.preventDefault();
        isTouch = false;
        return;
    }
}

soundButton.addEventListener('touchstart', handleTouchStart);
screenButton.addEventListener('touchstart', handleTouchStart);

infoButton.addEventListener('click', handleInfoButtonToggle);
soundButton.addEventListener('click', handleClick);
screenButton.addEventListener('click', handleClick);

soundButton.addEventListener('touchend', () => setTimeout(() => isTouch = false, 300));
screenButton.addEventListener('touchend', () => setTimeout(() => isTouch = false, 300));

/**
 * Toggles the visibility of the info block.
 * Adds or removes the 'visible' class and updates the display style.
 */
function handleInfoButtonToggle() {
    const infoBlock = document.getElementById('info-block');
    if (infoBlock.classList.contains('visible')) {
        infoBlock.classList.remove('visible');
        infoBlock.style.display = 'none';
    } else {
        infoBlock.classList.add('visible');
        infoBlock.style.display = 'block';
        isTouch = true;
    }
}

/**
 * Toggles the visibility of a description element and rotates the associated arrow.
 * @param {string} descriptionID - The ID of the description element.
 * @param {string} arrowID - The ID of the arrow element to rotate.
 */
function openInfoDescription(descriptionID, arrowID) {
    let descrElement = document.getElementById(descriptionID);
    let arrowElement = document.getElementById(arrowID);
    if (descrElement.classList.contains('descr-visible')) {
        descrElement.classList.remove('descr-visible');
        descrElement.style.display = 'none';
        arrowElement.style.transform = 'rotate(0deg)';
    } else {
        descrElement.classList.add('descr-visible');
        descrElement.style.display = 'flex';
        arrowElement.style.transform = 'rotate(180deg)';
    }
}

document.getElementById('level-1-button').addEventListener('click', function () {
    localStorage.setItem('polloLevelActive', JSON.stringify(1));
    document.getElementById('overlay-start').style.display = 'none';
    document.getElementById('level-1-button').classList.add('level-closed');
    loadGameScripts().then(() => {
        init(level1);
    });
});

document.getElementById('level-2-button').addEventListener('click', function () {
    localStorage.setItem('polloLevelActive', JSON.stringify(2));
    document.getElementById('overlay-start').style.display = 'none';
    document.getElementById('level-2-button').classList.add('level-closed');
    loadGameScripts().then(() => {
        init(level2);
    });
});

document.getElementById('level-3-button').addEventListener('click', function () {
    localStorage.setItem('polloLevelActive', JSON.stringify(3));
    document.getElementById('overlay-start').style.display = 'none';
    document.getElementById('level-3-button').classList.add('level-closed');
    loadGameScripts().then(() => {
        init(level3);
    });
});

document.getElementById("button-screen").addEventListener("click", toggleFullscreen);
document.getElementById("button-screen").addEventListener("touchstart", toggleFullscreen);

/**
 * Toggles between fullscreen and normal screen modes.
 * Updates fullscreen button images based on the current screen state.
 */
function toggleFullscreen() {
    let fullscreenElement = document.getElementById("fullscreen");
    if (!document.fullscreenElement) {
        document.getElementById('img-fullscreen').style.display = 'none';
        document.getElementById('img-smallscreen').style.display = 'block';
        if (fullscreenElement.requestFullscreen) {
            fullscreenElement.requestFullscreen();
        } else if (fullscreenElement.mozRequestFullScreen) { // Firefox
            fullscreenElement.mozRequestFullScreen();
        } else if (fullscreenElement.webkitRequestFullscreen) { // Chrome, Safari, Edge
            fullscreenElement.webkitRequestFullscreen();
        } else if (fullscreenElement.msRequestFullscreen) { // IE/Edge
            fullscreenElement.msRequestFullscreen();
        }
    } else {
        document.getElementById('img-fullscreen').style.display = 'block';
        document.getElementById('img-smallscreen').style.display = 'none';
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

/**
 * Loads game scripts asynchronously.
 * Loads a series of JavaScript files required for the game to function.
 * Sets `skriptsLoaded` to `true` after all scripts have been loaded.
 */
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
            "./models/level.class.js",
            "./levels/level1.js",
            "./levels/level2.js",
            "./levels/level3.js",
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

/**
 * Loads a script asynchronously.
 * Creates a new <script> element, sets the source, and appends it to the document.
 * Resolves the promise once the script has loaded, or rejects if there is an error.
 * 
 * @param {string} src - The source URL of the script to load.
 * @returns {Promise} - Resolves when the script is loaded, rejects if loading fails.
 */
function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(`Fehler beim Laden von ${src}`);
        document.body.appendChild(script);
    });
}

/**
 * Initializes the game level by setting up the world, character, and level elements.
 * Hides the info block, shows the home button, and checks win/loss conditions.
 * 
 * @param {Object} level - The current level to initialize.
 */
function init(level) {
    if (document.getElementById('info-block').classList.contains('visible')) {
        document.getElementById('info-block').classList.remove('visible');
        document.getElementById('info-block').style.display = 'none';
    }
    document.getElementById('button-home').style.display = 'flex';
    canvas = document.getElementById('canvas');
    level.enemies = checkEnemies(level);
    level.collectableObjects = checkCollObj(level);
    level.win = undefined;
    world = new World(canvas, keyboard, level);
    level.world = world; 
    world.character.energy = 100;
    world.character.lastHit = 0;
    world.level.win = undefined;
    level.checkWinOrLoose();
}

/**
 * Checks and resets the enemies in the level, including special handling for small chickens.
 * 
 * @param {Object} level - The current level to check for enemies.
 * @returns {Array} - The updated list of enemies.
 */
function checkEnemies(level) {
    if(level.copyOfEnemies.length == 0) {
        level.enemies.forEach(enemy => {
            level.copyOfEnemies.push(enemy)
        });    
    }
    level.enemies = [];
    level.copyOfEnemies.forEach(enemy => {
        level.enemies.push(enemy)
        if (enemy instanceof ChickenSmall) {
            enemy.fallingChicken()
        }
    })
    return level.enemies
} 

/**
 * Checks and resets the collectable objects in the level.
 * 
 * @param {Object} level - The current level to check for collectable objects.
 * @returns {Array} - The updated list of collectable objects.
 */
function checkCollObj(level) {
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