class Bottle extends CollectableObject {
    x = 360 + Math.random() * 3000;
    y = 350;
    width = 100;
    height = 100;
    offset = {
        top: 20,
        left: 40,
        right: 40,
        bottom: 20
    };

    bottleImages = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    constructor() {
        super();
        this.loadImages(this.bottleImages);
        this.loadImage(this.getRandomImagePath());
    }

    getRandomImagePath() {
        let randomIndex = Math.floor(Math.random() * this.bottleImages.length)
        return this.bottleImages[randomIndex];
    }
}