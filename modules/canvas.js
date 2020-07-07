// => get a Canvas instance with a property .ctx that refers to the drawing context
//create. 

class Canvas {
    constructor(width, height, id, parent) {
        //The canvas drawing context
        this.ctx = null;
        //Id of the canvas html element
        this.id = id;
        //Parent element in the document to append our canvas element
        this.parent = parent;
        //Width and a height for the canvas element
        this.width = width;
        this.height = height;
    }

    init() {
        //initialize our canvas element and create a drawing context
        let canvas = document.createElement('canvas'); //return en Element() instance (see property and methods)
        //Add it an Id attribute
        canvas.id = this.id;
        //Set a width and a height for the canvas element
        canvas.width = this.width;
        canvas.height = this.height;
        //Append the canvas element to the parent node in the DOM
        this.parent.append(canvas);
        //Create a new drawing context
        this.ctx = canvas.getContext("2d");
    }
}
export { Canvas };