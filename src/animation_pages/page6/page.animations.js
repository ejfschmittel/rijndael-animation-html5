import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"
import "./page.styles.scss"

class Page6 extends AnimationPage{
    constructor(){
        super("page-6")
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
        tl.set(labels, {scale: .5})
        return tl;
    }

    createAnimationIn(){
        const {title, labelContainer, labels} = this.pageElements;

        const tl = gsap.timeline({}) 
        tl.to([labelContainer, title], {x: 0, opacity: 1, duration: 1.5})
        tl.to(labels, {scale: 1, duration: 1.5},  "<")
        return tl;
    }


    

}


export default Page6