

const LOCALE_SELECT_ID = "rijndael-animation-lang-select";

class LocaleController{
    constructor(controller, locales){
        this.controller = controller;
        this.localesSelect = document.getElementById(LOCALE_SELECT_ID);

        this.locales = locales;
        this.currentLocale = this.getCurrentPageLocale();
        if(!this.isValidLocaleKey(this.currentLocale)) this.currentLocale = Object.keys(this.locales)[0]

        this.updateHTMLLocale();
        this.initLocalesSelect();
    }

    setLocale(localeKey){
        console.log("set locale")
        if(!this.isValidLocaleKey(localeKey)) return;
        this.currentLocale = localeKey;

        
        this.updateHTMLLocale();
        this.updatePagesLocale();
    }

  
    // updates page text to current locale
    updatePagesLocale(){
        this.controller.pageIDs.forEach(pageID => {
            const page = this.controller.pagesByID[pageID];
            page.updateLocaleLanguageTexts()
        })
    }

    // updates ui text to current locale
    updateHTMLLocale(){
        const containers = document.querySelectorAll(".ui > div")
        // start at one to skip pages
        for(let i = 1; i < containers.length; i++){
            const container = containers[i]
            this.updateHTMLLocaleByContainer(container, this.getCurrentLocaleObj())
        } 
    }

    updateHTMLLocaleByContainer(container, locale){
        const languageNodes = container.querySelectorAll("[data-lang]")
        languageNodes.forEach(element => {
            const langDataKey = element.dataset["lang"]
            if(langDataKey in locale){
                element.innerHTML = locale[langDataKey]
            }
        })
    }

    isValidLocaleKey(localeKey){
        return Object.keys(this.locales).includes(localeKey)
    }

    getLocaleText(key){
        return this.getCurrentLocaleObj()[key]
    }

    getPageLocale(pageID){
        return this.getCurrentLocaleObj()[pageID] 
    }

    getLocalePageText(pageID, localeKey){
        return this.getCurrentLocaleObj()[pageID][localeKey];
    }
    
    

    getCurrentLocaleObj(){
        return this.locales[this.currentLocale]
    }

    addLocaleToElement(key, element){
        const text = this.getLocaleText(key)
        element.innerHTML = text;
        element.dataset.lang = key
    }

    // populate options for locale select in the settings menu
    initLocalesSelect(){
        // insert options
        Object.keys(this.locales).map(localeKey => {
            const option = document.createElement("option");
            option.value = localeKey;
            option.innerHTML = this.getLocaleText(`languageOption${localeKey.toUpperCase()}`)
            option.dataset.lang = `languageOption${localeKey.toUpperCase()}`;

            if(localeKey == this.currentLocale)
                option.selected = true;

            this.localesSelect.appendChild(option)
        })

        // set selected & add event listener
        this.localesSelect.value = this.currentLocale;
        this.localesSelect.addEventListener("change", (e) => {
            const localeKey = e.target.value;
            this.setLocale(localeKey)
        })



    }




    getCurrentPageLocale(){
        return document.documentElement.lang;
    }
}




export default LocaleController;
