
import {gsap} from "gsap"
import { CSSPlugin } from 'gsap/CSSPlugin'
import {MotionPathPlugin} from 'gsap/MotionPathPlugin'
import AnimationController from "./core/AnimationController"
import DataController from "./core/DataController"
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
import "./main.scss"


import { toHex } from "./utils/conversions"
import JES from "./utils/jes"


const prepareState = (state) => {

    return Object.keys(state).reduce((s, key) => {
        const val = state[key];


        let newVal = null;

        if(key == "key"){
            newVal = []
            for(let i = 0; i < val.length; i+=2){
                newVal.push( val[i] + val[i+1])
            }
        }else if(Array.isArray(val) && val.length == 4){
            // flatten array
           
            const temp  = [].concat.apply([], val);
            newVal = temp.map(num => toHex(num))
        }else if(Array.isArray(val) && val.length == 256){
            // sBox
            newVal = val.map(num => toHex(num))
        }


        return {...s, [key]: newVal}

    }, {})
}

const calcAesAndUpdateStore = () => {
    const res = JES.encrypt({
        plaintext: "Attack at dawn!!",
        key: "6162636465666768696a6b6c6d6e6f70",
        iv: "7172737475767778797a7b7c7d7e7f80"
    }, "hex/string");

    const state = prepareState(JES.internalState)
    
    DataController.updateStoreByObject(state)
}




window.addEventListener("load",function(){
    gsap.registerPlugin(CSSPlugin)
    gsap.registerPlugin(MotionPathPlugin)

    calcAesAndUpdateStore();

    // create controller & register page
    const animationController = new AnimationController("id");
    animationController.registerAnimationPage(new Page1(), "page-1", "Page 1 - Rijndael Animation Intro")
    animationController.registerAnimationPage(new Page2(), "page-2", "Page 2 - Encryption Overview")
    animationController.registerAnimationPage(new Page3(), "page-3", "Page 3 - Encryption Process and Cipher Key")
    animationController.registerAnimationPage(new Page4(), "page-4", "Page 4 - A) Encryption Process")
    animationController.registerAnimationPage(new Page5(), "page-5", "Page 5 - Encryption Process Overview")
    animationController.registerAnimationPage(new Page6(), "page-6", "Page 6 - Transformation Types")
    animationController.registerAnimationPage(new Page7(), "page-7", "Page 7 - SubBytes")
    animationController.registerAnimationPage(new Page8(), "page-8", "Page 8 - ShiftRows")
    animationController.registerAnimationPage(new Page9(), "page-9", "Page 9 - MixColumns")
    animationController.registerAnimationPage(new Page10(), "page-10", "Page 10 - AddRoundKey")
    animationController.registerAnimationPage(new Page11(), "page-11", "Page 11 - Rounds 1 - 5")
    animationController.registerAnimationPage(new Page12(), "page-12", "Page 12 - Rounds 6 - 10")
    animationController.registerAnimationPage(new Page13(), "page-13", "Page 13 - B) Cipher Key")
    animationController.createTimeline();
    animationController.updateCurrentPage("page-1")


    animationController.playFrom("page-1-pre-fade-in")

    // create timeline


    // start animaton

},false);