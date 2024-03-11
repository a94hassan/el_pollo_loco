/**
 * Represents the game world.
 * @class
 */
class World {
    /**
     * The main character of the game.
     * @type {Character}
     */
    character = new Character();

    /**
     * The current level of the game.
     * @type {Level}
     */
    level = level1;

    /**
     * The canvas element for rendering.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The rendering context of the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard input handler.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The camera's X position.
     * @type {number}
     */
    cameraX = 0;

    /**
     * The status bar for the main character.
     * @type {StatusBar}
     */
    statusBar = new StatusBar();

    /**
     * The status bar for the end boss character.
     * @type {StatusBarEndboss}
     */
    statusBarEndboss = new StatusBarEndboss();

    /**
     * The bottle bar for the main character.
     * @type {BottleBar}
     */
    bottleBar = new BottleBar();

    /**
     * The coin bar for the main character.
     * @type {CoinBar}
     */
    coinBar = new CoinBar();

    /**
     * The throwable objects in the game.
     * @type {Array<ThrowableObject>}
     */
    throwableObjects = [];

    /**
     * Flag indicating the first encounter with the end boss.
     * @type {boolean}
     */
    firstEncounter = false;

    /**
     * The number of collected bottles.
     * @type {number}
     */
    collectedBottles = 0;

    /**
     * The number of collected coins.
     * @type {number}
     */
    collectedCoins = 0;

    /**
     * The sound effect for throwing objects.
     * @type {HTMLAudioElement}
     */
    throwSound = new Audio('./audio/throw_sfx.mp3');

    /**
     * The sound effect for breaking bottles.
     * @type {HTMLAudioElement}
     */
    bottleSplashSound = new Audio('./audio/bottle_break.mp3');

    /**
     * The sound effect for small chicken.
     * @type {HTMLAudioElement}
     */
    smallChickenSound = new Audio('./audio/small_chicken.mp3');

    /**
     * The sound effect for chicken.
     * @type {HTMLAudioElement}
     */
    chickenSound = new Audio('./audio/chicken.mp3');

    /**
     * The sound effect for the end boss.
     * @type {HTMLAudioElement}
     */
    endbossSound = new Audio('./audio/endboss.mp3');

    /**
     * The sound effect for when the end boss is hurt.
     * @type {HTMLAudioElement}
     */
    endbossHurtSound = new Audio('./audio/endboss_hurt.mp3');

    /**
     * The sound effect for bottles.
     * @type {HTMLAudioElement}
     */
    bottleSound = new Audio('./audio/bottle.mp3');

    /**
     * The sound effect for coins.
     * @type {HTMLAudioElement}
     */
    coinSound = new Audio('./audio/coin.mp3');

    /**
     * The sound effect for starting the game.
     * @type {HTMLAudioElement}
     */
    startSound = new Audio('./audio/start.mp3');

    /**
     * The sound effect for shocking events.
     * @type {HTMLAudioElement}
     */
    shockSound = new Audio('./audio/shock.mp3');

    /**
     * Initializes the game world.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.startSound.play();
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world property of the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop.
     */
    run() {
        setStoppableInterval(() => {
            this.xLimiter();
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkHitting();
            this.checkStomping();
            this.checkFirstEncounter();
            this.checkEndBossPosition();
            this.checkBottleCollecting();
            this.checkCoinCollecting();
        }, 200);
    }

