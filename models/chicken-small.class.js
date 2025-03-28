/**
 * Represents a small chicken enemy in the game.
 * Inherits from `Chicken` and includes behavior for walking and falling.
 */
class ChickenSmall extends Chicken {
    height = 60;
    width = 60;
    y = 370;
    speed = (Math.random()/2);
    speedY = 1.5;
    currentLevel;
    currentImage = 0;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png'

    /**
     * Initializes the chicken's image and movement, and sets its level.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.playAnimation(this.IMAGES_WALKING);
        this.acceleration = 0.8;
        this.currentLevel = JSON.parse(localStorage.getItem('polloLocoLevelActive'));
    }

    /**
     * Starts the falling animation based on the current level's height.
     */
    fallingChicken() {
        setTimeout(() => {
            let jumpingHeight = JSON.parse(localStorage.getItem('polloLevelActive'));
            if (jumpingHeight == 1) {
                this.y = 355;
            }
            if (jumpingHeight == 2) {
                this.y = 310;
            }
            if (jumpingHeight == 3) {
                this.y = 270;                
                this.startFallingIntervall();
            }
            this.startFallingIntervall();
        }, Math.random() * 10000);
    }

     /**
     * Starts an interval that simulates falling behavior.
     */
    startFallingIntervall() {
        this.fallingInterval = setInterval(() => {
            if (this.y < 370) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            } else {
                clearInterval(this.fallingInterval);  
            }
        }, 1000 / 25);
    }
}