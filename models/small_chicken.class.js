class SmallChicken extends MovableObject {
    x = 720 + Math.random() * 2400;
    y = 360;
    width = 80;
    height = 80;
    speed = 0.1 + Math.random() * 1;
    i = 0;

    walkingImages = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage(this.walkingImages[0]);
        this.loadImages(this.walkingImages);
        this.applyGravity();
        this.animate();
    }

    animate() {
        let moveIntervalId = setInterval(() => this.moveChicken(moveIntervalId), 1000 / 60);
        intervalIds.push(moveIntervalId);
        let animationIntervalId = setInterval(() => this.playChicken(animationIntervalId), 100);
        intervalIds.push(animationIntervalId);
    }

    moveChicken(moveIntervalId) {
        if (this.isDead()) {
            clearInterval(moveIntervalId);
        } else {
        this.moveLeft();
        }
    }

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