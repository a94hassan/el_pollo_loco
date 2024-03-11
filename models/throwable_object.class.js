/**
 * Represents a throwable object that extends MovableObject.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * Indicates if the object has hit an enemy.
     * @type {boolean}
     * @default false
     */
    hitEnemy = false;

    /**
     * The world object where the throwable object exists.
     * @type {Object}
     */
    world;

    /**
     * Array of image paths representing bottle rotation animation.
     * @type {string[]}
     */
    bottleRotationImages = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of image paths representing bottle splash animation.
     * @type {string[]}
     */
    bottleSplashImages = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Constructs a new ThrowableObject.
     * @param {number} x - The initial X position of the object.
     * @param {number} y - The initial Y position of the object.
     * @param {Object} world - The world object where the throwable object exists.
     */
    constructor(x, y, world) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.bottleRotationImages);
        this.loadImages(this.bottleSplashImages);
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.world = world;
        this.throw();
        this.animateRotation();
    }

    /**
     * Throws the throwable object.
     */
    throw() {
        this.speedY = 25;
        this.applyGravity();
        let isOtherDirection = this.world.character.otherDirection;
        let xGrowthIntervalId = setInterval(() => {
            this.xGrowthDirectionUpdate(isOtherDirection);
            if (this.hitGround() || this.hitEnemy) {
                this.speedY = 0;
                this.acceleration = 0;
                clearInterval(xGrowthIntervalId);
            }
        }, 25);
        intervalIds.push(xGrowthIntervalId);
    }

    /**
     * Animates the rotation of the throwable object.
     */
    animateRotation() {
        let bottleAnimationIntervalId = setInterval(() => {
            if (this.hitGround() || this.hitEnemy) {
                this.animateSplash();
                clearInterval(bottleAnimationIntervalId);
            } else {
                this.playAnimation(this.bottleRotationImages);
            }
        }, 100);
        intervalIds.push(bottleAnimationIntervalId);
    }

    /**
     * Animates the splash effect of the throwable object.
     */
    animateSplash() {
        let splashIntervalId = setInterval(() => {
                this.playAnimation(this.bottleSplashImages);
        }, 100);
        setTimeout(() => {clearInterval(splashIntervalId);}, 300);
    }

    /**
     * Checks if the throwable object has hit the ground.
     * @returns {boolean} True if the object has hit the ground, false otherwise.
     */
    hitGround() {
        return this.y > 350;
    }

    /**
     * Updates the X position of the throwable object based on the character's direction.
     * @param {boolean} isOtherDirection - Indicates if the character is facing the other direction.
     */
    xGrowthDirectionUpdate(isOtherDirection) {
        if (isOtherDirection === false) {
            return this.x += 10;
        } else if (isOtherDirection === true) {
            return this.x -= 10;
        }
    }
}
