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
        let checkMoveInterval = setInterval(()=> {
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
        }, 1000/60)
        let checkAnimationInterval = setInterval(() => {
            if (this.isDead()) {
                clearInterval(checkMoveInterval);
                this.playAnimation(this.IMAGES_DEAD);
                this.world.level.win = false;
                setTimeout(()=> {
                    this.y += 20;
                }, 1500)
               
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

    

    animate() {
        setInterval(() => {
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
        }, 1000/60)

        setInterval(() => {
            if (this.isDead()) {
                // this.playAnimation(this.IMAGES_DEAD);
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
           
        }, 200);
        
        setInterval(() => {
            if (this.world.character.energy <= 0) {
                // console.log('tot');
                let hurtInterval = setInterval(() => {
                    this.playAnimation(this.IMAGES_HURT);
                }, 200);
                setTimeout(() => {
                    clearInterval(hurtInterval)
                }, 1000);
                setTimeout(() => {
                    let deadInterval = setInterval(() => {
                        this.playAnimation(this.IMAGES_DEAD);
                       
                        // setTimeout(()=> {
                        //     setInterval(() => {
                        //         this.width -= 15;
                        //         this.y -= 15;
                        //         this.height -= 20;
                        //     },250)
                         
                        // },2000);
                        setTimeout(() => {
                            // world.ctx.clearRect(this.x, this.y, this.width, this.height)
                            clearInterval(deadInterval)
                        }, 2000)
                    }, 250);
                  
                }, 1000)
            }
        }, 200)
     
    }
}