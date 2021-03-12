import Component from "./Component"

import {createMovables, MovablesCollector} from "../core/MovablesController"

const GRID_CLASS_NAME = "rijndael-grid"

class Grid extends Component{
    constructor(containerID, rows, cols, landingClasses){
        super(containerID)
        this.rows = rows;
        this.cols = cols;
     

        this.landingClasses = [...landingClasses, "landing"]

        this.cells = []

        this.init()
    }

    init(){

        // add grid classes and row
        this.component.classList.add(GRID_CLASS_NAME)
        this.component.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
        this.component.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;

        for(let rowIndex = 0; rowIndex < this.rows; rowIndex++){
            for(let colIndex = 0; colIndex < this.cols; colIndex++){
                
                const cell = document.createElement("div");
                cell.classList.add(...this.landingClasses)
                cell.id = `${this.id}-cell-${rowIndex}-${colIndex}`
                // id ?

                this.component.appendChild(cell)
                this.cells.push(cell)
            }
        }
    }

    createMovables = (id, movablesClasses) => {
        const movables = createMovables(this.cells, id, movablesClasses)
        return new MovablesCollector(movables, this.rows, this.cols)
    }

    getRow(rowIndex){
        if(rowIndex < 0 || rowIndex >= this.rows) throw new Error(`Grid Out of Bounds: row=${colIndex}. Valid row indeces are 0-${this.rows-1}`)
        return this.cells.slice(rowIndex * this.cols, rowIndex * this.cols + this.cols)
    }

    getCol(colIndex){
        if(colIndex < 0 || colIndex >= this.cols) throw new Error(`Grid Out of Bounds: col=${colIndex}. Valid column indeces are 0-${this.cols-1}`)

        return this.cells.reduce((colArray, cell, idx) => {
            return idx % this.cols == colIndex ? [...colArray, cell] : colArray;
        }, [])
    }

    getCell(rowIndex, colIndex){
        
        return this.cells[rowIndex * this.cols + colIndex]
    }
}


export default Grid