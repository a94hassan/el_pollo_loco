let level1;

/**
 * Initializes level 1 of the game with specified game elements.
 * Creates a new instance of Level with provided arrays of game entities and background objects.
 * @returns {void}
 */
function initLevel() {
    level1= new Level(
        [
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        [ 
            new Cloud(-720*1),
            new Cloud(720*0),
            new Cloud(720*1),
            new Cloud(720*2),
            new Cloud(720*3),
            new Cloud(720*4),
            new Cloud(720*5)
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', 1439 * 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/full.png', 1439 * 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/full.png', 1439 * 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/full.png', 1439 * 0),
            new BackgroundObject('./img/5_background/layers/air.png', 1439 * 1),
            new BackgroundObject('./img/5_background/layers/3_third_layer/full.png', 1439 * 1),
            new BackgroundObject('./img/5_background/layers/2_second_layer/full.png', 1439 * 1),
            new BackgroundObject('./img/5_background/layers/1_first_layer/full.png', 1439 * 1),
            new BackgroundObject('./img/5_background/layers/air.png', 1439 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/full.png', 1439 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/full.png', 1439 * 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/full.png', 1439 * 2)
        ]
    ); 
}