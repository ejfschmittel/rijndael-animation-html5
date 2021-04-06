import Component from "./Component"



class SVG extends Component{
    constructor(id){
        super(id)

        this.path = null;
        this.svg = null;

        this.info = {}

        this.dimensions = {}
        window.addEventListener("resize", this.onResize.bind(this))
        this.redraw();

      
    }

    onResize(){
        this.redraw();
    }

    getComponentDimensions(){
        return this.component.getBoundingClientRect()
    }

    getSVGPath(width, height){
        // based on width height

        const hSegments = [2,4,4];
        const yMul = height / hSegments.reduce((pv, cv) => pv + cv, 0);

        const firstSegmentHeight = yMul * hSegments[0];
        const secondSegmentHeight = yMul * hSegments[1];
        const thirdSegmentHeight = yMul * hSegments[2];


        const d  = `
        M 0 0 V ${firstSegmentHeight} V ${firstSegmentHeight + secondSegmentHeight} H ${width}
        V ${firstSegmentHeight} H 0 V ${height}
        `;


        const totalLength = firstSegmentHeight + secondSegmentHeight * 3 + thirdSegmentHeight + width * 2;

        const segments = []
        const addToSegments = (y, length) => {
            const prev = segments.length > 0 ? segments[segments.length-1] : null;
            segments.push({
                y,
                length,
                startDist: prev ? prev.startDist + prev.length : 0,
                progress: prev ? this.round((prev.startDist + prev.length) / totalLength) : 0,
            })
        }

        // update info
      
        addToSegments(0, firstSegmentHeight)
        addToSegments(firstSegmentHeight, secondSegmentHeight)
        addToSegments(firstSegmentHeight + secondSegmentHeight, secondSegmentHeight + width * 2)
        addToSegments(firstSegmentHeight, secondSegmentHeight),
        addToSegments(firstSegmentHeight + secondSegmentHeight, thirdSegmentHeight)

        
        this.info = {
            width,
            height,
            totalLength,
            segments,
        }


        return d;
    }


    round(num){
       return Math.round((num + Number.EPSILON) * 1000) / 1000
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

