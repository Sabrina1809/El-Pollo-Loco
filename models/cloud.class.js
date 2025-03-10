class Cloud extends MovableObject {
    y = 30;
    height = 260;
    width = 400;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 1700 + 300;
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            this.moveLeft(0.2);
        }, 1000 / 60); 
    }
}