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


        this.iframeContainer = window.parent.document.getElementById(this.settings.iframeContainerID);
      

        // add resize event listener
        const onResize = this.onResize.bind(this)
        window.addEventListener("resize", onResize)

    }

    init(pageID=null){
        if(this.pagesByID.length <= 0) throw new Error("can't init without at least registering one animation page")
        pageID = pageID ? pageID : this.pageIDs[0];

        this.setCurrentPage(pageID)
        this.resizeIFrameContainer();
    }

    resizeIFrameContainer(){
        const width = this.iframeContainer.getBoundingClientRect().width;
        if(width <= 900){
            this.iframeContainer.style.height = window.parent.innerHeight + "px";
        }else{
            this.iframeContainer.style.height = document.body.scrollHeight + "px"
        }
    }




    onResize(e){
        this.resizeIFrameContainer();
        this.ui.onResizeStart()
       
        this.isResizing = true;
        this.timeline.onResize();      
    }

    hideCurrentPage(){
     
        this.pagesByID[this.currentPage].hide();
    }

    hideAllPages(){
        this.pageIDs.map(pageID => {
            const page = this.pagesByID[pageID];
            page.hide();
        })
    }
   

   

    setCurrentPage(pageID){
        this.currentPage = pageID;
        this.ui.updateCurrentPageUI(pageID)
    }





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