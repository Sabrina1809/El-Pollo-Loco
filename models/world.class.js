/**
 * Represents the game world, including the character, enemies, status bars, and objects.
 */
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
    keyboardActive = true;
    audioChickenDead = document.getElementById('audio-chicken-dead');
    audioCollectThing = document.getElementById('audio-collect');

    /**
     * Initializes the world with the provided canvas, keyboard, and level.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the world.
     * @param {Keyboard} keyboard - The keyboard input handler.
     * @param {Level} level - The level data.
     */
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

    /**
     * Locks the keyboard input to prevent movement.
     */
    lockKeyboard() {
        world.keyboard.UP = false;
        world.keyboard.DOWN = false;
        world.keyboard.LEFT = false;
        world.keyboard.RIGHT = false;
        world.keyboard.SPACE = false;
        world.keyboardActive = false;
    }

    /**
     * Resets all enemies to their initial state.
     */
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

    /**
     * Resets the character to its initial state.
     */
    resetCharacter() {
        this.character.energy = 100;
        this.character.lastHit = 0;
        this.character.x = 60;
        this.character.y = -200;
        this.character.clearAllIntervals();
        this.character.sawEndboss = false;
        this.character.standing = 0;
    }

    
    /**
     * Resets the end boss to its initial state.
     */
    resetEndboss() {
        let endboss = this.level.enemies[this.level.enemies.length - 1];
        endboss.energy = 100;
        endboss.lastHit = 0;
        endboss.width = 400;
        endboss.height = 400;
        endboss.x = 2300;
        endboss.y = 55;
    }

    /**
     * Resets the world, clearing collected items and intervals.
     */
    resetWorld() {
        this.level.win = undefined;
        this.collectedBottles = 0;
        this.collectedCoins = 0;
        this.intervalIds.forEach((interval) => {
            clearInterval(interval)
        })
    }

    /**
     * Stops the game by clearing all active intervals.
     */
    stopGame() {
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = [];
        world.character.intervals.forEach(id => clearInterval(id));
        world.character.intervals = [];
        if (world.level.enemies.length > 0 && world.level.enemies[world.level.enemies.length - 1] instanceof Endboss) {
            world.level.enemies[world.level.enemies.length - 1].intervals.forEach(clearInterval);
            world.level.enemies[world.level.enemies.length - 1].intervals = [];
        }        
    }

    /**
     * Sets the world reference in the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop, resetting the world and setting up collision checks.
     */
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
    
    /**
     * Checks if the character is throwing objects and processes the throw.
     * @param {number} throwObjectInterval - The interval ID for the throw action.
     */
    checkThrowObjects(throwObjectInterval) {
        if (this.keyboard.SPACE && this.collectedBottles != 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.collBottleEndboss(bottle, this.level.enemies[this.level.enemies.length - 1], throwObjectInterval);
        }
    }

    /**
     * Checks if a throwable bottle collides with the end boss and triggers the hit.
     * @param {ThrowableObject} bottle - The bottle object.
     * @param {Enemy} enemy - The end boss enemy.
     * @param {number} throwObjectInterval - The interval ID for the throw action.
     */
    collBottleEndboss(bottle, enemy, throwObjectInterval) {
        if (enemy instanceof Endboss) {
            if (bottle.y + bottle.y / 2 > enemy.y && bottle.y + bottle.y / 2 < enemy.y + enemy.width &&
                bottle.x + bottle.width / 2 > enemy.x && bottle.x + bottle.width / 2 < enemy.x + enemy.width
            ) {
                this.level.enemies[this.level.enemies.length - 1].hit = true;
                this.level.enemies[this.level.enemies.length - 1].checkEnergy();
                setTimeout(() => {
                    clearInterval(throwObjectInterval);
                },1000);
            }
        }
    }
    
    /**
     * Handles the death of enemies and their intervals.
     */
    enemyDead() {
        this.level.enemies.forEach((enemy) => {
            this.checkExistingInterval(enemy)
            enemy.deadInterval = setInterval(() => {
                this.newInterval(enemy);
            }, 100);
            this.intervalIds.push(enemy.deadInterval);
            return this.intervalIds
        });
    }

    /**
     * Checks if there is an existing interval for the enemy and clears it.
     * @param {Enemy} enemy - The enemy to check.
     */
    checkExistingInterval(enemy) {
        if (enemy.deadInterval) {
            clearInterval(enemy.deadInterval);
            this.intervalIds = this.intervalIds.filter(id => id !== enemy.deadInterval);
            enemy.deadInterval = null;
            enemy.dead = false;
        }
    }

    /**
     * Starts a new interval to handle enemy death and cleanup.
     * @param {Enemy} enemy - The enemy to process.
     */
    newInterval(enemy) {
        if (enemy.dead) {
            enemy.loadImage(enemy.IMAGE_DEAD);
            clearInterval(enemy.deadInterval);
            this.intervalIds = this.intervalIds.filter(id => id !== enemy.deadInterval);
            enemy.deadInterval = null;
            setTimeout(() => {
                this.deleteFromCanvas(enemy, this.level.enemies);
            }, 600);
            return this.intervalIds
        }
    }

    /**
     * Checks for collisions between the character and collectible objects.
     */
    checkCollCharObjects() {
        this.level.collectableObjects.forEach((collectableObject) => {
            if(this.character.isColliding(collectableObject)) {
                this.audioCollectThing.play();
                if (collectableObject instanceof CollectableBottle) {
                    this.isBottle(collectableObject);
                } 
                if (collectableObject instanceof CollectableCoin) {
                    this.isCoin(collectableObject);
                }
            }
        })
    }

    /**
     * Handles collecting a bottle when the character collides with it.
     * @param {CollectableBottle} collectableObject - The collectible bottle object.
     */
    isBottle(collectableObject) {
        if (this.collectedBottles <= 10) {
            this.collectedBottles++;
            this.deleteFromCanvas(collectableObject, this.level.collectableObjects)
        } 
    }

    /**
     * Handles collecting a coin when the character collides with it.
     * @param {CollectableCoin} collectableObject - The collectible coin object.
     */
    isCoin(collectableObject) {
        if (this.collectedCoins < 9) {
            this.collectedCoins++;
            this.deleteFromCanvas(collectableObject, this.level.collectableObjects)
        } else if (this.collectedCoins >= 9) {
            this.collectedCoins = 0;
            this.deleteFromCanvas(collectableObject, this.level.collectableObjects)
            this.character.energy = 100;
        }
    }

    /**
     * Checks for horizontal collisions between the character and chickens.
     * @param {Character} char - The character object.
     */
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

    /**
     * Checks for vertical collisions between the character and chickens.
     * @param {Character} char - The character object.
     */
    collCharChickenY(char) {
        this.level.enemies.forEach((mo) => {
            let tolerance = mo.width/2;
            let halfYOfMo = mo.y + (mo.height/2);
            if (mo instanceof Chicken) {
                if (char.y + 130 + char.height - 150 >= mo.y &&  
                    char.y + 130 + char.height - 150 < halfYOfMo && 
                    this.character.speedY < 0) { 
                        if (char.x + (char.width/2) > mo.x - tolerance/2 && char.x + (char.width/2) < mo.x + mo.width + tolerance/2) {
                            this.jumpOnChicken(mo);
                        }
                } 
            }
        })
    }

    /**
     * Handles the character jumping on a chicken.
     * @param {Chicken} mo - The chicken object.
     */
    jumpOnChicken(mo) {
        this.character.jump();
        this.audioChickenDead.play();
        mo.loadImage(mo.IMAGE_DEAD);
        setTimeout(() => {
            this.deleteFromCanvas(mo, this.level.enemies);
            mo.dead = true;
            clearInterval(mo.hitInterval);
        }, 150)
    }

    /**
     * Checks for horizontal collisions between the character and small chickens.
     * @param {Character} char - The character object.
     */
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

    /**
     * Checks for vertical collisions between the character and small chickens.
     * @param {Character} char - The character object.
     */
    collCharChickenSmallY(char) {
        this.level.enemies.forEach((mo) => {
            if (mo instanceof ChickenSmall) {
                if (char.y + 130 + char.height - 150 >= mo.y - this.tolerance &&  
                    char.y + 130 + char.height - 150 < halfYOfMo && 
                    this.character.speedY < 0) { 
                        if (char.x + (char.width/2) > mo.x - tolerance*2 && char.x + (char.width/2) < mo.x + mo.width + tolerance*2) {
                            this.jumpOnChickenSmall(mo);
                        }
                      
                }
            }
        })
    }

    /**
     * Handles the character jumping on a small chicken.
     * @param {ChickenSmall} mo - The small chicken object.
     */
    jumpOnChickenSmall(mo) {
        this.character.jump();
        this.audioChickenDead.play();
        mo.loadImage(mo.IMAGE_DEAD);
        setTimeout(() => {
            this.deleteFromCanvas(mo, this.level.enemies);
            mo.dead = true;
            clearInterval(mo.hitInterval);
        }, 150)
    }

    /**
     * Checks for collisions between the character and the end boss.
     * @param {Character} char - The character object.
     */
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

    /**
     * Deletes an object from the canvas and the specified object list.
     * @param {Object} object - The object to delete.
     * @param {Array} objects - The list of objects from which to delete.
     */
    deleteFromCanvas(object, objects) {
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].x == object.x && objects[i].y == object.y) {
                objects.splice(i, 1);
            }
        }
    }

    /**
     * Draws the game world on the canvas.
     */
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

    /**
     * Adds a list of objects to the map by drawing them.
     * @param {Array} objects - The list of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    /**
     * Adds an individual object to the map by drawing it.
     * @param {Object} mo - The object to add to the map.
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);   
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally on the canvas.
     * @param {Object} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped image to its original orientation.
     * @param {Object} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}