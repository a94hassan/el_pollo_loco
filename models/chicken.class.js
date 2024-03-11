class Chicken extends MovableObject {
    x = 720 + Math.random() * 2400;
    y = 360;
    width = 80;
    height = 80;
    speed = 0.1 + Math.random() * 1;
    walkingImages = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage(this.walkingImages[0]);
        this.loadImages(this.walkingImages);
        this.applyGravity();
        this.animate();
    }

    animate() {
        let i = 0;
        let moveIntervalId = setInterval(() => {
            if (this.isDead()) {
                clearInterval(moveIntervalId);
            } else {
            this.moveLeft();
            }
        }, 1000 / 60);
        intervalIds.push(moveIntervalId);
        let animationIntervalId = setInterval(() => {
            if (this.isDead()) {
                clearInterval(animationIntervalId);
                this.loadImage('./img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            } else {
            this.playAnimation(this.walkingImages);
            if (!this.isAboveGround() && i > 80 + Math.random() * 10) {
                this.jump();
                i = 0;
            }
            i++;
            }
        }, 100);
        intervalIds.push(animationIntervalId);
    }
}