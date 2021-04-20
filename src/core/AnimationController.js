import AnimationPlayerUI from "./AnimationPlayerUI.js"
import AnimationTimeline from "./AnimationTimeline.js"
import DataController from "./DataController.js"
import MovablesController from "./MovablesController.js"
import FormController from "./RijndaelFormController.js"

import LOCALES from "../languages"



const THEME_DEFAULT = "default";
const THEME_TEST = "test"

const THEME_LIST = [THEME_DEFAULT, THEME_TEST]



const THEMES = {
    [THEME_DEFAULT]: ["theme"],  
    [THEME_TEST]: ["theme", "theme--test"],
}

class AnimationController{

    constructor(){

        this.pageIDs = [];
        this.pagesByID = {}
       // this.pageNames = {}
        this.currentPage = null;

        this.isResizing = false;

        this.currentLocaleCode = document.documentElement.lang;

        this.currentTheme = THEME_DEFAULT;
        this.themeElement = document.querySelector("body")
       

        this.dataController = new DataController(this)
        this.movablesController = new MovablesController(this);
        this.timelineController = new AnimationTimeline(this); 
        this.uiController = new AnimationPlayerUI(this);  
        this.FormController = new FormController(this)

        // add resize event listener
        const onResize = this.onResize.bind(this)
        window.addEventListener("resize", onResize)

    }




    onResize(){
        this.isResizing = true;
        this.timelineController.onResize();
       
    }

    hideCurrentPage(){
     
        this.pagesByID[this.currentPage].hide();
    }
   

    setCurrentPage(pageID){
        this.currentPage = pageID;
        this.uiController.updateCurrentPageUI(pageID)
    }


    setLocale(localeCode){
        console.log("set localse")
        if(this.currentLocaleCode === localeCode) return;
        if(!Object.keys(LOCALES).includes(localeCode)) throw new Error(`locale code ${localeCode} not supported`)

        this.currentLocaleCode = localeCode

        // update pages text
        this.pageIDs.forEach(pageID => {
            const page = this.pagesByID[pageID];
            page.updateLocaleLanguageTexts()
        })


        console.log("update ui")
        // update ui text
        this.uiController.updatePlayerLocale();


        // redo timeline (because of into animation)
        this.timelineController.saveAndRebuildTimeline();

    }


    setTheme(newTheme){
        if(this.currentTheme == newTheme) return;
        if(!THEME_LIST.includes(newTheme)) throw new Error(`invalid theme ${newTheme}`);

        this.currentTheme = newTheme;
        this.themeElement.className = "";
        this.themeElement.classList.add(...THEMES[this.currentTheme])

        // update timeline
        this.timelineController.saveAndRebuildTimeline();
    }

    getPageLocale(pageID){
        return LOCALES[this.currentLocaleCode][pageID];
    }

    getLocale(){
        return LOCALES[this.currentLocaleCode]
    }


    play(){
        this.timelineController.play()
    }

    pause(){
        this.timelineController.pause();
    }

    goToFirstPage(){
        this.timelineController.tl.seek(`${this.pageIDs[0]}-animation-main`, false)
    }


    registerAnimationPage(AnimationPageClass, pageID, pageName=null){
        const animationPage = new AnimationPageClass() 
      
        animationPage.initPage(pageID, this)
        this.pageIDs.push(pageID)
        this.pagesByID[pageID] = animationPage;
        //this.pageNames[pageID] = pageName ? pageName : pageID;

        // hide pages
        animationPage.hide();

        this.uiController.addInfoText(pageID, pageName, animationPage.getInfoText());

    }


    buildTimeline(){
  
        this.movablesController.resetMovedElement();
        // create timline
        this.timelineController.createTimeline();

        this.movablesController.resetMovedElement();
        // update menu 
        this.uiController.recreateNavigation()
 
    }

}

export default AnimationController;