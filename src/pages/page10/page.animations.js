import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"

import Grid from "../../components/Grid"



class Page10 extends AnimationPage{
    constructor(){
        super()

        this.FADE_OUT_DELAY = .5;
    }

    init(){

        const {gridYellow, gridRoundKey, equationRight, equationLeft, equationResult} = this.pageElements

        // create working grid
        const gridYellowLandings = new Grid(gridYellow.id, 4, 4, ["rijndael-cell"])
        const gridYellowMovables = gridYellowLandings.createMovables("page-10-grid-movables", ["rijndael-movable-cell", "rijndael-movable-cell--alpha"])
        this.subscribeTo("after-mix-columns-1", gridYellowMovables.movables)

        // create result movables 
        const gridResultMovables = gridYellowLandings.createMovables("page-10-grid-result-movables", ["rijndael-movable-cell", "rijndael-movable-cell--delta"])
        this.subscribeTo("after-add-round-key-1", gridResultMovables.movables)

        // create round key grid
        const gridRoundKeyLandings = new Grid(gridRoundKey.id, 4, 4, ["rijndael-cell"])
        const gridRoundKeyMovables = gridRoundKeyLandings.createMovables("page-10-round-key-movables", ["rijndael-movable-cell", "rijndael-movable-cell--eta"])
        this.subscribeTo("key-1", gridRoundKeyMovables.movables)

        // create landings 
        const equationLeftLandings = new Grid(equationLeft.id, 4, 1, ["rijndael-cell"])

        const equationRightLandings = new Grid(equationRight.id, 4, 1, ["rijndael-cell"])

        const equationResultLandings = new Grid(equationResult.id, 4, 1, ["rijndael-cell"])



        this.addToPageElements({
            gridYellowLandings,
            gridYellowMovables,
            gridRoundKeyLandings,
            gridRoundKeyMovables,
            equationLeftLandings,
            equationRightLandings,
            equationResultLandings,
            gridResultMovables
        })
    }

    createPreFadeIn(){
        const {
            animatableBackground,
            body,
            page,
            gridResultMovables,
            addSymbol,
            equalsSymbol,
            text,
            gridYellowMovables,
            gridRoundKeyMovables,
        } = this.pageElements

        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj,{val: 1, duration: .0001})
        tl.set(this.page, {opacity: 0})
        tl.set(animatableBackground, {y: "100%"})
        tl.set([page, body, text], {opacity: 0})

        tl.set([...gridYellowMovables.movables, ...gridRoundKeyMovables.movables], {opacity: 0})
        tl.set([ equalsSymbol, addSymbol], {opacity: 0})
        
        tl.set(gridResultMovables.movables, {y: 0, opacity: 0})
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
            gridYellowMovables,
            gridRoundKeyMovables,
            gridResultMovables,
            gridYellowLandings,
            gridRoundKeyLandings,
            text
        } = this.pageElements

        const barBounds = bar.getBoundingClientRect()

        const tl = gsap.timeline()

        // move in background
        tl.to(animatableBackground, {y: 0, duration: .8}, this.getAutoLabel())

        // move bar down
        tl.to(animatableBackgroundBar, {y: barBounds.y})
        tl.set(animatableBackgroundBar, {opacity: 0}, this.getAutoLabel())
        tl.set(page, {opacity: 1}, "<")

        // reveal title
        tl.to(titleMask, {x: "100%"})

        tl.set(gridYellowMovables.movables, {opacity: 0, y: (idx, target) => {
            const landing = gridYellowLandings.cells[idx]
            const y = gsap.getProperty(landing, "y")
            return y + 100;
        }})

        
        tl.set(gridRoundKeyMovables.movables, {opacity: 0, x: (idx, target) => {
            const landing = gridRoundKeyLandings.cells[idx]
            const x = gsap.getProperty(landing, "x")
            return x + 100;
        }})


        // show body
        tl.to(body, {opacity: 1}, this.getAutoLabel())

       
        tl.to(gridYellowMovables.movables, {opacity: 1, y: 0})
       

        tl.to(gridRoundKeyMovables.movables, {opacity: 1, x: 0})
        // animate grid up

        tl.to(text, {opacity: 1})

        return tl;
    }

    createAnimationMain(){

        const {       
            gridYellowLandings,
            gridYellowMovables,
            gridRoundKeyLandings,
            gridRoundKeyMovables,
            equationLeftLandings,
            equationRightLandings,
            equationResultLandings,
            gridResultMovables,
            equalsSymbol,
            addSymbol,
            equation,
            text,
        } = this.pageElements

        const tl = gsap.timeline()


        tl.set(gridYellowMovables.movables, {opacity: 1})

        

        // instant move
        // .5 opactiy
        // move slow

        // move first grid col to left side of equation
        tl.add(this.moveGroup2(gridYellowMovables.getCol(0),gridYellowLandings.getCol(0), equationLeftLandings.cells, {duration: 1.5}), this.getAutoLabel())

        // move first round key col to right side of equation
        tl.add(this.moveGroup2(gridRoundKeyMovables.getCol(0),gridRoundKeyLandings.getCol(0), equationRightLandings.cells, {duration: 1.5}), this.getAutoLabel())

       
      

         // reveal result
        tl.to(addSymbol, {opacity: 1}, this.getAutoLabel())
        tl.to(equalsSymbol, {opacity: 1}, this.getAutoLabel())

        // move result (set)
        tl.add(this.moveGroup2(gridResultMovables.getCol(0), gridYellowLandings.getCol(0), equationResultLandings.cells, {duration: .0001}), this.getAutoLabel())
        tl.to(gridResultMovables.getCol(0), {opacity: 1}, this.getAutoLabel())

        // move to result to grid
        tl.add(this.moveGroup2(gridResultMovables.getCol(0),equationResultLandings.getCol(0), gridYellowLandings.getCol(0), {duration: 1.5}), this.getAutoLabel())
        tl.to([addSymbol, equalsSymbol, ...gridYellowMovables.getCol(0), ...gridRoundKeyMovables.getCol(0)], {opacity: 0}, "<")

        // reval # hide
        tl.to(gridResultMovables.getCol(1), {opacity: 1}, this.getAutoLabel())
        tl.to(gridRoundKeyMovables.getCol(1), {opacity: 0}, "<")
        tl.to(gridResultMovables.getCol(2), {opacity: 1}, this.getAutoLabel())
        tl.to(gridRoundKeyMovables.getCol(2), {opacity: 0}, "<")
        tl.to(gridResultMovables.getCol(3), {opacity: 1}, this.getAutoLabel())
        tl.to(gridRoundKeyMovables.getCol(3), {opacity: 0}, "<")
        tl.to(text, {opacity: 0})
        return tl;
    }

    createAnimationOut(){
        const {gridResultMovables, gridYellowMovables, gridYellowLandings} = this.pageElements
        const tl = gsap.timeline();

        tl.set(gridYellowMovables.movables, {opacity: 0});

        tl.to(gridResultMovables.movables, {opacity: 0, y: (idx, target) => {
            const landing = gridYellowLandings.cells[idx]
            const y = gsap.getProperty(landing, "y")
            return y + 100;
        }})


        return tl;
    }
}


export default Page10