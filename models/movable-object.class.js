class MovableObject {
    x = 50;
    y = 50;
    img;
    height;
    width;
    imageCache = {};
    speed;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

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
        console.log('moving right')
    }

    moveLeft(speed) {
        this.speed = speed
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}