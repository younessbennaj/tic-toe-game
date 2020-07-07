// Our Board class that create an instance of a board game
class Board {
    constructor(ctx, dim) {
        //Drawing context
        this.ctx = ctx;
        //Board dimensions (e.g: 3 * 3 gird)
        this.dim = dim;
        //tile height
        this.tileH = this.ctx.canvas.height / this.dim;
        //tile width
        this.tileW = this.ctx.canvas.width / this.dim;
        //Board's tiles
        this.tiles = [];
        //Current clicked tile
        this.currentTile = { coord: {}, isClicked: false };
        //Style
        this.tileColor = "orangered";

        /*/Game props/*/
        this.round = 0;
        //players list
        this.players = [];
        //current player 
        this.currentPlayer = {};
    }

    init() {

        this.ctx.fillStyle = this.tileColor;
        this.drawTiles();
        this.buildTiles();

        let that = this;

        //Click event on the board game
        function clickOnBoard(event) {
            //process to set the current player
            (function setPlayer() {
                if (that.round % 2 === 0) that.currentPlayer = that.players[0]
                else that.currentPlayer = that.players[1]
                that.ctx.fillStyle = that.currentPlayer.color;
            })();

            //process to mark a tile with a X or a O
            (function markTile() {
                //tileX and tileY => give coord of the clicked tile (e.g: (0, 1))
                let tileX = Math.ceil(event.offsetX / that.tileW) - 1; //x-axis 
                let tileY = Math.ceil(event.offsetY / that.tileH) - 1; //y-axis
                //get current tile object coord
                let { coord } = that.currentTile;
                //check if the current tile object isn't the clicked tile
                if (coord.x !== tileX || coord.y !== tileY) {
                    //retrieve the clicked tile in the tiles data structure
                    that.currentTile = that.tiles.find(function (element) {
                        return element.coord.x === tileX && element.coord.y === tileY;
                    });
                    //If this tile isn't already clicked, fill this tile and finish the round
                    if (!that.currentTile.isClicked) {
                        that.currentTile.color = that.currentPlayer.color;
                        that.currentTile.isClicked = true;
                        that.currentTile.clickedBy = that.currentPlayer;
                        that.currentPlayer.updateGameModel(that.currentTile);
                        that.fillTile(that.currentTile);
                        roundCounter.innerHTML = ++that.round;
                    }
                }
            })();

            (function isWon() {
                // => Check if there is any winning arrangement for a given grid arrangement

                //Get the game arrangement of the current player
                let { game } = that.currentPlayer;

                //Is a winning arragement in vertical way?
                function isWonVertical(arrays) {
                    for (var i = 0; i < 3; i++) {
                        if (arrays[0][i] && arrays[1][i] && arrays[2][i]) return true
                    }
                    return false;
                }

                //Is a winning arragement in diagonal way?
                function isWonDiagonal(arrays) {
                    if (arrays[0][0] && arrays[1][1] && arrays[2][2]) return true;
                    if (arrays[0][2] && arrays[1][1] && arrays[2][0]) return true;
                    return false;
                }

                //Is a winning arragement in horizontal way?
                function isWonHorizontal(arrays) {
                    for (var i = 0; i < 3; i++) {
                        if (arrays[i][0] && arrays[i][1] && arrays[i][2]) return true;
                    }
                    return false;
                }

                //Is there any winning arrangement? 
                that.currentPlayer.hasWon = isWonVertical(game) || isWonDiagonal(game) || isWonHorizontal(game);

            })()

            //Check if the game is over
            if (that.round === 9) resultMessage.innerHTML = "GAME OVER";

            //Check if the current player has won the game
            if (that.currentPlayer.hasWon) {
                resultMessage.innerHTML = `Congrats ! ${that.currentPlayer.name} has won the game !`
            }

        }

        //Add our handler to the click event listener on the drawing context instance
        this.ctx.canvas.addEventListener('click', clickOnBoard);
    }

    drawTiles() {
        //Draw tiles in the convas for given dimensions and tiles width/height 
        for (var i = 0; i < this.dim; i++) {
            for (var j = 0; j < this.dim; j++) {
                this.ctx.strokeRect(
                    i * this.tileW,
                    j * this.tileH,
                    this.tileW,
                    this.tileH);
            }
        }
    }

    fillTile(tile) {
        //x-axis and y-axis coordinates of the rectangle's starting point
        var rectX = this.tileW * tile.coord.x;
        var rectY = this.tileH * tile.coord.y;
        //Draw a fill rect with the fillRect method of the drawing context instance
        this.ctx.fillRect(rectX, rectY, (this.tileW), (this.tileH));
    }

    buildTiles = function () {

        for (var i = 1; i < this.dim + 1; i++) {

            for (var j = 1; j < this.dim + 1; j++) {
                //tiles data structure => array of Tile() object
                this.tiles.push(new Tile({
                    x: (((this.tileW * i) / this.ctx.canvas.width) * this.dim) - 1,
                    y: (((this.tileH * j) / this.ctx.canvas.height) * this.dim) - 1
                }));
            }
        }
    }
}

export { Board };