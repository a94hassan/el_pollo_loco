class StatusBarEndboss extends DrawableObject {

    healthImages = [
        './img/7_statusbars/2_statusbar_endboss/green/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green/green100.png',

    ];

    percentage = 1000;

    constructor() {
        super();
        this.loadImages(this.healthImages);
        this.x = 500;
        this.y = 6;
        this.width = 200;
        this.height = 50;
        this.setPercentage(1000);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.healthImages[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 1000) {
            return 5;
        } else if (this.percentage >= 800) {
            return 4;
        } else if (this.percentage >= 600) {
            return 3;
        } else if (this.percentage >= 400) {
            return 2;
        } else if (this.percentage >= 200) {
            return 1;
        } else if (this.percentage >= 0) {
            return 0;
        }
    }
}