class Character extends MovableObject {
    x = 100;
    y = 135;
    width = 150;
    height = 300;
    speed = 5;

    walkingImages = [
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png',
        '../img/2_character_pepe/2_walk/W-21.png'
    ];

    jumpingImages = [
        // '../img/2_character_pepe/3_jump/J-31.png',
        // '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        // '../img/2_character_pepe/3_jump/J-39.png',
    ];

    hurtImages = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ];

    deadImages = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ];

    world;
    walkingSound = new Audio('../audio/walking.mp3');
    jumpSound = new Audio('../audio/jump_sfx.mp3');
    jumpVocal = new Audio('../audio/jump5.mp3');
    hurtVocal = new Audio('../audio/hurt4.mp3');
    deadVocal = new Audio('../audio/dead.mp3');

    offset = {
        top: 120,
        left: 30,
        right: 40,
        bottom: 30
    };


    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);
        this.loadImages(this.jumpingImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deadImages);
        this.applyGravity();
        this.animate();
    }

    animate() {
        let currentAnimationIndex = - 1;
        setStoppableInterval(() => {
            if (this.isDead()) {
                stopGame();
                alert('GAME OVER!');
            } else {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX && !this.isHurt()) {
                    this.moveRight();
                    this.otherDirection = false;
                } else if (this.world.keyboard.LEFT && this.x > + 100 && !this.isHurt()) {
                    this.moveLeft();
                    this.otherDirection = true;
                }
                if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround() && !this.isHurt()) {
                    this.jump();
                    this.jumpSound.play();
                    this.jumpVocal.play();
                }
                this.world.cameraX = - this.x + 100;
                }
        }, 1000 / 60);

        setStoppableInterval(() => {
            let newAnimationIndex = - 1;
            if (this.isDead()) {
                this.playAnimation(this.deadImages);
                this.walkingSound.pause();
                this.deadVocal.play();
                newAnimationIndex = 0; 
            } else {
                if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround() && !this.isHurt()) {
                    this.playAnimation(this.walkingImages);
                    this.walkingSound.play();
                    newAnimationIndex = 1; 
                } else if (this.isIdle()) {
                    this.loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
                    this.walkingSound.pause();
                    newAnimationIndex = 2;
                } else if (this.isAboveGround() && !this.isHurt()) {
                    this.playAnimation(this.jumpingImages);
                    this.walkingSound.pause();
                    newAnimationIndex = 3;
                } else if (this.isHurt()) {
                    this.playAnimation(this.hurtImages);
                    this.walkingSound.pause();
                    // this.hurtVocal.play();
                    newAnimationIndex = 4; 
                }
            }
            if (newAnimationIndex !== currentAnimationIndex) {
                this.currentImage = 0;
                currentAnimationIndex = newAnimationIndex;
            }
        }, 100);
    }
}
