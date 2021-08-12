import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"
import Grid from "../../components/Grid"
import {shiftArray} from "../../utils/utils"

class Page8 extends AnimationPage{
    constructor(){
        super()

        this.FADE_OUT_DELAY = 0;
    }

    init(){
        const {grid} = this.pageElements

        // create grid landings + movables
        const gridLandings = new Grid(grid.id, 4,4, ["rijndael-cell"])
        const gridMovables = gridLandings.createMovables("grid-page-8", ["rijndael-movable-cell", "rijndael-movable-cell--alpha"])
        this.subscribeTo("after-sub-bytes-1", gridMovables.movables)


        this.addToPageElements({
            gridLandings,
            gridMovables
        })
    }

    createPreFadeIn(){
        const {
            animatableBackground,
            body,
            page,
            textOne,
            textTwo,
            textThree
        } = this.pageElements

        const tl = this.getPreFadeInTimeline();
        tl.set(this.page, {opacity: 0})
        tl.set(animatableBackground, {y: "100%"})
        tl.set([page, body, textOne, textTwo, textThree], {opacity: 0})

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
            gridLandings
        } = this.pageElements

        const barBounds = bar.getBoundingClientRect()
        const tl = gsap.timeline()

        // move in background
        tl.to(animatableBackground, {y: 0}, this.getAutoLabel())

        // move bar down
        tl.to(animatableBackgroundBar, {y: barBounds.y}, this.getAutoLabel())
        tl.set(animatableBackgroundBar, {opacity: 0}, this.getAutoLabel())
        tl.set(page, {opacity: 1}, "<")

        // reveal title
        tl.to(titleMask, {x: "100%"},this.getAutoLabel())

        // show body
        tl.set(gridMovables.movables, {opacity: 0, y: (idx, target) => {
            const landing = gridLandings.cells[idx]
            const y = gsap.getProperty(landing, "y")
            return y + 100;
        }})
        tl.to(body, {opacity: 1}, this.getAutoLabel())

        tl.to(gridMovables.movables, {opacity: 1, y:0}, this.getAutoLabel())

        // other page intro

        return tl;
    }



    // helper function for the row rotaion animation
    shiftRow(movablesRow, landingsRow){
        const tl = gsap.timeline();
        tl.add(this.moveToLandingAdvanced2(movablesRow[0],landingsRow[0], landingsRow[3], {offsetY: -100}), "shift")

        tl.add(this.moveToLanding2(movablesRow[1], landingsRow[1], landingsRow[0]), "shift+=.5")
        tl.add(this.moveToLanding2(movablesRow[2], landingsRow[2], landingsRow[1]), "shift+=.5")
        tl.add(this.moveToLanding2(movablesRow[3], landingsRow[3], landingsRow[2]), "shift+=.5")

        return tl;
    }



    createAnimationMain(){

        const {gridLandings, gridMovables, textOne, textTwo, textThree} = this.pageElements

        const tl = gsap.timeline()

        // fade in grid
        tl.set(gridMovables.movables, {opacity: 1, y:0}, this.getAutoLabel())

        // row one
        tl.to(textOne, {opacity: 1}, this.getAutoLabel())
        tl.add(this.shiftRow(gridMovables.getRow(1), gridLandings.getRow(1)))

        tl.to(textOne, {opacity: 0})

        // row two
        tl.to(textTwo, {opacity: 1}, "<")
        tl.add(this.shiftRow(gridMovables.getRow(2), gridLandings.getRow(2)))
        tl.add(this.shiftRow(shiftArray(gridMovables.getRow(2), 1), gridLandings.getRow(2)))
        tl.to(textTwo, {opacity: 0})

        // row three
        tl.to(textThree, {opacity: 1}, "<")
        tl.add(this.shiftRow(gridMovables.getRow(3), gridLandings.getRow(3)))
        tl.add(this.shiftRow(shiftArray(gridMovables.getRow(3),1), gridLandings.getRow(3)))
        tl.add(this.shiftRow(shiftArray(gridMovables.getRow(3),2), gridLandings.getRow(3)))

        tl.to(textThree, {opacity: 0})

        return tl;
    }

    createAnimationOut(){
        const {gridMovables, gridLandings} = this.pageElements

        const tl = gsap.timeline()

        // fade out grid
        tl.to(gridMovables.movables, {delay: 1,  opacity: 0, y: (idx, target) => {
            const landing = gridLandings.cells[idx]
            const y = gsap.getProperty(landing, "y")
            return y + 100;
        }})
        return tl;
    }
}


export default Page8