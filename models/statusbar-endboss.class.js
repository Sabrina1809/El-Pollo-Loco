class StatusBarEndboss extends DrawableObject {
    IMAGES_STATUS_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_ENDBOSS);
        this.loadImage(this.IMAGES_STATUS_ENDBOSS[5]);
        this.x = 480;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        this.updateEndbossBar(this.IMAGES_STATUS_ENDBOSS[5]);
       
      
    }

    updateEndbossBar() {
        setInterval(() => {      
            if (world.level.enemies[world.level.enemies.length - 1] instanceof Endboss) {
                let endbossBarIndex = this.checkHealtImgIndex(world.level.enemies[world.level.enemies.length - 1].energy);            
                this.loadImage(this.IMAGES_STATUS_ENDBOSS[endbossBarIndex]);
            }
        },200)
    }
}