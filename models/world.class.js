class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObjects = [
    ]
    collectedBottles = 0;
    collectedCoins = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200)
    }

    checkCollisions() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200)
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles != 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.hit()
            }
        })
        this.level.collectableObjects.forEach((collectableObject) => {
            if(this.character.isColliding(collectableObject)) {
                if (collectableObject instanceof CollectableBottle) {
                    // console.log('Flasche getroffen', collectableObject);
                    if (this.collectedBottles <= 10) {
                        this.collectedBottles++;
                        // console.log('gesammelte Flaschen: ', this.collectedBottles);
                        this.collectObject(collectableObject);
                    } 
                } 
                if (collectableObject instanceof CollectableCoin) {
                    // console.log('Coin getroffen', collectableObject);
                    if (this.collectedCoins < 9) {
                        this.collectedCoins++;
                        // console.log('gesammelte Coins: ', this.collectedCoins);
                        this.collectObject(collectableObject);
                    } else if (this.collectedCoins >= 9) {
                        this.collectedCoins = 0;
                        this.collectObject(collectableObject);
                        this.character.energy = 100;
                    }
                }
                
            }
        })
    }

    collectObject(collectableObject) {
        collectableObject = collectableObject;
        this.deleteFromCanvas(collectableObject);
    }

    deleteFromCanvas(collectableObject) {
        // console.log(collectableObject.x);
        for (let i = 0; i < this.level.collectableObjects.length; i++) {
            if (this.level.collectableObjects[i].x == collectableObject.x && this.level.collectableObjects[i].y == collectableObject.y) {
                // console.log('LÖSCHEN Index', i);
                // console.log(this.level.collectableObjects[i]);
                this.level.collectableObjects.splice(i, 1);
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
        mo.drawFrame(this.ctx);
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