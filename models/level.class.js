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
        let interval = setInterval(() => {
            if (this.win == true) {
                setTimeout(() => {
                    console.log('gewonnen');
                    document.getElementById('overlay-messages').style.display = 'block';
                    document.getElementById('img-msg-win').style.display = 'block';
                },2000)
                clearInterval(interval)
                setTimeout(() => {
                    document.getElementById('overlay-messages').style.display = 'none';
                    document.getElementById('img-msg-win').style.display = 'none';
                }, 7000);
                return
            } else if (this.win == false) {
                setTimeout(() => {
                    console.log('verloren');
                    document.getElementById('overlay-messages').style.display = 'block';
                    document.getElementById('img-msg-loose').style.display = 'block';
                },2000)
                clearInterval(interval)
                setTimeout(() => {
                    document.getElementById('overlay-messages').style.display = 'none';
                    document.getElementById('img-msg-loose').style.display = 'none';
                }, 7000);
                return
            }
        },200)
    }
}