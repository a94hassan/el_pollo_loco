class Endboss extends MovableObject {
    x = 3600;
    y = 50;
    width = 400;
    height = 400;
    speed = 10;
    energy = 1000;
    currentAnimationIndex = - 1;
    newAnimationIndex = - 1;
    firstEncounter = false;
    isHurt = false;
    isWalking = false;
    isAttacking = false;
    endbossAttackingSound = new Audio('./audio/endboss_attacking.mp3')
    winSound = new Audio('./audio/win.mp3');

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

    walkImages = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

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

    hurtImages = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    deadImages = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor () {
        super().loadImage(this.alertImages[0]);
        this.loadImages(this.alertImages);
        this.loadImages(this.walkImages);
        this.loadImages(this.attackImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deadImages);
        this.animate();
        setStoppableInterval(() => {this.toggleStatus();}, 2000);
    }

    animate() {
        let startIntervalId = setInterval(() => this.alertAnimation(startIntervalId), 400);
        intervalIds.push(startIntervalId);
        setStoppableInterval(() => this.moveEndboss(), 1000 / 60);
        let animationIntervalId = setInterval(() => {
            this.playEndboss();
        }, 200);
        intervalIds.push(animationIntervalId);
    }

    alertAnimation(startIntervalId) {
        if (!this.firstEncounter) {
            this.playAnimation(this.alertImages);
        } else {
            clearInterval(startIntervalId);
        } 
    }

    moveEndboss() {
        if (this.firstEncounter) {
            if (this.canMoveLeft()) this.moveLeft();
            else if (this.canMoveRight()) this.moveRight();
        }
    }

    canMoveLeft() {
        return !this.otherDirection && !this.isAttacking && !this.isHurt && !this.isDead();
    }

    canMoveRight() {
        return this.otherDirection && !this.isAttacking && !this.isHurt && !this.isDead()
    }

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

    canWalk() {
        return this.isWalking && !this.isHurt && !this.isDead();
    }

    walkAnimation() {
        this.playAnimation(this.walkImages);
        this.newAnimationIndex = 0; 
    }

    canAttack() {
        return this.isAttacking && !this.isHurt && !this.isDead()
    }

    attackAnimation() {
        this.playAnimation(this.attackImages);
        this.newAnimationIndex = 1; 
    }

    hurtAnimation() {
        this.playAnimation(this.hurtImages);
        setTimeout(() => {this.isHurt = false;}, 1000);
        this.newAnimationIndex = 2; 
    }

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