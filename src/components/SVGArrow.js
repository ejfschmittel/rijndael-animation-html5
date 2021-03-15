import Component from "../components/Component"


export const ARROW_DIRECTION = {
    ARROW_TOP: "ARROW_TOP",
    ARROW_BOT: "ARROW_BOT",
    ARROW_RIGHT: "ARROW_RIGHT",
    ARROW_LEFT: "ARROW_LEFT",
};



class SVGArrow extends Component{
    constructor(id, arrowDirection, settings={}){
        super(id)
        this.svg = null;
        this.path = null;

        this.arrowDirection = arrowDirection;

        this.settings = {
            // verhältnisse
            shortSideWidth: .5,
            headSize: .2,

            fill: "#fff",
            strokeWidth: 1,
            stroke: "#fff",

            // width / height
            longSide: 1000,
            shortSide: 500,
            ...settings,
        }

        this.init(); 
    }

    init(){
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute("width", "100%" )
        svg.setAttribute("height", "100%" )


        const {longSide, shortSide, strokeWidth, stroke, fill} = this.settings

  
        const width = this.arrowDirection == ARROW_DIRECTION.ARROW_TOP || this.arrowDirection == ARROW_DIRECTION.ARROW_BOT ? shortSide : longSide;
        const height = this.arrowDirection == ARROW_DIRECTION.ARROW_TOP || this.arrowDirection == ARROW_DIRECTION.ARROW_BOT ? longSide : shortSide;

        svg.setAttribute("viewBox", `-0.5 -0.5 ${width} ${height}`); 


        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        const d = this.getArrowPath(width, height)

 

        path.setAttribute('d', d)
        path.setAttribute('stroke-width', strokeWidth)
        path.setAttribute('stroke', stroke)
        path.setAttribute('fill', fill)

        svg.appendChild(path)

        this.svg = svg;
        this.path = path;

        this.component.appendChild(svg)
    }


    getArrowPath(width, height){
        switch(this.arrowDirection){
            case ARROW_DIRECTION.ARROW_TOP: return this.createArrowPathTop(width, height);
            case ARROW_DIRECTION.ARROW_BOT: return this.createArrowPathBot(width, height);
            case ARROW_DIRECTION.ARROW_LEFT: return this.createArrowPathLeft(width, height);
            case ARROW_DIRECTION.ARROW_RIGHT: return this.createArrowPathRight(width, height);
        }
    }


    createArrowPathBot(width, height){

        const {shortSideWidth, headSize} = this.settings

        const xStart = width / 2 -  shortSideWidth * width / 2;
        const xEnd = width / 2 +  shortSideWidth * width / 2;

        const headStart = height - headSize * height 

        const d = `
            M ${xStart} 0 V ${headStart} H 0 L ${width/2} ${height} 
            L ${width} ${headStart} H ${xEnd} V 0 H ${xStart}
        `;


        return d;
    }


    createArrowPathTop(width, height){
        const {shortSideWidth, headSize} = this.settings

        const xStart = width / 2 -  shortSideWidth * width / 2;
        const xEnd = width / 2 +  shortSideWidth * width / 2;

        const headStart =  headSize * height 

        const d = `
            M ${width/2} 0 L 0 ${headStart} H ${xStart} V ${height}
            H ${xEnd} V ${headStart} H ${width} L ${width/2} 0
        `;


        return d;
    }

    createArrowPathLeft(width, height){
        const {shortSideWidth, headSize} = this.settings

        const yStart = height / 2 -  shortSideWidth * height / 2;
        const yEnd = height / 2 +  shortSideWidth * height / 2;

        const headStart = headSize * height 

        const d = `
            M 0 ${height/2} L ${headStart} ${height} V ${yEnd} H ${width}
            V ${yStart} H ${headStart} V 0 L 0 ${heihgt/2}
        `;


        return d;
    }

    createArrowPathRight(width, height){
        const {shortSideWidth, headSize} = this.settings

        const yStart = height / 2 -  shortSideWidth * height / 2;
        const yEnd = height / 2 +  shortSideWidth * height / 2;

        const headStart = width - headSize * width 

        const d = `
            M 0 ${yStart} V ${yEnd} H ${headStart} V ${height}
            L ${width} ${height/2} L ${headStart} 0 V ${yStart} 
        `;


        return d;
    }
}

export default SVGArrow;