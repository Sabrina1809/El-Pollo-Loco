/**
 * Represents a movable object in the game with physics and movement capabilities.
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0.4;
    acceleration = 2.4;
    energy = 100;
    lastHit = 0;

    /**
     * Applies gravity to the object, altering its vertical position based on gravity and speed.
     * @returns {void}
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25)
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof Character) {
            return this.y < 70;
        }
    }

    /**
     * Checks if the object is hurt based on the time passed since the last hit.
     * @returns {boolean} True if the object is hurt (within 0.7 seconds of the last hit), otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.7
    }

    /**
     * Checks if the object is dead (i.e., its energy is 0).
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays the animation by cycling through an array of images.
     * @param {Array<string>} images - Array of image paths to animate through.
     * @returns {void}
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    
    /**
     * Moves the object to the right by the current speed.
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left by a specified speed.
     * @param {number} speed - The speed at which to move the object.
     * @returns {void}
     */
    moveLeft(speed) {
        this.speed = speed;
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed to a positive value.
     * @returns {void}
     */
    jump() {
        this.speedY = 25;
    }
}