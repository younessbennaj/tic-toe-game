class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        //Represent the game played by the player from a logic point of view
        //model data of the game played by the player
        this.game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        //
        this.hasWon = false;
    }

    //updateGameModel => pass value to "true" when the player clicked on a tile
    updateGameModel(tile) {
        //get tile coord to update the corresponding value in the data-structure
        let { x, y } = tile.coord;
        //update the model data-structure 
        this.game[x][y] = 1;
    }

    static getPossibleVertex(position, element) {
        return Math.pow(position, element);
    }
}

export { Player };