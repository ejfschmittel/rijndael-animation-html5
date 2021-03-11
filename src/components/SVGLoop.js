import Component from "./Component"


class SVG extends Component{
    constructor(id){
        super(id)

        this.path = null;
        this.svg = null;
        this.init();

        window.addEventListener("resize", this.onResize.bind(this))
    }

    onResize(){
        console.log("on resize")
        const dim = this.getComponentDimensions()
        // update svg width / height
        this.svg.setAttribute("viewBox", `0 0 ${dim.width} ${dim.height}`);

      

        this.path.setAttribute("d", this.getSVGPath(dim.width, dim.height))
    }

    getComponentDimensions(){
        return this.component.getBoundingClientRect()
    }

    getSVGPath(width, height){
        // based on width height

        const segmentSize = height / 4.5;
        const firstSegmentHeight = segmentSize;
        const secondSegmentHeight = segmentSize * 2;
        const thirdSegmentHeight = segmentSize * 1.5;


        const d  = `
        M 0 0 V ${firstSegmentHeight} V ${firstSegmentHeight + secondSegmentHeight} H ${width - 50}
        V ${firstSegmentHeight} H 0 V ${height}
        `;

        return d;
    }

    init(){
      
        const dim = this.getComponentDimensions()
  

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute("viewBox", `-0.5 -0.5 ${dim.width} ${dim.height}`); 
        svg.setAttribute("width", "100%" )
        svg.setAttribute("height", "100%" )

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

