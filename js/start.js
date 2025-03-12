let skriptsLoaded = false;
let canvas;
let world;
let isTouch = false;
const infoButton = document.getElementById('button-openinfo');
const soundButton = document.getElementById('button-sound');
const screenButton = document.getElementById('button-screen');
const homeButton = document.getElementById('button-home');
let soundMuted = JSON.parse(localStorage.getItem('soundMuted')) || false;


// Event-Listener für den Button
soundButton.addEventListener('click', () => {
    if (soundMuted) {
        soundMuted = false;
        localStorage.setItem('soundMuted', JSON.stringify(false));
    } else {
        soundMuted = true;
        localStorage.setItem('soundMuted', JSON.stringify(true));
    }
    
    updateSoundState();
});

// Funktion zum Aktualisieren des Sound-Zustands
function updateSoundState() {
    console.log('soundMuted', soundMuted);
    
    let allSounds = document.querySelectorAll('audio');

    if (soundMuted) {
        allSounds.forEach(sound => sound.muted = true);
        soundButton.classList.add('muted'); // Optional: Button-Styling ändern
        document.getElementById('button-sound-img').src = 'img/buttons/icons8-kein-ton-50 (1).png';
    } else {
        allSounds.forEach(sound => sound.muted = false);
        soundButton.classList.remove('muted');
          document.getElementById('button-sound-img').src = 'img/buttons/icons8-hohe-lautstärke-50 (2).png';
    }
}

// Initialen Zustand aus dem Local Storage setzen
updateSoundState();

function showStartScreen() {
    document.getElementById('overlay-start').style.display = 'block';
}
function hideStartScreen() {
    document.getElementById('overlay-start').style.display = 'none';
}

function handleTouchStart() {
    isTouch = true;
}

function handleClick(event) {
    if (isTouch) {
        event.preventDefault();
        isTouch = false;
        return;
    }
}

soundButton.addEventListener('touchstart', handleTouchStart);
screenButton.addEventListener('touchstart', handleTouchStart);
homeButton.addEventListener('touchstart', handleTouchStart);

infoButton.addEventListener('click', handleInfoButtonToggle);
soundButton.addEventListener('click', handleClick);
screenButton.addEventListener('click', handleClick);
homeButton.addEventListener('click', handleClick);

soundButton.addEventListener('touchend', () => setTimeout(() => isTouch = false, 300));
screenButton.addEventListener('touchend', () => setTimeout(() => isTouch = false, 300));
homeButton.addEventListener('touchend', () => setTimeout(() => isTouch = false, 300));

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

// function openMenu() {
//     console.log('openMenu erreicht');
//     if (document.getElementById('info-block').classList.contains('visible')) {
//         document.getElementById('info-block').classList.remove('visible');
//         document.getElementById('info-block').style.display = 'none';
//     } else {
//         document.getElementById('info-block').classList.add('visible');
//         document.getElementById('info-block').style.display = 'block';
//     }
// }

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
    document.getElementById('overlay-start').style.display = 'none';
    loadGameScripts().then(() => {
        init(level1);
    });
});

document.getElementById("button-screen").addEventListener("click", toggleFullscreen);
document.getElementById("button-screen").addEventListener("touchstart", toggleFullscreen);

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
    if (document.getElementById('info-block').classList.contains('visible')) {
        document.getElementById('info-block').classList.remove('visible');
        document.getElementById('info-block').style.display = 'none';
    }
    canvas = document.getElementById('canvas');
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