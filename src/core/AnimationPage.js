


import {gsap} from "gsap"


import {dashedStringToCammelCase} from "../utils/utils"

import {getDimensions}  from "./MovablesController"

class AnimationPage{
    constructor(){
        this.id = null;
        this.page = null;

        this.FADE_IN_DURATION = .0001;
        this.FADE_OUT_DURATION = .00001;
        this.FADE_OUT_DELAY = 3;
        this.autoLabelCounter = 0;


        this.bodyReference = document.querySelector("body")
      
    }

    initPage(pageID, controller){
        this.page = document.getElementById(pageID)
        if(!this.page) throw new Error(`No page with id ${pageID} found.`)
        this.id = pageID;
        this.controller = controller;
     

        this.collectPageElements();
       
        this.init();
        this.updateLocaleLanguageTexts();
    }



    getInfoText = () => {
        return `
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
        `;
    }

  

    
    // creates a unique dummy label
    getAutoLabel(){      
        this.autoLabelCounter++;
        return `${this.pageID}-label-${this.autoLabelCounter}`
    }

 
    init(){};


    collectPageElements(){
        const prefix = `rijndael-${this.id}`

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


    updateLocaleLanguageTexts(){

        const locale = this.controller.getPageLocale(this.id)

        const languageNodes = this.page.querySelectorAll("[data-lang]")
        languageNodes.forEach((element, idx) => {
            const langDataKey = element.dataset["lang"]
            if(langDataKey in locale){
               
                element.innerHTML = locale[langDataKey]
          
            }
        })
    }

    // timeline insert to update currentpage number in 
    createUpdatePage(prevPageID){
        const obj = {val:0};
        const tl = gsap.timeline({
            onStart: () => {
                this.controller.setCurrentPage(this.id)
            },
            onReverseComplete: () => {
                if(prevPageID) this.controller.setCurrentPage(prevPageID)
            }
        })
        tl.to(obj, {val: 1, duration: .0001})
        return tl;
    }

    createPreFadeIn(){}
    createAnimationMain(){}
    createAnimationOut(){}
    createAnimationIn(){}
    createFadeIn(){
        const tl = gsap.timeline();
        //tl.set(this.page, {visibility: "hidden", opacity: 0})
       
        tl.set(this.page, {visibility: "visible"})
        tl.to(this.page, { opacity: 1, duration: this.FADE_IN_DURATION})
        return tl;
    }
    createFadeOut(){
        const tl = gsap.timeline();
        tl.to(this.page, {opacity: 0,delay: this.FADE_OUT_DELAY, duration: this.FADE_OUT_DURATION})
        tl.set(this.page, {visibility: "hidden"})
        return tl;
    }




    moveToLanding(movable, landing, settings={}){
            settings = {
                duration: 1,
                ...settings,
            }

            const currentParent = movable.parentNode;      

            this.controller.movablesController.registerMovedElement(movable)
        
            const startPos = getDimensions(movable)
            landing.appendChild(movable)
            const endPos = getDimensions(movable)

            const copy = {}          
            copy.x = endPos.x + (startPos.l - endPos.l);
            copy.y = endPos.y + (startPos.t - endPos.t);
            copy.width = startPos.w;
            copy.height = startPos.h;
          
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

        this.controller.movablesController.registerMovedElement(movable)

       
        const startPos = getDimensions(movable)
        landing.appendChild(movable)
        const endPos = getDimensions(movable)

        const copy = {}          
        copy.x = endPos.x + (startPos.l - endPos.l);
        copy.y = endPos.y + (startPos.t - endPos.t);
        copy.width = startPos.w;
        copy.height = startPos.h;
      

        copy.zIndex = 20;

        const tl = gsap.timeline({
            onStart: () => {
                
                landing.appendChild(movable)
            },
            onReverseComplete: () => {
                currentParent.appendChild(movable)
               gsap.set(movable, {x: 0, y: 0, width: "100%", height: "100%", zIndex: 5})
            }
        })
       



       tl.set(movable, copy)    
       tl.to(movable, {
        x: copy.x / 2 + settings.offsetX, 
        y: copy.y / 2 + settings.offsetY, 
        width: endPos.w - (endPos.w - startPos.w) / 2, 
        height: endPos.h - (endPos.h - startPos.h) / 2})   
       tl.to(movable, {x: 0, y: 0, width: endPos.w, height: endPos.h, duration: 1})
       tl.set(movable, {width: "100%", height: "100%", zIndex: 5})
       return tl;
    }


    getColor(name){
        var style = getComputedStyle(this.bodyReference)
        return style.getPropertyValue(name)
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
        gsap.set(this.page, {opacity: 0, visibility: "hidden"})
    }

    subscribeTo(key, elements){
        this.controller.dataController.subscribe(key, elements)
    }

    addToPageElements(object){
        this.pageElements = {
            ...this.pageElements,
            ...object
        }
    }
}


export default AnimationPage