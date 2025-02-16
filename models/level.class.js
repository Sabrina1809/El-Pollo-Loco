class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 1800;
    endboss;

    constructor(enemies, clouds, backgroundObjects, endboss) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }

}