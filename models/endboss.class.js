class Endboss extends MovableObject {
    x = 3600;
    y = 50;
    width = 400;
    height = 400;
    speed = 10;
    energy = 1000;
    firstEncounter = false;
    isHurt = false;
    isWalking = false;
    isAttacking = false;

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
        setInterval(() => {this.toggleStatus();}, 2000);
    }

    animate() {
        let currentAnimationIndex = - 1;
        let startIntervalId = setInterval(() => {
            if (!this.firstEncounter) {
                this.playAnimation(this.alertImages);
            } else {
                clearInterval(startIntervalId);
            }    
        }, 400);
        intervalIds.push(startIntervalId);

        setStoppableInterval(() => {
            if (this.firstEncounter) {
                if (!this.otherDirection && !this.isAttacking && !this.isHurt && !this.isDead()) {
                    this.moveLeft();
                } else if (this.otherDirection && !this.isAttacking && !this.isHurt && !this.isDead()) {
                    this.moveRight();
                }
            }
        }, 1000 / 60);

        let animationIntervalId = setInterval(() => {
            let newAnimationIndex = - 1;
            if (this.firstEncounter) {
                if (this.isWalking && !this.isHurt && !this.isDead()) {
                    this.playAnimation(this.walkImages);
                    newAnimationIndex = 0; 
                } else if (this.isAttacking && !this.isHurt && !this.isDead()) {
                    this.playAnimation(this.attackImages);
                    newAnimationIndex = 1; 
                } else if (this.isHurt && !this.isDead()) {
                    this.playAnimation(this.hurtImages);
                    setTimeout(() => {this.isHurt = false;}, 1000);
                    newAnimationIndex = 2; 
                } else if (this.isDead()) {
                    this.playAnimation(this.deadImages);
                    setTimeout(() => {
                        stopGame();
                        document.getElementById('win_screen').style.display = 'flex';
                        document.getElementById('restart_button').style.display = 'unset';
                        document.getElementById('settings_button').style.display = 'none';
                    }, 1200);
                    newAnimationIndex = 3; 
                }
            }
            if (newAnimationIndex !== currentAnimationIndex) {
                this.currentImage = 0;
                currentAnimationIndex = newAnimationIndex;
            }     
        }, 200);
        intervalIds.push(animationIntervalId);
    }

    toggleStatus() {
        if (this.isWalking) {
            this.isWalking = false;
            this.isAttacking = true;
        } else {
            this.isWalking = true;
            this.isAttacking = false;
        }
    }
}