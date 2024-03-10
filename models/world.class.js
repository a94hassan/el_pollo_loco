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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        let prevY = this.character.y; // Speichern der Anfangsposition
        setStoppableInterval(() => {
            this.xLimiter();
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkHitting();
            this.checkStomping(prevY); // Übergeben von prevY
            this.checkFirstEncounter();
            this.checkEndBossPosition();
            this.checkBottleCollecting();
            this.checkCoinCollecting();
            prevY = this.character.y; // Aktualisieren der vorherigen Position
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.DOWN && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this);
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
                if (this.character.x > 300 && this.character.x + this.character.width - this.character.offset.right > enemy.x + enemy.offset.left && this.character.x + this.character.width - this.character.offset.right < enemy.x + enemy.width - enemy.offset.right) {
                    this.character.knockback('left');
                } else if (this.character.x < this.level.levelEndX - 200 && this.character.x + this.character.offset.left < enemy.x + enemy.width - enemy.offset.right && this.character.x + this.character.offset.left > enemy.x + enemy.offset.left) {
                    this.character.knockback('right');
                }
            }
        });
    }

    checkStomping(prevY) {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isStomping(enemy, prevY) && !enemy.isDead()) { // Übergeben von prevY
                this.character.stompSound.play();
                enemy.energy = 0;
            }
        });
    }

    checkHitting() {
        this.throwableObjects.forEach((bottle, i) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !enemy.isDead()) {
                    bottle.hitEnemy = true;
                    enemy.energy -= 100;
                    setTimeout(() => {this.throwableObjects.splice(i, 1);}, 200);
                    if (enemy instanceof Endboss) {
                        this.statusBarEndboss.setPercentage(enemy.energy);
                        enemy.isHurt = true;
                    }
                } else if (bottle.hitGround()) {
                    setTimeout(() => {this.throwableObjects.splice(i, 1);}, 200);
                }
            });
        });
    }

    checkBottleCollecting() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.collectedBottles++;
                this.level.bottles.splice(i, 1);
                this.bottleBar.setAmount(this.collectedBottles);
            }
        })
    }

    checkCoinCollecting() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.collectedCoins++;
                this.level.coins.splice(i, 1);
                this.coinBar.setAmount(this.collectedCoins);
            }
        })
    }

    checkFirstEncounter() {
        if (this.character.firstEncounter()) {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss) {
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
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.cameraX, 0);
        // -----------------------------------START Space for fixed Objects-----------------------------------

        this.addToMap(this.statusBar);
        if (this.firstEncounter) {
            this.addToMap(this.statusBarEndboss);
        }
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);

        // ------------------------------------END Space for fixed Objects------------------------------------
        this.ctx.translate(this.cameraX, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.cameraX, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
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
        this.character.walkingSound.muted = true;
        this.character.jumpSound.muted = true;
        this.character.jumpVocal.muted = true;
        this.character.stompSound.muted = true;
        this.character.hurtVocal.muted = true;
        this.character.deadVocal.muted = true;
    }
    
    unmuteAllSounds() {
        this.character.walkingSound.muted = false;
        this.character.jumpSound.muted = false;
        this.character.jumpVocal.muted = false;
        this.character.stompSound.muted = false;
        this.character.hurtVocal.muted = false;
        this.character.deadVocal.muted = false;
    }
}