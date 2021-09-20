import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"



class Page15 extends AnimationPage{
    constructor(){
        super()
    }

    init(){}

    createPreFadeIn(){

        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj,{val: 1, duration: .0001})


        return tl;
    }
}

export default Page15