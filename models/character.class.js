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
    audioHit = new Audio('audio/cartoon-slap-2-189831.mp3');
    audioJump = new Audio('audio/cartoon-jump-6462.mp3');

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
        let checkMoveInterval = setInterval(()=> {
            // console.log('checkMoveInterval ', checkMoveInterval);
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.otherDirection = false;
                    this.moveRight();
                } 
                if (this.world.keyboard.LEFT && this.x >= -500) {
                    this.otherDirection = true;
                    this.moveLeft(this.speed);
                }
                if (!this.isAboveGround() && this.world.keyboard.UP) {
                    this.jump();
                }
                this.world.camera_x = -this.x + 60;
            
                // console.log(this.intervals);

        }, 1000/60);
        this.increaseStandingTime();
        this.firstTimeEndboss();
        let jumped = false;

        let checkAnimationInterval = setInterval(() => {            
            if (this.isDead()) {
                this.animateCharactersDead(checkAnimationInterval, checkMoveInterval);
                setTimeout(() => {
                    clearInterval(checkAnimationInterval)
                }, 1500);
                setTimeout(() => {
                    world.stopGame();
                   }, 5000)
            } else if (this.isHurt()) {
                this.audioHit.play();
                this.playAnimation(this.IMAGES_HURT);
                this.standing = 0;
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.standing = 0;
            } else {
                
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.standing = 0;
                } else {
                    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
       
                    if (this.standing > 1) {
                        this.playAnimation(this.IMAGES_TIRED);
                    }
                    if (this.standing > 10) {
                        this.playAnimation(this.IMAGES_SLEEPING);
                    }
                }
            }
        }, 100);   
    }

    animateCharactersDead(checkAnimationInterval, checkMoveInterval) {
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        world.level.win = false;
        this.world.keyboard.UP = false;
        this.world.keyboard.DOWN = false;
        this.world.keyboard.LEFT = false;
        this.world.keyboard.RIGHT = false;
        this.world.keyboard.SPACE = false;
        world.keyboardActive = false;
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(()=> {
            this.playAnimation(this.IMAGES_DEAD);
            this.y += 20;
            this.lastHit = 0;
            this.standing = 0;
            world.level.win = undefined;
            clearInterval(world.level.enemies[world.level.enemies.length - 1].energyInterval)
            console.log('energyInt', world.level.enemies[world.level.enemies.length - 1].energyInterval);
        }, 1000);
        setTimeout(() => {
            this.sawEndboss = false;
            clearInterval(world.character.checkAnimationInterval);
            document.getElementById('overlay-start').style.display = 'block';
            setTimeout(() => {
                document.getElementById('level-1-button').classList.remove('level-closed');
            }, 2000)
            document.getElementById('button-home').style.display = 'none';
            this.energy = 100;
        }, 6000)
    }

    firstTimeEndboss() {
        let findEndbossInterval = setInterval(() => {
            if (this.sawEndboss == false && this.x >= 1750) {
                    world.level.enemies[world.level.enemies.length - 1].x -=50;
                    world.level.enemies[world.level.enemies.length - 1].playAnimation(world.level.enemies[world.level.enemies.length - 1].IMAGES_WALK);
                setTimeout(() => {
                    clearInterval(findEndbossInterval);
                    // debugger;
                    return this.sawEndboss = true;
                    
                }, 1000)
            }
        },100)
    }

    increaseStandingTime() {
        let standingInterval = setInterval(() => {
            this.standing++
        },1000)
        let checkEndInterval = setInterval(() => {
            if (world.level.win == true || this.world.level.win == false) {
                this.standing = 0;
                clearInterval(standingInterval)
                clearInterval(checkEndInterval)
            }
        },200) 
    }

    clearAllIntervals() {
        this.intervals.forEach((interval) => {
            clearInterval(interval)
        });
        this.intervals = [];
    }
}