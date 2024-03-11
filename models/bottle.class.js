/**
 * Represents a bottle object in the game, extending from the MovableObject class.
 */
class Bottle extends MovableObject {
    /**
     * The x-coordinate of the bottle object.
     * @type {number}
     */
    x = 360 + Math.random() * 3000;

    /**
     * The y-coordinate of the bottle object.
     * @type {number}
     */
    y = 350;

    /**
     * The width of the bottle object.
     * @type {number}
     */
    width = 100;

    /**
     * The height of the bottle object.
     * @type {number}
     */
    height = 100;

    /**
     * Offset values for collision detection.
     * @type {object}
     */
    offset = {
        top: 20,
        left: 40,
        right: 40,
        bottom: 20
    };

    /**
     * Array containing paths to images representing different states of the bottle.
     * @type {string[]}
     */
    bottleImages = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    /**
     * Constructs a new Bottle instance.
     */
    constructor() {
        super();
        this.loadImages(this.bottleImages);
        this.loadImage(this.getRandomImagePath());
    }

    /**
     * Retrieves a random image path from the bottleImages array.
     * @returns {string} A randomly selected image path.
     */
    getRandomImagePath() {
        let randomIndex = Math.floor(Math.random() * this.bottleImages.length)
        return this.bottleImages[randomIndex];
    }
}