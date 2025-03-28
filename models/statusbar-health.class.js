/**
 * Represents the health status bar for the character in the game, showing the character's health progress.
 * @class
 * @extends DrawableObject
 */
class StatusBarHealth extends DrawableObject {
    IMAGES_HEALTH_CHARACTER = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    /**
     * Initializes the health status bar, sets its position, and starts an interval to update it.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_CHARACTER);
        this.loadImage(this.IMAGES_HEALTH_CHARACTER[5]);
        this.x = 20;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        let intervalHealthBar = setInterval(() => {
            this.updateHealthBar()
        },200)
    }

    /**
     * Updates the health status bar image based on the character's current health.
     * @returns {void}
     */
    updateHealthBar() {
        let healthBarIndex = this.checkHealtImgIndex(world.character.energy);
        this.loadImage(this.IMAGES_HEALTH_CHARACTER[healthBarIndex]);
    }
}