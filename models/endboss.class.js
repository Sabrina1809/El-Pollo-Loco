class Endboss extends MovableObject {

    x = 2000;
    y = 55;
    height = 400;
    width = 400;
    currentImage = 0;
    hit = false;
    energy = 100;     

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALK);
        this.animate();
        this.energyInterval = setInterval(()=> {
            console.log('Checking Energy:', this.energy, 'Hit:', this.hit);
            this.checkEnergy();
        }, 100) 
       
    }

    checkEnergy() {
        // console.log('Endboss Energy: ', this.energy);
        // console.log('CheckEnergy aufgerufen:', this.hit);

        if (this.hit == true && this.energy > 20) {
           this.endbossHurt();
           setTimeout(() => {
            this.hit = false;
        }, 2000);  
        } else if (this.hit == true && this.energy <= 20) {
            this.endbossDead();  
            setTimeout(() => {
                world.level.win = true; 
                this.hit = false;
            },4000)
            // setTimeout(() => {
              
            // }, 400);  
          
        }
      
    }

    endbossHurt() {
        this.energy -= 20;
        this.hit = false;
            console.log('über 0:', this.energy);
            let hurtInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_HURT);
            }, 200);
            setTimeout(() => {
                clearInterval(hurtInterval)
            }, 1000);
            setTimeout(() => {
                let walkInterval = setInterval(() => {
                    this.x -= 30;
                    this.playAnimation(this.IMAGES_WALK);
                }, 75)
                setTimeout(() => {
                    clearInterval(walkInterval);
                }, 1000)
            }, 1000)
            setTimeout(() => {
                let attackInterval = setInterval(() => {
                    this.playAnimation(this.IMAGES_ATTACK);
                }, 60)
                setTimeout(() => {
                    clearInterval(attackInterval);
                }, 1000)
            }, 2000)
    }

    endbossDead() {
        this.energy -= 20;
        this.hit = false;
        console.log('kaputt: ', this.energy);
        let hurtInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 200);
        setTimeout(() => {
            clearInterval(hurtInterval)
        }, 1000);
        setTimeout(() => {
            let deadInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(()=> {
                    setInterval(() => {
                        this.width -= 10;
                        this.x += 10;
                        this.height -= 10;
                    }, 50)
                    setTimeout(() => {
                        world.level.enemies.pop();
                        clearInterval(deadInterval);
                    }, 1000)
                },2000);
            }, 150);
        }, 1200)
        setTimeout(() => {
            document.getElementById('overlay-start').style.display = 'block';
        }, 8000)
    }
         
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 500);
    }

}
