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

function openDialog() {
    document.getElementById('dialog_bg').style.display = 'block';
    document.getElementById('dialog').style.display = 'flex';
}

function closeDialog(event) {
    if (event.target.id === 'dialog_bg') {
        document.getElementById('dialog_bg').style.display = 'none';
        document.getElementById('dialog').style.display = 'none';
    }
}

function toggleSound() {
    let soundControl = document.getElementById('soundControl');
    if (soundControl.checked) {
        world.muteAllSounds();
        world.character.loseSound.muted = true;
        this.level.enemies.forEach(enemy => {if (enemy instanceof Endboss) {enemy.winSound.muted = true;}});
    } else {
        world.unmuteAllSounds();
        world.character.loseSound.muted = false;
        this.level.enemies.forEach(enemy => {if (enemy instanceof Endboss) {enemy.winSound.muted = false;}});
    }
}

function enterFullscreen(screenControl, element) {
    if (!document.fullscreenElement &&    
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
        screenControl.checked = true;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
}
  
function exitFullscreen(screenControl) {
    screenControl.checked = false;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleFullscreen() {
    let screenControl = document.getElementById('screenControl');
    let element = document.getElementById('canvas');
    if (screenControl.checked) {  
        enterFullscreen(screenControl, element);
    } else {
        exitFullscreen(screenControl);
    }
}

document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        screenControl.checked = false;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    let arrowLeftMobile = document.getElementById('arrow_left_mobile');
    let arrowRightMobile = document.getElementById('arrow_right_mobile');
    let arrowDownMobile = document.getElementById('arrow_down_mobile');
    let arrowUpMobile = document.getElementById('arrow_up_mobile');
    setupTouchEvent(arrowLeftMobile, () => { keyboard.LEFT = true; }, () => { keyboard.LEFT = false; });
    setupTouchEvent(arrowRightMobile, () => { keyboard.RIGHT = true; }, () => { keyboard.RIGHT = false; });
    setupTouchEvent(arrowDownMobile, () => { keyboard.DOWN = true; }, () => { keyboard.DOWN = false; });
    setupTouchEvent(arrowUpMobile, () => { keyboard.UP = true; }, () => { keyboard.UP = false; });
});

function setupTouchEvent(element, actionStart, actionEnd) {
    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        actionStart();
    });

    element.addEventListener('touchend', (e) => {
        e.preventDefault();
        actionEnd();
    });
}

function startGame() {
    document.getElementById('start_screen').style.display = 'none';
    document.getElementById('start_button').style.display = 'none';
    if (window.innerWidth > 932) {
        document.getElementById('settings_button').style.display = 'flex';
    }
    initLevel();
    init(); 
}

function reloadPage() {
    location.reload();
}

