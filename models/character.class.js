class Character extends MovableObject {
    x = 100;
    y = 135;
    width = 150;
    height = 300;
    speed = 5;
    walkingImages = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    walkingSound = new Audio('../audio/walking.mp3');

    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.walkingImages);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walkingSound.play();
            } else if (this.world.keyboard.LEFT && this.x > + 100) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walkingSound.play();
            }
            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.walkingImages);
            }
        }, 60);        
    }

    jump() {
    }
}