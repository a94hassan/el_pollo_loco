/**
 * Represents a movable object that can be drawn on a canvas.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
     * Speed of the movable object.
     * @type {number}
     * @default 0.1
     */
    speed = 0.1;

    /**
     * Indicates whether the object is moving in another direction.
     * @type {boolean}
     * @default false
     */
    otherDirection = false;

    /**
     * Speed of the object in the vertical direction.
     * @type {number}
     * @default 0
     */
    speedY = 0;

    /**
     * Acceleration of the object.
     * @type {number}
     * @default 2.5
     */
    acceleration = 2.5;

    /**
     * Energy level of the object.
     * @type {number}
     * @default 100
     */
    energy = 100;

    /**
     * Timestamp of the last hit received by the object.
     * @type {number}
     * @default 0
     */
    lastHit = 0;

    /**
     * Offset values for collision detection.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     * @property {number} bottom - Bottom offset.
     * @default { top: 0, left: 0, right: 0, bottom: 0 }
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the object, making it fall if above ground or already moving downward.
     */
    applyGravity() {
        setStoppableInterval (() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y + this.height < 435;
        }
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} mo - The movable object to check collision with.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Checks if the object is stomping on another object.
     * @param {MovableObject} mo - The movable object to check stomping on.
     * @returns {boolean} True if the object is stomping on the other object, false otherwise.
     */
    isStomping(mo) {
        let stompingCondition = this.y + this.offset.top < mo.y + mo.offset.top && this.speedY < 0; 
        let horizontalOverlap = this.x + this.width - this.offset.right > mo.x + mo.offset.left && this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
        return stompingCondition && horizontalOverlap;
    }

    /**
     * Decreases energy level of the object when hit.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Initiates knockback of the object.
     * @param {string} index - Direction of knockback ('left' or 'right').
     */
    knockback(index) {
        this.speedY = 10;
        let prevX = this.x;
        let intervalId = setInterval(() => {
            let condition = this.checkKnockback(index, prevX); // Check condition
            if (condition > 200) {
                this.speedY = 0;
                clearInterval(intervalId);
            }
        }, 25);
        intervalIds.push(intervalId);
    }
    
    /**
     * Checks the condition for knockback.
     * @param {string} index - Direction of knockback ('left' or 'right').
     * @param {number} prevX - Previous X position of the object.
     * @returns {number} The difference in X position.
     */
    checkKnockback(index, prevX) {
        if (index == 'left') {
            this.x -= 10;
            return prevX - this.x;
        } else if (index == 'right') {
            this.x += 10;
            return this.x - prevX;
        }
    }

    /**
     * Checks if the object is idle.
     * @returns {boolean} True if the object is idle, false otherwise.
     */
    isIdle() {
        return this.world.keyboard.LEFT == false && this.world.keyboard.RIGHT == false && this.world.keyboard.UP == false && this.world.keyboard.SPACE == false && !this.isAboveGround() && !this.isDead() && !this.isHurt();
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays animation for the object.
     * @param {string[]} images - Array of image paths for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump for the object.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Checks if it's the object's first encounter.
     * @returns {boolean} True if it's the object's first encounter, false otherwise.
     */
    firstEncounter() {
        return this.x + this.width > 3200;
    }
}
