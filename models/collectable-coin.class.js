/**
 * Represents a collectable coin in the game, inheriting from `DrawableObject`.
 * The coin has a random position and randomly selected image.
 */
class CollectableCoin extends DrawableObject {
    x =  this.x = 200 + Math.random() * 1500;
    y = this.y = 70+ Math.random() * 100;
    width = 100;
    height = 100;

    IMAGES_COINS_AIR = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'        
    ];

    /**
     * Initializes the coin and loads a random image.
     */
    constructor() {
        super();
        this.loadRandomCoinImg();
    }

    /**
     * Loads a random coin image from the available images.
     */
    loadRandomCoinImg() {
            let coinImgIndex = Math.random().toFixed(0);
            this.loadImage(this.IMAGES_COINS_AIR[coinImgIndex]);
    } 
}