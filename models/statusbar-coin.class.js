class StatusBarCoin extends DrawableObject {
    IMAGES_STATUS_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_COINS);
        this.loadImage(this.IMAGES_STATUS_COINS[0]);
        this.x = 20;
        this.y = 60;
        this.width = 200;
        this.height = 60;
        // this.setPercentage('0', this.IMAGES_STATUS_COINS);
        let intervalCoinBar = setInterval(() => {
            this.updateCoinBar()
        },200)
    }
    updateCoinBar() {
        // console.log('collectedCoins:', world.collectedCoins);
        let coinBarIndex = this.checkCollectedImgIndex(world.collectedCoins);
        this.loadImage(this.IMAGES_STATUS_COINS[coinBarIndex]);
    }
}