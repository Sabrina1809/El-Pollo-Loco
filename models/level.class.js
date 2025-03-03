class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2000;
    collectableObjects;
    statusBars;
    win;

    constructor(enemies, clouds, backgroundObjects, collectableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
        this.checkWinOrLoose()
    }

    checkWinOrLoose() {
        // this.win;
        let interval = setInterval(() => {
            if (this.win == true) {
                setTimeout(() => {
                    console.log('gewonnen');
                    document.getElementById('overlay-messages').style.display = 'block';
                    document.getElementById('img-msg-win').style.display = 'block';
                },2000)
                clearInterval(interval)
                return
            } else if (this.win == false) {
                setTimeout(() => {
                    console.log('verloren');
                    document.getElementById('overlay-messages').style.display = 'block';
                    document.getElementById('img-msg-loose').style.display = 'block';
                },2000)
                clearInterval(interval)
                return
            }
        },200)
    }
}