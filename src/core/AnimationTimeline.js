
import {gsap} from "gsap"
import {debounce} from "../utils/utils"

class AnimationTimeline{

    constructor(controller){
        this.controller = controller;

        this.tl = this.createEmptyTimeline();
        this.nestedTimelines = {}

        this.tlStateBeforeResize = null;


        this.JUMP_STEP = 0.5;
    }

    createEmptyTimeline(){
        if(this.tl) this.tl.kill();
        this.tl = null; 
        return gsap.timeline({paused: true, onComplete: () => this.pause()});
    }

    onResize(){
        if(!this.tlStateBeforeResize){
            this.saveTimelineState();
        }

        this.onAfterResize()

        // on after resize
    }

    saveAndRebuildTimeline(){
        if(!this.tlStateBeforeResize){
            this.saveTimelineState();
        }
        this.rebuildTimline();
    }



    saveTimelineState(){
        // record play state & pause tl
        const paused = this.tl.paused();
        this.pause();

        // record total time on pause
        const time = this.tl.totalTime();
        const currentLabels = this.getLabelsByTime(time)

        // update to include nested lables
        this.resetTimelineToLabel(currentLabels.label)

         this.tlStateBeforeResize = {
            time,
            lastActiveLabels: currentLabels,
            paused,
        }

        console.log(this.tlStateBeforeResize)
    }


    getLabelsByTime(time){
        const directChildren = this.tl.getChildren(false, false, true)
  
        // get direct label times
        const test = Object.keys(this.tl.labels).map((label) => [label, this.tl.labels[label]])
        const closestLabel = this.getClosestLabel(time, test)

        // get nested labels
        const nested = directChildren.reduce((prev, childTL) => [...prev, ...Object.keys(childTL.labels).map(label => {
            return [label, childTL.startTime() + childTL.labels[label] / childTL.timeScale()];
        })], [])
        const closestNestedLabel = this.getClosestLabel(time, nested)

        const currentLables = (time - closestNestedLabel.time <= time - closestLabel.time) ? 
            {label: closestLabel.label, nestedLabel: closestNestedLabel.label, time: closestNestedLabel.time} :
            {label: closestLabel.label, nestedLabel: null, time: closestLabel.time};
 
        return currentLables
    }

    getClosestLabel(time, labels){
        const sorted = labels.sort((a,b) => {
            return a[1] - b[1] 
        })

        let closestLabel = null;
        let closestTime = null;
        let shortestDist = 10000;

        // 132 - 138

        for(let i = sorted.length-1; i>=0; i--){
            const label = sorted[i][0]
            const labelTime = sorted[i][1]
            const dist = time - labelTime;
            if(dist >= 0 && dist < shortestDist){
                closestTime = labelTime;
                closestLabel = label
                shortestDist = dist;
            }

        }

        return {label: closestLabel, time: closestTime}
    }

    onAfterResize = debounce(() => {
        console.log("onafter resize")
        this.rebuildTimline();
    }, 500)

    rebuildTimline(){
      // recreate timeline completely
      this.controller.buildTimeline();

      // rehide last active page
      this.controller.hideCurrentPage();

      // go to last timeline state
      const { lastActiveLabels } = this.tlStateBeforeResize;

      this.resetTimelineToLabel(lastActiveLabels.label)

      // autoplay 
      if(this.tlStateBeforeResize && this.tlStateBeforeResize.paused === false) {         
          this.play();
      }

      this.tlStateBeforeResize = null;
      this.controller.isResizing = false;
    }

    
    resetTimelineToLabel(label){
        this.tl.seek(label, false)
    }

    isPaused(){
        return this.tl.paused()
    }

    play(){
        // check if timeline is at end or not stat frmo beginning?

        if(this.tl.totalTime() == this.tl.totalDuration()) return;

        this.controller.uiController.showPauseIcon();
        this.tl.resume();
    }

    goToPage(pageID){
        const paused = this.tl.paused();
        this.tl.pause();
   
        this.tl.seek(`${pageID}-animation-main`, false)
       
       if(!paused) this.tl.play(null, false);
    }

    pause(){
        this.controller.uiController.showPlayIcon();
        this.tl.pause();
    }

    jumpForwards(){
      
        const currentTime = this.tl.totalTime();
        console.log(currentTime)
        this.tl.seek(currentTime + this.JUMP_STEP, false)  
    }

    jumpBackwards(){
        const currentTime = this.tl.totalTime();

        this.tl.seek(currentTime - this.JUMP_STEP, false)  
    }

    setJumpStep(step){
        this.JUMP_STEP = step;
    }


    createTimeline(){
        this.tl = this.createEmptyTimeline();

        this.controller.pageIDs.forEach((pageID, idx) => {
      
            const page = this.controller.pagesByID[pageID]
 
 
            const updatePage = page.createUpdatePage(idx == 0 ? null : this.controller.pageIDs[idx-1])
            const preFadeIn = page.createPreFadeIn()
            const fadeIn = page.createFadeIn()
            const animationIn = page.createAnimationIn()
            const animationMain = page.createAnimationMain()
            const animationOut = page.createAnimationOut()
          
 
 
            const createdNestedTimelines = {
                 [`${pageID}-update-page`]: updatePage,
                 [`${pageID}-pre-fade-in`]: preFadeIn,
                 [`${pageID}-fade-in`]: fadeIn,
                 [`${pageID}-animation-in`]: animationIn,
                 [`${pageID}-animation-main`]: animationMain,
                 [`${pageID}-animation-out`]: animationOut,
             }
             
             // don't add fade out to last page
             if(idx !==  this.controller.pageIDs.length - 1){
                 createdNestedTimelines[`${pageID}-fade-out`] =  page.createFadeOut();
             }
 
             // this.tl.call(() => this.updateCurrentPage(pageID))
             Object.keys(createdNestedTimelines).forEach(label => {
                 this.tl.add(createdNestedTimelines[label], label)
             })
 
 
 
             this.nestedTimelines = {...this.nestedTimelines, ...createdNestedTimelines}

         })
    }


}

export default AnimationTimeline;