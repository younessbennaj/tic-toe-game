//get Canvas element
//let canvas = document.getElementById("myCanvas");

//get the drawing context
//let context = canvas.getContext("2d");

/*/UI Element/*/

//UI element that display the current round 
//let roundCounter = document.getElementById("roundCounter");

//UI element that display the result of the game
//let resultMessage = document.getElementById("resultMessage");

/*/
    *** BOARD CLASS ***
/*/

// class Board {
//     constructor(ctx, dim) {
//         /*/Board/*/

//         //Drawing context
//         this.ctx = ctx;
//         //Board dimensions (e.g: 3 * 3 gird)
//         this.dim = dim;
//         //tile height
//         this.tileH = this.ctx.canvas.height / this.dim;
//         //tile width
//         this.tileW = this.ctx.canvas.width / this.dim;
//         //Board's tiles
//         this.tiles = [];
//         //Current clicked tile
//         this.currentTile = { coord: {}, isClicked: false };
//         //Style
//         this.tileColor = "orangered";

//         /*/Game props/*/
//         this.round = 0;
//         //players list
//         this.players = [];
//         //current player 
//         this.currentPlayer = {};
//     }

//     init() {

//         this.ctx.fillStyle = this.tileColor;
//         this.drawTiles();
//         this.buildTiles();

//         let that = this;

//         //Click event on the board game
//         function clickOnBoard(event) {
//             //process to set the current player
//             (function setPlayer() {
//                 if (that.round % 2 === 0) that.currentPlayer = that.players[0]
//                 else that.currentPlayer = that.players[1]
//                 that.ctx.fillStyle = that.currentPlayer.color;
//             })();

//             //process to mark a tile with a X or a O
//             (function markTile() {
//                 //tileX and tileY => give coord of the clicked tile (e.g: (0, 1))
//                 let tileX = Math.ceil(event.offsetX / that.tileW) - 1; //x-axis 
//                 let tileY = Math.ceil(event.offsetY / that.tileH) - 1; //y-axis
//                 //get current tile object coord
//                 let { coord } = that.currentTile;
//                 //check if the current tile object isn't the clicked tile
//                 if (coord.x !== tileX || coord.y !== tileY) {
//                     //retrieve the clicked tile in the tiles data structure
//                     that.currentTile = that.tiles.find(function (element) {
//                         return element.coord.x === tileX && element.coord.y === tileY;
//                     });
//                     //If this tile isn't already clicked, fill this tile and finish the round
//                     if (!that.currentTile.isClicked) {
//                         that.currentTile.color = that.currentPlayer.color;
//                         that.currentTile.isClicked = true;
//                         that.currentTile.clickedBy = that.currentPlayer;
//                         that.currentPlayer.updateGameModel(that.currentTile);
//                         that.fillTile(that.currentTile);
//                         roundCounter.innerHTML = ++that.round;
//                     }
//                 }
//             })();

//             //checkIfWin

//             (function isWon() {
//                 let { game } = that.currentPlayer;

//                 function isWonVertical(arrays) {
//                     for (var i = 0; i < 3; i++) {
//                         if (arrays[0][i] && arrays[1][i] && arrays[2][i]) return true
//                     }
//                     return false;
//                 }

//                 function isWonDiagonal(arrays) {
//                     if (arrays[0][0] && arrays[1][1] && arrays[2][2]) return true;
//                     if (arrays[0][2] && arrays[1][1] && arrays[2][0]) return true;
//                     return false;
//                 }

//                 function isWonHorizontal(arrays) {
//                     for (var i = 0; i < 3; i++) {
//                         if (arrays[i][0] && arrays[i][1] && arrays[i][2]) return true;
//                     }
//                     return false;
//                 }

//                 that.currentPlayer.hasWon = isWonVertical(game) || isWonDiagonal(game) || isWonHorizontal(game);

//             })()

//             //Check if the game is over
//             if (that.round === 9) resultMessage.innerHTML = "GAME OVER";

//             //Check if the current player has won the game
//             if (that.currentPlayer.hasWon) {
//                 resultMessage.innerHTML = `Congrats ! ${that.currentPlayer.name} has won the game !`
//             }

//         }

//         this.ctx.canvas.addEventListener('click', clickOnBoard);
//     }

//     drawTiles() {
//         //Draw tiles in the convas
//         for (var i = 0; i < this.dim; i++) {
//             for (var j = 0; j < this.dim; j++) {
//                 this.ctx.strokeRect(
//                     i * this.tileW,
//                     j * this.tileH,
//                     this.tileW,
//                     this.tileH);
//             }
//         }
//     }

//     fillTile(tile) {
//         //x-axis and y-axis coordinates of the rectangle's starting point
//         var rectX = this.tileW * tile.coord.x;
//         var rectY = this.tileH * tile.coord.y;
//         //Draw a fill rect
//         this.ctx.fillRect(rectX, rectY, (this.tileW), (this.tileH));
//     }

//     buildTiles = function () {

//         for (var i = 1; i < this.dim + 1; i++) {

//             for (var j = 1; j < this.dim + 1; j++) {
//                 //tiles data structure => array of Tile() object
//                 this.tiles.push(new Tile({
//                     x: (((this.tileW * i) / this.ctx.canvas.width) * this.dim) - 1,
//                     y: (((this.tileH * j) / this.ctx.canvas.height) * this.dim) - 1
//                 }));
//             }
//         }
//     }
// }

//Tile class
// class Tile {
//     constructor(coord) {
//         this.coord = coord;
//         this.color = "white";
//         this.isClicked = false;
//         this.clickedBy = {};
//     }
// }

//Player class
// class Player {
//     constructor(name, color) {
//         this.name = name;
//         this.color = color;
//         //Represent the game played by the player from a logic point of view
//         //model data of the game played by the player
//         this.game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
//         //
//         this.hasWon = false;
//     }

//     //updateGameModel => pass value to "true" when the player clicked on a tile
//     updateGameModel(tile) {
//         //get tile coord to update the corresponding value in the data-structure
//         let { x, y } = tile.coord;
//         //update the model data-structure 
//         this.game[x][y] = 1;
//     }

//     static getPossibleVertex(position, element) {
//         return Math.pow(position, element);
//     }
// }

// let player1 = new Player("player1", "Aquamarine");
// let player2 = new Player("player1", "Coral");

// //New instance of the board
// let board = new Board(context, 3);
// board.players.push(player1, player2);
// //init
// board.init();

/*/

    => New code organisation start from here <=

/*/

//Import our Canvas class 
import { Canvas } from './modules/canvas.js';
//Import our Board class
import { Board } from './modules/board.js';

//Get our main container element that will receive a canvas element
let container = document.getElementById("game-container");

/*/
    new Canvas(width, height, id, parent) => create a new instance of the Canvas
    class.

    width (number)
    height (number)
    id (string)
    parent (Element() instance, DOM element)
/*/
let canvas = new Canvas(300, 300, "myCanvas", container);
//We call the init() method that append the canvas element in the parent node
//and create a drawing context.
canvas.init();

/*/
    new Board(ctx, dim) => Create a new instance of the Board Class

    ctx (Drawing Context element, CanvasRenderingContext2D() object)
    dim (number, the board dimension that we want (e.g: 3*3 grid)) 
/*/

//Create a new board with 3*3 dimension
let board = new Board(canvas.ctx, 3);

/*/

    .init() => initialize our board. 

        1) Draw the grid in the canvas element

        2) Build the tile data structure to represent our grid in term of
        logic. 

        3) Add an complex handler to handle click event on the canvas element

/*/
board.init();



