

import {gsap} from "gsap"

import MovablesController from "./MovablesController"


import {debounce} from "../utils/utils"


const INFO_HEADLINE_ID = "rijndael-animation-info-headline"
const INFO_CONTENT_ID = "rijndael-animation-info-content"
const FULLSCREEN_BTN_ID = "rijndael-animation-fullscreen-btn";


const NAVIGATION_MOBILE_ID = "rijndael-animation-navigation-mobile"
const NAVIGATION_DESKTOP_ID = "rijndael-animation-navigation-desktop"

const PLAY_BTN_ID = "rijndael-animation-play-btn";
const FORWARD_BTN_ID = "rijndael-animation-jump-forwards";
const BACKWARDS_BTN_ID = "rijndael-animation-jump-backwards";


const PLAY_BTN_PAUSED_CLASS = "rijndael-animation__play-btn--paused"

const ANIMATION_ID = "rijndael-animation"

class AnimationController{
    constructor(id, locale){
        this.tl = this.createEmptyTimeline();

        this.pages = []
        this.pagesByID = {}
        this.pageNames = {}

        this.locale = locale;

        this.resizeStore = null; 



        this.isResizing = false;
        this.currentPage = null;
        const onResize = this.onResize.bind(this)

      

        window.addEventListener("resize", onResize)

  
        this.playBtn = document.getElementById(PLAY_BTN_ID) 
        this.playBtn.addEventListener("click", this.onPlayPause.bind(this))
    
         if(this.tl.paused()){
            this.playBtn.classList.add(PLAY_BTN_PAUSED_CLASS)
         }else{
            this.playBtn.classList.remove(PLAY_BTN_PAUSED_CLASS)
         }

         const jumpForwardsButton = document.getElementById(FORWARD_BTN_ID)
         jumpForwardsButton.addEventListener("click", this.jumpForwards.bind(this))
 
         const jumpBackwardsButton = document.getElementById(BACKWARDS_BTN_ID)
         jumpBackwardsButton.addEventListener("click", this.jumpBackwards.bind(this))

         const fullscreenBtn = document.getElementById(FULLSCREEN_BTN_ID)
         fullscreenBtn.addEventListener("click", this.toggleFullscreen.bind(this))

    }

    createEmptyTimeline(){
        return gsap.timeline({paused: true, onComplete: () => this.pause()});
    }


    toggleFullscreen(){
        // add classes
        const container = document.getElementById(ANIMATION_ID)
        if(container.classList.contains("rijndael-animation--fullscreen")){
            container.classList.add("rijndael-animation--fullscreen")
        }else{
            container.classList.add("rijndael-animation--remove")
        }

        const onResize = this.onResize.bind(this)
        onResize()
        
    }
    
    updateCurrentPage(pageID){
      
        this.currentPage = pageID;

        this.onAfterUpdateCurrentPage(pageID)
    }


    onAfterUpdateCurrentPage = debounce((pageID) => {
        const infoHeadline = document.getElementById(INFO_HEADLINE_ID)
        const infoContent = document.getElementById(INFO_CONTENT_ID)


        infoHeadline.innerHTML = this.pageNames[pageID]
        infoContent.innerHTML = this.pagesByID[pageID].getInfoText();

        const desktopMenuContainer = document.getElementById("rijndael-animation-navigation-desktop")
        const mobileMenuContainer = document.getElementById("rijndael-animation-navigation-mobile")

        const menuItems = desktopMenuContainer.querySelectorAll(".rijndael-animation__navigation-item")

        const currentIndex = this.pages.indexOf(pageID)

        menuItems.forEach((menuItem, idx) => {
            if(idx == currentIndex){
                menuItem.classList.add("rijndael-animation__navigation-item--current")
            }else{
                menuItem.classList.remove("rijndael-animation__navigation-item--current")
            }
        })

        const mobileMenuItems = mobileMenuContainer.querySelectorAll("option")

     
            mobileMenuItems.forEach((menuItem, idx) => {
            if(idx == currentIndex){     
                menuItem.defaultSelected = true;
            }else{
            menuItem.defaultSelected = false;
            }
        })
    }, 100)

    registerAnimationPage(AnimationPageClass, pageID, pageName=null){

        const animationPage = new AnimationPageClass(pageID, this.locale[pageID])

        this.pages.push(pageID)
        this.pagesByID[pageID] = animationPage;
        this.pageNames[pageID] = pageName ? pageName : pageID;

        // hide pages
        animationPage.hide();
    }


