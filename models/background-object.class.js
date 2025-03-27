/**
 * Represents a background object in the game.
 * 
 * Inherits from MovableObject and is used to define background elements with a specific size.
 */
class BackgroundObject extends MovableObject {
    height = 480;
    width = 700;

    /**
     * Creates an instance of the BackgroundObject.
     * 
     * @param {string} imagePath - The path to the image to be displayed for the background object.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}