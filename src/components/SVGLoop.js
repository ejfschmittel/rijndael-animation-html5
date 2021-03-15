import Component from "./Component"



class SVG extends Component{
    constructor(id){
        super(id)

        this.path = null;
        this.svg = null;
        this.redraw();

        window.addEventListener("resize", this.onResize.bind(this))
    }

    onResize(){
        this.redraw();
    }

    getComponentDimensions(){
        console.log(this.component)
        return this.component.getBoundingClientRect()
    }

    getSVGPath(width, height){
        // based on width height

        const segmentSize = height / 4.5;
        const firstSegmentHeight = segmentSize;
        const secondSegmentHeight = segmentSize * 2;
        const thirdSegmentHeight = segmentSize * 1.5;


        const d  = `
        M 0 0 V ${firstSegmentHeight} V ${firstSegmentHeight + secondSegmentHeight} H ${width}
        V ${firstSegmentHeight} H 0 V ${height}
        `;

        return d;
    }

    redraw(){
      
        if(this.svg)
            this.component.removeChild(this.svg)
        const dim = this.getComponentDimensions()
  

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute("viewBox", `-0.5 -0.5 ${dim.width}  ${dim.height}`); 
        svg.setAttribute("width", dim.width -1)
        svg.setAttribute("height", dim.height -1)

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        const d = this.getSVGPath(dim.width, dim.height)
        
        path.setAttribute('d', d)
        path.setAttribute('stroke-width', 1)
        path.setAttribute('stroke', "black")
        path.setAttribute('fill', "none")

        svg.appendChild(path)

        this.path = path;
        this.svg = svg;

        this.component.appendChild(svg)

    }





}


export default SVG

