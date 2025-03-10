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
        // console.log(enemies);
        
        this.enemies = this.checkEnemies(enemies);
        this.collectableObjects = this.checkCollObj(collectableObjects);
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.checkWinOrLoose()
    }

    checkEnemies(enemies) {
        // console.log('checkEnemies erreicht');
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

    // checkWinOrLoose() {
    //     let interval = setInterval(() => {
    //         console.log('Interval win or loose läuft', interval);
    //         if (this.win == true) {
    //             console.log(world.level.enemies);
    //             world.level.enemies = [];
    //             console.log(world.level.enemies);
    //             world.stopGame();
    //             setTimeout(() => {
    //                 // console.log('gewonnen');
    //                 // console.log('collisionInterval', world.collisionInterval);
    //                 // clearInterval(world.collisionInterval)
    //                 // console.log('collisionInterval', world.collisionInterval);
    //                 document.getElementById('overlay-messages').style.display = 'block';
    //                 document.getElementById('img-msg-win').style.display = 'block';
    //             },1000)
    //             console.log('Interwall wird jetzt gelöscht: ', interval);
    //             clearInterval(interval)
    //             console.log('Interwall wurde gelöscht: ', interval);
    //             setTimeout(() => {
    //                 document.getElementById('overlay-messages').style.display = 'none';
    //                 document.getElementById('img-msg-win').style.display = 'none';
    //                 world.stopGame(world.intervalIds);
    //             }, 6000);
    //             return
    //         } else if (this.win == false) {
         
                
    //             console.log('übrige enemies vor Löschen', world.level.enemies);
    //             world.level.enemies = [];
    //             console.log('übrige enemies nach Löschen', world.level.enemies);
    //             world.stopGame();
    //             setTimeout(() => {
    //                 console.log('verloren');
    //                 // console.log('collisionInterval', world.collisionInterval);
    //                 // clearInterval(world.collisionInterval)
    //                 // console.log('collisionInterval', world.collisionInterval);
    //                 document.getElementById('overlay-messages').style.display = 'block';
    //                 document.getElementById('img-msg-loose').style.display = 'block';
    //             },1000)
    //             console.log('Interwall wird jetzt gelöscht: ', interval);
    //             clearInterval(interval)
    //             console.log('Interwall wurde gelöscht: ', interval);
    //             setTimeout(() => {
    //                 document.getElementById('overlay-messages').style.display = 'none';
    //                 document.getElementById('img-msg-loose').style.display = 'none';
    //             }, 6000);
    //             return
    //         }
    //     },200)
    // }

    checkWinOrLoose() {
        console.log('checkWinOrLoose wurde aufgerufen');
        if (this.checkWinInterval) {
            clearInterval(this.checkWinInterval);
            console.log('Altes Intervall wurde gestoppt');
            world.level.win = undefined;
        }
    
        // Neues Intervall starten und speichern
        this.checkWinInterval = setInterval(() => {
            // console.log('Interval win or loose läuft', this.checkWinInterval);
           
            
            if (world.level.win === true) {
                console.log('this.win:', this.win);
                console.log('world.level.win:', world.level.win);
                this.handleWin();
                // this.win = null;
                setTimeout(() => {
                    world.level.win = undefined;
                    clearInterval(this.checkWinInterval);
                },2000)
              

            } else if (world.level.win === false) {
                console.log('this.win:', this.win);
                console.log('world.level.win:', world.level.win);
                this.handleLose();
                setTimeout(() => {
                    world.level.win = undefined;
                    clearInterval(this.checkWinInterval);
                },2000)

            }
        }, 200);
    }
    
    handleWin() {
        console.log('Spiel gewonnen!');
        console.log(world.character.checkMoveInterval);
        console.log(world.character.checkAnimationInterval);
        
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
        console.log('Spiel verloren!');
        console.log(world.character.checkMoveInterval);
        console.log(world.character.checkAnimationInterval);
        
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