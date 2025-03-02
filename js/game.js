let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('my character is: ', world.character);
    
}

document.getElementById('button-openmenu').addEventListener('click', openMenu)

function openMenu() {
    console.log('openMenu erreicht');
    if (document.getElementById('button-openmenu').classList.contains('closed')) {
        document.getElementById('button-openmenu').classList.remove('closed');
        document.getElementById('info-line').style.width = 'fit-content';
        document.getElementById('more-buttons').style.width = 'fit-content';
        document.getElementById('info-line').style.visibility = 'visible';
        document.getElementById('more-buttons').style.visibility = 'visible';
    } else {
        document.getElementById('button-openmenu').classList.add('closed');
        document.getElementById('info-line').style.width = '0px';
        document.getElementById('more-buttons').style.width = '0px';
        document.getElementById('info-line').style.visibility = 'hidden';
        document.getElementById('more-buttons').style.visibility = 'hidden';
    }
}

window.addEventListener('keydown', () => {
    if(event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(event.keyCode == 38) {
        keyboard.UP = true;
    }
    if(event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    // if(event.keyCode == 68) {
    //     keyboard.D = true;
    // }
}) 

window.addEventListener('keyup', () => {
    // console.log(event);
    if(event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(event.keyCode == 38) {
        keyboard.UP = false;
    }
    if(event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    // if(event.keyCode == 68) {
    //     keyboard.D = false;
    // }
}) 

document.getElementById('button-throw').addEventListener('touchstart', () => {
    event.preventDefault();
    keyboard.SPACE = true;
});
document.getElementById('button-throw').addEventListener('touchend', () => {
    event.preventDefault();
    keyboard.SPACE = false;
});
document.getElementById('button-throw').addEventListener('touchcancel', () => {
    event.preventDefault();
    keyboard.SPACE = false;
});

document.getElementById('button-jump').addEventListener('touchstart', () => {
    event.preventDefault();
    keyboard.UP = true;
});
document.getElementById('button-jump').addEventListener('touchend', () => {
    event.preventDefault();
    keyboard.UP = false;
});
document.getElementById('button-jump').addEventListener('touchcancel', () => {
    event.preventDefault();
    keyboard.UP = false;
});

document.getElementById('button-left').addEventListener('touchstart', () => {
    event.preventDefault();
    keyboard.LEFT = true;

});
document.getElementById('button-left').addEventListener('touchend', () => {
    event.preventDefault();
    keyboard.LEFT = false;
});
document.getElementById('button-left').addEventListener('touchcancel', () => {
    event.preventDefault();
    keyboard.LEFT = false;
});

document.getElementById('button-right').addEventListener('touchstart', () => {
    event.preventDefault();
    keyboard.RIGHT = true;
});
document.getElementById('button-right').addEventListener('touchend', () => {
    event.preventDefault();
    keyboard.RIGHT = false;
});
document.getElementById('button-right').addEventListener('touchcancel', () => {
    event.preventDefault();
    keyboard.RIGHT = false;
});

document.getElementById('button-home').addEventListener('touchstart', () => {
    console.log('home');
});
document.getElementById('button-home').addEventListener('touchend', () => {
    console.log('home end');
});

document.getElementById('button-screen').addEventListener('touchstart', () => {
    console.log('screen');
});
document.getElementById('button-screen').addEventListener('touchend', () => {
    console.log('screen end');
});

document.getElementById('button-sound').addEventListener('touchstart', () => {
    console.log('sound');
});
document.getElementById('button-sound').addEventListener('touchend', () => {
    console.log('sound end');
});