
import {gsap} from "gsap"
import {debounce} from "../utils/utils"

const ANIMATION_COMPLETED_SCREEN_ID = "animation-completed-screen";
const BACK_TO_ENCRYPTION_ID = "back-to-encryption-process-btn"
const BACK_TO_KEY_SCHEDULE_ID = "back-to-key-schedule-btn"
const BACK_TO_START_ID = "back-to-start-btn"

class AnimationTimeline{

    constructor(controller){
        this.controller = controller;

        this.tl = this.createEmptyTimeline();
        this.nestedTimelines = {}

        this.tlStateBeforeResize = null;


        this.JUMP_STEP = 0.5;

        this.animationCompletedScreen = document.getElementById(ANIMATION_COMPLETED_SCREEN_ID)
        this.backToKeyScheduleBtn = document.getElementById(BACK_TO_KEY_SCHEDULE_ID)
        this.backToStartBtn = document.getElementById(BACK_TO_START_ID)
        this.backToEncryptionBtn = document.getElementById(BACK_TO_ENCRYPTION_ID)

        
        this.backToKeyScheduleBtn.addEventListener("click", (e) => {
            e.preventDefault()
            this.goToPage("page-13")
        })

        this.backToEncryptionBtn.addEventListener("click", (e) => {
            e.preventDefault()
            this.goToPage("page-4")
        })


        this.backToStartBtn.addEventListener("click", (e) => {
            e.preventDefault()
            this.goToPage("page-1")
        })

        // evenhandler for keypress
        window.addEventListener("keypress", (e) => {
            e.stopPropagation()
        console.log(document.activeElement)
            if(e.key === " " || e.keyCode == 32){
                if(document.activeElement.id === "rijndael-animation-screen"){
                    // jump forward=s
                    this.jumpForwards();
                }     
            }
        });
    }

    createEmptyTimeline(){
        if(this.tl) this.tl.kill();
        this.tl = null; 
        return gsap.timeline({paused: true, onComplete: () => this.pause()});
    }

    onResize(e){
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

        let currentLabels = {label: `${this.controller.pageIDs[0]}-animation-main`, nestedLabel: null, time: 0}
        if(time !== 0){
            currentLabels = this.getLabelsByTime(time)

            // update to include nested lables
            this.resetTimelineToLabel(currentLabels.label)
        }
         this.tlStateBeforeResize = {
            time,
            lastActiveLabels: currentLabels,
            paused,
        }

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
        this.rebuildTimline();
    }, 200)

    rebuildTimline(){
      // recreate timeline completely
      console.time("rebuild timeline")
 
      this.controller.buildTimeline();
 

      // rehide last active page
      this.controller.hideAllPages();

      // go to last timeline state
      const { lastActiveLabels } = this.tlStateBeforeResize;

   
      this.resetTimelineToLabel(lastActiveLabels.label)
    
      // autoplay 
      if(this.tlStateBeforeResize && this.tlStateBeforeResize.paused === false) {         
          this.play();
      }

      this.tlStateBeforeResize = null;
      this.controller.ui.onResizeEnd()
      this.controller.isResizing = false;
      console.timeEnd("rebuild timeline")
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

        this.controller.ui.showPauseIcon();
        this.tl.resume();
    }

    goToPage(pageID){
        const paused = this.tl.paused();
        this.tl.pause();
   
        this.controller.movables.resetMovedElement();
        //this.tl.seek(`${pageID}-animation-main`, false)
       
       if(!paused){
        this.tl.play(`${pageID}-animation-main`, false);
       }else{
        this.tl.seek(`${pageID}-animation-main`, false)
       }
     
       
     
    }

    pause(){
        this.controller.ui.showPlayIcon();
        this.tl.pause();
    }

    jumpForwards(){     
        const currentTime = this.tl.totalTime();
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

         this.tl.to(this.animationCompletedScreen, {delay: 3, display: "flex", duration: .00001})
    }


}

export default AnimationTimeline;