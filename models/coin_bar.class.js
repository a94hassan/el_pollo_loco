/**
 * Represents a coin bar in the game, extending from the DrawableObject class.
 */
class CoinBar extends DrawableObject {
    /**
     * Array containing paths to images representing different states of the coin bar.
     * @type {string[]}
     */
    barImages = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
         * The amount of coins in the bar.
         * @type {number}
         */
    amount = 0;

    /**
     * Constructs a new CoinBar instance.
     */
    constructor() {
        super();
        this.loadImages(this.barImages);
        this.x = 10;
        this.y = 80;
        this.width = 200;
        this.height = 50;
        this.setAmount(0);
    }

    /**
     * Sets the amount of coins in the bar.
     * @param {number} amount - The amount of coins.
     * @returns {void}
     */
    setAmount(amount) {
        this.amount = amount;
        let path = this.barImages[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current amount of coins.
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