import AnimationPage from "../../core/AnimationPage"
import SVGArrow, {ARROW_DIRECTION} from "../../components/SVGArrow"

import {generateRandomBinaryStrings} from "../../utils/utils"
import {gsap} from "gsap"
import "./page.styles.scss"

class Page2 extends AnimationPage{
    constructor(id, locale){
        super(id, locale)

        this.FADE_OUT_DELAY = 0;
    }

    init(){
        const {arrowTop, arrowBottom, arrowLeft} = this.pageElements
        
        const arrowTopSVG = new SVGArrow(arrowTop.id, ARROW_DIRECTION.ARROW_BOT, {shortSideWidth: .5, headSize: .3})
        const arrowBotSVG = new SVGArrow(arrowBottom.id, ARROW_DIRECTION.ARROW_BOT, {shortSideWidth: .5, headSize: .3})
        const arrowLeftSVG = new SVGArrow(arrowLeft.id, ARROW_DIRECTION.ARROW_RIGHT, {shortSideWidth: .5, headSize: .3})

        this.addToPageElements({
            arrowBotSVG,
            arrowTopSVG,
            arrowLeftSVG
        })
     }

    createAnimationMain(){
        // create text animation

        const {numTop, numBot, numLeft} = this.pageElements


        const obj = {val: 0};

        const binaryArray = generateRandomBinaryStrings(20, 8)

        const tl = gsap.timeline();

        tl.to(obj, {
            val: binaryArray.length -1,
            duration: 2,
            repeat: 2,
            ease:  `none`,

            onUpdate: () => {
                const val = Math.round(obj.val)
            
                numTop.innerHTML = binaryArray[val]
                numBot.innerHTML = binaryArray[(val + 2) % binaryArray.length]
                numLeft.innerHTML = binaryArray[(val + 5) % binaryArray.length]
            }
        })
        
        return tl;
    }

    createAnimationOut(){
        const {container, arrowTopContainer, arrowBotContainer, arrowLeftContainer} = this.pageElements
        const tl = gsap.timeline();



        tl.to([arrowTopContainer, arrowBotContainer, arrowLeftContainer], {opacity: 0})
        tl.to(container, { color: "#666", duration: .5, delay: .2},)
        tl.to(container, {scale: 5,  duration: 1.5}, "<")

        return tl;
    }


    
}

export default Page2;