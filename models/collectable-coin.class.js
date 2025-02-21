class CollectableCoin extends DrawableObject {
    x =  this.x = 0 + Math.random() * 1800;
    // y = 350;
    y = this.y = 100+ Math.random() * 200;
    width = 100;
    height = 100;

    IMAGES_COINS_AIR = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'        
    ];
    constructor() {
        super();
        this.loadRandomCoinImg();
    }

    loadRandomCoinImg() {
            let coinImgIndex = Math.random().toFixed(0);
            this.loadImage(this.IMAGES_COINS_AIR[coinImgIndex]);
    } 
}