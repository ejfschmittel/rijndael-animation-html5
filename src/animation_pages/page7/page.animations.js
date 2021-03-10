import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"

import Grid from "../../components/Grid"
import LookupTable from "../../components/LookupTable"
import DataController from "../../core/DataController"

import "./page.styles.scss"

class Page7 extends AnimationPage{
    constructor(){
        super("page-7");
    }

    init(){
        const {grid, sbox} = this.pageElements

        const gridLandings = new Grid(grid.id, 4,4 ,["rijndael-cell"])
        const gridMovables = gridLandings.createMovables("page-7-grid-movables", ["rijndael-movable-cell", "rijndael-movable-cell--yellow"])

        DataController.subscribe("shiftRowsGrid", gridMovables.movables)

        const Sbox = new LookupTable(sbox.id)
        DataController.subscribe("sbox", Sbox.gridMovables.movables)
      

        this.addToPageElements({
            gridLandings,
            gridMovables,
            sbox,

        })
    }

    createPreFadeIn(){
        const {
            animatableBackground,
            body,
            page,
        } = this.pageElements

    
        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj,{val: 1, duration: .0001})
        tl.set(animatableBackground, {y: "100%"})
        tl.set([page, body], {opacity: 0})

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

        console.log(barBounds)
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
        tl.to(body, {opacity: 1})

        return tl;
    }

    createAnimationMain(){
        const {gridMovables, cellLanding} = this.pageElements
        const tl = gsap.timeline();
        tl.add(this.moveToLanding(gridMovables.get(0, 0), cellLanding, {duration: 1}))

        return tl;
    }
}


export default Page7