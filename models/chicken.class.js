/**
 * Represents a chicken enemy in the game, extending from the MovableObject class.
 */
class Chicken extends MovableObject {
    /**
     * The x-coordinate of the chicken.
     * @type {number}
     */
    x = 720 + Math.random() * 2400;

    /**
     * The y-coordinate of the chicken.
     * @type {number}
     */
    y = 360;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 80;

    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 80;

    /**
     * The speed of the chicken.
     * @type {number}
     */
    speed = 0.1 + Math.random() * 1;

    /**
     * Index for animation.
     * @type {number}
     */
    i = 0;

    /**
     * Array containing paths to images representing walking animation.
     * @type {string[]}
     */
    walkingImages = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Constructs a new Chicken instance.
     */
    constructor() {
        super().loadImage(this.walkingImages[0]);
        this.loadImages(this.walkingImages);
        this.applyGravity();
        this.animate();
    }

    /**
     * Initiates chicken animation.
     * @returns {void}
     */
    animate() {
        let moveIntervalId = setInterval(() => this.moveChicken(moveIntervalId), 1000 / 60);
        intervalIds.push(moveIntervalId);
        let animationIntervalId = setInterval(() => this.playChicken(animationIntervalId), 100);
        intervalIds.push(animationIntervalId);
    }

    /**
     * Moves the chicken.
     * @param {number} moveIntervalId - The interval ID for moving the chicken.
     * @returns {void}
     */
    moveChicken(moveIntervalId) {
        if (this.isDead()) {
            clearInterval(moveIntervalId);
        } else {
        this.moveLeft();
        }
    }

    /**
     * Plays chicken animation.
     * @param {number} animationIntervalId - The interval ID for playing the chicken animation.
     * @returns {void}
     */
    playChicken(animationIntervalId) {
        if (this.isDead()) {
            clearInterval(animationIntervalId);
            this.loadImage('./img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        } else {
        this.playAnimation(this.walkingImages);
        if (!this.isAboveGround() && this.i > 80 + Math.random() * 10) {
            this.jump();
            this.i = 0;
        }
        this.i++;
        }
    }
}