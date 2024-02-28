let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
        keyboard.LEFT = true;
    } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
        keyboard.RIGHT = true;
    } else if (event.code === 'ArrowUp' || event.code === 'KeyW') {
        keyboard.UP = true;
    } else if (event.code === 'ArrowDown' || event.code === 'KeyS') {
        keyboard.DOWN = true;
    } else if (event.code === 'Space') {
        keyboard.SPACE = true;
    }

    console.log(event.code);
});

window.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
        keyboard.LEFT = false;
    } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
        keyboard.RIGHT = false;
    } else if (event.code === 'ArrowUp' || event.code === 'KeyW') {
        keyboard.UP = false;
    } else if (event.code === 'ArrowDown' || event.code === 'KeyS') {
        keyboard.DOWN = false;
    } else if (event.code === 'Space') {
        keyboard.SPACE = false;
    }
});
