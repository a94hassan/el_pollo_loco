class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    applyGravity() {
        setStoppableInterval (() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y + this.height < 435;
        }
    }

    isColliding(mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    isStomping(mo) {
        let stompingCondition = this.y + this.offset.top < mo.y + mo.offset.top && this.speedY < 0; 
        let horizontalOverlap = this.x + this.width - this.offset.right > mo.x + mo.offset.left && this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
        return stompingCondition && horizontalOverlap;
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    knockback(index) {
        this.speedY = 10;
        let prevX = this.x;
        let intervalId = setInterval(() => {
            let condition = this.checkKnockback(index, prevX); // Überprüfen Sie die Bedingung
            if (condition > 200) {
                this.speedY = 0;
                clearInterval(intervalId);
            }
        }, 25);
        intervalIds.push(intervalId);
    }
    
    checkKnockback(index, prevX) {
        if (index == 'left') {
            this.x -= 10;
            return prevX - this.x;
        } else if (index == 'right') {
            this.x += 10;
            return this.x - prevX;
        }
    }

    isIdle() {
        return this.world.keyboard.LEFT == false && this.world.keyboard.RIGHT == false && this.world.keyboard.UP == false && this.world.keyboard.SPACE == false && !this.isAboveGround() && !this.isDead() && !this.isHurt();
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }

    firstEncounter() {
        return this.x + this.width > 3200;
    }
}