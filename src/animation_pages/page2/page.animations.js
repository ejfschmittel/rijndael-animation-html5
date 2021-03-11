import AnimationPage from "../../core/AnimationPage"
import SVGArrow, {ARROW_DIRECTION} from "../../components/SVGArrow"
import {gsap} from "gsap"
import "./page.styles.scss"

class Page2 extends AnimationPage{
    constructor(){
        super("page-2")
    }

    init(){
        const {arrowTop, arrowBottom, arrowLeft} = this.pageElements
        
        const arrowTopSVG = new SVGArrow(arrowTop.id, ARROW_DIRECTION.ARROW_BOT, {shortSideWidth: .3, headSize: .3})
        const arrowBotSVG = new SVGArrow(arrowBottom.id, ARROW_DIRECTION.ARROW_BOT, {shortSideWidth: .3, headSize: .3})
        const arrowLeftSVG = new SVGArrow(arrowLeft.id, ARROW_DIRECTION.ARROW_RIGHT, {shortSideWidth: .3, headSize: .3})
     }

    createAnimationMain(){
        // create text animation

        const {} = this.pageElements

        const tl = gsap.timeline();
        
        return tl;
    }
}

export default Page2;