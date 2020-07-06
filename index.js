//get Canvas element
let canvas = document.getElementById("myCanvas");

//get the drawing context
let context = canvas.getContext("2d");

/*/UI Element/*/

//UI element that display the current round 
let roundCounter = document.getElementById("roundCounter");

//UI element that display the result of the game
let resultMessage = document.getElementById("resultMessage");

/*/
    *** BOARD CLASS ***
/*/

class Board {
    constructor(ctx, dim) {
        /*/Board/*/

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

            //checkIfWin

            (function checkIfWin() {
                let { game } = that.currentPlayer;

                console.log(Player.getPossibleVertex(game.length, that.dim));
                //Vérifie si il y'a un gagnant
                //check if there is any winning arrangement

                /*/
                    *** Pseudo code ***

                    input: tiles an array of Tile object

                /*/
                // for (let tile of tiles) {
                //     let { clickedBy: player, coord: { x, y } } = tile;
                // }

            })()

            //Check if the game is over
            if (that.round === 9) resultMessage.innerHTML = "GAME OVER";

        }

        this.ctx.canvas.addEventListener('click', clickOnBoard);
    }

    drawTiles() {
        //Draw tiles in the convas
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
        //Draw a fill rect
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

//Tile class
class Tile {
    constructor(coord) {
        this.coord = coord;
        this.color = "white";
        this.isClicked = false;
        this.clickedBy = {};
    }
}

//Player class
class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        //Represent the game played by the player from a logic point of view
        //model data of the game played by the player
        this.game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
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

let player1 = new Player("player1", "Aquamarine");
let player2 = new Player("player1", "Coral");

//New instance of the board
let board = new Board(context, 3);
board.players.push(player1, player2);
//init
board.init();
