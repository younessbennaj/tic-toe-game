//We need to import our Tile class
import { Tile } from './tile.js';
//Get our sprite image
var sprite = document.getElementById("sprite");

// Our Board class that create an instance of a board game
class Board {
    constructor(ctx, dim) {
        //Drawing context
        this.ctx = ctx;
        //Board dimensions (e.g: 3 * 3 gird)
        this.dim = dim;
        //Board height 
        this.height = this.ctx.canvas.height;
        //Board width
        this.width = this.ctx.canvas.width;
        //tile height
        this.tileH = this.height / this.dim;
        //tile width
        this.tileW = this.width / this.dim;
        //Board's tiles
        this.tiles = [];
        //Current clicked tile
        this.currentTile = { coord: {}, isClicked: false };

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
        this.currentPlayer = this.players[0];
        this.setCurrentPlayerMessage(this.currentPlayer);
        this.setScore(this.players);

        let that = this;

        /*/
            => Why are we using an arrow function here ?

            Arrow function are not only syntactic sugar. It change the way 'this'
            is binded inside the function. 

            Actually, 'this' inside the arrow function is bind to 'this' in the 
            parent context. 
            
            It means that unlike classic function, the value of this don't depend on
            the way the function is called. 'this' in an arrow function always has
            the value it had when the function was defined.

            So, in our case the arrow function stored in clickOnBoard variable will
            be called when a click event is triggered. Unsually when a classic function
            is called as an event handler by the addEventListener() method, there is some 
            code inside the JS engine that bind 'this' to a value that represent the current
            cliked element (in our case the canvas element). But thanks to arrow function
            we can avoid this behavior and 'this' keep reference to the value of this
            inside the init() method.
            
            That's it ! 
        /*/

        //Handler to call when a "click" event is triggered on the canvas element
        let clickOnBoard = () => {

            //Process to set the current player
            // (() => {
            //     if (this.round % 2 === 0) this.currentPlayer = this.players[0]
            //     else this.currentPlayer = this.players[1]
            // })();

            //process to mark a tile and update attributes
            (() => {
                //tileX and tileY => give coord of the clicked tile (e.g: (0, 1))
                let tileX = Math.ceil(event.offsetX / this.tileW) - 1; //x-axis 
                let tileY = Math.ceil(event.offsetY / this.tileH) - 1; //y-axis
                //get current tile object coord
                let { coord } = this.currentTile;
                //check if the current tile object isn't the clicked tile
                if (coord.x !== tileX || coord.y !== tileY) {
                    //retrieve the clicked tile in the tiles data structure
                    this.currentTile = this.tiles.find(function (element) {
                        return element.coord.x === tileX && element.coord.y === tileY;
                    });
                    //If this tile isn't already clicked, fill this tile and finish the round
                    if (!this.currentTile.isClicked) {
                        this.currentTile.isClicked = true;
                        this.currentTile.clickedBy = this.currentPlayer;
                        this.currentPlayer.updateGameModel(this.currentTile);
                        //this.fillTile(this.currentTile);
                        this.drawImage(this.currentTile, this.currentPlayer);
                        this.setRound(++this.round);
                    }
                }
            })();

            // => Check if there is any winning arrangement for a given grid arrangement
            (() => {

                //Get the game arrangement of the current player
                let { game } = this.currentPlayer;

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
                this.currentPlayer.hasWon = isWonVertical(game) || isWonDiagonal(game) || isWonHorizontal(game);

            })()


            //Check if the current player has won the game
            if (this.currentPlayer.hasWon) {
                //Increment the score of the current player
                this.currentPlayer.score++;
                //Set a winning message for the current player
                this.setMessage(`${this.currentPlayer.name} has won the game !`);
                //End the game
                this.endGame();
            } else {
                //If there is no winning arrangement, then ...

                //Check if the game is over
                if (this.round === 9) {
                    //Set a message that says to the players that there is a draw
                    this.setMessage("It was a draw");
                    //End the game
                    this.endGame();
                };

                //Set the next current player and go to the next round
                if (this.round % 2 === 0) this.currentPlayer = this.players[0]
                else this.currentPlayer = this.players[1]
                this.setCurrentPlayerMessage(this.currentPlayer);
            }
        }
        //Add our handler to the click event listener on the drawing context instance
        this.ctx.canvas.addEventListener('click', clickOnBoard);
    }

    drawImage(tile, player) {
        let { x, y } = tile.coord;
        let dx = x * this.tileW;
        let dy = y * this.tileH;

        if (player.isXPlayer) {
            this.ctx.drawImage(sprite, 10, 10, 120, 120, dx, dy, 90, 90); //X
        } else {
            this.ctx.drawImage(sprite, 182, 182, 138, 138, dx, dy, 90, 90); //O
        }
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
                    x: (((this.tileW * i) / this.width) * this.dim) - 1,
                    y: (((this.tileH * j) / this.height) * this.dim) - 1
                }));
            }
        }
    }

    endGame() {
        //Display the score
        this.setScore(this.players);

        let modal = document.getElementById("resultModal");
        // this.setMessage(`${this.currentPlayer.name} has won the game !`);
        modal.style["animation-name"] = "fadein";
        modal.style.display = "grid";
        //Wait 3s until reset the game
        setTimeout(() => {
            this.resetGame();
            modal.style["animation-name"] = "fadeout";
            setTimeout(() => {
                //At the end of the animation...

                //clear the inline style props
                modal.style.display = "";
                modal.style["animation-name"] = "";
            }, 2000);
        }, 3000)
    }

    resetGame() {
        //Reset some of the convas propreties 
        this.tiles = [];
        this.currentTile = { coord: {}, isClicked: false };
        this.round = 0;
        //Reset the current player to the first player
        this.currentPlayer = this.players[0];
        this.setCurrentPlayerMessage(this.currentPlayer);

        //Clear all the drawing elements in the canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        //Re-build the tiles data-stucture 
        this.buildTiles();
        //Re-draw the tiles
        this.drawTiles();
        //Clear the message element
        this.setMessage('');
        //Reset the round counter to 0
        this.setRound(this.round);

        //Reset Players Scores 
        for (let player of this.players) {
            player.resetScore();
        }
    }

    setScore(players) {
        const firstPlayerName = document.getElementById("firstPlayerName");
        const secondPlayerName = document.getElementById("secondPlayerName");
        const firstPlayerScore = document.getElementById("firstPlayerScore");
        const secondPlayerScore = document.getElementById("secondPlayerScore");
        const [player1, player2] = players;
        firstPlayerName.innerHTML = player1.name;
        secondPlayerName.innerHTML = player2.name;
        firstPlayerScore.innerHTML = player1.score;
        secondPlayerScore.innerHTML = player2.score;
    }

    setMessage(message) {
        let resultMessage = document.getElementById('resultMessage');
        resultMessage.innerHTML = message;
    }

    setRound(round) {
        let roundCounter = document.getElementById("roundCounter");
        roundCounter.innerHTML = round;
    }

    setCurrentPlayerMessage(player) {
        let messagePlayer = document.getElementById('messagePlayer');
        messagePlayer.innerHTML = `Go ${player.name}`;
    }
}

export { Board };