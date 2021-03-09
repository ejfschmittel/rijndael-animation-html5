import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"

import {shiftArray} from "../../utils/utils"

import Grid from "../../components/Grid"


import DataController from "../../core/DataController"

class Page8 extends AnimationPage{
    constructor(){
        super("page-8");
    }

    init(){

        const {grid} = this.pageElements

        console.log(grid)


        // create a landing
        const gridLandings = new Grid(grid.id, 4,4, ["rijndael-cell"])
        const gridMovables = gridLandings.createMovables("grid-page-8", ["rijndael-cell", "rijndael-cell--yellow"])
        DataController.subscribe("shiftRowsGrid", gridMovables.movables)


        this.addToPageElements({
            gridLandings,
            gridMovables
        })
    }

    createPreFadeIn(){


        const {
            animatableBackground,
            animatableBackgroundBar,
            bar,
            titleMask,
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
            gridMovables,
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
        tl.set(gridMovables.movables, {opacity: 0, y: (idx, target) => {
            const y = gsap.getProperty(target, "y")
            return y + 100;
        }})
        tl.to(body, {opacity: 1})

        tl.to(gridMovables.movables, {opacity: 1, y:0})

        // other page intro



        return tl;
    }


    shiftRow(movablesRow, landingsRow){

        const tl = gsap.timeline();
        tl.add(this.moveToLandingAdvanced(movablesRow[0], landingsRow[3], {offsetY: -100}), "shift")
        tl.add(this.moveToLanding(movablesRow[1], landingsRow[0]), "shift+=.5")
        tl.add(this.moveToLanding(movablesRow[2], landingsRow[1]), "shift+=.5")
        tl.add(this.moveToLanding(movablesRow[3], landingsRow[2]), "shift+=.5")

        return tl;
    }

    createAnimationMain(){

        const {gridLandings, gridMovables} = this.pageElements

        const tl = gsap.timeline()

        tl.add(this.shiftRow(gridMovables.getRow(1), gridLandings.getRow(1)))

        tl.add(this.shiftRow(gridMovables.getRow(2), gridLandings.getRow(2)))
        tl.add(this.shiftRow(shiftArray(gridMovables.getRow(2), 1), gridLandings.getRow(2)))

        tl.add(this.shiftRow(gridMovables.getRow(3), gridLandings.getRow(3)))
        tl.add(this.shiftRow(shiftArray(gridMovables.getRow(3),1), gridLandings.getRow(3)))
        tl.add(this.shiftRow(shiftArray(gridMovables.getRow(3),2), gridLandings.getRow(3)))
        
        return tl;
    }
}


export default Page8