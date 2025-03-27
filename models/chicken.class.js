class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 80;
    speed = (Math.random() + 0.25);
    dead = false;
    audioChickenDead = document.getElementById('audio-chicken-dead');
    currentImage = 0;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
   
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 1000 + Math.random() * 1200;
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
        setTimeout(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.animate();
            setInterval(() => {
                this.moveLeft(this.speed)
            }, 1000 / 60);
        },500)
    }

    checkHit(image) {
        let hitInterval = setInterval(() => {
            this.showDeadChicken(image);
        }, 100)
        let clearHitInterval = setInterval(() => {
            if (this.dead == true) {
                this.audioChickenDead.play();
                clearInterval(hitInterval)
                clearInterval(clearHitInterval)
                return
            }
        }, 200)
    }

    showDeadChicken(image) {
        if (this.dead == true) {
            this.loadImage(image);
            setTimeout(() => {
                world.deleteFromCanvas(this, world.level.enemies);
                this.dead = false;
            }, 600)             
        }
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