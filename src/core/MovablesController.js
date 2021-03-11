import {gsap} from "gsap"

// define classes for movables and landings
export const MOVABLES_CLASS_NAME = "movable"
export const LANDINGS_CLASS_NAME = "landing"


// helper function to create movables for given landing elements
export const createMovables = (landings, id, movablesClasses) => {
    // gsap to array util methdo
    let movables = []
    landings.forEach((landing, idx) => {

        const movable = document.createElement("div")
        movable.id = getMovableID(landing, id, idx)
        movable.classList.add(...[...movablesClasses, MOVABLES_CLASS_NAME])
        landing.appendChild(movable)
        movables.push(movable)

    })
    return movables;
}

// helper function to create the id for movables (used in createMovables)
const getMovableID = (landing, idPrep, idx) => {
    return (typeof idPrep === 'string' || idPrep instanceof String) ? `${idPrep}-${idx}` : idPrep(landing, idx); 
}


// A DataClass to manage movables once they are created
export class MovablesCollector{
    constructor(movables, rows=1, cols=movables.length){
        this.movables = movables;
        this.rows = rows;
        this.cols = cols;
    }


    getRow(rowIndex){
        if(rowIndex < 0 || rowIndex >= this.rows) throw new Error(`MovablesCollector Out of Bounds: row=${colIndex}. Valid row indeces are 0-${this.rows-1}`)
        return this.movables.slice(rowIndex * this.cols, rowIndex * this.cols + this.cols)
    }

    getCol(colIndex){
        if(colIndex < 0 || colIndex >= this.cols) throw new Error(`MovablesCollector Out of Bounds: col=${colIndex}. Valid column indeces are 0-${this.cols-1}`)

        return this.movables.reduce((colArray, movable, idx) => {
            return idx % this.cols == colIndex ? [...colArray, movable] : colArray;
        }, [])
    }

    get(rowIndex, colIndex){
        if(rowIndex < 0 || colIndex < 0 || rowIndex >= this.rows || colIndex >= this.cols)
            throw new Error(`MovablesCollector Out of Bounds: no movable with row=${rowIndex}, col=${colIndex} found.`)

        return this.movables[rowIndex * this.cols + colIndex];
    }

    getMovables(){
        return this.movables
    }
}

export const getDimensions = (el) => {
    let b = el.getBoundingClientRect(),
    getProp = gsap.getProperty(el);

    return {
        sx: getProp("scaleX"),
        sy: getProp("scaleY"),
        x: getProp("x"),
        y: getProp("y"),
        l: b.left,
        t: b.top,
        w: parseFloat(getProp("width", "px")),
        h: parseFloat(getProp("height", "px")),
        bw: b.width,
        bh: b.height,
        css: el.style.cssText,
        origin: getComputedStyle(el).transformOrigin.split(" ").map(parseFloat)
    }
}


// main controller for all movables (need to be registered)
class MovablesController{
    constructor(){
        this.movedElements = {}
    }

    // register moved element during timeline creation to indicate it's need to be reset
    registerMovedElement(element){
        if(element.id in this.movedElements) return;
        element.dataset.ogParent = element.parentNode.id;
        this.movedElements[element.id] = element
    }

    // resets the elements moved in the creation of the timeline back to it's original parents
    resetMovedElement(){
        console.log("reset moved")
        Object.keys(this.movedElements).map(key => {
            const movable = this.movedElements[key]
            const ogParent = document.getElementById(movable.dataset.ogParent)
            ogParent.appendChild(movable)
        })
    }
}


// singelton export
export default new MovablesController();