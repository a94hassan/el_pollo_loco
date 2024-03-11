/**
 * Represents a game level containing various elements such as enemies, items, and background objects.
 */
class Level {
    /**
     * Array of enemies in the level.
     * @type {Array<MovableObject>}
     */
    enemies;

    /**
     * Array of bottles in the level.
     * @type {Array<MovableObject>}
     */
    bottles;

    /**
     * Array of coins in the level.
     * @type {Array<MovableObject>}
     */
    coins;

    /**
     * Array of clouds in the level.
     * @type {Array<MovableObject>}
     */
    clouds;

    /**
     * Array of background objects in the level.
     * @type {Array<BackgroundObject>}
     */
    backgroundObjects;

    /**
     * The x-coordinate at which the level ends.
     * @type {number}
     */
    levelEndX = 3600;

    /**
     * Creates a new Level object.
     * @param {Array<MovableObject>} enemies - Array of enemies to be placed in the level.
     * @param {Array<MovableObject>} bottles - Array of bottles to be placed in the level.
     * @param {Array<MovableObject>} coins - Array of coins to be placed in the level.
     * @param {Array<MovableObject>} clouds - Array of clouds to be placed in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - Array of background objects to be placed in the level.
     */
    constructor(enemies, bottles, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
