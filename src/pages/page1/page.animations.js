import AnimationPage from "../../core/AnimationPage"
import AnimatableText from "../../components/AnimatableText";
import {gsap} from "gsap"


class Page1 extends AnimationPage{
    constructor(){
        super()
    }

    init(){
        // create text
    
    }

    updateLocaleLanguageTexts(){

        const locale = this.controller.locale.getPageLocale(this.id)

        const languageNodes = this.page.querySelectorAll("[data-lang]")
        languageNodes.forEach((element, idx) => {
            const langDataKey = element.dataset["lang"]
            if(langDataKey in locale){
               
                element.innerHTML = locale[langDataKey]
          
            }
        })

        
        const rijndaelText = new AnimatableText("rijndael-page-1-text-rijndael")
        const cipherText = new AnimatableText("rijndael-page-1-text-cipher")

        this.addToPageElements({
            rijndaelText,
            cipherText
        })
    }


    createPreFadeIn(){
        const obj = {val: 0}
        const {subtitle} = this.pageElements


    
        const tl = gsap.timeline();
        tl.to(obj, {val: 1, duration: .0001})
        tl.set(subtitle, {opacity: 0})
        return tl;
    }

    createAnimationMain(){
        // create text animation

    
       const {rijndaelText, cipherText, subtitle} = this.pageElements
        const tl = gsap.timeline();
        tl.fromTo(
            rijndaelText.chars, 
            {scaleX:2, scaleY:2, opacity: 0}, 
            {opacity: 1,scaleX: 1, scaleY: 1, duration: .5, stagger: .2}
        )
        tl.fromTo(
            cipherText.chars, 
            {scaleX:2, scaleY:2, opacity: 0}, 
            {opacity: 1,scaleX: 1, scaleY: 1, duration: .5, stagger: .2}
        )
        tl.to(subtitle, {opacity: 1})
        return tl;
    }
}

export default Page1;