class ThrowableObject extends MovableObject {
hitEnemy = false;
world;

    bottleRotationImages = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    bottleSplashImages = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

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

    animateSplash() {
        let splashIntervalId = setInterval(() => {
                this.playAnimation(this.bottleSplashImages);
        }, 100);
        setTimeout(() => {clearInterval(splashIntervalId);}, 300);
    }

    hitGround() {
        return this.y > 350;
    }

    xGrowthDirectionUpdate(isOtherDirection) {
        if (isOtherDirection === false) {
            return this.x += 10;
        } else if (isOtherDirection === true) {
            return this.x -= 10;
        }
    }
}