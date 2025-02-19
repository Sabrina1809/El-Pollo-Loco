class MovableObject extends DrawableObject {
    
    speed;
    otherDirection = false;
    speedY = 0.4;
    acceleration = 2.4;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25)
    }

    isAboveGround() {
        return this.y < 70;
    }







    isColliding(mo) {
        if (mo instanceof Chicken) {
            console.log();
            return this.x + 30 + this.width - 70 > mo.x &&
            this.y + 130 + this.height - 150 > mo.y &&
            this.x + 30 < mo.x &&
            this.y + 130 < mo.y + mo.height;
        }
        if (mo instanceof Endboss) {
            return this.x + 30 + this.width - 70 > mo.x + 20 &&
            this.y + 130 + this.height - 150 > mo.y + 60 &&
            this.x + 30 < mo.x + 20 &&
            this.y + 130 < mo.y + mo.height - 80;
        }
       return
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 5) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.7
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft(speed) {
        this.speed = speed;
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }

}