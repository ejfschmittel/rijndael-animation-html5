import Component from "./Component"


class AnimatableText extends Component{
    constructor(id){
        super(id)
        
        this.chars = []
        this.init();
    }

    init(){
        this.component.classList.add("rijndael-animatable-text")
        const text = this.component.innerHTML;
        this.component.innerHTML = ""

        text.split("").forEach((char) => {

            const charElement = document.createElement("div")
            charElement.classList.add("rijndael-animatable-text__char")
            charElement.innerHTML = char;
            this.chars.push(charElement)
            this.component.appendChild(charElement)
        })
    }
}


export default AnimatableText