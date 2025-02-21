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
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 70;
        }
    }

    // hit() {
    //     this.energy -= 5;

    //     if (this.energy < 5) {
    //         this.energy = 0;
    //     } else {
    //         this.lastHit = new Date().getTime();
    //     }
    //     this.updateStatusHealth()
    // }

    // updateStatusHealth() {
    //     let characterEnergy = this.energy;
    //     this.setPercentage(characterEnergy, this.IMAGES_HEALTH_CHARACTER);
    // }

    // setPercentage(percentage, images) {
    //     console.log(percentage);
        
    //     let pathIndex = this.resolveImageIndex(Number(percentage));
    //     console.log(pathIndex);
    //     let imgPath = images[pathIndex]
    //     // let path = images[this.resolveImageIndex(Number(percentage))];
    //     this.img = this.imageCache[imgPath];

    // }

    // resolveImageIndex(percentage) {
    //     if (percentage == 100) {
    //         return 5;   
    //     } else if (percentage >= 80) {
    //         return 4;
    //     } else if (percentage >= 60) {
    //         return 3;
    //     } else if (percentage >= 40) {
    //         return 2
    //     } else if (percentage >= 20) {
    //         return 1
    //     } else {
    //         return 0
    //     }
    // }

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