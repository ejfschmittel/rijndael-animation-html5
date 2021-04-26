import AnimationPlayerUI from "./AnimationPlayerUI.js"
import AnimationTimeline from "./AnimationTimeline.js"
import DataController from "./DataController.js"
import MovablesController from "./MovablesController.js"
import FormController from "./RijndaelFormController.js"
import ThemeController from "./ThemeController.js"
import LocaleController from "./LocaleController"






class AnimationController{

    constructor(settings){

        this.settings = settings;

        this.pageIDs = [];
        this.pagesByID = {}
        this.currentPage = null;

        this.isResizing = false;
       

      
    
        this.locale = new LocaleController(this, settings.locale)
        this.theme = new ThemeController(this, settings.themes)
        this.movables = new MovablesController(this);
        this.data = new DataController(this)
        this.timeline = new AnimationTimeline(this); 
        this.ui = new AnimationPlayerUI(this);  
        this.form = new FormController(this)


        // add resize event listener
        const onResize = this.onResize.bind(this)
        window.addEventListener("resize", onResize)

    }




    onResize(){
        this.isResizing = true;
        this.timeline.onResize();
       
    }

    hideCurrentPage(){
     
        this.pagesByID[this.currentPage].hide();
    }
   

    setCurrentPage(pageID){
        this.currentPage = pageID;
        this.ui.updateCurrentPageUI(pageID)
    }


  /*  setLocale(localeCode){
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
    }*/


    play(){
        this.timeline.play()
    }

    pause(){
        this.timeline.pause();
    }

    goToFirstPage(){
        this.timeline.tl.seek(`${this.pageIDs[0]}-animation-main`, false)
    }


    registerAnimationPage(AnimationPageClass, pageID){
        const animationPage = new AnimationPageClass() 
      
        animationPage.initPage(pageID, this)
        this.pageIDs.push(pageID)
        this.pagesByID[pageID] = animationPage;

        // hide pages
        animationPage.hide();

        this.ui.addInfoText(pageID);

    }


    buildTimeline(){
  
        this.movables.resetMovedElement();
        // create timline
        this.timeline.createTimeline();

        this.movables.resetMovedElement();
        // update menu 
        this.ui.recreateNavigation()
 
    }

}

export default AnimationController;