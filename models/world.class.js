class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusBar = new StatusBar();
    statusBarEndboss = new StatusBarEndboss();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    throwableObjects = [];
    firstEncounter = false;
    collectedBottles = 0;
    collectedCoins = 0;
    throwSound = new Audio('./audio/throw_sfx.mp3');
    bottleSplashSound = new Audio('./audio/bottle_break.mp3');
    smallChickenSound = new Audio('./audio/small_chicken.mp3');
    chickenSound = new Audio('./audio/chicken.mp3');
    endbossSound = new Audio('./audio/endboss.mp3');
    endbossHurtSound = new Audio('./audio/endboss_hurt.mp3');
    bottleSound = new Audio('./audio/bottle.mp3')
    coinSound = new Audio('./audio/coin.mp3');
    startSound = new Audio('./audio/start.mp3');
    shockSound = new Audio('./audio/shock.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.startSound.play();
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

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

    checkThrowObjects() {
        if (this.keyboard.DOWN && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this);
            this.throwSound.play();
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.bottleBar.setAmount(this.collectedBottles);
        }
    }

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

    collidingLeft(enemy) {
        return this.character.x > 300 && this.character.x + this.character.width - this.character.offset.right > enemy.x + enemy.offset.left && this.character.x + this.character.width - this.character.offset.right < enemy.x + enemy.width - enemy.offset.right;
    }

    collidingRight(enemy) {
        return this.character.x < this.level.levelEndX - 200 && this.character.x + this.character.offset.left < enemy.x + enemy.width - enemy.offset.right && this.character.x + this.character.offset.left > enemy.x + enemy.offset.left;
    }

    checkStomping() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isStomping(enemy) && !enemy.isDead()) {
                this.character.stompSound.play();
                enemy.energy = 0;
            }
        });
    }

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

    addBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    addFixedObjects() {
        this.addToMap(this.statusBar);
        if (this.firstEncounter) this.addToMap(this.statusBarEndboss);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
    }

    addForegroundObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    xLimiter() {
        if (this.character.x < 100) {
            this.character.x = 100;
        } else if (this.character.x > this.level.levelEndX) {
            this.character.x = this.level.levelEndX;
        }
    }

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