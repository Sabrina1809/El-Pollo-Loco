/**
 * Represents a chicken enemy in the game.
 * Inherits from `MovableObject` and includes behavior for movement and death animation.
 */
class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 80;
    speed = (Math.random() + 0.25);
    dead = false;
    audioChickenDead = document.getElementById('audio-chicken-dead');
    currentImage = 0;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
   
    /**
     * Initializes the chicken's image, movement, and applies gravity.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 1000 + Math.random() * 1200;
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
        setTimeout(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.animate();
            setInterval(() => {
                this.moveLeft(this.speed)
            }, 1000 / 60);
        },500)
    }

    /**
     * Checks for a hit and triggers the dead chicken animation.
     * @param {string} image The image to display when the chicken is dead.
     */
    checkHit(image) {
        let hitInterval = setInterval(() => {
            this.showDeadChicken(image);
        }, 100)
        let clearHitInterval = setInterval(() => {
            if (this.dead == true) {
                this.audioChickenDead.play();
                clearInterval(hitInterval)
                clearInterval(clearHitInterval)
                return
            }
        }, 200)
    }

    /**
     * Displays the dead chicken animation and deletes it from the canvas.
     * @param {string} image The image to display when the chicken is dead.
     */
    showDeadChicken(image) {
        if (this.dead == true) {
            this.loadImage(image);
            setTimeout(() => {
                world.deleteFromCanvas(this, world.level.enemies);
                this.dead = false;
            }, 600)             
        }
    }

    /**
     * Animates the walking and movement of the chicken.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        setInterval(() => {
            this.moveLeft(this.speed)
        }, 1000 / 60)
    }
}