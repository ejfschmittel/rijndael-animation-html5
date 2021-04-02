import AnimationPage from "../../core/AnimationPage"
import AnimatableText from "../../components/AnimatableText";
import {gsap} from "gsap"
import "./page.styles.scss"

class Page1 extends AnimationPage{
    constructor(id, locale){
        super(id, locale)
    }

    init(){
        // create text
        const rijndaelText = new AnimatableText("rijndael-page-1-text-rijndael")
        const cipherText = new AnimatableText("rijndael-page-1-text-cipher")



        this.addToPageElements({
            rijndaelText,
            cipherText
        })
    }

    createAnimationMain(){
        // create text animation

        const {rijndaelText, cipherText} = this.pageElements

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
        return tl;
    }
}

export default Page1;