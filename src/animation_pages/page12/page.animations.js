import AnimationPage from "../../core/AnimationPage"

import DataController from "../../core/DataController"

import "./page.styles.scss"
import{gsap} from "gsap"
import GridOverview from "../../components/GridOverview"
import Grid from "../../components/Grid"
class Page12 extends AnimationPage{
    constructor(id, locale){
        super(id, locale)
    }

    init(){
        const {overview, output, outputGrid: outputGridContainer} = this.pageElements
        const gridOverview = new GridOverview(overview.id)

        gridOverview.addGridRow(2, "Round6", [{}, 
            {},
            {},
            {},
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--blue"]},
        ])

        gridOverview.addGridRow(3, "Round7", [{}, 
            {},
            {},
            {},
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"]},
        ])

        gridOverview.addGridRow(4, "Round8", [{}, 
            {},
            {},
            {},
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"]},
        ])

        gridOverview.addGridRow(5, "Round9", [{}, 
            {},
            {},
            {},
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"]},
        ])

        gridOverview.addGridRow(6, "Round10", [{}, 
            {},
            {},
            {dataKey: null, classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"]},
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"]},
        ])

        const outputGrid = new Grid(outputGridContainer.id, 4, 4, ["rijndael-cell", "rijndael-cell--tiny"])
        const outputGridMovables =  outputGrid.createMovables(`page-12-output-movables`, ["rijndael-movable-cell", "rijndael-movable-cell--yellow"])
        DataController.subscribe("output", outputGridMovables.movables)


        this.addToPageElements({gridOverview, outputGrid})
        

    }


    createPreFadeIn(){

        const {gridOverview, output} = this.pageElements;


        const titles = [...this.page.querySelectorAll(".rijndael-grid-overview__title")]

        const obj = {val: 0}
        const tl = gsap.timeline();
        tl.to(obj, {val: 1, duration: .0001})
    
        tl.set(this.page, {opacity: 0})
   

        tl.set([...titles], {opacity: 0})
        tl.set(gridOverview.rows.flat(), {opacity: 0})
        tl.set(output, {opacity: 0})
        return tl;
    }

    createAnimationMain(){
        const {gridOverview, text, output, outputGrid} = this.pageElements;
        const titles = [...this.page.querySelectorAll(".rijndael-grid-overview__title")]

        const tl = gsap.timeline();

        tl.to(text, {opacity: 0})
        tl.to(titles, {opacity: 1})
        tl.to(gridOverview.rows[0], {opacity: 1})
        tl.to(gridOverview.rows[1], {opacity: 1})
        tl.to(gridOverview.rows[2], {opacity: 1})
        tl.to(gridOverview.rows[3], {opacity: 1})
        tl.to(gridOverview.rows[4], {opacity: 1})
        tl.to(output, {opacity: 1})


        return tl;


    }   
}

export default Page12