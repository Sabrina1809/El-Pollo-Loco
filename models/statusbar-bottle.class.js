class StatusBarBottle extends DrawableObject {
    IMAGES_STATUS_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_BOTTLES);
        this.loadImage(this.IMAGES_STATUS_BOTTLES[0]);
        this.x = 20;
        this.y = 110;
        this.width = 200;
        this.height = 60;
        let intervalBottleBar = setInterval(() => {
            this.updateBottleBar()
        },200)
    }

    updateBottleBar() {
        // console.log('collectedBottles:', world.collectedBottles);
        let bottleBarIndex = this.checkCollectedImgIndex(world.collectedBottles);
        this.loadImage(this.IMAGES_STATUS_BOTTLES[bottleBarIndex]);
    }
}