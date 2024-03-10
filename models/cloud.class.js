class Cloud extends MovableObject {
    y = 20;
    width = 720;
    height = 400;

    cloudImages = [
        './img/5_background/layers/4_clouds/1.png',
        './img/5_background/layers/4_clouds/2.png'
    ];
    
    constructor(x) {
        super();
        this.loadImages(this.cloudImages);
        this.loadImage(this.getRandomImagePath());
        this.x = x;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    getRandomImagePath() {
        let randomIndex = Math.floor(Math.random() * this.cloudImages.length)
        return this.cloudImages[randomIndex];
    }
}