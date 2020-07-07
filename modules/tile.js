//Our Tile() class to create new instance of a tile
class Tile {
    constructor(coord) {
        this.coord = coord;
        this.color = "white";
        this.isClicked = false;
        this.clickedBy = {};
    }
}

export { Tile };
