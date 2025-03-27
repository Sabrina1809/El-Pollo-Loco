class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [
    ]
    collectedBottles = 0;
    collectedCoins = 0;
    intervalIds = [];
    keyboardActive = true; // Neue Variable zur Sperrung der Eingaben
    audioChickenDead = document.getElementById('audio-chicken-dead');
    audioCollectThing = document.getElementById('audio-collect');
    // audioEndbossHit = document.getElementById('audio-hit-endboss');

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
           this.level = level;
        this.draw();
        this.setWorld();
        this.run();
        this.level.win = undefined;   
   
    }

    lockKeyboard() {
        world.keyboard.UP = false;
        world.keyboard.DOWN = false;
        world.keyboard.LEFT = false;
        world.keyboard.RIGHT = false;
        world.keyboard.SPACE = false;
        world.keyboardActive = false;
    }

    resetEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.dead = false;
            enemy.deadInterval = null;
            if (enemy instanceof Chicken) {
                enemy.x = 300 + Math.random() * 1500;
                enemy.y = 350;
            }
            if (enemy instanceof ChickenSmall) {
                enemy.x = 800 + Math.random() * 1000;
                enemy.y = 370;
            }
        });
    }

    resetCharacter() {
        this.character.energy = 100;
        this.character.lastHit = 0;
        this.character.x = 60;
        this.character.y = -200;
        this.character.clearAllIntervals();
        this.character.sawEndboss = false;
        this.character.standing = 0;
    }

    resetEndboss() {
        let endboss = this.level.enemies[this.level.enemies.length - 1];
        endboss.energy = 100;
        endboss.lastHit = 0;
        endboss.width = 400;
        endboss.height = 400;
        endboss.x = 2300;
        endboss.y = 55;
    }

    resetWorld() {
        this.level.win = undefined;
        this.collectedBottles = 0;
        this.collectedCoins = 0;
        this.intervalIds.forEach((interval) => {
            clearInterval(interval)
        })
    }

    stopGame() {
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = [];
        world.character.intervals.forEach(id => clearInterval(id));
        world.character.intervals = [];
        if (world.level.enemies.length > 0 && world.level.enemies[world.level.enemies.length - 1] instanceof Endboss) {
            // console.log( world.level.enemies[world.level.enemies.length - 1].intervals);
            world.level.enemies[world.level.enemies.length - 1].intervals.forEach(clearInterval);
            world.level.enemies[world.level.enemies.length - 1].intervals = [];
            // console.log( world.level.enemies[world.level.enemies.length - 1].intervals);
        }        
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.resetWorld();
        this.resetEnemies();
        this.resetCharacter();
        this.resetEndboss();
        this.level.checkEnemies(this.level.enemies);
        this.level.win = undefined;
        this.collectedBottles = 0;
        this.collectedCoins = 0;
        let collCharEndbossInterval = setInterval(() => this.collCharEndboss(this.character), 200);
        this.intervalIds.push(collCharEndbossInterval);
        this.intervalIds.push(setInterval(() => this.collCharChickenX(this.character), 200));
        this.intervalIds.push(setInterval(() => this.collCharChickenY(this.character), 1000/60));
        this.intervalIds.push(setInterval(() => this.checkCollCharObjects(this.character), 200));
        this.intervalIds.push(setInterval(() => this.checkCollCharObjects(this.character), 1000/60));
        this.intervalIds.push(setInterval(() => this.checkThrowObjects(), 200));
        this.enemyDead();
    }
    
    checkThrowObjects(throwObjectInterval) {
        if (this.keyboard.SPACE && this.collectedBottles != 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            // let hitEndbossIntervall = setInterval(() => {
                this.collBottleEndboss(bottle, this.level.enemies[this.level.enemies.length - 1], throwObjectInterval);
            // },300)
        }
    }

    collBottleEndboss(bottle, enemy, throwObjectInterval) {
        if (enemy instanceof Endboss) {
            if (bottle.y + bottle.y / 2 > enemy.y && bottle.y + bottle.y / 2 < enemy.y + enemy.width &&
                bottle.x + bottle.width / 2 > enemy.x && bottle.x + bottle.width / 2 < enemy.x + enemy.width
            ) {
                this.level.enemies[this.level.enemies.length - 1].hit = true;
                this.level.enemies[this.level.enemies.length - 1].checkEnergy();
                // this.audioEndbossHit.play();
                setTimeout(() => {
                    clearInterval(throwObjectInterval);
                },1000);
            }
        }
    }
    
    enemyDead() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.deadInterval) {
                clearInterval(enemy.deadInterval);
                this.intervalIds = this.intervalIds.filter(id => id !== enemy.deadInterval);
                // console.log(this.intervalIds);
                enemy.deadInterval = null;
                enemy.dead = false;
            }
            enemy.deadInterval = setInterval(() => {
                if (enemy.dead) {
                    // this.audioChickenDead.play();
                    enemy.loadImage(enemy.IMAGE_DEAD);
                    clearInterval(enemy.deadInterval);
                    this.intervalIds = this.intervalIds.filter(id => id !== enemy.deadInterval);
                    enemy.deadInterval = null;
                    setTimeout(() => {
                        this.deleteFromCanvas(enemy, this.level.enemies);
                    }, 600);
                    return this.intervalIds
                }
            }, 100);
            this.intervalIds.push(enemy.deadInterval);
            return this.intervalIds
        });
    }

    checkCollCharObjects() {
        this.level.collectableObjects.forEach((collectableObject) => {
            if(this.character.isColliding(collectableObject)) {
                this.audioCollectThing.play();
                if (collectableObject instanceof CollectableBottle) {
                    if (this.collectedBottles <= 10) {
                        this.collectedBottles++;
                        this.deleteFromCanvas(collectableObject, this.level.collectableObjects)
                    } 
                } 
                if (collectableObject instanceof CollectableCoin) {
                    if (this.collectedCoins < 9) {
                        this.collectedCoins++;
                        this.deleteFromCanvas(collectableObject, this.level.collectableObjects)
                    } else if (this.collectedCoins >= 9) {
                        this.collectedCoins = 0;
                        this.deleteFromCanvas(collectableObject, this.level.collectableObjects)
                        this.character.energy = 100;
                    }
                }
            }
        })
    }

    collCharChickenX(char) {
        this.level.enemies.forEach((mo) => {
            let tolerance = mo.width/2;
            let halfYOfMo = mo.y + (mo.height/2);
            if (mo instanceof Chicken) {
                if (char.y + 130 + char.height - 150 >= halfYOfMo && this.character.speed > -20) {
                    if (char.x + 30 < mo.x && char.x + 30 + char.width - 70 >= mo.x ||
                        char.x + 30 + char.width - 70 > mo.x + mo.width && char.x + 30 <= mo.x + mo.width) {
                            this.character.hit();
                    }
                }
            }
        })
    }

    collCharChickenY(char) {
        this.level.enemies.forEach((mo) => {
            let tolerance = mo.width/2;
            let halfYOfMo = mo.y + (mo.height/2);
            if (mo instanceof Chicken) {
                if (char.y + 130 + char.height - 150 >= mo.y &&  
                    char.y + 130 + char.height - 150 < halfYOfMo && 
                    this.character.speedY < 0) { 
                        if (char.x + (char.width/2) > mo.x - tolerance/2 && char.x + (char.width/2) < mo.x + mo.width + tolerance/2) {
                            this.character.jump();
                            this.audioChickenDead.play();
                            mo.loadImage(mo.IMAGE_DEAD);
                            setTimeout(() => {
                                this.deleteFromCanvas(mo, this.level.enemies);
                                mo.dead = true;
                                clearInterval(mo.hitInterval);
                            }, 150)
                        }
                } 
            }
        })
    }

    collCharChickenSmallX(char) {
        this.level.enemies.forEach((mo) => {
            if (mo instanceof ChickenSmall) {
                if (char.y + 130 + char.height - 150 >= mo.y - this.tolerance &&  
                    char.y + 130 + char.height - 150 < halfYOfMo && 
                    this.character.speedY < 0) { 
                        if (char.y + 130 + char.height - 150 >= halfYOfMo && this.character.speed > -20) {
                            if (char.x + 30 + char.width - 70 - 80 > mo.x - mo.width && char.x + 30 + char.width - 70 - 80 <= mo.x + mo.width + mo.width ||
                            char.x + 30 + 80 > mo.x - mo.width && char.x + 30 + 80 <= mo.x + mo.width + mo.width) {
                                this.character.hit();
                                console.log(this.character.speedY);
                            }
                        }
                }
            }
        })
    }

    collCharChickenSmallY(char) {
        this.level.enemies.forEach((mo) => {
            if (mo instanceof ChickenSmall) {
                if (char.y + 130 + char.height - 150 >= mo.y - this.tolerance &&  
                    char.y + 130 + char.height - 150 < halfYOfMo && 
                    this.character.speedY < 0) { 
                        if (char.x + (char.width/2) > mo.x - tolerance*2 && char.x + (char.width/2) < mo.x + mo.width + tolerance*2) {
                            this.character.jump();
                            this.audioChickenDead.play();
                            mo.loadImage(mo.IMAGE_DEAD);
                            setTimeout(() => {
                                this.deleteFromCanvas(mo, this.level.enemies);
                                mo.dead = true;
                                clearInterval(mo.hitInterval);
                            }, 150)
                        }
                      
                }
            }
        })
      
    }

    collCharEndboss(char) {
        this.level.enemies.forEach((mo) => {
            if (mo instanceof Endboss && mo.energy > 20) {
                if (char.y + 130 + char.height - 150 > mo.y + 10 &&
                    char.x + 30 + char.width - 70 > mo.x + 30
                ) {
                    this.character.hit();
                }
            }
        })
    }

    deleteFromCanvas(object, objects) {
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].x == object.x && objects[i].y == object.y) {
                objects.splice(i, 1);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.collectableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);   
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}