/**
 * Represents the status bar for coins in the game, showing the progress of collected coins.
 * @class
 * @extends DrawableObject
 */
class StatusBarCoin extends DrawableObject {
    IMAGES_STATUS_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ]

    /**
     * Initializes the status bar coin, sets its position, and starts an interval to update it.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_COINS);
        this.loadImage(this.IMAGES_STATUS_COINS[0]);
        this.x = 20;
        this.y = 60;
        this.width = 200;
        this.height = 60;
        let intervalCoinBar = setInterval(() => {
            this.updateCoinBar()
        },200)
    }
    
    /**
     * Updates the coin status bar image based on the number of collected coins.
     * @returns {void}
     */
    updateCoinBar() {
        let coinBarIndex = this.checkCollectedImgIndex(world.collectedCoins);
        this.loadImage(this.IMAGES_STATUS_COINS[coinBarIndex]);
    }
}