    /**
     * Checks if the character should throw objects.
     */
    checkThrowObjects() {
        if (this.keyboard.DOWN && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this);
            this.throwSound.play();
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.bottleBar.setAmount(this.collectedBottles);
        }
    }

    /**
     * Checks collisions between character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                if (this.collidingLeft(enemy)) this.character.knockback('left');
                else if (this.collidingRight(enemy)) this.character.knockback('right');
                if (enemy instanceof SmallChicken) this.smallChickenSound.play();
                else if (enemy instanceof Chicken) this.chickenSound.play();
                else if (enemy instanceof Endboss) this.endbossSound.play();
            }
        });
    }

    /**
     * Checks collisions with enemies on the left side of the character.
     * @param {MovableObject} enemy - The enemy to check collision with.
     * @returns {boolean} True if colliding, false otherwise.
     */
    collidingLeft(enemy) {
        return this.character.x > 300 && this.character.x + this.character.width - this.character.offset.right > enemy.x + enemy.offset.left && this.character.x + this.character.width - this.character.offset.right < enemy.x + enemy.width - enemy.offset.right;
    }

    /**
     * Checks collisions with enemies on the right side of the character.
     * @param {MovableObject} enemy - The enemy to check collision with.
     * @returns {boolean} True if colliding, false otherwise.
     */
    collidingRight(enemy) {
        return this.character.x < this.level.levelEndX - 200 && this.character.x + this.character.offset.left < enemy.x + enemy.width - enemy.offset.right && this.character.x + this.character.offset.left > enemy.x + enemy.offset.left;
    }

    /**
     * Checks if the character is stomping on enemies.
     */
    checkStomping() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isStomping(enemy) && !enemy.isDead()) {
                this.character.stompSound.play();
                enemy.energy = 0;
            }
        });
    }

    /**
     * Checks if thrown objects hit enemies or ground.
     */
    checkHitting() {
        this.throwableObjects.forEach((bottle, i) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !enemy.isDead()) {
                    this.bottleHit(bottle, i, enemy);
                } else if (bottle.hitGround()) {
                    this.bottleSplashSound.play();
                    setTimeout(() => {this.throwableObjects.splice(i, 1);}, 200);
                }
            });
        });
    }

    /**
     * Handles bottle hit event on enemies.
     * @param {ThrowableObject} bottle - The thrown bottle.
     * @param {number} index - The index of the bottle in throwableObjects array.
     * @param {MovableObject} enemy - The enemy hit by the bottle.
     */
    bottleHit(bottle, i, enemy) {
        bottle.hitEnemy = true;
        enemy.energy -= 100;
        this.bottleSplashSound.play();
        setTimeout(() => {this.throwableObjects.splice(i, 1);}, 200);
        if (enemy instanceof Endboss) {
            this.statusBarEndboss.setPercentage(enemy.energy);
            enemy.isHurt = true;
            this.endbossHurtSound.play();
        }
    }

    /**
     * Checks if character collects bottles.
     */
    checkBottleCollecting() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.bottleSound.play();
                this.collectedBottles++;
                this.level.bottles.splice(i, 1);
                this.bottleBar.setAmount(this.collectedBottles);
            }
        })
    }

    /**
     * Checks if character collects coins.
     */
    checkCoinCollecting() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.coinSound.play();
                this.collectedCoins++;
                this.level.coins.splice(i, 1);
                this.coinBar.setAmount(this.collectedCoins);
            }
        })
    }

    /**
     * Checks if it's the first encounter with the end boss.
     */
    checkFirstEncounter() {
        if (this.character.firstEncounter()) {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && !this.firstEncounter) {
                    this.shockSound.play();
                    enemy.firstEncounter = true;
                    this.firstEncounter = true;
                }
            });
        }
    }

    /**
     * Checks the position of the end boss relative to the character.
     */
    checkEndBossPosition() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.firstEncounter) {
                if (enemy instanceof Endboss) {
                    if (enemy.x < this.character.x + this.character.width - this.character.offset.right) {
                        enemy.otherDirection = true;
                    } else if (enemy.x > Math.abs(this.cameraX) + 720) {
                        enemy.otherDirection = false;
                    }
                }
            }
        });
    }
    
    /**
     * Clears the canvas and renders all objects in the game world.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addBackgroundObjects();
        this.ctx.translate(-this.cameraX, 0);
        this.addFixedObjects();
        this.ctx.translate(this.cameraX, 0);
        this.addForegroundObjects();
        this.ctx.translate(-this.cameraX, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Adds background objects to the map.
     */
    addBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Adds fixed objects to the map.
     */
    addFixedObjects() {
        this.addToMap(this.statusBar);
        if (this.firstEncounter) this.addToMap(this.statusBarEndboss);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
    }

    /**
     * Adds foreground objects to the map.
     */
    addForegroundObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Adds a movable object to the map.
     * @param {MovableObject} mo - The movable object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally for a movable object.
     * @param {MovableObject} mo - The movable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original state after flipping.
     * @param {MovableObject} mo - The movable object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Adds an array of objects to the map.
     * @param {Array} objects - The array of objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Limits the character's movement within the x-axis.
     */
    xLimiter() {
        if (this.character.x < 100) {
            this.character.x = 100;
        } else if (this.character.x > this.level.levelEndX) {
            this.character.x = this.level.levelEndX;
        }
    }

    /**
     * Mutes all sound effects in the game.
     */
    muteAllSounds() {
        this.character.snoringSound.muted = true;
        this.character.walkingSound.muted = true;
        this.character.jumpSound.muted = true;
        this.character.jumpVocal.muted = true;
        this.character.stompSound.muted = true;
        this.character.hurtVocal.muted = true;
        this.character.deadVocal.muted = true;
        this.startSound.muted = true;
        this.shockSound.muted = true;
        this.throwSound.muted = true;
        this.bottleSplashSound.muted = true;
        this.bottleSound.muted = true;
        this.coinSound.muted = true;
        this.smallChickenSound.muted = true;
        this.chickenSound.muted = true;
        this.endbossSound.muted = true;
        this.endbossHurtSound.muted = true;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.endbossAttackingSound.muted = true;
            }
        })
    }
    
    /**
     * Unmutes all sound effects in the game.
     */
    unmuteAllSounds() {
        this.character.loseSound.muted = false;
        this.character.snoringSound.muted = false;
        this.character.walkingSound.muted = false;
        this.character.jumpSound.muted = false;
        this.character.jumpVocal.muted = false;
        this.character.stompSound.muted = false;
        this.character.hurtVocal.muted = false;
        this.character.deadVocal.muted = false;
        this.startSound.muted = false;
        this.shockSound.muted = false;
        this.throwSound.muted = false;
        this.bottleSplashSound.muted = false;
        this.bottleSound.muted = false;
        this.coinSound.muted = false;
        this.smallChickenSound.muted = false;
        this.chickenSound.muted = false;
        this.endbossSound.muted = false;
        this.endbossHurtSound.muted = false;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.endbossAttackingSound.muted = false;
                enemy.winSound.muted = false;
            }
        })
    }
}