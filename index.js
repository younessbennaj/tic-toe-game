//Import our Canvas class
import { Canvas } from './modules/canvas.js';
//Import our Board class
import { Board } from './modules/board.js';
//Import our Player class
import { Player } from './modules/player.js';

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

//Create 2 new instances of Player to represent our players
let player1 = new Player("player1", "Aquamarine");
let player2 = new Player("player1", "Coral");

//Add those players to the .players property of the board new intance
board.players.push(player1, player2);

/*/

    board.init() => initialize our board. 

        1) Draw the grid in the canvas element

        2) Build the tile data structure to represent our grid in term of
        logic. 

        3) Add an complex handler to handle click event on the canvas element

/*/
board.init();




