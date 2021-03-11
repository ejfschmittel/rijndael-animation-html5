

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



        this.isResizing = false;

        const onResize = this.onResize.bind(this)

        window.addEventListener("resize", onResize)
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


    createMenu(desktopMenuContainerID, mobileMenuContainerID=null){
        const desktopMenuContainer = document.getElementById(desktopMenuContainerID)
        const mobileMenuContainer = document.getElementById(mobileMenuContainerID)
        // create desktop menu
        this.pages.forEach(pageID => {
            const menuItem = document.createElement("div")
            menuItem.classList.add("rijndael-animation__menu-item")
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

        this.addPlayPauseButtonEventListener();
    }


    onAfterResize = debounce(() => {
        MovablesController.resetMovedElement();
        this.createTimeline();
        // play or not play timeline()
  
        if(this.resizeStore && this.resizeStore.paused === false) {
            this.tl.seek(this.resizeStore.resetTime, false)
           // this.play();
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

        console.log(labelTimes)

        // get clostest labeled resetpoint
        let closestLabelTime = 0;
       
        for(let i = 0; i < labelTimes.length; i++){
            const dist = time - labelTimes[i]
            if(dist >= 0 && dist < time - closestLabelTime){
                closestLabelTime = labelTimes[i]
            }
            
        }
        console.log(closestLabelTime)




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

    addPlayPauseButtonEventListener(){
         const playBtn = document.getElementById("rijndael-animation-play") 
         playBtn.addEventListener("click", () => {
             const paused = this.tl.paused()
             if(paused){
                 this.play(null, false);
             }else{
                 this.pause();           
             }
         })

         if(this.tl.paused()){
            playBtn.classList.add("rijndael-animation__play--paused")
         }else{
            playBtn.classList.remove("rijndael-animation__play--paused")
         }
     }


    play(label=null){
        const playBtn = document.getElementById("rijndael-animation-play") 
        playBtn.classList.add("rijndael-animation__play--paused")

        this.tl.play(label, false)
       
    }

    pause(){
        const playBtn = document.getElementById("rijndael-animation-play") 
        playBtn.classList.remove("rijndael-animation__play--paused")
        this.tl.pause()
    }
  


}

export default AnimationController;