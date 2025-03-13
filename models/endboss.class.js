class Endboss extends MovableObject {

    x = 2200;
    y = 55;
    height = 400;
    width = 400;
    currentImage = 0;
    hit = false;
    energy = 100;     
    intervals = [];
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
            this.checkEnergy();
        }, 100) 

    }

    clearAllIntervals() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    }

    checkEnergy() {
        if (this.hit == true && this.energy > 20) {
           this.endbossHurt();
           setTimeout(() => {
            this.hit = false;
        }, 2000);  
        } else if (this.hit == true && this.energy <= 20) {
            this.endbossDead();  
            world.keyboardActive = false;
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                world.level.win = true; 
                this.hit = false;
            },4000)
            setTimeout(() => {
                world.keyboardActive = true;
            }, 7000)
        }
    }

    endbossHurt() {
        this.energy -= 20;
        this.hit = false;
        let hurtInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 200);
        setTimeout(() => {
            clearInterval(hurtInterval)
        }, 1000);
        setTimeout(() => {
            let walkInterval = setInterval(() => {
                if (this.x > world.character.x) {
                    this.x -= 30;
                }
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

    // endbossDead() {
    //     this.energy -= 20;
    //     this.hit = false;
    //     world.level.win = true;
    //     world.keyboardActive = false;
    //     // world.keyboard.UP = false;
    //     // world.keyboard.DOWN = false;
    //     // world.keyboard.LEFT = false;
    //     // world.keyboard.RIGHT = false;
    //     // world.keyboard.SPACE = false;
    //     // world.keyboardActive = false;
    //     // if (world.collCharEndbossInterval) {
    //     //     clearInterval(collCharEndbossInterval);
    //     //         world.intervalIds = world.intervalIds.filter(id => id !== collCharEndbossInterval);
    //     // }
    //     clearInterval(this.energyInterval)
    //     console.log('energyInterval', this.energyInterval);
        
    //     let hurtInterval = setInterval(() => {
    //         this.playAnimation(this.IMAGES_HURT);
    //     }, 200);
    //     setTimeout(() => {
    //         let dieInterval = setInterval(() => {
    //             this.playAnimation(this.IMAGES_DEAD);
    //         },200)
    //         setTimeout(() => {
    //             clearInterval(dieInterval);
    //             console.log('dieInterval', dieInterval);
    //         },3000)
    //     },1500)
    //     setTimeout(() => {
    //         let shrinkInterval = setInterval(() => {
    //             this.width -= 25;
    //             this.x += 30;
    //             this.height -= 25;
    //         },100)
    //         setTimeout(() => {
    //             clearInterval(shrinkInterval);
    //             console.log('shrinkInterval', shrinkInterval);
    //         },3000)
    //     }, 2500)
    //     setTimeout(() => {
    //         clearInterval(hurtInterval);
    //         console.log('hurtInterval', hurtInterval);
    //     },3500)
    //     setTimeout(() => {
    //         world.level.enemies.pop();
    //         world.level.win = undefined;
    //         setTimeout(() => {
    //             document.getElementById('overlay-start').style.display = 'block';
    //             setTimeout(() => {
    //                 document.getElementById('level-1-button').classList.remove('level-closed');
    //             }, 2000)
    //             document.getElementById('button-home').style.display = 'none';
    //         },1000)
    //     }, 8000)
    // }

    endbossDead() {
        this.energy -= 20;
        this.hit = false;
        world.level.win = true;
        world.keyboardActive = false;
    
        this.clearAllIntervals(); // Alle vorherigen Intervalle löschen
        console.log('endboss this.intervals', this.intervals);
        
        clearInterval(this.energyInterval);
        console.log('energyInteval', this.energyInterval);
        
    
        let hurtInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 200);
        this.intervals.push(hurtInterval);
    
        setTimeout(() => {
            let dieInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_DEAD);
            }, 200);
            this.intervals.push(dieInterval);
    
            setTimeout(() => {
                clearInterval(dieInterval);
                console.log('dieInterval', dieInterval);
                
            }, 3000);
        }, 1500);
    
        setTimeout(() => {
            let shrinkInterval = setInterval(() => {
                this.width -= 25;
                this.x += 30;
                this.height -= 25;
            }, 100);
            this.intervals.push(shrinkInterval);
    
            setTimeout(() => {
                clearInterval(shrinkInterval);
                console.log('shrinkInterval', shrinkInterval);

            }, 3000);
        }, 2500);
    
        setTimeout(() => {
            clearInterval(hurtInterval);
            console.log('hurtInterval', hurtInterval);

        }, 3500);
    
        setTimeout(() => {
            world.level.enemies.pop();
            world.level.win = undefined;
    
            setTimeout(() => {
                document.getElementById('overlay-start').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('level-1-button').classList.remove('level-closed');
                }, 2000);
                document.getElementById('button-home').style.display = 'none';
            }, 1000);
            console.log('endboss this.intervals', this.intervals);
            
        }, 8000);
        setTimeout(() => {
            this.clearAllIntervals(); // Alle vorherigen Intervalle löschen
            console.log('endboss this.intervals', this.intervals);
        }, 9000)
    }
    
         
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 500);
    }
}