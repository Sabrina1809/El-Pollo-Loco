class CollectableBottle extends DrawableObject {
    x =  this.x = -200 + Math.random() * 1800;
    y = 350;
    width = 80;
    height = 80;
    
    IMAGES_BOTTLES_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'        
    ];

    constructor() {
        super();
        this.loadRandomBottleImg();
    }

    loadRandomBottleImg() {
            let bottleImgIndex = Math.random().toFixed(0);
            this.loadImage(this.IMAGES_BOTTLES_GROUND[bottleImgIndex]);
    } 
}