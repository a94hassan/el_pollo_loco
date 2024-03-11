/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    /**
     * The x-coordinate of the drawable object.
     * @type {number}
     */
    x = 120;

    /**
     * The y-coordinate of the drawable object.
     * @type {number}
     */
    y = 280;

    /**
     * The height of the drawable object.
     * @type {number}
     */
    height = 150;

    /**
     * The width of the drawable object.
     * @type {number}
     */
    width = 100;

    /**
     * The image object representing the drawable object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * A cache to store loaded images.
     * @type {Object}
     */
    imageCache = {};

    /**
     * Index of the current image in the animation sequence.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Loads an image from the provided path.
     * @param {string} path - The path to the image file.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }

    /**
     * Draws the drawable object onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from the provided array of paths.
     * @param {string[]} array - Array of paths to image files.
     * @returns {void}
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        })
    }
}
