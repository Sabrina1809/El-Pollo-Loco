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
    audioGame = document.getElementById('audio-game');
    audioHome = document.getElementById('audio-home');
    world;

    constructor(enemies, clouds, backgroundObjects, collectableObjects) {
        this.enemies = this.checkEnemies(enemies);
        this.collectableObjects = this.checkCollObj(collectableObjects);
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.world = world;
        setTimeout(() => {
            this.checkWinOrLoose();
        },1500)
       
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
                },2000);
                setTimeout(() => {
                    world.level.win = undefined;
                    world.keyboardActive = true;
                    world.level.enemies.forEach((enemy) => {
                        world.deleteFromCanvas(enemy, world.level.enemies)
                    });
                },8000);
                setTimeout(() => {
                    world.stopGame();
                   }, 9000)
            } else if (world.level.win === false) {
                this.handleLose();
                clearInterval(world.level.checkWinInterval);
                setTimeout(() => {
                    world.keyboardActive = false;
                    world.character.sawEndboss = false;
                },2000);
                setTimeout(() => {
                    world.level.win = undefined;
                    world.keyboardActive = true;
                    world.level.enemies.forEach((enemy) => {
                        world.deleteFromCanvas(enemy, world.level.enemies)
                    })
                },8000)
               setTimeout(() => {
                    world.stopGame();
               }, 9000)
            }
        }, 200);
    }

    saveWonLevel() {
        let currentLevel = JSON.parse(localStorage.getItem('polloLevelActive'));
        console.log(currentLevel);
        if (currentLevel == 1) {
            localStorage.setItem('polloLevel2Open', JSON.stringify(true));
        }
        if (currentLevel == 2) {
            localStorage.setItem('polloLevel3Open', JSON.stringify(true));
        }
        localStorage.setItem('polloLevelActive', JSON.stringify(null));
    }

    checkOpenLevel() {
        let level1Open = JSON.parse(localStorage.getItem('polloLevel1Open'));
        let level2Open = JSON.parse(localStorage.getItem('polloLevel2Open'));
        let level3Open = JSON.parse(localStorage.getItem('polloLevel3Open'));
        setTimeout(() => {
            if (level1Open == true) {
            document.getElementById('level-1-button').classList.remove('level-closed');
            }
            if (level2Open == true) {
                document.getElementById('level-2-button').classList.remove('level-closed');
            }
            if (level3Open == true) {
                document.getElementById('level-3-button').classList.remove('level-closed');
            }
        },1000)    
    } 
    
    handleWin() {
        this.saveWonLevel()
        world.level.win = null;
        this.audioGame.pause();
        this.audioGame.currentTime = 0;
        setTimeout(() => {
            world.character.jump();
            document.getElementById('overlay-messages').style.display = 'block';
            document.getElementById('img-msg-win').style.display = 'block';
        }, 3500);
        setTimeout(() => {
            document.getElementById('overlay-messages').style.display = 'none';
            document.getElementById('img-msg-win').style.display = 'none';
            document.getElementById('level-1-button').classList.add('level-closed');
            document.getElementById('level-2-button').classList.add('level-closed');
            document.getElementById('level-3-button').classList.add('level-closed');
            this.audioHome.volume = 0.5;
            this.audioHome.play();
           
        }, 8000);
        setTimeout(() => {
            this.checkOpenLevel();
        },10000)
    }
    
    handleLose() {
        world.level.win = null;
        localStorage.setItem('polloLevelActive', JSON.stringify(null));
        clearInterval(this.checkWinInterval);
        clearInterval(world.character.checkMoveInterval);
        clearInterval(world.character.checkAnimationInterval);
        setTimeout(() => {
            document.getElementById('overlay-messages').style.display = 'block';
            document.getElementById('img-msg-loose').style.display = 'block';
            this.audioGame.pause();
            this.audioGame.currentTime = 0;
        }, 1000);
        setTimeout(() => {
            document.getElementById('overlay-messages').style.display = 'none';
            document.getElementById('img-msg-loose').style.display = 'none';
            document.getElementById('level-1-button').classList.add('level-closed');
            document.getElementById('level-2-button').classList.add('level-closed');
            document.getElementById('level-3-button').classList.add('level-closed');
            this.audioHome.play();
           
        }, 6000);
        setTimeout(() => {
            this.checkOpenLevel();
        },8000)
    }
}