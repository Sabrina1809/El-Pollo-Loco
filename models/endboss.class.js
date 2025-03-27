/**
 * Represents the Endboss character in the game.
 * Extends the MovableObject class and handles the behavior of the Endboss, including movement, animations, damage, and death.
 */
class Endboss extends MovableObject {

    x = 2000;
    y = 55;
    height = 400;
    width = 400;
    currentImage = 0;
    hit = false;
    energy = 100;     
    intervals = [];
    audioDie = document.getElementById('audio-dead-endboss');
    audioEndbossHit = document.getElementById('audio-hit-endboss');
    audioBrokenBottle = document.getElementById('audio-broken-bottle');

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

    /**
     * Initializes the Endboss with default properties and loads images.
     */
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

    /**
     * Clears all active intervals set for the Endboss.
     */
    clearAllIntervals() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    }

    /**
     * Checks the Endboss' current energy and triggers hurt or dead behavior accordingly.
     */
    checkEnergy() {
        this.isEndbossHurt();
        this.isEndbossDead();
    }

    /**
     * Handles the hurt state of the Endboss when hit and reduces energy.
     */
    isEndbossHurt() {
        if (this.hit == true && this.energy > 20) {
            this.endbossIsHurt();
            setTimeout(() => {
                this.hit = false;
            }, 2000);  
        }
    }

    /**
     * Handles the death state of the Endboss when its energy is below or equal to 20.
     * Stops the game and locks the keyboard.
     */
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

    /**
     * Applies the hurt animation and reduces the Endboss' energy.
     */
    endbossIsHurt() {
        this.energy -= 20;
        this.hit = false;
        this.showEndbossHurt();
        setTimeout(() => {
            this.audioEndbossHit.play();
        },300)
        this.showEndbossWalk();
        this.showEndbossAttack();
    }

    /**
     * Plays the hurt animation for the Endboss.
     */
    showEndbossHurt() {
        let hurtInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 200);
        setTimeout(() => {
            clearInterval(hurtInterval)
        }, 1000);
    }

    /**
     * Handles the walking animation and movement of the Endboss.
     */
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

    /**
     * Handles the attack animation of the Endboss.
     */
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

    /**
     * Plays the death animation for the Endboss.
     */
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

    
    /**
     * Shrinks the Endboss and plays the death sound when it dies.
     */
    showEndbossShrink() {
        setTimeout(() => {
            this.audioDie.play();
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

    /**
     * Executes the death process for the Endboss, clearing intervals and playing animations.
     */
    endbossIsDead() {
        this.energy -= 20;
        this.hit = false;
        world.level.win = true;
        world.character.showStanding();
        this.clearAllIntervals();
        this.showEndbossHurt();
        this.showEndbossDie();
        this.showEndbossShrink();
        this.startTimeouts();
    }

    /**
     * Starts the timeouts to handle post-death actions such as removing the Endboss and returning to the home screen.
     */
    startTimeouts() {
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
    
    /**
     * Returns the player to the home screen after the Endboss is defeated.
     */
    backToHomeScreen() {
        document.getElementById('overlay-start').style.display = 'block';
        document.getElementById('button-home').style.display = 'none';
        setTimeout(() => {
            document.getElementById('level-1-button').classList.remove('level-closed');
        }, 2000);
    }
      
    /**
     * Starts the walking animation for the Endboss.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 500);
    }
}