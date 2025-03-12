let keyboard = new Keyboard();
const keyMap = {
    39: 'RIGHT',
    37: 'LEFT',
    38: 'UP',
    40: 'DOWN',
    32: 'SPACE'
};
const homeButton = document.getElementById('button-home');
homeButton.addEventListener('touchstart', handleTouchStart);
homeButton.addEventListener('click', handleClick);
homeButton.addEventListener('touchend', () => setTimeout(() => isTouch = false, 300));

homeButton.addEventListener('click', () => {
    world.character.energy = 0;
    world.level.win = false;
})

function canMoveRight() {
    let lastEnemy = world.level.enemies[world.level.enemies.length - 1];
    if (lastEnemy) {
        return world.character.x < lastEnemy.x + lastEnemy.width;
    }
 
}

window.addEventListener('keydown', (event) => {
    if (!world.keyboardActive) return;
    let key = keyMap[event.keyCode];
    if (key === 'RIGHT' && !canMoveRight()) return;
    if (key) keyboard[key] = true;
});

window.addEventListener('keyup', (event) => {
    if (!world.keyboardActive) return;
    let key = keyMap[event.keyCode];
    if (key) keyboard[key] = false;
});

function addTouchEvent(id, key) {
    let button = document.getElementById(id);
    if (!button) return;
    button.addEventListener('touchstart', (event) => {
        if (!world.keyboardActive) return;
        event.preventDefault();
        if (key === 'RIGHT' && !canMoveRight()) return; 
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

addTouchEvent('button-throw', 'SPACE');
addTouchEvent('button-jump', 'UP');
addTouchEvent('button-left', 'LEFT');
addTouchEvent('button-right', 'RIGHT');