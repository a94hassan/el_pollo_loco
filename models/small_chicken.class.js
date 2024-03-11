/**
 * Class representing a small chicken, extends MovableObject.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
    /**
     * The x-coordinate of the small chicken.
     * @type {number}
     */
    x = 720 + Math.random() * 2400;

    /**
     * The y-coordinate of the small chicken.
     * @type {number}
     */
    y = 360;

    /**
     * The width of the small chicken.
     * @type {number}
     */
    width = 80;

    /**
     * The height of the small chicken.
     * @type {number}
     */
    height = 80;
    
    /**
     * The speed of the small chicken.
     * @type {number}
     */
    speed = 0.1 + Math.random() * 1;

    /**
     * Counter for animation frames.
     * @type {number}
     */
    i = 0;

    /**
     * Array of walking images for the small chicken animation.
     * @type {Array<string>}
     */
    walkingImages = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Creates a new SmallChicken object.
     */
    constructor() {
        super().loadImage(this.walkingImages[0]);
        this.loadImages(this.walkingImages);
        this.applyGravity();
        this.animate();
    }

    /**
     * Initiates animation for the small chicken.
     */
    animate() {
        let moveIntervalId = setInterval(() => this.moveChicken(moveIntervalId), 1000 / 60);
        intervalIds.push(moveIntervalId);
        let animationIntervalId = setInterval(() => this.playChicken(animationIntervalId), 100);
        intervalIds.push(animationIntervalId);
    }

    /**
     * Moves the small chicken.
     * @param {number} moveIntervalId - The interval ID for movement animation.
     */
    moveChicken(moveIntervalId) {
        if (this.isDead()) {
            clearInterval(moveIntervalId);
        } else {
            this.moveLeft();
        }
    }

    /**
     * Plays the animation for the small chicken.
     * @param {number} animationIntervalId - The interval ID for animation.
     */
    playChicken(animationIntervalId) {
        if (this.isDead()) {
            clearInterval(animationIntervalId);
            this.loadImage('./img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        } else {
            this.playAnimation(this.walkingImages);
            if (!this.isAboveGround() && this.i > 20 + Math.random() * 10) {
                this.jump();
                this.i = 0;
            }
            this.i++;
        }
    }
}
