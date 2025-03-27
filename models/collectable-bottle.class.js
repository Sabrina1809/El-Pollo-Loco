/**
 * Represents a collectable bottle in the game, inheriting from `DrawableObject`.
 * The bottle has a random position and randomly selected image.
 */
class CollectableBottle extends DrawableObject {
    x =  this.x = -200 + Math.random() * 1800;
    y = 350;
    width = 80;
    height = 80;
    
    IMAGES_BOTTLES_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'        
    ];

     /**
     * Initializes the bottle and loads a random image.
     */
    constructor() {
        super();
        this.loadRandomBottleImg();
    }

    /**
     * Loads a random bottle image from the available images.
     */
    loadRandomBottleImg() {
            let bottleImgIndex = Math.random().toFixed(0);
            this.loadImage(this.IMAGES_BOTTLES_GROUND[bottleImgIndex]);
    } 
}