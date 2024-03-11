/**
 * Represents a coin object in the game, extending from the MovableObject class.
 */
class Coin extends MovableObject {
    /**
     * The x-coordinate of the coin.
     * @type {number}
     */
    x = 360 + Math.random() * 3000;

    /**
     * The y-coordinate of the coin.
     * @type {number}
     */
    y = 100 + Math.random() * 150;

    /**
     * The width of the coin.
     * @type {number}
     */
    width = 150;

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 150;

    /**
     * The offset of the coin.
     * @type {Object}
     */
    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    };

    /**
     * Array containing paths to images representing different states of the coin.
     * @type {string[]}
     */
    coinImages = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];
    
    /**
         * Constructs a new Coin instance.
         */
    constructor() {
        super();
        this.loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.coinImages);
        this.animate();
    }

    /**
     * Initiates coin animation.
     * @returns {void}
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.coinImages);
        }, 200);
    }
}