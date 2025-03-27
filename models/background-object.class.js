class BackgroundObject extends MovableObject {
    height = 480;
    width = 700;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}