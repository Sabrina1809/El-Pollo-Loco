/**
 * Represents a cloud in the game, inheriting from `MovableObject`.
 * The cloud moves continuously from right to left across the screen.
 */
class Cloud extends MovableObject {
    y = 30;
    height = 260;
    width = 400;

    /**
     * Initializes the cloud's position and starts the animation.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 1700 + 300;
        this.animate();
    }

    /**
     * Animates the cloud's movement from right to left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft(Math.random()/2);
        }, 1000 / 60); 
    }
}