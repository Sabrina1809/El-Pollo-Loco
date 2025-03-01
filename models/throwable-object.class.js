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
        let throwInterval = this.throw();
        let collInterval = this.checkCollWithEnemy()
    }

    throw() {
        this.speedY = 24;
        this.applyGravity();
        let xInterval = setInterval(() => {
            this.x += 8
        }, 1000/60)
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING);
        }, 100)
        let collInterval = setInterval(() => {
            this.checkCollWithEnemy(collInterval);
        }, 100)
    }

    checkCollWithEnemy(collInterval) {
        for (let i = 0; i < world.level.enemies.length; i++) {
            if (this.y > world.level.enemies[i].y && 
                this.x + 30 + (this.width - 60) /2 < world.level.enemies[i].x + world.level.enemies[i].width &&
                this.x + 30 + (this.width - 60) /2 > world.level.enemies[i].x
            ) {
                let splashInterrval = setInterval(() => {
                    this.playAnimation(this.IMAGES_SPLASH);
                    this.speedY = 0;
                    this.speedX = 0;
                    this.x += 0;
                }, 60);
                setTimeout(() => {
                    clearInterval(collInterval);
                    setTimeout(() => {
                        world.throwableObjects.shift();
                        clearInterval(splashInterrval);
                    }, 200)
                    if (world.level.enemies[i] instanceof Endboss) {
                        if (world.level.enemies[i].energy >= 0) {
                            return world.level.enemies[i].energy -= 20
                        } 
                    }
                    return
                }, 60);
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