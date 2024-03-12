/**
 * Represents a character in the game, extending from the MovableObject class.
 */
class Character extends MovableObject {
    /**
     * The x-coordinate of the character.
     * @type {number}
     */
    x = 100;

    /**
     * The y-coordinate of the character.
     * @type {number}
     */
    y = 135;

    /**
     * The width of the character.
     * @type {number}
     */
    width = 150;
    
    /**
     * The height of the character.
     * @type {number}
     */
    height = 300;

    /**
     * The speed of the character.
     * @type {number}
     */
    speed = 5;

    /**
     * Offset values for collision detection.
     * @type {object}
     */
    offset = {
        top: 135,
        left: 30,
        right: 45,
        bottom: 40
    };

    /**
     * Index for idle animation.
     * @type {number}
     */
    idleIndex = 0;

    /**
     * Index for the current animation.
     * @type {number}
     */
    currentAnimationIndex = - 1;

    /**
     * Index for the new animation.
     * @type {number}
     */
    newAnimationIndex = - 1;

    /**
     * Reference to the game world.
     * @type {object}
     */
    world;

    /**
     * Audio for walking sound.
     * @type {Audio}
     */
    walkingSound = new Audio('./audio/walking.mp3');

    /**
     * Audio for jump sound.
     * @type {Audio}
     */
    jumpSound = new Audio('./audio/jump_sfx.mp3');

    /**
     * Audio for jump vocalization.
     * @type {Audio}
     */
    jumpVocal = new Audio('./audio/jump5.mp3');

    /**
     * Audio for stomp sound.
     * @type {Audio}
     */
    stompSound = new Audio('./audio/stomp.mp3');

    /**
     * Audio for hurt vocalization.
     * @type {Audio}
     */
    hurtVocal = new Audio('./audio/hurt4.mp3');

    /**
     * Audio for dead vocalization.
     * @type {Audio}
     */
    deadVocal = new Audio('./audio/dead.mp3');

    /**
     * Audio for snoring sound.
     * @type {Audio}
     */
    snoringSound = new Audio('./audio/snoring.mp3');

    /**
     * Audio for losing sound.
     * @type {Audio}
     */
    loseSound = new Audio('./audio/lose.mp3');

    /**
     * Array containing paths to images representing idle animation.
     * @type {string[]}
     */
    idleImages = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    
    /**
     * Array containing paths to images representing long idle animation.
     * @type {string[]}
     */
    longIdleImages = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    
    /**
     * Array containing paths to images representing walking animation.
     * @type {string[]}
     */
    walkingImages = [
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
        './img/2_character_pepe/2_walk/W-21.png'
    ];

    /**
     * Array containing paths to images representing jumping animation.
     * @type {string[]}
     */
    jumpingImages = [
        // './img/2_character_pepe/3_jump/J-31.png',
        // './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        // './img/2_character_pepe/3_jump/J-39.png',
    ];

    /**
     * Array containing paths to images representing hurt animation.
     * @type {string[]}
     */
    hurtImages = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array containing paths to images representing dead animation.
     * @type {string[]}
     */
    deadImages = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Constructs a new Character instance.
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.idleImages);
        this.loadImages(this.longIdleImages);
        this.loadImages(this.walkingImages);
        this.loadImages(this.jumpingImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deadImages);
        this.applyGravity();
        this.animate();
    }

    /**
     * Initiates character animation.
     * @returns {void}
     */
    animate() {
        this.moveCharacter();
        this.playCharacter();
    }

    /**
     * Moves the character based on keyboard input.
     * @returns {void}
     */
    moveCharacter() {
        setStoppableInterval(() => {
            if (this.isDead()) this.endGame();
            else {
                if (this.canMoveRight()) this.moveRight();
                else if (this.canMoveLeft()) this.moveLeft();
                if (this.canJump()) this.jump();
                this.world.cameraX = - this.x + 100;
            }
        }, 1000 / 60);
    }

    /**
     * Ends the game.
     * @returns {void}
     */
    endGame() {
        setTimeout(() => {
            stopGame();
            document.getElementById('lose_screen').style.display = 'unset';
            document.getElementById('restart_button').style.display = 'unset';
            document.getElementById('settings_button').style.display = 'none';
        }, 1000);
    }

    /**
     * Checks if the character can move right.
     * @returns {boolean} Indicates if the character can move right.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX && !this.isHurt();
    }

    /**
     * Moves the character to the right.
     * @returns {void}
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
    }

    /**
     * Checks if the character can move left.
     * @returns {boolean} Indicates if the character can move left.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > + 100 && !this.isHurt();
    }

    /**
     * Moves the character to the left.
     * @returns {void}
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} Indicates if the character can jump.
     */
    canJump() {
        return (this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround() && !this.isHurt();
    }

    /**
     * Makes the character jump.
     * @returns {void}
     */
    jump() {
        super.jump();
        this.jumpSound.play();
        this.jumpVocal.play();
    }

    /**
     * Plays character animations.
     * @returns {void}
     */
    playCharacter() {
        setStoppableInterval(() => {
            if (this.isDead()) this.deadAnimation();
            else this.aliveAnimation();
            if (this.newAnimationIndex !== this.currentAnimationIndex) {
                this.currentImage = 0;
                this.currentAnimationIndex = this.newAnimationIndex;
            }
        }, 100);
    }

    /**
     * Plays dead animation and ends the game.
     * @returns {void}
     */
    deadAnimation() {
        this.playAnimation(this.deadImages);
        this.walkingSound.pause();
        this.snoringSound.pause();
        this.deadVocal.play();
        setTimeout(() => {this.loseSound.play();}, 1000);
        this.newAnimationIndex = 0; 
    }

    /**
     * Plays animation when character is alive.
     * @returns {void}
     */
    aliveAnimation() {
        if (this.isMoving()) this.moveAnimation();
        else if (this.isIdle()) this.idleAnimation();
        else if (this.isAboveGround() && !this.isHurt()) this.jumpAnimation();
        else if (this.isHurt()) this.hurtAnimation();
    }

    /**
     * Checks if the character is moving.
     * @returns {boolean} Indicates if the character is moving.
     */
    isMoving() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround() && !this.isHurt();
    }

    /**
     * Plays animation for character movement.
     * @returns {void}
     */
    moveAnimation() {
        this.playAnimation(this.walkingImages);
        this.walkingSound.play();
        this.snoringSound.pause();
        this.idleIndex = 0;
        this.newAnimationIndex = 1;
    }

    /**
     * Plays idle animation.
     * @returns {void}
     */
    idleAnimation() {
        if (this.idleIndex < 80) this.playAnimation(this.idleImages);
        else {
            this.playAnimation(this.longIdleImages);
            this.snoringSound.play();
        }
        this.walkingSound.pause();
        this.idleIndex++;
        this.newAnimationIndex = 2;
    }

    /**
     * Plays jump animation.
     * @returns {void}
     */
    jumpAnimation() {
        this.playAnimation(this.jumpingImages);
        this.walkingSound.pause();
        this.snoringSound.pause();
        this.idleIndex = 0;
        this.newAnimationIndex = 3;
    }

    /**
     * Plays hurt animation.
     * @returns {void}
     */
    hurtAnimation() {
        this.playAnimation(this.hurtImages);
        this.walkingSound.pause();
        this.snoringSound.pause();
        this.hurtVocal.play();
        this.idleIndex = 0;
        this.newAnimationIndex = 4;
    }
}