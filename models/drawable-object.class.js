class DrawableObject {
    img;
    imageCache = {};
    x;
    y;
    width;
    height;
    id;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.warn('Error Loading img', e);
            console.log(this.img);
        }
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 5) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;   
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) {
            return 2
        } else if (percentage >= 20) {
            return 1
        } else {
            return 0
        }
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
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "brown";
            ctx.rect(this.x + 30, this.y + 10, this.width - 60, this.height - 20);
            ctx.stroke();
        }
        if (this instanceof CollectableBottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "brown";
            ctx.rect(this.x + 40, this.y + 10, this.width - 60, this.height - 20);
            ctx.stroke();
        }
    }
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
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
        if (mo instanceof CollectableBottle) {
            return this.x + 40 + this.width - 60 > mo.x + 20 &&
            this.y + 10 + this.height - 20 > mo.y + 60 &&
            this.x + 40 < mo.x + 20 &&
            this.y + 10 < mo.y + mo.height - 80;
        }
       return
    }
}