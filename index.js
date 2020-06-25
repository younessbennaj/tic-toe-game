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
    }
}
