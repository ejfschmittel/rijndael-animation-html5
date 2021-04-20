import AnimationPage from "../../core/AnimationPage"
import Grid from "../../components/Grid"

import {gsap} from "gsap"

import "./page.styles.scss"

class Page9 extends AnimationPage{
    constructor(){
        super()
    }

    init(){
        const {grid, equationResult, equationMultiplier, galoisField} = this.pageElements

        // create a landing
        const gridLandings = new Grid(grid.id, 4,4, ["rijndael-cell"])
        const gridMovablesYellow = gridLandings.createMovables("grid-page-9-yellow", ["rijndael-movable-cell", "rijndael-movable-cell--alpha"])
        const gridMovablesPink = gridLandings.createMovables("grid-page-9-pink", ["rijndael-movable-cell", "rijndael-movable-cell--delta"])
        this.subscribeTo("after-shift-rows-1", gridMovablesYellow.movables)
        this.subscribeTo("after-mix-columns-1", gridMovablesPink.movables)


        // create galois field

        const galoisLandings = new Grid(galoisField.id, 4, 4, ["rijndael-cell"])
        const galoisMovables = galoisLandings.createMovables("grid-page-9-galois", ["rijndael-movable-cell", ])
        this.subscribeTo("galois-field", galoisMovables.movables)


        // equation column landings
        const equationResultLandings = new Grid(equationResult.id, 4, 1, ["rijndael-cell", "rijndael-cell--big"])

        const equationMultiplierLandings = new Grid(equationMultiplier.id, 4, 1, ["rijndael-cell"])


        this.addToPageElements({
            gridMovablesPink,
            gridMovablesYellow,
            gridLandings,
            equationResultLandings,
            equationMultiplierLandings
        })
        
    }

    createPreFadeIn(){
        const {
            animatableBackground,
            body,
            page,
            gridMovablesPink,
            equationResultLandings,
            gridMovablesYellow,
            equationMultiplier,
            equalsSymbol,
            multiplierSymbol,
            galoisField,
            textOne,
            textTwo,

        } = this.pageElements

        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj,{val: 1, duration: .0001})
        tl.set(this.page, {opacity: 0})
        tl.set(animatableBackground, {y: "100%"})
        tl.set([page, body, textOne, textTwo], {opacity: 0})

        // hide grid yellow & pink

        // move first grid column to result
       


        tl.set([...gridMovablesPink.movables, ...gridMovablesYellow.movables, multiplierSymbol, equalsSymbol, galoisField], {opacity: 0})

      

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
            gridMovablesYellow
        } = this.pageElements

        const barBounds = bar.getBoundingClientRect()


        const tl = gsap.timeline()

        // move in background
        tl.to(animatableBackground, {y: 0})

        // move bar down
        tl.to(animatableBackgroundBar, {y: barBounds.y})
        tl.set(animatableBackgroundBar, {opacity: 0})
        tl.set(page, {opacity: 1}, "<")

        // reveal title
        tl.to(titleMask, {x: "100%"})

        // show body
        tl.set(gridMovablesYellow.movables, { y: (idx, target) => {
            const y = gsap.getProperty(target, "y")
            return y - 100;
        }})
        tl.to(body, {opacity: 1})

        tl.to(gridMovablesYellow.movables, {opacity: 1, y:0})
     


      

        return tl;
    }



    createAnimationMain(){

        const {textOne, textTwo, gridMovablesPink, gridMovablesYellow, equationResultLandings, equationMultiplierLandings, equation, gridLandings, galoisField,equalsSymbol, multiplierSymbol} = this.pageElements



        const tl = gsap.timeline()

      
        
        tl.add(this.moveGroup(gridMovablesPink.getCol(0), equationResultLandings.cells, {duration: .0001}))
        tl.add(this.moveGroup(gridMovablesYellow.getCol(0), equationMultiplierLandings.cells, {duration: 1}))

        // reveal galois field + multiplier
        tl.to([galoisField, multiplierSymbol], {opacity: 1})

        tl.to(textOne, {opacity: 1})

        tl.to(equalsSymbol, {opacity: 1, delay: 3})
        // reveal result col and move back to start point
        tl.to(gridMovablesPink.getCol(0), {opacity: 1, duration: .5})
        tl.add(this.moveGroup(gridMovablesPink.getCol(0), gridLandings.getCol(0), {duration: 1}))
        tl.to([textOne, galoisField, equalsSymbol, multiplierSymbol, ...gridMovablesYellow.getCol(0)], {opacity: 0}, "<")

        tl.to(textTwo, {opacity: 1})

        // reveal other cols
        tl.to(gridMovablesPink.getCol(1), {opacity: 1})
        tl.to(gridMovablesPink.getCol(2), {opacity: 1})
        tl.to(gridMovablesPink.getCol(3), {opacity: 1})

        

       
     

        return tl;
    }


    createAnimationOut(){
        const {gridMovablesPink, gridMovablesYellow, textTwo} = this.pageElements
        const tl = gsap.timeline();

        tl.set(gridMovablesYellow.movables, {opacity: 0})
        tl.to(textTwo, {opacity: 0})
        
         tl.to(gridMovablesPink.movables, { opacity: 0, y: (idx, target) => {
            const y = gsap.getProperty(target, "y")
            return y + 100;
        }})

        return tl;
    }
}


export default Page9