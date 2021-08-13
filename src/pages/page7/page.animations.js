import {gsap} from "gsap"
import AnimationPage from "../../core/AnimationPage"
import Grid from "../../components/Grid"
import LookupTable from "../../components/LookupTable"
import {hexStringToInt} from "../../utils/conversions"


class Page7 extends AnimationPage{
    constructor(){
        super()
    }

    init(){
        const {grid, sbox} = this.pageElements

        // create grid + landings
        const gridLandings = new Grid(grid.id, 4,4 ,["rijndael-cell"])
        const gridMovables = gridLandings.createMovables("page-7-grid-movables", ["rijndael-movable-cell", "rijndael-movable-cell--alpha"])
        this.subscribeTo("after-initial-round", gridMovables.movables)

        const gridResultsMovables = gridLandings.createMovables("page-7-result-movables", ["rijndael-movable-cell", "rijndael-movable-cell--gamma"])
        this.subscribeTo("after-sub-bytes-1", gridResultsMovables.movables)
       
        // create sbox
        const Sbox = new LookupTable(sbox.id)  
        this.subscribeTo("sbox", Sbox.gridMovables.movables)

        this.addToPageElements({
            gridLandings,
            gridMovables,
            sbox,
            SBoxController: Sbox,
            gridResultsMovables

        })
    }

    createPreFadeIn(){
        const {
            animatableBackground,
            body,
            page,
            gridResultsMovables
        } = this.pageElements

    
        const tl = this.getPreFadeInTimeline();
        tl.set(this.page, {opacity: 0})
        tl.set(animatableBackground, {y: "100%"})
        tl.set([page, body, ...gridResultsMovables.movables], {opacity: 0})

        return tl;
    }

    createAnimationIn(){

        const {
            animatableBackground,
            animatableBackgroundBar,
            bar,
            titleMask,
            body,
            page,
        } = this.pageElements


        const barBounds = bar.getBoundingClientRect()

 
        const tl = gsap.timeline()

        // move in background
        tl.to(animatableBackground, {y: 0, duration: .8})

        // move bar down
        tl.to(animatableBackgroundBar, {y: barBounds.y})
        tl.set(animatableBackgroundBar, {opacity: 0})
        tl.set(page, {opacity: 1}, "<")

        // reveal title
        tl.to(titleMask, {x: "100%"})

        // show body
        tl.to(body, {opacity: 1})

        return tl;
    }

    createAnimationMain(){
        const {gridMovables, cellLanding, SBoxController, gridResultsMovables, gridLandings} = this.pageElements

        const firstCell = gridMovables.get(0, 0)
        const firstCellHex = firstCell.innerHTML;
     
        const sboxX = hexStringToInt(firstCellHex[0])
        const sboxY = hexStringToInt(firstCellHex[1])

        const row = SBoxController.gridMovables.getRow(sboxX)
        const column = SBoxController.gridMovables.getCol(sboxY)

        const sBoxLanding = SBoxController.grid.getCell(sboxX, sboxY)

        const tl = gsap.timeline();

  
        tl.set(gridMovables.movables, {opacity: 1})
        // move first cell above s-box
        tl.add(this.moveToLanding2(gridMovables.get(0, 0), gridLandings.cells[0], cellLanding, {duration: 1}))
     
  


       
        // highlight row / cols and move substitute to landing
        tl.to(row, {background: "#FFF997"})
        tl.to(column, {background: "#FFF997"})

        // premove element to sbox
        tl.add(this.moveToLanding2(gridResultsMovables.movables[0], gridLandings.cells[0], sBoxLanding, {duration: .0001})) 
        tl.set(gridResultsMovables.movables[0], {opacity: 1}) 


        tl.to(gridResultsMovables.movables[0], {opacity: 1})
        tl.to([...row, ...column], {background: "#fff"})

        
        tl.add(this.moveToLanding2(gridResultsMovables.movables[0], sBoxLanding, gridLandings.cells[0], {duration: 2}), "page-7-move-cell-back")
        tl.to(gridMovables.get(0, 0), {opacity: 0}, "<")



   
        // highlight s-box cells & reveal substituted table 
        for(let i = 1; i < gridResultsMovables.movables.length; i++){

            const cell = gridMovables.movables[i]
            const firstCellHex = cell.innerHTML;
            const sboxX = hexStringToInt(firstCellHex[0])
            const sboxY = hexStringToInt(firstCellHex[1])
   
            const movable = SBoxController.gridMovables.get(sboxX, sboxY)

            tl.to(movable, {background: "#FFCA61", duration: .02, delay: .5})
            tl.to(gridResultsMovables.movables[i], {opacity: 1, duration: .02}, "<")
            tl.to(movable, {background: "#fff", duration: .02, delay: .4})
        }
      


        return tl;
    }
}


export default Page7