// let keyboard = new Keyboard();

// window.addEventListener('keydown', () => {
//     if(event.keyCode == 39) {
//         keyboard.RIGHT = true;
//     }
//     if(event.keyCode == 37) {
//         keyboard.LEFT = true;
//     }
//     if(event.keyCode == 38) {
//         keyboard.UP = true;
//     }
//     if(event.keyCode == 40) {
//         keyboard.DOWN = true;
//     }
//     if(event.keyCode == 32) {
//         keyboard.SPACE = true;
//     }
// }) 

// window.addEventListener('keyup', () => {
//     if(event.keyCode == 39) {
//         keyboard.RIGHT = false;
//     }
//     if(event.keyCode == 37) {
//         keyboard.LEFT = false;
//     }
//     if(event.keyCode == 38) {
//         keyboard.UP = false;
//     }
//     if(event.keyCode == 40) {
//         keyboard.DOWN = false;
//     }
//     if(event.keyCode == 32) {
//         keyboard.SPACE = false;
//     }
// }) 

// document.getElementById('button-throw').addEventListener('touchstart', () => {
//     event.preventDefault();
//     keyboard.SPACE = true;
// });
// document.getElementById('button-throw').addEventListener('touchend', () => {
//     event.preventDefault();
//     keyboard.SPACE = false;
// });
// document.getElementById('button-throw').addEventListener('touchcancel', () => {
//     event.preventDefault();
//     keyboard.SPACE = false;
// });

// document.getElementById('button-jump').addEventListener('touchstart', () => {
//     event.preventDefault();
//     keyboard.UP = true;
// });
// document.getElementById('button-jump').addEventListener('touchend', () => {
//     event.preventDefault();
//     keyboard.UP = false;
// });
// document.getElementById('button-jump').addEventListener('touchcancel', () => {
//     event.preventDefault();
//     keyboard.UP = false;
// });

// document.getElementById('button-left').addEventListener('touchstart', () => {
//     event.preventDefault();
//     keyboard.LEFT = true;

// });
// document.getElementById('button-left').addEventListener('touchend', () => {
//     event.preventDefault();
//     keyboard.LEFT = false;
// });
// document.getElementById('button-left').addEventListener('touchcancel', () => {
//     event.preventDefault();
//     keyboard.LEFT = false;
// });

// document.getElementById('button-right').addEventListener('touchstart', () => {
//     event.preventDefault();
//     keyboard.RIGHT = true;
// });
// document.getElementById('button-right').addEventListener('touchend', () => {
//     event.preventDefault();
//     keyboard.RIGHT = false;
// });
// document.getElementById('button-right').addEventListener('touchcancel', () => {
//     event.preventDefault();
//     keyboard.RIGHT = false;
// });

let keyboard = new Keyboard();

// Map für Tastencodes
const keyMap = {
    39: 'RIGHT',
    37: 'LEFT',
    38: 'UP',
    40: 'DOWN',
    32: 'SPACE'
};

// Keydown-Listener (Tasten gedrückt)
window.addEventListener('keydown', (event) => {
    if (!world.keyboardActive) return; // Eingaben blockieren, wenn das Spiel vorbei ist

    let key = keyMap[event.keyCode];
    if (key) keyboard[key] = true;
});

// Keyup-Listener (Tasten losgelassen)
window.addEventListener('keyup', (event) => {
    if (!world.keyboardActive) return;

    let key = keyMap[event.keyCode];
    if (key) keyboard[key] = false;
});

// Funktion für Touch-Events
function addTouchEvent(id, key) {
    let button = document.getElementById(id);
    if (!button) return;

    button.addEventListener('touchstart', (event) => {
        if (!world.keyboardActive) return;
        event.preventDefault();
        keyboard[key] = true;
    });

    button.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard[key] = false;
    });

    button.addEventListener('touchcancel', (event) => {
        event.preventDefault();
        keyboard[key] = false;
    });
}

// Touch-Buttons mit Event-Listenern versehen
addTouchEvent('button-throw', 'SPACE');
addTouchEvent('button-jump', 'UP');
addTouchEvent('button-left', 'LEFT');
addTouchEvent('button-right', 'RIGHT');