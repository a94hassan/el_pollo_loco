class Coin extends CollectableObject {
    x = 360 + Math.random() * 3000;
    y = 100 + Math.random() * 150;
    width = 150;
    height = 150;
    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    };

    coinImages = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];
    
    constructor() {
        super();
        this.loadImage('../img/8_coin/coin_1.png');
        this.loadImages(this.coinImages);
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.coinImages);
        }, 200) 
    }
}