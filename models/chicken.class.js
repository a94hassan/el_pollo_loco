class Chicken extends MovableObject {
    y = 350;
    width = 80;
    height = 80;
    walkingImages = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage(this.walkingImages[0]);
        this.loadImages(this.walkingImages);
        this.x = 720 + Math.random() * 500;
        this.speed = 0.1 + Math.random() * 0.3;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.walkingImages);
        }, 100);
    }
}