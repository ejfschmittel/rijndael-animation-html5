
import {gsap} from "gsap"


import {dashedStringToCammelCase} from "../utils/utils"

import MovablesController, {getDimensions}  from "../core/MovablesController"

class AnimationPage{
    constructor(pageID){

        this.pageID = pageID;
      
        this.page = document.getElementById(pageID)

        this.FADE_IN_DURATION = .0001;
        this.FADE_OUT_DURATION = .00001;
        this.FADE_OUT_DELAY = 3;


        this.initPage();
    }

    initPage(){
        this.collectPageElements();
        this.init();
    }

    init(){};


    collectPageElements(){
        const prefix = `rijndael-${this.pageID}`

        // ge all elements on this page with id starting with prefix
        const elements = this.page.querySelectorAll(`[id^='${prefix}']`)  

        const obj = [...elements].reduce((prev, elem) => {          
            // remove prefix
            const elementObjID = dashedStringToCammelCase(elem.id.replace(`${prefix}-`, ''))

            return {...prev, [elementObjID]: elem}
        }, {})
        

        this.pageElements = obj;
        return obj;
    }


    createPreFadeIn(){}
    createAnimationMain(){}
    createAnimationOut(){}
    createAnimationIn(){}
    createFadeIn(){
        const tl = gsap.timeline();
        tl.to(this.page, {opacity: 1, duration: this.FADE_IN_DURATION})
        return tl;
    }
    createFadeOut(){
        const tl = gsap.timeline();
        tl.to(this.page, {opacity: 0, delay: this.FADE_OUT_DELAY, duration: this.FADE_OUT_DURATION})
        return tl;
    }




    moveToLanding(movable, landing, settings={}){


            settings = {
                duration: 1,
                ...settings,
            }

            const currentParent = movable.parentNode;      

            MovablesController.registerMovedElement(movable)

           
            const startPos = getDimensions(movable)
            landing.appendChild(movable)
            const endPos = getDimensions(movable)

            const copy = {}          
            copy.x = endPos.x + (startPos.l - endPos.l);
            copy.y = endPos.y + (startPos.t - endPos.t);
            copy.width = startPos.w;
            copy.height = startPos.h;
          

            console.log(movable.id)

            copy.zIndex = 20;

            const tl = gsap.timeline({
                onStart: () => {
                    
                    landing.appendChild(movable)
                },
                onReverseComplete: () => {
                    currentParent.appendChild(movable)
                   gsap.set(movable, {x: 0, y: 0, width: "100%", height: "100%"})
                }
            })
           
 
           tl.set(movable, copy)           
           tl.to(movable, {x: 0, y: 0, width: endPos.w, height: endPos.h, ...settings})
           tl.set(movable, {width: "100%", height: "100%", zIndex: 5})
           return tl;
    }
    moveToLandingAdvanced(movable, landing, settings={}){

        settings = {
            offsetX: 0,
            offsetY: 0,
            ...settings
        }


        const currentParent = movable.parentNode;      

        MovablesController.registerMovedElement(movable)

       
        const startPos = getDimensions(movable)
        landing.appendChild(movable)
        const endPos = getDimensions(movable)

        const copy = {}          
        copy.x = endPos.x + (startPos.l - endPos.l);
        copy.y = endPos.y + (startPos.t - endPos.t);
        copy.width = startPos.w;
        copy.height = startPos.h;
      

       // copy.zIndex = 20;

        const tl = gsap.timeline({
            onStart: () => {
                
                landing.appendChild(movable)
            },
            onReverseComplete: () => {
                currentParent.appendChild(movable)
               gsap.set(movable, {x: 0, y: 0, width: "100%", height: "100%"})
            }
        })
       



       tl.set(movable, copy)    
       tl.to(movable, {
        x: copy.x / 2 + settings.offsetX, 
        y: copy.y / 2 + settings.offsetY, 
        width: endPos.w - (endPos.w - startPos.w) / 2, 
        height: endPos.h - (endPos.h - startPos.h) / 2})   
       tl.to(movable, {x: 0, y: 0, width: endPos.w, height: endPos.h, duration: 1})
       tl.set(movable, {width: "100%", height: "100%"})
       return tl;
}



moveGroup(movables, landings, settings={}, label="label"){

 
    const tl = gsap.timeline()

    tl.add(this.moveToLanding(movables[0], landings[0], settings), label)

    for(let i = 1; i < movables.length; i++){
        tl.add(this.moveToLanding(movables[i], landings[i], settings), `${label}+=0`)
    }

    return tl;
}


    hide(){
        gsap.set(this.page, {opacity: 0})
    }

    addToPageElements(object){
        this.pageElements = {
            ...this.pageElements,
            ...object
        }
    }
}


export default AnimationPage