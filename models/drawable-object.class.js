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

    checkHealtImgIndex(percentage) {
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

    checkCollectedImgIndex(count) {
        if (count == 0) {
            return 0;
        } else if (count <= 2) {
            return 1
        } else if (count <= 4) {
            return 2
        } else if (count <= 6) {
            return 3
        } else if (count <= 8) {
            return 4
        } else if (count <= 10) {
            return 5
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
            ctx.rect(this.x + 40 , this.y + 110, this.width - 60, this.height - 160);
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
            ctx.rect(this.x + 35, this.y + 10, this.width - 60, this.height - 20);
            ctx.stroke();
        }
        if (this instanceof CollectableCoin) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "brown";
            ctx.rect(this.x + 35, this.y + 35, this.width - 70, this.height - 70);
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

    checkCollEndboss(mo) {
        if (mo instanceof Endboss) {
            return this.x + 30 + this.width - 70 > mo.x + 20 &&
            this.y + 130 + this.height - 150 > mo.y + 60 &&
            this.x + 30 < mo.x + 20 &&
            this.y + 130 < mo.y + 100 + mo.height - 140;
        }
    }

    checkCollBottle(mo) {
        if (mo instanceof CollectableBottle) {
            if (this.x + 30 < mo.x + 35 && this.x + 30 + this.width - 70> mo.x + 30 &&
                this.y + 130 < mo.y + 130 && this.y + 130 + this.height - 150 > mo.y + 10
            ) {
                return true
            } else if (this.x + 30 > mo.x + 35 && this.x + 30 < mo.x + 35 + mo.width - 70 &&
                this.y + 130 < mo.y + 10 && this.y + 130 + this.height -150 > mo.y + 10
            ) {
                return true
            } else if (this.x + 30 < mo.x + 35 && this.x + 30 + this.width - 70 > mo.x + 35 + mo.width -60 &&
                this.y + 130 < mo.y + 10 && this.y + 130 + this.height -150 > mo.y + 10
            ) {
                return true
            }
        }
    }

    checkCollCoin(mo) {
        if (mo instanceof CollectableCoin) {
            if (this.x + 30 < mo.x + 35 && this.x + 30 + this.width - 70 > mo.x + 35 &&
                this.y + 130 < mo.y + 35 + mo.height - 70 && this.y + 130 + this.height - 150 > mo.y + 35+ mo.height - 70
            ) {
                return true
            } else if (
                this.x + 30 > mo.x + 35 && this.x + 30 < mo.x + 35 + this.width - 70 &&
                this.y + 130 < mo.y + 35 + mo.height - 70 && this.y + 130 + this.height - 150 > mo.y + 35 + mo.height - 70
            ) {
                return true
            } else if (this.x + 30 < mo.x + 35 && this.x + 30 + this.width - 70 > mo.x + 35 + mo.width - 70 &&
                this.y + 130 < mo.y + 35 + mo.height - 70 && this.y + 130 + this.height - 150 > mo.y + 35 + mo.height - 70
            ) {
                return true
            }
        }
    }

    isColliding(mo) {
        return this.checkCollEndboss(mo) || this.checkCollBottle(mo) || this.checkCollCoin(mo);    
    }
}  