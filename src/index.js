
import {gsap} from "gsap"
import { CSSPlugin } from 'gsap/CSSPlugin'
import AnimationController from "./core/AnimationController"
import Page1 from "./animation_pages/page1/page.animations"
import Page4 from "./animation_pages/page4/page.animations"
import Page8 from "./animation_pages/page8/page.animations"
import Page9 from "./animation_pages/page9/page.animations"
import "./main.scss"

window.addEventListener("load",function(){
    gsap.registerPlugin(CSSPlugin)

    // create controller & register page
    const animationController = new AnimationController("id");
    animationController.registerAnimationPage(new Page1(), "page-1", "Page 1 - Intro")
    animationController.registerAnimationPage(new Page4(), "page-4", "A) Encryption Process")
    animationController.registerAnimationPage(new Page8(), "page-8", "Page 8 - Intro")
    animationController.registerAnimationPage(new Page9(), "page-9", "Page 9 - Intro")
    animationController.createTimeline();


    animationController.tl.seek("page-4-animation-main")

    // create timeline


    // start animaton

},false);