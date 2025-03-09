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
        enemies = [];
        this.copyOfEnemies.forEach(enemy => {
            enemies.push(enemy)
        })

        return enemies
    }

    checkCollObj(collectableObjects) {
        // console.log('checkCollObj erreicht');

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
        let interval = setInterval(() => {
            if (this.win == true) {
                console.log(world.level.enemies);
                world.level.enemies = [];
                console.log(world.level.enemies);
                world.stopGame();
                setTimeout(() => {
                    console.log('gewonnen');
                    console.log('collisionInterval', world.collisionInterval);
                    clearInterval(world.collisionInterval)
                    console.log('collisionInterval', world.collisionInterval);
                    document.getElementById('overlay-messages').style.display = 'block';
                    document.getElementById('img-msg-win').style.display = 'block';
                },1000)
                clearInterval(interval)
                setTimeout(() => {
                    document.getElementById('overlay-messages').style.display = 'none';
                    document.getElementById('img-msg-win').style.display = 'none';
                    world.stopGame(world.intervalIds);
                }, 6000);
                return
            } else if (this.win == false) {
                console.log('übrige enemies vor Löschen', world.level.enemies);
                world.level.enemies = [];
                console.log('übrige enemies nach Löschen', world.level.enemies);
                world.stopGame();
                setTimeout(() => {
                    console.log('verloren');
                    console.log('collisionInterval', world.collisionInterval);
                    clearInterval(world.collisionInterval)
                    console.log('collisionInterval', world.collisionInterval);
                    document.getElementById('overlay-messages').style.display = 'block';
                    document.getElementById('img-msg-loose').style.display = 'block';
                },1000)
                clearInterval(interval)
                setTimeout(() => {
                    document.getElementById('overlay-messages').style.display = 'none';
                    document.getElementById('img-msg-loose').style.display = 'none';

                }, 6000);
                return
            }
        },200)
    }
}