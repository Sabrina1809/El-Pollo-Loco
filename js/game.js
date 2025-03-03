let canvas;
let world;
let keyboard = new Keyboard();
let isTouch = false;
const infoButton = document.getElementById('button-openinfo');
const soundButton = document.getElementById('button-sound');
const screenButton = document.getElementById('button-screen');
const homeButton = document.getElementById('button-home');

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('my character is: ', world.character);
    
}



infoButton.addEventListener('touchstart', () => {
    isTouch = true;
});
soundButton.addEventListener('touchstart', () => {
    isTouch = true;
});
screenButton.addEventListener('touchstart', () => {
    isTouch = true;
});
homeButton.addEventListener('touchstart', () => {
    isTouch = true;
});


infoButton.addEventListener('click', (event) => {
    if (isTouch) {
        event.preventDefault();
        isTouch = false;
        return;
    }
    openMenu();
});
soundButton.addEventListener('click', (event) => {
    if (isTouch) {
        event.preventDefault();
        isTouch = false;
        return;
    };
});
screenButton.addEventListener('click', (event) => {
    if (isTouch) {
        event.preventDefault();
        isTouch = false;
        return;
    };
});
homeButton.addEventListener('click', (event) => {
    if (isTouch) {
        event.preventDefault();
        isTouch = false;
        return;
    };
});


infoButton.addEventListener('touchend', () => {
    openMenu();
});
soundButton.addEventListener('touchend', () => {
});
screenButton.addEventListener('touchend', () => {
});
homeButton.addEventListener('touchend', () => {
});

// document.getElementById('button-openinfo').addEventListener('click', openMenu);
// document.getElementById('button-openinfo').addEventListener('touchend', openMenu);

function openMenu() {
    console.log('openMenu erreicht');
    if (document.getElementById('info-block').classList.contains('visible')) {
        document.getElementById('info-block').classList.remove('visible');
        document.getElementById('info-block').style.display = 'none';
    } else {
        document.getElementById('info-block').classList.add('visible');
        document.getElementById('info-block').style.display = 'block';

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

// document.getElementById('button-home').addEventListener('touchend', () => {
//     console.log('home');
// });

// document.getElementById('button-screen').addEventListener('touchend', () => {
//     console.log('screen');
// });


// document.getElementById('button-sound').addEventListener('touchend', () => {
//     console.log('sound');
// });



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