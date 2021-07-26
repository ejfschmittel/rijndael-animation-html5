
/*import {gsap} from "gsap"
import { CSSPlugin } from 'gsap/CSSPlugin'
import {MotionPathPlugin} from 'gsap/MotionPathPlugin'

import AnimationController from "./core/AnimationController"


import Page1 from "./animation_pages/page1/page.animations"
import Page2 from "./animation_pages/page2/page.animations"
import Page3 from "./animation_pages/page3/page.animations"
import Page4 from "./animation_pages/page4/page.animations"
import Page5 from "./animation_pages/page5/page.animations"
import Page6 from "./animation_pages/page6/page.animations"
import Page7 from "./animation_pages/page7/page.animations"
import Page8 from "./animation_pages/page8/page.animations"
import Page9 from "./animation_pages/page9/page.animations"
import Page10 from "./animation_pages/page10/page.animations"
import Page11 from "./animation_pages/page11/page.animations"
import Page12 from "./animation_pages/page12/page.animations"
import Page13 from "./animation_pages/page13/page.animations"
import Page14 from "./animation_pages/page14/page.animations"

import "./styles/main.scss"

window.addEventListener("load",  () => {
    gsap.registerPlugin(CSSPlugin)
    gsap.registerPlugin(MotionPathPlugin)

   const animationController = new AnimationController();
   animationController.registerAnimationPage(Page1, "page-1", "Page 1 - Rijndael Animation Intro")
   animationController.registerAnimationPage(Page2, "page-2", "Page 2 - Encryption Overview")
   animationController.registerAnimationPage(Page3, "page-3", "Page 3 - Encryption Process and Cipher Key")
   animationController.registerAnimationPage(Page4, "page-4", "Page 4 - A) Encryption Process")
   animationController.registerAnimationPage(Page5, "page-5", "Page 5 - Encryption Process Overview")
   animationController.registerAnimationPage(Page6, "page-6", "Page 6 - Transformation Types")
   animationController.registerAnimationPage(Page7, "page-7", "Page 7 - SubBytes")
   animationController.registerAnimationPage(Page8, "page-8", "Page 8 - ShiftRows")
   animationController.registerAnimationPage(Page9, "page-9", "Page 9 - MixColumns")
   animationController.registerAnimationPage(Page10, "page-10", "Page 10 - AddRoundKey")
   animationController.registerAnimationPage(Page11, "page-11", "Page 11 - Rounds 1 - 5")
   animationController.registerAnimationPage(Page12, "page-12", "Page 12 - Rounds 6 - 10")
   animationController.registerAnimationPage(Page13, "page-13", "Page 13 - B) Cipher Key")
   animationController.registerAnimationPage(Page14, "page-14", "Page 14 - Cipher Key")
    animationController.buildTimeline(); 

    animationController.goToFirstPage()

    animationController.uiController.updatePlayerLocale();

    // create timeline


    // start animaton

},false); */



import { CSSPlugin } from 'gsap/CSSPlugin'
import {MotionPathPlugin} from 'gsap/MotionPathPlugin'
import {gsap} from "gsap"

import RijndaelAnimation from "./RijndaelAnimation";
import "./styles/main.scss"

import {startTimer} from "./utils/measure.js"

window.addEventListener("load",function(){

    startTimer();
    document.body.style.visibility='visible';
    console.log("set visible")
    gsap.registerPlugin(CSSPlugin)
    gsap.registerPlugin(MotionPathPlugin)
    const rijndaelAnimation = new RijndaelAnimation();

 
},false);

