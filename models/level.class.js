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
        if (this.checkWinInterval) {
            clearInterval(this.checkWinInterval);
            world.level.win = undefined;
        }
        this.checkWinInterval = setInterval(() => {
            
            if (world.level.win === true) {
               
                this.handleWin();
                setTimeout(() => {
                    world.level.win = undefined;
                    world.character.sawEndboss = false;
                    clearInterval(this.checkWinInterval);
                },2000)
              
            } else if (world.level.win === false) {
             
                this.handleLose();
                setTimeout(() => {
                    world.level.win = undefined;
                    world.character.sawEndboss = false;
            
                },2000)
                setTimeout(() => {
                    world.gameOver = false;
                },6000)
            }
        }, 200);
    }
    
    handleWin() {
        world.level.enemies = [];
        world.level.win = null;
        world.stopGame();
        setTimeout(() => {
            document.getElementById('overlay-messages').style.display = 'block';
            document.getElementById('img-msg-win').style.display = 'block';
        }, 1000);
        setTimeout(() => {
            document.getElementById('overlay-messages').style.display = 'none';
            document.getElementById('img-msg-win').style.display = 'none';
            world.stopGame(world.intervalIds);
        }, 6000);
    }
    
    handleLose() {
        world.level.enemies = [];
        world.level.win = null;
        world.stopGame();
        clearInterval(this.checkWinInterval);
        world.intervalIds.forEach(id => clearInterval(id));
        setTimeout(() => {
            document.getElementById('overlay-messages').style.display = 'block';
            document.getElementById('img-msg-loose').style.display = 'block';
        }, 1000);
        setTimeout(() => {
            document.getElementById('overlay-messages').style.display = 'none';
            document.getElementById('img-msg-loose').style.display = 'none';
        }, 6000);
    }
}