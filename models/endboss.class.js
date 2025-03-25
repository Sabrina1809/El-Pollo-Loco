class Endboss extends MovableObject {

    x = 2000;
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
        this.intervals.push(this.energyInterval)
    }

    clearAllIntervals() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    }

    checkEnergy() {
        this.isEndbossHurt();
        this.isEndbossDead();
    }

    isEndbossHurt() {
        if (this.hit == true && this.energy > 20) {
            this.endbossIsHurt();
            setTimeout(() => {
                this.hit = false;
            }, 2000);  
        }
    }

    isEndbossDead() {
        if (this.hit == true && this.energy <= 20) {
            this.endbossIsDead();  
            world.lockKeyboard();
            setTimeout(() => {
                world.stopGame();
            },4000)
            setTimeout(() => {
                world.keyboardActive = true;
            }, 7000)
        }
    }

    endbossIsHurt() {
        this.energy -= 20;
        this.hit = false;
        this.showEndbossHurt();
        this.showEndbossWalk();
        this.showEndbossAttack();
    }

    showEndbossHurt() {
        let hurtInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 200);
        setTimeout(() => {
            clearInterval(hurtInterval)
        }, 1000);
    }

    showEndbossWalk() {
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
    }

    showEndbossAttack() {
        setTimeout(() => {
            let attackInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_ATTACK);
            }, 60)
            setTimeout(() => {
                clearInterval(attackInterval);
            }, 1000)
        }, 2000)
    }

    showEndbossDie() {
        setTimeout(() => {
            let dieInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_DEAD);
            }, 200);
            setTimeout(() => {
                clearInterval(dieInterval);
            }, 3000);
        }, 1000);
    }

    showEndbossShrink() {
        setTimeout(() => {
            let shrinkInterval = setInterval(() => {
                this.width -= 25;
                this.x += 30;
                this.height -= 25;
            }, 100);
            setTimeout(() => {
                clearInterval(shrinkInterval);
            }, 3000);
        }, 2500);
    }

    endbossIsDead() {
        this.energy -= 20;
        this.hit = false;
        world.level.win = true;
        world.character.showStanding();
        this.clearAllIntervals();
        this.showEndbossHurt();
        this.showEndbossDie();
        this.showEndbossShrink();
        setTimeout(() => {
            world.level.enemies.pop();
        },5000)
        setTimeout(() => {
            world.level.win = undefined;
            this.clearAllIntervals();
        }, 8000)
        setTimeout(() => {
            this.backToHomeScreen();
        }, 8500)  
    }
    
    backToHomeScreen() {
        document.getElementById('overlay-start').style.display = 'block';
        document.getElementById('button-home').style.display = 'none';
        setTimeout(() => {
            document.getElementById('level-1-button').classList.remove('level-closed');
        }, 2000);
    }
         
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 500);
    }
}