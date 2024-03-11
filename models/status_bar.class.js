/**
 * Represents a status bar for health, extending DrawableObject.
 * Displays the health level of an entity.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * Array of image paths representing different health levels.
     * @type {string[]}
     */
    healthImages = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Percentage value representing the health level.
     * @type {number}
     * @default 100
     */
    percentage = 100;

    /**
     * Constructs a new StatusBar object.
     */
    constructor() {
        super();
        this.loadImages(this.healthImages);
        this.x = 10;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value representing the health level.
     * @param {number} percentage - The health percentage (0 to 100).
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
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else if (this.percentage >= 0) {
            return 0;
        }
    }
}
