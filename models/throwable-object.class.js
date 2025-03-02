class ThrowableObject extends MovableObject {

    currentImage = 0;

    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y; 
        this.height = 80;
        this.width = 80;
        let gravityInterval =   setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25)
        let throwInterval = this.throw(gravityInterval);
        let collInterval = setInterval(() => {
            this.checkCollWithEnemy()
        }, 100) 
        setTimeout(() => {
            world.throwableObjects.shift();
        }, 1800);
    }

    throw(gravityInterval) {
        this.speedY = 24;
        // this.applyGravity();
        let xInterval = setInterval(() => {
            this.x += 8
        }, 1000/60)
        let throwInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING);
        }, 100)
        let collInterval = setInterval(() => {
            this.checkCollWithEnemy(collInterval, xInterval, gravityInterval, throwInterval);
        }, 20)
    }

    checkCollWithEnemy(collInterval, xInterval, gravityInterval, throwInterval) {
        for (let i = 0; i < world.level.enemies.length; i++) {
            if (this.y > world.level.enemies[i].y && this.y < world.level.enemies[i].y + world.level.enemies[i].height &&
                this.x + 30 + (this.width/2 - 60) < world.level.enemies[i].x + world.level.enemies[i].width &&
                this.x + 30 + (this.width/2 - 60) > world.level.enemies[i].x
            ) {
                clearInterval(throwInterval);
                let splashInterrval = setInterval(() => {
                    this.playAnimation(this.IMAGES_SPLASH);
                    
                }, 150);
                clearInterval(collInterval);
                clearInterval(gravityInterval);
                clearInterval(xInterval);
                this.speedY = 0;
                this.speedX = 0;
                this.x += 0;
                this.y += 0;
                if (world.level.enemies[i] instanceof Endboss) {
                    this.width = this.width*1.075;
                    this.height = this.height*1.075;
                }
                if (world.level.enemies[i] instanceof Chicken) {
                    console.log('chicken dead');
                    world.level.enemies[i].dead = true;
                }
                return 
            }
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}