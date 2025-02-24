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
        }, 1000/60)
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
            this.checkPosXAndY(this.character, enemy)
        })
        this.level.collectableObjects.forEach((collectableObject) => {
            if(this.character.isColliding(collectableObject)) {
                if (collectableObject instanceof CollectableBottle) {
                    // console.log('bottle collected');
                    // console.log('CHARACTER x:', this.character.x + 30, 'w:', this.character.width - 70, 'end=', this.character.x + 30 + this.character.width - 70);
                    // console.log('BOTTLE x:', collectableObject.x + 35, 'w:', collectableObject.width - 70, 'end=', collectableObject.x + 35 + collectableObject.width - 70);
                    if (this.collectedBottles <= 10) {
                        this.collectedBottles++;
                        // this.collectObject(collectableObject);
                        this.deleteFromCanvas(collectableObject, this.level.collectableObjects)
                    } 
                } 
                if (collectableObject instanceof CollectableCoin) {
                    if (this.collectedCoins < 9) {
                        this.collectedCoins++;
                        // this.collectObject(collectableObject);
                        this.deleteFromCanvas(collectableObject, this.level.collectableObjects)
                    } else if (this.collectedCoins >= 9) {
                        this.collectedCoins = 0;
                        // this.collectObject(collectableObject);
                        this.deleteFromCanvas(collectableObject, this.level.collectableObjects)
                        this.character.energy = 100;
                    }
                }
                
            }
        })
    }

    // checkPosXAndY(char, mo) {
    //       //mo.x 
    //         //mo.width 
    //         //mo.y 
    //         //mo.height 

    //         //this.x + 30
    //         //this.width -70
    //         //this.y + 130
    //         //this.height - 150

    //         if (
    //             char.y + 130 + char.height - 150 >= mo.y && // Unterkante von char berührt mo
    //             char.y + 130 + char.height - 150 - 10 < mo.y + (mo.height / 2) && // char kommt von oben
    //             ((char.x + 30 <= mo.x + mo.width) &&
    //             (char.x + 30 + char.width - 70 >= mo.x) || 
    //             (char.x + 30  >= mo.x) && (char.x + 30 + char.width - 70 > mo.x + mo.width)
    //         )
    //         ) {
    //             console.log('Aufs Hühnchen gesprungen!', mo);
    //             this.character.jump();
    //             this.deleteFromCanvas(mo, this.level.enemies);
    //         } else if (
    //             char.x + 30 + char.width - 70 > mo.x && // X-Überlappung
    //             char.x + 30 < mo.x + mo.width &&
    //             char.y + 130 + char.height - 150 >= mo.y + (mo.height / 2) // char ist NICHT von oben gekommen
    //         ) {
    //             console.log('Ins Hühnchen gerannt!', mo);
    //             this.character.hit();
    //         }
    //     //   {
    //     //     if (this.character.isAboveGround() ) {
    //     //         console.log('Aufs Hühnchen gesprungen!', mo);
    //     //         console.log('von links',char.x + 30 < mo.x && char.x + 30 + char.width - 70 >= mo.x);
    //     //         console.log('mittig', char.x + 30 <= mo.x && char.x + 30 + char.width - 70>= mo.x + mo.width);
    //     //         console.log('von rechts', char.x + 30 >= mo.x && char.x + 30 + char.width - 70 > mo.x + mo.width);
    //     //         console.log('obere Hälfte', char.y + 130 + char.height - 150 > mo.y && char.y + 130 + char.height - 150 < mo.y + (mo.height/2));
    //     //         this.character.jump();

    //     //         this.deleteFromCanvas(mo, this.level.enemies);
    //     //         return
    //     //     } else if (!this.character.isAboveGround()) {
    //     //         console.log('Ins Hühnchen gerannt!', mo);
    //     //         console.log('von links',char.x + 30 < mo.x && char.x + 30 + char.width - 70 >= mo.x);
    //     //         console.log('von rechts', char.x + 30 >= mo.x && char.x + 30 + char.width - 70 > mo.x + mo.width);
    //     //         console.log('untere Hälfte', char.y + 130 + char.height - 150 > mo.y + (mo.height/2));
    //     //         this.character.hit();
    //     //     }
    //     // }
    // }

    checkPosXAndY(char, mo) {
        const tolerance = 20; // Spielraum für X-Überlappung
    
        // Prüfen, ob der Charakter gerade tatsächlich von oben kommt (Fall-Bewegung)
        const fallingDown = char.speedY < 0; // Angenommen, `velocityY` ist die vertikale Geschwindigkeit
    
        // Prüfen, ob der Charakter mit dem Gegner kollidiert UND sich dabei von oben nähert
        if (
            fallingDown && // Charakter darf nicht einfach hochspringen
            char.y + 130 + char.height - 150 >= mo.y && // Unterkante von char berührt mo
            char.y + 130 + char.height - 150 - tolerance < mo.y + (mo.height / 2) && // char kommt von oben
            char.x + 30 + char.width - 70 > mo.x && // X-Überlappung
            char.x + 30 < mo.x + mo.width
        ) {
            console.log('Aufs Hühnchen gesprungen!', mo, char);
            this.character.jump();
            this.deleteFromCanvas(mo, this.level.enemies);
        } 
        // Prüfen, ob der Charakter von der Seite dagegen läuft
        else if (
            char.x + 30 + char.width - 70 > mo.x && // X-Überlappung
            char.x + 30 < mo.x + mo.width &&
            char.y + 130 + char.height - 150 >= mo.y + (mo.height / 2) // char ist NICHT von oben gekommen
        ) {
            console.log('Ins Hühnchen gerannt!', mo, char);
            this.character.hit();
        }
    }

    collectObject(collectableObject) {
        // collectableObject = collectableObject;
        this.deleteFromCanvas(collectableObject);
    }

    deleteFromCanvas(object, objects) {
        // console.log(collectableObject.x);
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].x == object.x && objects[i].y == object.y) {
                // console.log('LÖSCHEN Index', i);
                // console.log(this.level.collectableObjects[i]);
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