
import Component from "./Component"
import Grid from "./Grid"
import DataController from "../core/DataController"

class GridOverview extends Component{
    constructor(id){
        super(id)

        this.rows = []
    }


    addGridRow(rowIndex,title, info=[]){

        // create title
        const rowTitle = document.createElement("div")
        rowTitle.classList.add("rijndael-grid-overview__row-title")
        rowTitle.innerHTML = title;
        rowTitle.style.gridArea = `${rowIndex} / 1 / ${rowIndex} /  1`
        this.component.appendChild(rowTitle)


        let rowGrids = []

        const defaultInfo = {
            dataKey: "dummyGrid",
            classes: ["rijndael-movable-cell", "rijndael-movable-cell--yellow"]
        }

        // create first 4 grids
        for(let i = 0; i < 4; i++){
            const {classes, dataKey} = info.length > i ? {...defaultInfo, ...info[i]} : defaultInfo;

            const gridContainerContainer = document.createElement("div")
            gridContainerContainer.style.gridArea = `${rowIndex}  / ${2 + i}/ ${rowIndex}/  ${2 + i}  `
            gridContainerContainer.classList.add("rijndael-grid-overview__grid")

            const gridContainer = document.createElement("div")
            gridContainer.id = `${this.id}-row-${rowIndex}-grid-${i}`;
            gridContainer.style.width = "max-content";
            
            gridContainerContainer.appendChild(gridContainer)
            this.component.appendChild(gridContainerContainer)

            const grid = new Grid(gridContainer.id, 4, 4, ["rijndael-cell", "rijndael-cell--tiny"])
            const movables = grid.createMovables(`${grid.id}-movables`, classes)
            if(dataKey)
                DataController.subscribe(dataKey, movables.movables)


            rowGrids.push(gridContainerContainer)
        }

        // create symbols

        const addSymbolContainer = document.createElement("div")

        const addSymbol = document.createElement("div")
        addSymbol.innerHTML = "+"
        addSymbol.classList.add("rijndael-grid-overview__add-symbol")

        addSymbolContainer.classList.add("rijndael-grid-overview__add-symbol-container")
        addSymbolContainer.style.gridArea = `${rowIndex} / 6 /  ${rowIndex} / 6 `;
        addSymbolContainer.appendChild(addSymbol)
        this.component.appendChild(addSymbolContainer)

        const equalsSymbol = document.createElement("div")
        equalsSymbol.innerHTML = "="
        equalsSymbol.classList.add("rijndael-grid-overview__equals-symbol")
        equalsSymbol.style.gridArea = `${rowIndex} / 8 / ${rowIndex} /  8 `;
        this.component.appendChild(equalsSymbol)


        // create last grid
        const {classes, dataKey} = info.length >= 5 ? {...defaultInfo, ...info[4]} : defaultInfo;

        const gridContainerContainer = document.createElement("div")
        gridContainerContainer.style.gridArea = `${rowIndex}  / 7/ ${rowIndex}/  7 `
        gridContainerContainer.classList.add("rijndael-grid-overview__grid")

        const gridContainer = document.createElement("div")
        gridContainer.id = `${this.id}-row-${rowIndex}-grid-7`;
        gridContainer.style.width = "max-content";
        
        gridContainerContainer.appendChild(gridContainer)
        this.component.appendChild(gridContainerContainer)

        const grid = new Grid(gridContainer.id, 4, 4, ["rijndael-cell", "rijndael-cell--tiny"])
        const movables = grid.createMovables(`${grid.id}-movables`, classes)
        if(dataKey)
                DataController.subscribe(dataKey, movables.movables)
        rowGrids.push(gridContainerContainer)


        this.rows.push([rowTitle, ...rowGrids, addSymbol, equalsSymbol])
    }



}

export default GridOverview;