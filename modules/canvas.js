// => get a Canvas instance with a property .ctx that refers to the drawing context
//create. 

class Canvas {
    constructor(parent) {
        this.ctx = null;
        //parent element in the document to append our canvas element
        this.parent = parent;
    }

    init() {
        //initialize our canvas element and create a drawing context
        let canvas = document.createElement('canvas');
        this.parent.append(canvas);
        this.ctx = canvas.getContext("2d");
    }
}
export { Canvas };