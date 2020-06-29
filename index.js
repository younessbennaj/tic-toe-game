//get Canvas element
let canvas = document.getElementById("myCanvas");

//get the drawing context
let context = canvas.getContext("2d");

/*/
    *** BOARD CLASS ***
/*/

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
        this.currentTile = {};
        //Style
        this.tileColor = "orangered";
    }

    init() {

        this.ctx.fillStyle = this.tileColor;
        this.drawTiles();
        this.buildTiles();

        let that = this;

        //Click event on the board game
        function clickOnBoard(event) {
            var cursorPosition = {
                x: event.offsetX,
                y: event.offsetY
            };

            let tileX = Math.ceil(cursorPosition.x / that.tileW) - 1;
            let tileY = Math.ceil(cursorPosition.y / that.tileH) - 1;

            that.currentTile = that.tiles.find(function (element) {
                return element.coord.x === tileX && element.coord.y === tileY;
            });

            that.currentTile.color = that.tileColor;

            that.fillTile(that.currentTile);
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
    }
}

//New instance of the board
let board = new Board(context, 4);
//init
board.init();
