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

function updateCanvasHeight() {
    document.documentElement.style.setProperty('--real-vh', `${window.innerHeight}px`);
}

// Höhe beim Laden setzen
updateCanvasHeight();

// Höhe bei Änderungen (z. B. Rotation) anpassen
window.addEventListener('resize', updateCanvasHeight);


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

function soundOff() {
    soundButton.classList.add('muted'); 
    document.getElementById('button-sound-img').src = 'img/buttons/icons8-kein-ton-50 (1).png';
    document.querySelectorAll('audio').forEach(audio => {
        audio.muted = true;
    });
}

function soundOn() {
    soundButton.classList.remove('muted');
    document.getElementById('button-sound-img').src = 'img/buttons/icons8-hohe-lautstärke-50 (2).png';
    document.querySelectorAll('audio').forEach(audio => {
        audio.muted = false;
    });
}

getSoundState();

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

function showStartScreen() {
    document.getElementById('overlay-start').style.display = 'block';
    document.getElementById('button-home').style.display = 'none';
    setTimeout(() => {
        checkOpenLevel();
    }, 2000)
}

function checkOpenLevel() {
    let level1Open = JSON.parse(localStorage.getItem('polloLevel1Open'));
    let level2Open = JSON.parse(localStorage.getItem('polloLevel2Open'));
    let level3Open = JSON.parse(localStorage.getItem('polloLevel3Open'));
    if (level1Open == true) {
        document.getElementById('level-1-button').classList.remove('level-closed');
    }
    setTimeout(() => {
        if (level2Open == true) {
            document.getElementById('level-2-button').classList.remove('level-closed');
        }
    },300)
    setTimeout(() => {
        if (level3Open == true) {
            document.getElementById('level-3-button').classList.remove('level-closed');
        }
    },600)
} 

function hideStartScreen() {
    document.getElementById('overlay-start').style.display = 'none';
    document.getElementById('level-1-button').classList.add('level-closed');
    document.getElementById('button-home').style.display = 'flex';
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

infoButton.addEventListener('click', handleInfoButtonToggle);
soundButton.addEventListener('click', handleClick);
screenButton.addEventListener('click', handleClick);

soundButton.addEventListener('touchend', () => setTimeout(() => isTouch = false, 300));
screenButton.addEventListener('touchend', () => setTimeout(() => isTouch = false, 300));


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
    // console.log(level);
    
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
    // console.log(level);
    
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
        if (enemy instanceof ChickenSmall) {
           
            enemy.fallingChicken()
        }
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