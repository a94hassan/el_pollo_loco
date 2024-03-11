/**
 * Represents a bottle bar status indicator in the game, extending from the DrawableObject class.
 */
class BottleBar extends DrawableObject {
    /**
     * Array containing paths to images representing different levels of the bottle bar.
     * @type {string[]}
     */
    barImages = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * The current amount of the bottle bar.
     * @type {number}
     */
    amount = 0;

    /**
     * Constructs a new BottleBar instance.
     */
    constructor() {
        super();
        this.loadImages(this.barImages);
        this.x = 10;
        this.y = 40;
        this.width = 200;
        this.height = 50;
        this.setAmount(0);
    }

    /**
     * Sets the amount of the bottle bar and updates the displayed image accordingly.
     * @param {number} amount - The amount to set for the bottle bar.
     * @returns {void}
     */
    setAmount(amount) {
        this.amount = amount;
        let path = this.barImages[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current amount of the bottle bar.
     * @returns {number} The index of the image in the barImages array.
     */
    resolveImageIndex() {
        if (this.amount == 5) {
            return 5;
        } else if (this.amount >= 4) {
            return 4;
        } else if (this.amount >= 3) {
            return 3;
        } else if (this.amount >= 2) {
            return 2;
        } else if (this.amount >= 1) {
            return 1;
        } else if (this.amount >= 0) {
            return 0;
        }
    }
}