    createTimeline(){
        
        if(this.tl)
            this.tl.kill();

        this.tl = null;
        this.tl = this.createEmptyTimeline();
        
        this.pages.forEach((pageID, idx) => {
           // this.pagesByID[pageID].hide();
           this.tl.call(() => this.updateCurrentPage(pageID))
           this.tl.add(this.pagesByID[pageID].createPreFadeIn(), `${pageID}-pre-fade-in`)
            this.tl.add(this.pagesByID[pageID].createFadeIn(), `${pageID}-fade-in`)
            this.tl.add(this.pagesByID[pageID].createAnimationIn(), `${pageID}-animation-in`)
            this.tl.add(this.pagesByID[pageID].createAnimationMain(), `${pageID}-animation-main`)
            this.tl.add(this.pagesByID[pageID].createAnimationOut(), `${pageID}-animation-out`)

            // don't create fade out for last page
            if(idx !== this.pages.length - 1){
                this.tl.add(this.pagesByID[pageID].createFadeOut(), `${pageID}-fade-out`)
            }

            this.pagesByID[pageID].hide();
        })

        MovablesController.resetMovedElement();

        this.createMenu()
        
    }


    createMenu(){
        
        const desktopMenuContainer = document.getElementById(NAVIGATION_DESKTOP_ID)
        const mobileMenuContainer = document.getElementById(NAVIGATION_MOBILE_ID)
        desktopMenuContainer.innerHTML = ""
        mobileMenuContainer.innerHTML = ""
        

        this.pages.forEach((pageID, pageIndex) => {

            
            const menuItem = document.createElement("div")
            menuItem.classList.add("rijndael-animation__navigation-item")
            menuItem.innerHTML = pageIndex + 1;
            menuItem.addEventListener("click", () => {
                this.goToPage(pageID)
            })
            desktopMenuContainer.appendChild(menuItem)
        })

        // create mobile menu
        this.pages.forEach(pageID => {
            const menuItem = document.createElement("option")
            menuItem.value = pageID;
            menuItem.innerHTML = this.pageNames[pageID];
           
           
            mobileMenuContainer.appendChild(menuItem)
        })

        mobileMenuContainer.addEventListener("change", (e) => {
            const pageID = e.target.value;
            this.goToPage(pageID)
        })

      //  this.addPlayPauseButtonEventListener();
    }


    onAfterResize = debounce(() => {
        MovablesController.resetMovedElement();
        this.createTimeline();
        // play or not play timeline()
        this.tl.seek(this.resizeStore.resetTime, false)
        if(this.resizeStore && this.resizeStore.paused === false) {
           
            console.log("resume after resize")
            this.resume();


       
        }
        this.resizeStore = null;
        this.isResizing = false;
    }, 500)



    prepResize(){    
        const time = this.tl.totalTime();
        const children = this.tl.getChildren(true, false, true)
        const paused = this.tl.paused();
        this.isResizing = true;

        this.pause();
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

        // get label times of direct children
        const directLabelTimes = Object.keys(this.tl.labels).map(key => {
            return this.tl.labels[key];
        })

        labelTimes = labelTimes.concat(...directLabelTimes)
     

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


    goToPage(pageID){
        // seek

 
        const paused = this.tl.paused();
        this.tl.pause();
   
        this.tl.seek(`${pageID}-animation-main`, false)
       
       if(!paused) this.tl.play(null, false);
    }

    onPlayPause(){

            const paused = this.tl.paused()

            if(paused){
                this.resume();
            }else{
                this.pause();           
            }
     }


    playFrom(label=null){
       console.log("play from")
        console.log(this.playBtn)

        this.playBtn.classList.remove(PLAY_BTN_PAUSED_CLASS)
        console.log(this.playBtn)
        this.tl.play(label, false)
       
    }


    resume(){ 
        this.playBtn.classList.remove(PLAY_BTN_PAUSED_CLASS)
        this.tl.resume()
    }

    pause(){     
        this.playBtn.classList.add(PLAY_BTN_PAUSED_CLASS)
        this.tl.pause()
    }
  
    jumpForwards(e){
        e.stopPropagation();
        const currentTime = this.tl.totalTime();
        this.tl.seek(currentTime + .5, false)       
    }

    jumpBackwards(e){
        e.stopPropagation();
        const currentTime = this.tl.totalTime();
        this.tl.seek(currentTime - .5, false)  
    }


}

export default AnimationController;