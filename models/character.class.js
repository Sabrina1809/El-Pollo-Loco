/**
 * Represents a character in the game.
 * 
 * The character can move, jump, get hurt, die, and interact with the environment and enemies.
 * It also handles animations and sound effects based on the character's actions.
 */
class Character extends MovableObject {
    x = 60;
    y = -200;
    height = 350;
    width = 160;
    speed = 7;
    standing = 0;
    sawEndboss = false;
    world;
    currentImage = 0;
    audioHit = document.getElementById('audio-pepe-hit');
    audioJump = document.getElementById('audio-pepe-jump');
    audioDie = document.getElementById('audio-pepe-die');
    audioSeeEndboss = document.getElementById('audio-see-endboss');
    audioCharSleeping = document.getElementById('audio-snore');

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_TIRED = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WIN = [
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png'
    ]

     /**
     * Creates an instance of the character and initializes its properties.
     * Loads the images for different actions (walking, jumping, etc.) and applies gravity.
     * Starts the character's movement and animation logic.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_TIRED);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.intervals = [];
        this.clearAllIntervals();
        this.hitSoundPlayed = false;
        let checkMoveInterval = setInterval(()=> {
            this.checkLeft();
            this.checkRight();
            this.checkUp();
            this.world.camera_x = -this.x + 60;
        }, 1000/60);
        this.increaseStandingTime();
        this.firstTimeEndboss();
        this.startAnimationInterval(checkMoveInterval);
    }
    
    /**
     * Starts an interval to check and update the character's animation based on its current state.
     * Handles different states like dead, hurt, jumping, walking, and standing.
     * @param {number} checkMoveInterval - The interval for checking the character's movement.
     */
    startAnimationInterval(checkMoveInterval) {
        let checkAnimationInterval = setInterval(() => {            
            if (this.isDead()) {
                this.showDead(checkAnimationInterval, checkMoveInterval);
            } else if (this.isHurt()) {
                if (!this.hitSoundPlayed) {
                    this.audioHit.play();
                    this.hitSoundPlayed = true;
                    setTimeout(() => {
                        this.hitSoundPlayed = false;
                    }, 850);
                }
                this.showHurt();
            } else if (this.isAboveGround()) {
                this.showJumping();
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.showWalking();
                } else {
                    let active = JSON.parse(localStorage.getItem('polloLevelActive'));
                    if (active != null) {
                        this.showStanding();
                    }
                }
            }
        }, 100);   
    }

    /**
     * Displays the standing animation for the character.
     * Changes the animation to tired or sleeping based on the standing time.
     */
    showStanding() {
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        if (this.standing > 1) {
            this.playAnimation(this.IMAGES_TIRED);
        }
        if (this.standing > 10) {
            this.playAnimation(this.IMAGES_SLEEPING);
            this.audioCharSleeping.play();
        }
    }

    /**
     * Displays the walking animation for the character.
     * Resets the standing time.
     */
    showWalking() {
        this.playAnimation(this.IMAGES_WALKING);
        this.standing = 0;
    }

    /**
     * Displays the jumping animation for the character.
     * Resets the standing time.
     */
    showJumping() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.standing = 0;
    }

    /**
     * Displays the dead animation for the character and handles cleanup.
     * Stops relevant intervals and transitions to the home screen after a delay.
     * 
     * @param {number} checkAnimationInterval - The interval for checking the character's animation.
     * @param {number} checkMoveInterval - The interval for checking the character's movement.
     */
    showDead(checkAnimationInterval, checkMoveInterval) {
        this.animateCharactersDead();
        setTimeout(() => {
            clearInterval(checkAnimationInterval);
            world.level.win = undefined;
            clearInterval(world.level.enemies[world.level.enemies.length - 1].energyInterval);
        }, 1500);
        setTimeout(() => {
            world.stopGame();
            clearInterval(checkMoveInterval);
            this.backToHomeScreen();
        }, 6000)
    }

    /**
     * Displays the hurt animation for the character.
     * Resets the standing time to 0.
     */
    showHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.standing = 0;
    }

    /**
     * Checks if the left arrow key is pressed and if the character is not too far left.
     * Moves the character to the left if conditions are met.
     */
    checkLeft() {
        if (this.world.keyboard.LEFT && this.x >= -500) {
            this.otherDirection = true;
            this.moveLeft(this.speed);
        }
    }

    /**
     * Checks if the right arrow key is pressed, and if there are enemies in the level.
     * Moves the character to the right if conditions are met.
     */
    checkRight() {
        if (
            this.world.keyboard.RIGHT && 
            this.world.level.enemies.length > 0 && 
            this.world.level.enemies[this.world.level.enemies.length - 1] // Sicherstellen, dass das Element existiert
        ) {
            this.otherDirection = false;
            this.moveRight();
        }
    }

    /**
     * Checks if the character is not above ground and the up arrow key is pressed.
     * Triggers the jump action and plays the jump sound.
     */
    checkUp() {
        if (!this.isAboveGround() && this.world.keyboard.UP) {
            this.jump();
            this.audioJump.play();
        }
    }

    /**
     * Animates the character's death and plays the death sound.
     */
    animateCharactersDead() {
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        world.level.win = false;
        this.lastHit = 0;
        this.standing = 0;
        world.lockKeyboard();
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(()=> {
            this.playAnimation(this.IMAGES_DEAD);
            this.y += 20;
            this.audioDie.play();
        }, 1000);
    }

    /**
     * Displays the start overlay and resets the home button for the next level.
     */    
    backToHomeScreen() {
        document.getElementById('overlay-start').style.display = 'block';
        document.getElementById('button-home').style.display = 'none';
        setTimeout(() => {
            document.getElementById('level-1-button').classList.remove('level-closed');
        }, 2000)
    }

    /**
     * Triggers the endboss animation when the character reaches a specific position.
     */
    firstTimeEndboss() {
        let findEndbossInterval = setInterval(() => {
            if (this.sawEndboss == false && this.x >= 1750) {
                this.endbossRunsToCharacter();
                this.audioSeeEndboss.play();
                clearInterval(findEndbossInterval);
            }
        },100)
    }

    /**
     * Moves the endboss towards the character and triggers its walking animation.
     */
    endbossRunsToCharacter() {
        let endbossRunInterval = setInterval(() => {
            world.level.enemies[world.level.enemies.length - 1].x -=50;
            world.level.enemies[world.level.enemies.length - 1].playAnimation(world.level.enemies[world.level.enemies.length - 1].IMAGES_WALK);
        },100)
        setTimeout(() => {
            clearInterval(endbossRunInterval);
            return this.sawEndboss = true;
        }, 1000)
    }

    /**
     * Increases standing time every second until the game ends.
     */
    increaseStandingTime() {
        let standingInterval = setInterval(() => {
            let activeGame = JSON.parse(localStorage.getItem('polloLevelActive'));
            if (activeGame != null) {
                this.standing++
            }
        },1000)
        let checkEndInterval = setInterval(() => {
            if (world.level.win == true || this.world.level.win == false) {
                this.standing = 0;
                clearInterval(standingInterval)
                clearInterval(checkEndInterval)
            }
        },200) 
    }
      
    /**
     * Clears all intervals stored in `this.intervals`.
     */
    clearAllIntervals() {
        this.intervals.forEach((interval) => {
            clearInterval(interval)
        });
        this.intervals = [];
    }
}