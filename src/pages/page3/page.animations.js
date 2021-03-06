import AnimationPage from "../../core/AnimationPage"
import {gsap} from "gsap"
import Grid from "../../components/Grid"
import SVGArrow, {ARROW_DIRECTION} from "../../components/SVGArrow"



class Page3 extends AnimationPage{
    constructor(){
        super()
    }

    init(){
        const {gridYellow, gridBlue, arrowBlue, arrowYellow} = this.pageElements

        const gridYellowLandings = new Grid(gridYellow.id, 4,4, ["rijndael-cell"])
        const gridYellowMovables = gridYellowLandings.createMovables("rijndael-page-3-grid-yellow", ["rijndael-movable-cell", "rijndael-movable-cell--alpha"])
        this.subscribeTo("initial-state", gridYellowMovables.movables)
 

        const gridBlueLandings = new Grid(gridBlue.id, 4,4, ["rijndael-cell"])
        const gridBlueMovables = gridBlueLandings.createMovables("rijndael-page-3-grid-blue", ["rijndael-movable-cell", "rijndael-movable-cell--beta"])
        this.subscribeTo("key-0", gridBlueMovables.movables)
      

        const arrowBlueSVG = new SVGArrow(arrowBlue.id, ARROW_DIRECTION.ARROW_BOT)

        const arrowYellowSVG = new SVGArrow(arrowYellow.id, ARROW_DIRECTION.ARROW_BOT)

        this.addToPageElements({
            gridYellowMovables,
            gridBlueMovables
        })
    }

    createPreFadeIn(){

        const {
            title,
            subtitleYellow,
            subtitleBlue,
            gridYellow,
            gridBlue,
            charA,
            charB,
            arrowBlue,
            arrowYellow,
            textBlue,
            textYellow,
            gridYellowMovables,
            gridBlueMovables
        } = this.pageElements

        const obj = {val: 0}
        const tl = gsap.timeline();

        const gridYellowColor = this.getColor("--grid-background-alpha")
        const gridBlueColor = this.getColor("--grid-background-beta")

        tl.to(obj, {val: 1, duration: .00001})

        tl.set([title, subtitleYellow, subtitleBlue, gridYellow, gridBlue, charA, charB, arrowBlue, arrowYellow, textBlue, textYellow], {
            opacity: 0
        })



        tl.set(gridYellowMovables.movables, {color: gridYellowColor})
        tl.set(gridBlueMovables.movables, {color: gridBlueColor})

        return tl;
    }


    createAnimationIn(){
        const {
            title,
            subtitleYellow,
            subtitleBlue,
            gridYellow,
            gridBlue,
        } = this.pageElements

        const tl = gsap.timeline();
        tl.to(title, {opacity: 1})
        tl.to([subtitleBlue, subtitleYellow], {opacity: 1})
        tl.to([gridYellow, gridBlue], {opacity: 1})
 


       return tl;
    }

    createAnimationMain(){
        const {
            charA,
            charB,
            arrowBlue,
            arrowYellow,
            textBlue,
            textYellow,
            gridBlueMovables,
            gridYellowMovables,
        } = this.pageElements

       const tl = gsap.timeline();
    

        tl.to(gridYellowMovables.getAllByCol(), {color: "#333", duration: .002, stagger: .2})
        tl.to(gridBlueMovables.getAllByCol(), {color: "#333", duration: .002, stagger: .2})
    

        tl.to([arrowBlue, arrowYellow], {opacity: 1})
        tl.to([textBlue, textYellow], {opacity: 1})
        tl.to([charA, charB], {opacity: 1})


       return tl;
    }
}

export default Page3;