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

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.draw();
        this.setWorld();
        this.run();
    }

    stopGame() {
        console.log('stopGame erreicht');
        console.log(this.intervalIds);
        
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = []; // Lösche alle gespeicherten Intervalle
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200)
        this.enemyDead();
    }

    checkCollisions() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000/60)
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE && this.collectedBottles != 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            let hitEndbossIntervall = setInterval(() => {
                this.collBottleEndboss(bottle, this.level.enemies[this.level.enemies.length - 1], hitEndbossIntervall);
            },100)
        }
    }

    collBottleEndboss(bottle, enemy, hitEndbossIntervall) {
        if (this.level.enemies[this.level.enemies.length - 1] instanceof Endboss) {
            if (bottle.y + bottle.y/2 > enemy.y && bottle.y + bottle.y/2 < enemy.y + enemy.width &&
                bottle.x + bottle.width/2 > enemy.x && bottle.x + bottle.width/2 < enemy.x + enemy.width
            ) {
                clearInterval(hitEndbossIntervall)
                return this.level.enemies[this.level.enemies.length - 1].hit = true;
            }
        }
    }

    enemyDead() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.deadInterval) {
                console.warn('Intervall existiert bereits für', enemy);
                return; // Verhindert doppelte Intervalle
            }
    
            enemy.deadInterval = setInterval(() => {
                // console.log(`Enemy ${enemy} status:`, enemy.dead);
    
                if (enemy.dead) {
                    console.log('TOT', enemy);
                    enemy.loadImage(enemy.IMAGE_DEAD);
                    
                    clearInterval(enemy.deadInterval);
                    console.log(`Intervall gestoppt für Enemy ${enemy}`, enemy.deadInterval);
                    
                    enemy.deadInterval = null;
                    this.intervalIds = this.intervalIds.filter(id => id !== enemy.deadInterval);
    
                    setTimeout(() => {
                        this.deleteFromCanvas(enemy, this.level.enemies);
                    }, 600);
                }
            }, 100);
    
            console.log(`Neues Intervall gestartet für Enemy ${enemy}`, enemy.deadInterval);
            this.intervalIds.push(enemy.deadInterval);
        });
    }
    
    
    

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.checkPosXAndY(this.character, enemy)
        })
        this.level.collectableObjects.forEach((collectableObject) => {
            if(this.character.isColliding(collectableObject)) {
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

    checkPosXAndY(char, mo) {
        this.collCharChicken(char, mo);
        this.collCharChickenSmall(char, mo);
        this.collCharEndboss(char, mo);
    }

    collCharChicken(char, mo) {
        let tolerance = mo.width/2;
        let halfYOfMo = mo.y + (mo.height/2);
        if (mo instanceof Chicken) {
            if (char.y + 130 + char.height - 150 >= mo.y - tolerance &&  
                char.y + 130 + char.height - 150 < halfYOfMo && 
                this.character.speedY < 0) { 
                    if (char.x + (char.width/2) > mo.x - tolerance*2 && char.x + (char.width/2) < mo.x + mo.width + tolerance*2) {
                        this.character.jump();
                        mo.loadImage(mo.IMAGE_DEAD);
                        setTimeout(() => {
                            this.deleteFromCanvas(mo, this.level.enemies);
                            mo.dead = true;
                            clearInterval(mo.hitInterval);
                        }, 150)
                    }
            } else if (char.y + 130 + char.height - 150 >= halfYOfMo && this.character.speed > -20) {
                if (char.x + 30 < mo.x && char.x + 30 + char.width - 70 >= mo.x ||
                    char.x + 30 + char.width - 70 > mo.x + mo.width && char.x + 30 <= mo.x + mo.width) {
                        this.character.hit();
                }
            }
        }
    }
    collCharChickenSmall(char, mo) {
        if (mo instanceof ChickenSmall) {
            if (char.y + 130 + char.height - 150 >= mo.y - this.tolerance &&  
                char.y + 130 + char.height - 150 < halfYOfMo && 
                this.character.speedY < 0) { 
                    if (char.x + (char.width/2) > mo.x - tolerance*2 && char.x + (char.width/2) < mo.x + mo.width + tolerance*2) {
                        this.character.jump();
                        mo.loadImage(mo.IMAGE_DEAD);
                        setTimeout(() => {
                            this.deleteFromCanvas(mo, this.level.enemies);
                            mo.dead = true;

                            clearInterval(mo.hitInterval);
                        }, 150)
                    }
                    else if (char.y + 130 + char.height - 150 >= halfYOfMo && this.character.speed > -20) {
                        if (char.x + 30 + char.width - 70 - 80 > mo.x - mo.width && char.x + 30 + char.width - 70 - 80 <= mo.x + mo.width + mo.width ||
                        char.x + 30 + 80 > mo.x - mo.width && char.x + 30 + 80 <= mo.x + mo.width + mo.width) {
                            this.character.hit();
                            console.log(this.character.speedY);
                        }
                    }
            }
        }
    }
    collCharEndboss(char, mo) {
        if (mo instanceof Endboss) {
            if (char.y + 130 + char.height - 150 > mo.y + 10 &&
                char.x + 30 + char.width - 70 > mo.x + 30
            ) {
                console.log('Endboss');
                this.character.hit();
            }
        }
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
        // this.addObjectsToMap(this.level.statusBars);

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