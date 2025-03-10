class Character extends MovableObject {
    x = 60;
    y = -200;
    height = 350;
    width = 160;
    speed = 7;
    // speed = 2;
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
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    world;
    currentImage = 0;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.intervals = [];
        this.clearAllIntervals(); // Vorherige Intervalle löschen
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

        }, 1000/60)
        let checkAnimationInterval = setInterval(() => {
            this.intervals.push(checkAnimationInterval);
            // console.log('checkAnimationInterval ', checkAnimationInterval);
            if (this.isDead()) {
                world.level.win = false;

                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(()=> {
                    this.playAnimation(this.IMAGES_DEAD);
                    this.y += 20;
                 
                    this.energy = 100;
                    this.lastHit = 0;
                }, 1500);
                setTimeout(() => {
                    console.log('timeout erreicht 88');
                    this.intervals.push(checkMoveInterval);
                    this.intervals.push(checkAnimationInterval);
                    world.level.win = undefined;
                    clearInterval(checkMoveInterval);
                  
                },2500)
                setTimeout(()=> {
                    clearInterval(checkAnimationInterval);
                    this.intervals.forEach((interval) => {
                        clearInterval(interval)
                    })
                },4500)
                setTimeout(() => {
                    document.getElementById('overlay-start').style.display = 'block';
                }, 7000)
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.loadImage('img/2_character_pepe/2_walk/W-21.png');
                }
            }
        }, 100)
    }
    clearAllIntervals() {
        // console.log('Character Intervalle', this.intervals);
        
        this.intervals.forEach((interval) => {
            clearInterval(interval)
        });
        this.intervals = [];
    }
}