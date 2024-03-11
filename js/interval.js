intervalIds = [];

/**
 * Sets up a stoppable interval that repeatedly calls a function at a specified time interval.
 * @param {Function} fn - The function to be called at each interval.
 * @param {number} time - The time interval (in milliseconds) at which the function should be called.
 * @returns {void}
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Stops all intervals created by `setStoppableInterval` and mutes all sounds in the game world.
 * @returns {void}
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
    world.muteAllSounds();
}
