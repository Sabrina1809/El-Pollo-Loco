class Chicken extends MovableObject {
   
    y = 350;
    height = 80;
    width = 80;
    speed = (Math.random() + 0.25);
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    
    currentImage = 0;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 1500;
        this.loadImages(this.IMAGES_WALKING);
        // this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        setInterval(() => {
            this.moveLeft(this.speed)
        }, 1000 / 60)
       
    }
}