/**
 * Represents a background object in the game, extending from the MovableObject class.
 */
class BackgroundObject extends MovableObject {
    /**
     * Width of the background object.
     * @type {number}
     */
    width = 1440;
    
    /**
     * Height of the background object.
     * @type {number}
     */
    height = 480;

        /**
     * Constructs a new BackgroundObject instance.
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}