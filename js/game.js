/**
 * Represents the game canvas.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Represents the game world.
 * @type {World}
 */
let world;

/**
 * Represents the keyboard input.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the canvas and world.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Handles keydown events to update keyboard state.
 * @param {KeyboardEvent} event - The keydown event.
 */
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

/**
 * Handles keyup events to update keyboard state.
 * @param {KeyboardEvent} event - The keyup event.
 */
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

/**
 * Opens the dialog box.
 */
function openDialog() {
    document.getElementById('dialog_bg').style.display = 'block';
    document.getElementById('dialog').style.display = 'flex';
}

/**
 * Closes the dialog box if the click is outside the dialog.
 * @param {MouseEvent} event - The mouse click event.
 */
function closeDialog(event) {
    if (event.target.id === 'dialog_bg') {
        document.getElementById('dialog_bg').style.display = 'none';
        document.getElementById('dialog').style.display = 'none';
    }
}

/**
 * Updates the dialog box to show privacy policy content.
 */
function updateDialogToPrivacyPolicy() {
    document.getElementById('dialog').style.display = 'none';
    document.getElementById('dialog_privacy_policy').style.display = 'flex';
}

/**
 * Updates the dialog box to show legal notice content.
 */
function updateDialogToLegalNotice() {
    document.getElementById('dialog').style.display = 'none';
    document.getElementById('dialog_legal_notice').style.display = 'flex';
}

/**
 * Resets the dialog box to default state.
 */
function resetDialog() {
    document.getElementById('dialog_privacy_policy').style.display = 'none';
    document.getElementById('dialog_legal_notice').style.display = 'none';
    document.getElementById('dialog').style.display = 'flex';
}

/**
 * Toggles sound on/off.
 */
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

/**
 * Enters fullscreen mode.
 * @param {HTMLElement} element - The HTML element to enter fullscreen mode.
 */
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

/**
 * Exits fullscreen mode.
 */
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

/**
 * Toggles fullscreen mode.
 */
function toggleFullscreen() {
    let screenControl = document.getElementById('screenControl');
    let element = document.getElementById('canvas');
    if (screenControl.checked) {  
        enterFullscreen(screenControl, element);
    } else {
        exitFullscreen(screenControl);
    }
}

/**
 * Handles changes in fullscreen mode and updates UI accordingly.
 */
document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        screenControl.checked = false;
    }
});

/**
 * Initializes touch events for mobile controls when the DOM content is fully loaded.
 */
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

/**
 * Sets up touch events for mobile controls.
 * @param {HTMLElement} element - The HTML element to set up touch events.
 * @param {Function} actionStart - The action to perform on touchstart.
 * @param {Function} actionEnd - The action to perform on touchend.
 */
function setupTouchEvent(element, actionStart, actionEnd) {
    element.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        actionStart();
    });

    element.addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        actionEnd();
    });
}

/**
 * Starts the game.
 */
function startGame() {
    document.getElementById('start_screen').style.display = 'none';
    document.getElementById('start_button').style.display = 'none';
    if (window.innerWidth > 932) {
        document.getElementById('settings_button').style.display = 'flex';
    }
    initLevel();
    init(); 
}

/**
 * Reloads the page.
 */
function reloadPage() {
    location.reload();
}