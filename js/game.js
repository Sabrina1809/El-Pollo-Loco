// let keyboard = new Keyboard();

// // Map für Tastencodes
// const keyMap = {
//     39: 'RIGHT',
//     37: 'LEFT',
//     38: 'UP',
//     40: 'DOWN',
//     32: 'SPACE'
// };

// // Keydown-Listener (Tasten gedrückt)
// window.addEventListener('keydown', (event) => {
//     if (!world.keyboardActive) return; // Eingaben blockieren, wenn das Spiel vorbei ist

//     let key = keyMap[event.keyCode];
//     if (key) keyboard[key] = true;
// });

// // Keyup-Listener (Tasten losgelassen)
// window.addEventListener('keyup', (event) => {
//     if (!world.keyboardActive) return;

//     let key = keyMap[event.keyCode];
//     if (key) keyboard[key] = false;
// });

// // Funktion für Touch-Events
// function addTouchEvent(id, key) {
//     let button = document.getElementById(id);
//     if (!button) return;

//     button.addEventListener('touchstart', (event) => {
//         if (!world.keyboardActive) return;
//         event.preventDefault();
//         keyboard[key] = true;
//     });

//     button.addEventListener('touchend', (event) => {
//         event.preventDefault();
//         keyboard[key] = false;
//     });

//     button.addEventListener('touchcancel', (event) => {
//         event.preventDefault();
//         keyboard[key] = false;
//     });
// }

// // Touch-Buttons mit Event-Listenern versehen
// addTouchEvent('button-throw', 'SPACE');
// addTouchEvent('button-jump', 'UP');
// addTouchEvent('button-left', 'LEFT');
// addTouchEvent('button-right', 'RIGHT');

let keyboard = new Keyboard();

// Map für Tastencodes
const keyMap = {
    39: 'RIGHT',
    37: 'LEFT',
    38: 'UP',
    40: 'DOWN',
    32: 'SPACE'
};

// Prüfen, ob der Charakter sich vor dem Endgegner befindet
function canMoveRight() {
    // if (!world.level || world.level.enemies.length === 0) return true; // Falls kein Gegner vorhanden ist

    let lastEnemy = world.level.enemies[world.level.enemies.length - 1]; // Letzter Gegner (Endgegner)
    return world.character.x < lastEnemy.x + lastEnemy.width; // Bewegung nach rechts nur erlaubt, wenn der Charakter noch vor dem Gegner ist
}

// Keydown-Listener (Tasten gedrückt)
window.addEventListener('keydown', (event) => {
    if (!world.keyboardActive) return; // Eingaben blockieren, wenn das Spiel vorbei ist

    let key = keyMap[event.keyCode];

    if (key === 'RIGHT' && !canMoveRight()) return; // Rechtsbewegung blockieren, wenn der Endgegner erreicht wurde

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

        if (key === 'RIGHT' && !canMoveRight()) return; // Rechtsbewegung blockieren

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
