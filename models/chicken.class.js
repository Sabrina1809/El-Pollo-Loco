class Chicken extends MovableObject {
   
    y = 350;
    height = 80;
    width = 80;
    speed = (Math.random() + 0.25);
    dead = false;
    
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
        this.applyGravity();
        this.animate();
        // setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        // }, 200);
        setInterval(() => {
            this.moveLeft(this.speed)
        }, 1000 / 60);
        // let hitInterval = setInterval(() => {
        //     console.log('hitInterval chicken', hitInterval);

        //     this.checkHit('img/3_enemies_chicken/chicken_normal/2_dead/dead.png', hitInterval)
        // }, 100)
        // this.checkHit('img/3_enemies_chicken/chicken_normal/2_dead/dead.png', 'chicken')
    }

    // checkHit(image, hitInterval) {
    //     if (this.dead == true) {
    //         this.loadImage(image);
    //         setTimeout(() => {
    //             world.deleteFromCanvas(this, world.level.enemies);
    //             clearInterval(hitInterval)
    //         }, 600)
    //     }
    // }

    checkHit(image, chicken) {
               
        let hitInterval = setInterval(() => {
            console.log('hitInterval ', hitInterval, chicken);
            console.log(this);
            
            if (this.dead == true) {
                console.log(this);
                this.loadImage(image);
                setTimeout((hitInterval) => {
                    world.deleteFromCanvas(this, world.level.enemies);
                 

                }, 600)
             
            }
        }, 100)
        let clearHitInterval = setInterval(() => {
            console.log('clearHitInterval erreicht', clearHitInterval);
            
            if (this.dead == true) {
                clearInterval(hitInterval)
                clearInterval(clearHitInterval)
                return
            }
        }, 200)
    }

    enemyHit() {

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