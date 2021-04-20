import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"
import "./page.styles.scss"

class Page6 extends AnimationPage{
    constructor(){
        super()
    }

    init(){
        const {title, labelContainer} = this.pageElements;
        this.addToPageElements({
            labels: [...labelContainer.querySelectorAll(".rijndael-rounded-label")]
        })
    }

    createPreFadeIn(){
        const {title, labelContainer, labels} = this.pageElements;

        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj, {val: 1, duration: .00001})
        tl.set([labelContainer, title], {x: "-200", opacity: 1})
        tl.set(labelContainer, {scale: .5})
        return tl;
    }

    createAnimationIn(){
        const {title, labelContainer, labels} = this.pageElements;

        const tl = gsap.timeline({}) 
        tl.to([labelContainer, title], {x: 0, opacity: 1, duration: 1.5}, this.getAutoLabel())
        tl.to(labelContainer, {scale: 1, duration: 1.5},  "<", this.getAutoLabel())
        return tl;
    }


    

}


export default Page6