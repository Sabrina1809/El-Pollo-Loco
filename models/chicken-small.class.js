class ChickenSmall extends Chicken {

    height = 60;
    width = 60;
    y = 370;
    speed = (Math.random()/2);
    speedY = 1.5;
    currentLevel;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png'

    currentImage = 0;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        // this.x = 800 + Math.random() * 1200;
        this.loadImages(this.IMAGES_WALKING);
            this.playAnimation(this.IMAGES_WALKING);
        this.acceleration = 0.8;
        let interval = this.fallingChicken();
        this.currentLevel = JSON.parse(localStorage.getItem('polloLocoLevelActive'));
        // let hitInterval = setInterval(() => {
        //     console.log('hitInterval cheicken small', hitInterval);
            
        //     this.checkHit('img/3_enemies_chicken/chicken_small/2_dead/dead.png')
        // }, 100)
        // this.checkHit('img/3_enemies_chicken/chicken_small/2_dead/dead.png', 'chicken small')
    console.log(this.currentLevel);
    
    }

    fallingChicken() {
        setTimeout(() => {
            this.y = 355;
            let fallingChicken =  setInterval(() => {
                if (this.y < 370) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration; 
                }
            }, 1000/25)       
        }, (Math.random()*10000).toFixed(0))
    }
}