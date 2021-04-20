
import Component from "./Component"
import Grid from "./Grid"
import {toHexString} from "../utils/conversions"

class LookupTable extends Component{
    constructor(id){
        super(id)
        this.grid = null;
        this.gridMovables = null;
        this.init();   
    }

    init(){
        this.component.classList.add("rijndael-lookup-table")

        const x = document.createElement("div")
        x.classList.add("rijndael-lookup-table__title")
        x.innerHTML = "hex"

        const xLegend = this.createLegend("x", ["rijndael-lookup-table__legend--x"])
        const yLegend = this.createLegend("y", ["rijndael-lookup-table__legend--y"])


        const gridContainer = document.createElement("div")
        gridContainer.id = `${this.id}-grid`

        this.component.appendChild(x)
        this.component.appendChild(yLegend)
        this.component.appendChild(xLegend)
        this.component.appendChild(gridContainer)

        this.grid = new Grid(gridContainer.id, 16, 16, ["rijndael-hex-grid-cell"])
    
        this.gridMovables = this.grid.createMovables(`${this.id}-grid-movables`, ["rijndael-sbox-cell"])
    }


    createLegend(label, classes){

        classes = ["rijndael-lookup-table__legend", ...classes]

        const container = document.createElement("div")
        container.classList.add(...classes)

        const labelDisplay = document.createElement("div")
        labelDisplay.classList.add("rijndael-lookup-table__legend-label")
        labelDisplay.innerHTML = label;

        const indicesContainer = document.createElement("div")
        indicesContainer.classList.add("rijndael-lookup-table__legend-cells")

        for(let i = 0; i < 16; i++){
            const legendIndex = document.createElement("div")
            legendIndex.classList.add("rijndael-lookup-table__legend-cell")
            legendIndex.innerHTML = toHexString(i);
            indicesContainer.appendChild(legendIndex)
        }

        container.appendChild(labelDisplay)
        container.appendChild(indicesContainer)

        return container;
    }


    getCell(rowIndex, colIndex){
        return this.grid.getCell(rowIndex, colIndex)
    }

    getRow(rowIndex){
        return this.grid.getRow(rowIndex)
    }

    getCol(colIndex){
        return this.grid.getRow(colIndex)
    }
}

export default LookupTable