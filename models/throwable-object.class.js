/**
 * Represents a throwable object in the game (e.g., a salsa bottle), with animations for throwing and splashing.
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    currentImage = 0;

    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    audioThrowBottle = document.getElementById('audio-throw-bottle');
    audioBrokenBottle = document.getElementById('audio-broken-bottle');

    /**
     * Initializes the throwable object, loads images, sets its position, and plays the throw sound.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @constructor
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y; 
        this.height = 80;
        this.width = 80;
        let gravityInterval =   setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25)
        this.audioThrowBottle.play();
        this.throw(gravityInterval);
        setTimeout(() => {
            world.throwableObjects.shift();
        }, 1500);
    }

    /**
     * Initiates the throwing process, updating the object's position and animation.
     * @param {number} gravityInterval - The interval for applying gravity to the object.
     * @returns {void}
     */
    throw(gravityInterval) {
        this.speedY = 20;
        let xInterval = setInterval(() => {
            this.x += 8
        }, 1000/60)
        let throwInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING);
        }, 100)
        let collInterval = setInterval(() => {
            this.checkCollWithEnemy(collInterval, xInterval, gravityInterval, throwInterval);
        }, 100)
    }

    /**
     * Checks for collisions between the throwable object and enemies.
     * @param {number} collInterval - The interval for collision checking.
     * @param {number} xInterval - The interval for updating the object's x-coordinate.
     * @param {number} gravityInterval - The interval for applying gravity to the object.
     * @param {number} throwInterval - The interval for updating the object's throwing animation.
     * @returns {void}
     */
    checkCollWithEnemy(collInterval, xInterval, gravityInterval, throwInterval) {
        for (let i = 0; i < world.level.enemies.length; i++) {
            if (this.y > world.level.enemies[i].y && this.y < world.level.enemies[i].y + world.level.enemies[i].height &&
                this.x + 30 + (this.width/2 - 60) < world.level.enemies[i].x + world.level.enemies[i].width &&
                this.x + 30 + (this.width/2 - 60) > world.level.enemies[i].x
            ) {
                clearInterval(collInterval);
                clearInterval(throwInterval);
                this.audioBrokenBottle.play();
                let splashInterrval = setInterval(() => {
                    this.playAnimation(this.IMAGES_SPLASH);
                }, 200);
                clearInterval(gravityInterval);
                clearInterval(xInterval);
                setTimeout(() => {
                    clearInterval(splashInterrval)
                },1000)
                this.stopFlying();
                this.hitEndboss(i)
                this.hitChicken(i);
                return 
            }
        }
    }

    /**
     * Stops the object's movement and animation when it reaches the ground or hits an enemy.
     * @returns {void}
     */
    stopFlying() {
        this.speedY = 0;
        this.speedX = 0;
        this.x += 0;
        this.y += 0;
    }

    /**
     * Handles the interaction with the Endboss upon collision.
     * @param {number} i - The index of the enemy in the level's enemy array.
     * @returns {void}
     */
    hitEndboss(i) {
        if (world.level.enemies[i] instanceof Endboss) {
            this.width = this.width*1.075;
            this.height = this.height*1.075;
            world.level.enemies[i].hit = true;
            world.level.enemies[i].checkEnergy();
        }
    }

    /**
     * Handles the interaction with the Chicken upon collision.
     * @param {number} i - The index of the enemy in the level's enemy array.
     * @returns {void}
     */
    hitChicken(i) {
        if (world.level.enemies[i] instanceof Chicken) {
            world.level.enemies[i].dead = true;
        }
    }
    
    /**
     * Plays the animation for the throwable object's current action (e.g., throwing or splashing).
     * @param {Array} images - The array of image paths to cycle through for the animation.
     * @returns {void}
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}