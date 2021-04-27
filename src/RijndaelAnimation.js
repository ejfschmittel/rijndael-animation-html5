import AnimationController from "./core/AnimationController"
import LOCALE from "./languages/index"

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


const SETTINGS = {
    locale: LOCALE,
    themes: [
        {name: "default", className: "theme--default", localeKey: "themeOptionDefault"},
        {name: "new", className: "theme--new", localeKey: "themeOptionNew"},
    ],
    iframeContainerID: "test-container"
}



class RijndaelAnimation extends AnimationController {
    constructor(){
        super(SETTINGS)

        



        console.time("create")
        this.registerAnimationPage(Page1, "page-1")
        this.registerAnimationPage(Page2, "page-2")
        this.registerAnimationPage(Page3, "page-3")
        this.registerAnimationPage(Page4, "page-4")
        this.registerAnimationPage(Page5, "page-5")
        this.registerAnimationPage(Page6, "page-6")
        this.registerAnimationPage(Page7, "page-7")
        this.registerAnimationPage(Page8, "page-8")
        this.registerAnimationPage(Page9, "page-9")
        this.registerAnimationPage(Page10, "page-10")
        this.registerAnimationPage(Page11, "page-11")
        this.registerAnimationPage(Page12, "page-12")
        this.registerAnimationPage(Page13, "page-13")
        this.registerAnimationPage(Page14, "page-14")
   
        this.init()
 
        //this.buildTimeline()

       // this.goToFirstPage();
        //this.timeline.goToPage("page-12")
        console.timeEnd("create")

    }
}

export default RijndaelAnimation;