class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2000;
    collectableObjects;
    statusBars;
    win;
    copyOfEnemies = [];
    copyOfCollectableObjects = [];
    audioGame = new Audio ('audio/bgm-blues-guitar-loop-192099.mp3');
    audioHome = new Audio ('audio/chill-drum-loop-6887.mp3');

    constructor(enemies, clouds, backgroundObjects, collectableObjects) {
        this.enemies = this.checkEnemies(enemies);
        this.collectableObjects = this.checkCollObj(collectableObjects);
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.checkWinOrLoose()
    }

    checkEnemies(enemies) {
        if(this.copyOfEnemies.length == 0) {
            enemies.forEach(enemy => {
                this.copyOfEnemies.push(enemy)
            });
        } 
        this.enemies = [];
        this.copyOfEnemies.forEach(enemy => {
            this.enemies.push(enemy)
        })
        return this.enemies
    }

    checkCollObj(collectableObjects) {
        if (this.copyOfCollectableObjects.length == 0) {
            collectableObjects.forEach(collObj => {
                this.copyOfCollectableObjects.push(collObj)
            });
        }
        collectableObjects = [];
        this.copyOfCollectableObjects.forEach(collObj => {
            collectableObjects.push(collObj)
        })
        return collectableObjects
    }

    checkSavedObjects(enemies, collectableObjects) {
        if(this.copyOfCollectableObjects.length == 0) {
            collectableObjects.forEach(object => {
                this.copyOfCollectableObjects.push(object)
            });
        }
        return enemies, collectableObjects
    }

    checkWinOrLoose() {
        this.audioHome.pause();
        this.audioHome.currentTime = 0;
        this.audioGame.play();
        if (this.checkWinInterval) {
            clearInterval(this.checkWinInterval);
            world.level.win = undefined;
        }
        this.checkWinInterval = setInterval(() => {
            if (world.level.win === true) {
                this.handleWin();
                clearInterval(world.level.checkWinInterval);
                setTimeout(() => {
                    world.keyboardActive = false;
                    world.character.sawEndboss = false;
                },2000)
                setTimeout(() => {
                
                }, 6000)
                setTimeout(() => {
                    world.level.win = undefined;
                    world.keyboardActive = true;
                    world.level.enemies.forEach((enemy) => {
                        world.deleteFromCanvas(enemy, world.level.enemies)
                    });
                    // this.audioHome.play();
                },8000)
                setTimeout(() => {
                    world.stopGame();
                   }, 9000)
            } else if (world.level.win === false) {
                this.handleLose();
                clearInterval(world.level.checkWinInterval);
                setTimeout(() => {
                    world.keyboardActive = false;
                    world.character.sawEndboss = false;
             
                    // clearInterval(this.checkWinInterval);
                },2000)
                setTimeout(() => {
                  
                }, 6000)
                setTimeout(() => {
                    world.level.win = undefined;
                    world.keyboardActive = true;
                    world.level.enemies.forEach((enemy) => {
                        world.deleteFromCanvas(enemy, world.level.enemies)
                    })
                  
                    // this.audioHome.play();
                },8000)
               setTimeout(() => {
                world.stopGame();
               }, 9000)
            }
        }, 200);
    }
    
    handleWin() {
        world.level.win = null;
        // setTimeout(() => {
            this.audioGame.pause();
            this.audioGame.currentTime = 0;
        // },2000)
        setTimeout(() => {
            world.character.jump();
            document.getElementById('overlay-messages').style.display = 'block';
            document.getElementById('img-msg-win').style.display = 'block';
        }, 3500);
        setTimeout(() => {
            document.getElementById('overlay-messages').style.display = 'none';
            document.getElementById('img-msg-win').style.display = 'none';
            // world.stopGame(world.intervalIds);
            // world.level.enemies = [];
            this.audioHome.play();
        }, 8000);
    }
    
    handleLose() {
        world.level.win = null;
        clearInterval(this.checkWinInterval);
        clearInterval(world.character.checkMoveInterval);
        clearInterval(world.character.checkAnimationInterval);
        // console.log('checkwininterval', this.checkWinInterval);
        // console.log('checvkmoveinterval', world.character.checkMoveInterval);
        // console.log('checvkmoveinterval', world.character.checkAnimationInterval);

        setTimeout(() => {
            document.getElementById('overlay-messages').style.display = 'block';
            document.getElementById('img-msg-loose').style.display = 'block';
            this.audioGame.pause();
            this.audioGame.currentTime = 0;
         
            
        }, 1000);
        setTimeout(() => {
            document.getElementById('overlay-messages').style.display = 'none';
            document.getElementById('img-msg-loose').style.display = 'none';
            // world.stopGame();
            this.audioHome.play();
        }, 6000);
    }
}