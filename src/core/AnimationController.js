

import {gsap} from "gsap"

import MovablesController from "./MovablesController"


import {debounce} from "../utils/utils"

class AnimationController{
    constructor(){
        this.tl = gsap.timeline({paused: true});

        this.pages = []
        this.pagesByID = {}
        this.pageNames = {}

        this.resizeStore = null; 
    }


    registerAnimationPage(animationPage, pageID, pageName=null){
        this.pages.push(pageID)
        this.pagesByID[pageID] = animationPage;
        this.pageNames[pageID] = pageName ? pageName : pageID;

        // hide pages
        animationPage.hide();
    }


    createTimeline(){
        this.tl.clear();

        this.pages.forEach((pageID, idx) => {
           // this.tl.add(this.pagesByID[pageID].prepPageAnimations(), `${pageID}-prep-page`)
           this.tl.add(this.pagesByID[pageID].createPreFadeIn(), `${pageID}-pre-fade-in`)
            this.tl.add(this.pagesByID[pageID].createFadeIn(), `${pageID}-fade-in`)
            this.tl.add(this.pagesByID[pageID].createAnimationIn(), `${pageID}-animation-in`)
            this.tl.add(this.pagesByID[pageID].createAnimationMain(), `${pageID}-animation-main`)
            this.tl.add(this.pagesByID[pageID].createAnimationOut(), `${pageID}-animation-out`)

            // don't create fade out for last page
            if(idx !== this.pages.length - 1){
                this.tl.add(this.pagesByID[pageID].createFadeOut(), `${pageID}-fade-out`)
            }
        })

        MovablesController.resetMovedElement();
    }


    onAfterResize = debounce(() => {
        this.createTimeline();
        // play or not play timeline()
        this.resizeStore = null;
    }, 500)



    prepResize(){    
        const time = this.tl.totalTime();
        const children = this.tl.getChildren(true, false, true)
        const paused = this.tl.paused();

        this.tl.pause();
        let labelTimes = []

        // get label times of nested children
        for(let i = 0; i < children.length; i++){
            const tl = children[i]

            let times = Object.keys(tl.labels).map(key => {
                const totalTime = tl.startTime() + tl.labels[key] / tl.timeScale();
                return totalTime;
            })

            labelTimes = labelTimes.concat(...times)
        }

        // get clostest labeled resetpoint
        let closestLabelTime = 0;
       
        for(let i = 0; i < labelTimes.length; i++){
            const dist = time - labelTimes[i]
            if(dist >= 0 && dist < time - closestLabelTime){
                closestLabelTime = labelTimes[i]
            }
            
        }

        // go to last safe reset point
        this.tl.seek(closestLabelTime, false)

        // store data
        this.resizeStore = {
            time,
            resetTime: closestLabelTime,
            paused,
        }
    }

    onResize(){
        if(!this.resizeStore){
            this.prepResize();
        }

        this.onAfterResize();
    }


    goToPage(){}
    goToLabel(){}
    play(){}
    pause(){}

}

export default AnimationController;