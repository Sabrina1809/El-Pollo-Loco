/**
 * Represents the status bar for a bottle in the game, showing the progress of collected bottles.
 * @class
 * @extends DrawableObject
 */
class StatusBarBottle extends DrawableObject {
    IMAGES_STATUS_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]

    /**
     * Initializes the status bar bottle, sets its position, and starts an interval to update it.
     * @constructor
     */
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

    /**
     * Updates the bottle status bar image based on the number of collected bottles.
     * @returns {void}
     */
    updateBottleBar() {
        let bottleBarIndex = this.checkCollectedImgIndex(world.collectedBottles);
        this.loadImage(this.IMAGES_STATUS_BOTTLES[bottleBarIndex]);
    }
}