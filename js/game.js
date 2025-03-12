let keyboard = new Keyboard();

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
}) 

window.addEventListener('keyup', () => {
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