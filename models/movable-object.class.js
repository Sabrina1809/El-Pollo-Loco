class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    speed;

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