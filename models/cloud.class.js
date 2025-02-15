class Cloud extends MovableObject {
    x = 100 + Math.random() * 200;
    y = 30;
    height = 260;
    width = 400;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
      
    }
    

}