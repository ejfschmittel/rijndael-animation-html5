import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"

import "./page.styles.scss"

class Page4 extends AnimationPage{
    constructor(){
        super()
    }

    init(){}

    createPreFadeIn(){
        const {circledChar, title, content} = this.pageElements
        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj,{val: 1, duration: .0001})
        tl.set([circledChar, title, content], {opacity: 0})

        return tl;
    }

    createAnimationIn(){
        const {circledChar, title, content} = this.pageElements

        const tl = gsap.timeline();

        tl.to([circledChar, title], {opacity: 1})
        tl.to([content], {opacity: 1})

        return tl;
    }
}

export default Page4