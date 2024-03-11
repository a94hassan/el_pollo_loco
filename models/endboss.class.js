/**
 * Represents an end boss object in the game, extending from the MovableObject class.
 */
class Endboss extends MovableObject {
    /**
     * The x-coordinate of the end boss.
     * @type {number}
     */
    x = 3600;

    /**
     * The y-coordinate of the end boss.
     * @type {number}
     */
    y = 50;

    /**
     * The width of the end boss.
     * @type {number}
     */
    width = 400;

    /**
     * The height of the end boss.
     * @type {number}
     */
    height = 400;

    /**
     * The speed of the end boss.
     * @type {number}
     */
    speed = 10;

    /**
     * The energy of the end boss.
     * @type {number}
     */
    energy = 1000;

    /**
     * Index of the current animation in the end boss's sequence.
     * @type {number}
     */
    currentAnimationIndex = -1;

    /**
     * Index of the new animation in the end boss's sequence.
     * @type {number}
     */
    newAnimationIndex = -1;

    /**
     * Indicates whether it's the first encounter with the end boss.
     * @type {boolean}
     */
    firstEncounter = false;

    /**
     * Indicates whether the end boss is hurt.
     * @type {boolean}
     */
    isHurt = false;

    /**
     * Indicates whether the end boss is walking.
     * @type {boolean}
     */
    isWalking = false;

    /**
     * Indicates whether the end boss is attacking.
     * @type {boolean}
     */
    isAttacking = false;

    /**
     * Audio for end boss attacking sound.
     * @type {HTMLAudioElement}
     */
    endbossAttackingSound = new Audio('./audio/endboss_attacking.mp3');

    /**
     * Audio for win sound.
     * @type {HTMLAudioElement}
     */
    winSound = new Audio('./audio/win.mp3');

    /**
     * Array containing paths to images representing the alert state of the end boss.
     * @type {string[]}
     */
    alertImages = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Array containing paths to images representing the walking state of the end boss.
     * @type {string[]}
     */
    walkImages = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Array containing paths to images representing the attacking state of the end boss.
     * @type {string[]}
     */
    attackImages = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Array containing paths to images representing the hurt state of the end boss.
     * @type {string[]}
     */
    hurtImages = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Array containing paths to images representing the dead state of the end boss.
     * @type {string[]}
     */
    deadImages = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
         * Constructs a new Endboss instance.
         */
    constructor() {
        super().loadImage(this.alertImages[0]);
        this.loadImages(this.alertImages);
        this.loadImages(this.walkImages);
        this.loadImages(this.attackImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deadImages);
        this.animate();
        setStoppableInterval(() => {this.toggleStatus();}, 2000);
    }

    /**
     * Initiates end boss animation.
     * @returns {void}
     */
    animate() {
        let startIntervalId = setInterval(() => this.alertAnimation(startIntervalId), 400);
        intervalIds.push(startIntervalId);
        setStoppableInterval(() => this.moveEndboss(), 1000 / 60);
        let animationIntervalId = setInterval(() => {
            this.playEndboss();
        }, 200);
        intervalIds.push(animationIntervalId);
    }

    /**
     * Initiates alert animation for the end boss.
     * @param {number} startIntervalId - The interval id for the alert animation.
     * @returns {void}
     */
    alertAnimation(startIntervalId) {
        if (!this.firstEncounter) {
            this.playAnimation(this.alertImages);
        } else {
            clearInterval(startIntervalId);
        } 
    }

    /**
     * Moves the end boss.
     * @returns {void}
     */
    moveEndboss() {
        if (this.firstEncounter) {
            if (this.canMoveLeft()) this.moveLeft();
            else if (this.canMoveRight()) this.moveRight();
        }
    }

    /**
     * Checks if the end boss can move left.
     * @returns {boolean} - True if the end boss can move left, otherwise false.
     */
    canMoveLeft() {
        return !this.otherDirection && !this.isAttacking && !this.isHurt && !this.isDead();
    }

    /**
     * Checks if the end boss can move right.
     * @returns {boolean} - True if the end boss can move right, otherwise false.
     */
    canMoveRight() {
        return this.otherDirection && !this.isAttacking && !this.isHurt && !this.isDead();
    }

    /**
     * Plays animation for the end boss.
     * @returns {void}
     */
    playEndboss() {
        if (this.firstEncounter) {
            if (this.canWalk()) this.walkAnimation();
            else if (this.canAttack()) this.attackAnimation();
            else if (this.isHurt && !this.isDead()) this.hurtAnimation();
            else if (this.isDead()) this.endGame();
        }
        if (this.newAnimationIndex !== this.currentAnimationIndex) {
            this.currentImage = 0;
            this.currentAnimationIndex = this.newAnimationIndex;
        }     
    }

    /**
     * Checks if the end boss can walk.
     * @returns {boolean} - True if the end boss can walk, otherwise false.
     */
    canWalk() {
        return this.isWalking && !this.isHurt && !this.isDead();
    }

    /**
     * Initiates walking animation for the end boss.
     * @returns {void}
     */
    walkAnimation() {
        this.playAnimation(this.walkImages);
        this.newAnimationIndex = 0; 
    }

    /**
     * Checks if the end boss can attack.
     * @returns {boolean} - True if the end boss can attack, otherwise false.
     */
    canAttack() {
        return this.isAttacking && !this.isHurt && !this.isDead();
    }

    /**
     * Initiates attack animation for the end boss.
     * @returns {void}
     */
    attackAnimation() {
        this.playAnimation(this.attackImages);
        this.newAnimationIndex = 1; 
    }

    /**
     * Initiates hurt animation for the end boss.
     * @returns {void}
     */
    hurtAnimation() {
        this.playAnimation(this.hurtImages);
        setTimeout(() => {this.isHurt = false;}, 1000);
        this.newAnimationIndex = 2; 
    }

    /**
     * Ends the game when the end boss is defeated.
     * @returns {void}
     */
    endGame() {
        this.playAnimation(this.deadImages);
        setTimeout(() => {
            stopGame();
            document.getElementById('win_screen').style.display = 'flex';
            document.getElementById('restart_button').style.display = 'unset';
            document.getElementById('settings_button').style.display = 'none';
            this.winSound.play();
        }, 1200);
        this.newAnimationIndex = 3; 
    }

    /**
     * Toggles the status of the end boss between walking and attacking.
     * @returns {void}
     */
    toggleStatus() {
        if (this.isWalking && this.firstEncounter) {
            this.isWalking = false;
            this.isAttacking = true;
            setTimeout(() => {this.endbossAttackingSound.play();}, 1000);
        } else {
            this.isWalking = true;
            this.isAttacking = false;
        }
    }
}