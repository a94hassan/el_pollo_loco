/**
 * Represents a status bar for an end boss, extending DrawableObject.
 * Displays the health level of the end boss.
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {
    /**
     * Array of image paths representing different health levels of the end boss.
     * @type {string[]}
     */
    healthImages = [
        './img/7_statusbars/2_statusbar_endboss/green/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];

    /**
     * Percentage value representing the health level.
     * @type {number}
     * @default 1000
     */
    percentage = 1000;

    /**
     * Constructs a new StatusBarEndboss object.
     */
    constructor() {
        super();
        this.loadImages(this.healthImages);
        this.x = 500;
        this.y = 6;
        this.width = 200;
        this.height = 50;
        this.setPercentage(1000);
    }

    /**
     * Sets the percentage value representing the health level.
     * @param {number} percentage - The health percentage (0 to 1000).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.healthImages[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the health image based on the current percentage value.
     * @returns {number} The index of the health image in the healthImages array.
     */
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
