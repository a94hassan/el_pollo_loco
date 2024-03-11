/**
 * Represents a cloud object in the game, extending from the MovableObject class.
 */
class Cloud extends MovableObject {
    /**
     * The y-coordinate of the cloud.
     * @type {number}
     */
    y = 20;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 400;

    /**
     * Array containing paths to images representing different cloud sprites.
     * @type {string[]}
     */
    cloudImages = [
        './img/5_background/layers/4_clouds/1.png',
        './img/5_background/layers/4_clouds/2.png'
    ];
    
    /**
         * Constructs a new Cloud instance.
         * @param {number} x - The x-coordinate of the cloud.
         */
    constructor(x) {
        super();
        this.loadImages(this.cloudImages);
        this.loadImage(this.getRandomImagePath());
        this.x = x;
        this.animate();
    }

    /**
     * Initiates cloud animation.
     * @returns {void}
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Retrieves a random image path from the cloudImages array.
     * @returns {string} A randomly selected image path.
     */
    getRandomImagePath() {
        let randomIndex = Math.floor(Math.random() * this.cloudImages.length)
        return this.cloudImages[randomIndex];
    }
}