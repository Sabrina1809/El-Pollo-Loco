class ChickenSmall extends Chicken {

    height = 60;
    width = 60;
    y = 370;
    speed = (Math.random()/2);
    speedY = 1.5;
    

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png'

    currentImage = 0;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.x = 300 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.acceleration = 0.8;
        // this.fallingChicken();
        let jumpingChicken = this.fallingChicken()
           
        
        
      
        
    }

    fallingChicken() {
       
        setTimeout(() => {
            this.y = 350;
            // this.y = 370;
            // this.y = 50;
            // this.loadImages(this.IMAGES_WALKING);
            let fallingChicken =  setInterval(() => {
                if (this.y < 370) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    console.log('fallingChicken erreicht');
                    
                }
              
            }, 1000/25)
           
        
        }, 2000)
    }


}