import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"

import {shiftArray} from "../../utils/utils"

import Grid from "../../components/Grid"



class Page8 extends AnimationPage{
    constructor(){
        super()

        this.FADE_OUT_DELAY = 0;
    }

    init(){

        const {grid} = this.pageElements




        // create a landing
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
            animatableBackgroundBar,
            bar,
            titleMask,
            body,
            page,
            textOne,
            textTwo,
            textThree
        } = this.pageElements

      

        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj,{val: 1, duration: .0001})
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
            const y = gsap.getProperty(target, "y")
            return y + 100;
        }})
        tl.to(body, {opacity: 1}, this.getAutoLabel())

        tl.to(gridMovables.movables, {opacity: 1, y:0}, this.getAutoLabel())

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

    shiftRow2(movablesRow, landingsRow){

        const tl = gsap.timeline();
        tl.add(this.moveToLandingAdvanced(movablesRow[0], landingsRow[3], {offsetY: -100}), "shift")

        tl.add(this.moveToLanding2(movablesRow[1], landingsRow[1], landingsRow[0]), "shift+=.5")
        tl.add(this.moveToLanding2(movablesRow[2], landingsRow[2], landingsRow[1]), "shift+=.5")
        tl.add(this.moveToLanding2(movablesRow[3], landingsRow[3], landingsRow[2]), "shift+=.5")

        return tl;
    }


    createAnimationMain2(){
        const {gridLandings, gridMovables, textOne, textTwo, textThree} = this.pageElements

        const tl = gsap.timeline()

        tl.set(gridMovables.movables, {opacity: 1, y:0}, this.getAutoLabel())

        tl.to(textOne, {opacity: 1}, this.getAutoLabel())
        tl.add(this.shiftRow2(gridMovables.getRow(1), gridLandings.getRow(1)))

         tl.to(textOne, {opacity: 0})
        tl.to(textTwo, {opacity: 1}, "<")

        tl.add(this.shiftRow2(gridMovables.getRow(2), gridLandings.getRow(2)))
        tl.add(this.shiftRow2(shiftArray(gridMovables.getRow(2), 1), gridLandings.getRow(2)))

        tl.to(textTwo, {opacity: 0})
        tl.to(textThree, {opacity: 1}, "<")

        tl.add(this.shiftRow2(gridMovables.getRow(3), gridLandings.getRow(3)))
        tl.add(this.shiftRow2(shiftArray(gridMovables.getRow(3),1), gridLandings.getRow(3)))
        tl.add(this.shiftRow2(shiftArray(gridMovables.getRow(3),2), gridLandings.getRow(3)))

        return tl;
    }

    createAnimationMain(){

        console.time("create-animation-8")
        //const tl = this.createAnimationMain2();
     
        const {gridLandings, gridMovables, textOne, textTwo, textThree} = this.pageElements

        const tl = gsap.timeline()

        tl.set(gridMovables.movables, {opacity: 1, y:0}, this.getAutoLabel())

        tl.to(textOne, {opacity: 1}, this.getAutoLabel())
        tl.add(this.shiftRow(gridMovables.getRow(1), gridLandings.getRow(1)))


        tl.to(textOne, {opacity: 0})
        tl.to(textTwo, {opacity: 1}, "<")

        tl.add(this.shiftRow(gridMovables.getRow(2), gridLandings.getRow(2)))
        tl.add(this.shiftRow(shiftArray(gridMovables.getRow(2), 1), gridLandings.getRow(2)))

        tl.to(textTwo, {opacity: 0})
        tl.to(textThree, {opacity: 1}, "<")

        tl.add(this.shiftRow(gridMovables.getRow(3), gridLandings.getRow(3)))
        tl.add(this.shiftRow(shiftArray(gridMovables.getRow(3),1), gridLandings.getRow(3)))
        tl.add(this.shiftRow(shiftArray(gridMovables.getRow(3),2), gridLandings.getRow(3)))

        tl.to(textThree, {opacity: 0})

  
        console.timeEnd("create-animation-8")
   

        
        return tl;
    }

    createAnimationOut(){

        const {gridMovables} = this.pageElements
       
        const tl = gsap.timeline()
        tl.to(gridMovables.movables, {delay: 1,  opacity: 0, y: (idx, target) => {
            const y = gsap.getProperty(target, "y")
            return y + 100;
        }})
        return tl;
    }
}


export default Page8