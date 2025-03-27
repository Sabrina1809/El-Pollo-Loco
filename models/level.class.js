/**
 * Represents the game level, including enemies, clouds, background objects, and collectable items.
 * Handles level progression, win/lose conditions, and updates related to level status and saving progress.
 */
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

    /**
     * Creates an instance of the Level class.
     * @param {Array<Enemy>} enemies - Initial list of enemies in the level.
     * @param {Array<Cloud>} clouds - List of clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - List of background objects in the level.
     * @param {Array<Collectable>} collectableObjects - List of collectable objects in the level.
     */
    constructor(enemies, clouds, backgroundObjects, collectableObjects) {
        this.enemies = this.checkEnemies(enemies);
        this.collectableObjects = this.checkCollObj(collectableObjects);
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.world = world;
        setTimeout(() => {
            this.checkWinOrLoose();
        },1000)
    }

    /**
     * Checks and returns the list of enemies, ensuring the copy is updated.
     * @param {Array<Enemy>} enemies - List of enemies.
     * @returns {Array<Enemy>} Updated list of enemies.
     */
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

    /**
     * Checks and returns the list of collectable objects, ensuring the copy is updated.
     * @param {Array<Collectable>} collectableObjects - List of collectable objects.
     * @returns {Array<Collectable>} Updated list of collectable objects.
     */
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

    /**
     * Saves the collectable objects if they are not already saved and returns the provided enemies and collectable objects.
     * @param {Array} enemies - Array of enemy objects.
     * @param {Array} collectableObjects - Array of collectable objects.
     * @returns {Object} The enemies and collectableObjects arrays.
     */
    checkSavedObjects(enemies, collectableObjects) {
        if(this.copyOfCollectableObjects.length == 0) {
            collectableObjects.forEach(object => {
                this.copyOfCollectableObjects.push(object)
            });
        }
        return enemies, collectableObjects
    }

    /**
     * Checks if the player has won or lost the level.
     * Plays appropriate sound and starts win/lose checking intervals.
     */
    checkWinOrLoose() {
        this.audioHome.pause();
        this.audioHome.currentTime = 0;
        this.audioGame.play();
        if (this.checkWinInterval) {
            clearInterval(this.checkWinInterval);
            world.level.win = undefined;
        }
        this.checkWinInterval = setInterval(() => {
            this.isLevelWin();
            this.isLevelLost();
        }, 200);
    }

    /**
     * Checks if the level is won. If so, handles the win, stops the game, and resets certain game states.
     * @returns {void}
     */
    isLevelWin() {
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
            },8000)
            setTimeout(() => {
                world.stopGame();
            }, 9000)
        }
    }

    /**
     * Checks if the level is lost. If so, handles the loss, stops the game, and resets certain game states.
     * @returns {void}
     */
    isLevelLost() {
        if (world.level.win === false) {
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
            },8000);
           setTimeout(() => {
            world.stopGame();
           }, 9000)
        }
    }

    /**
     * Saves the current level status in local storage when the level is won.
     */
    saveWonLevel() {
        let currentLevel = JSON.parse(localStorage.getItem('polloLevelActive'));
        if (currentLevel == 1) {
            localStorage.setItem('polloLevel2Open', JSON.stringify(true));
        }
        if (currentLevel == 2) {
            localStorage.setItem('polloLevel3Open', JSON.stringify(true));
        }
        localStorage.setItem('polloLevelActive', JSON.stringify(null));
    }

    /**
     * Checks which levels are open and updates the UI accordingly.
     */
    checkOpenLevel() {
        if (JSON.parse(localStorage.getItem('polloLevel1Open')) == true) {
            document.getElementById('level-1-button').classList.remove('level-closed');
        }
        setTimeout(() => {
            if (JSON.parse(localStorage.getItem('polloLevel2Open')) == true) {
                document.getElementById('level-2-button').classList.remove('level-closed');
            }
        },300)
        setTimeout(() => {
            if (JSON.parse(localStorage.getItem('polloLevel3Open')) == true) {
                document.getElementById('level-3-button').classList.remove('level-closed');
            }
        },600)
    } 
    
    /**
     * Handles actions when the level is won, including displaying win messages and saving level progress.
     */
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
            this.prepareHomeScreen();
        }, 8000);
        setTimeout(() => {
            this.checkOpenLevel();
        }, 10000)
    }

    /**
     * Prepares the home screen after a level is won, including resetting UI and playing home screen music.
     */
    prepareHomeScreen() {
        document.getElementById('overlay-messages').style.display = 'none';
        document.getElementById('img-msg-win').style.display = 'none';
        document.getElementById('level-1-button').classList.add('level-closed');
        document.getElementById('level-2-button').classList.add('level-closed');
        document.getElementById('level-3-button').classList.add('level-closed');
        this.audioHome.play();
    }
    
    /**
     * Handles actions when the level is lost, including displaying lose messages and stopping the game.
     */
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
            this.prepareHomeScreen();
        }, 6000);
        setTimeout(() => {
            this.checkOpenLevel();
        }, 8000)
    }
}