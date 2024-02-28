class Endboss extends MovableObject {
    y = 50;
    width = 400;
    height = 400;

    walkingImages = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor () {
        super().loadImage(this.walkingImages[0]);
        this.loadImages(this.walkingImages);
        this.x = 3600;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.walkingImages);
        }, 400);
    }
}