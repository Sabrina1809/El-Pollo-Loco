class MovableObject {
    x = 50;
    y = 50;
    img;
    height;
    width;
    imageCache = {};
    speed;
    otherDirection = false;
    speedY = 0.4;
    acceleration = 2.4;

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

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "orange";
            ctx.rect(this.x +30, this.y + 130, this.width - 70, this.height - 150);
            ctx.stroke();
        }
        if (this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "orange";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "orange";
            ctx.rect(this.x + 40, this.y + 80, this.width - 40, this.height - 120);
            ctx.stroke();
        }
    }

    isColliding(mo) {
        return this.x + 30 + this.width - 70 > mo.x &&
            this.y + 130 + this.height - 150 > mo.y &&
            this.x + 30 < mo.x &&
            this.y + 130 < mo.y + mo.height;
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



    // isColliding(mo) {
    //     return this.x + this.width > mo.x &&
    //         this.y + this.height > mo.y &&
    //         this.x < mo.x &&
    //         this.y < mo.y + mo.height;
    // }


    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
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