import AnimationPage from "../../core/AnimationPage"


import{gsap} from "gsap"
import GridOverview from "../../components/GridOverview"
import Grid from "../../components/Grid"

class Page12 extends AnimationPage{
    constructor(){
        super()
    }

    init(){
        const {overview, output, outputGrid: outputGridContainer} = this.pageElements
        const gridOverview = new GridOverview(overview.id, this)

        gridOverview.addGridRow(2, "roundSixLabel", [
            {dataKey: "round-6-initial"}, 
            {dataKey: "after-sub-bytes-6"},
            {dataKey: "after-shift-rows-6"},
            {dataKey: "after-mix-columns-6"},
            { 
                dataKey: "key-6",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--beta"]
            },
        ])

        gridOverview.addGridRow(3, "roundSevenLabel", [
            {dataKey: "round-7-initial"}, 
            {dataKey: "after-sub-bytes-7"},
            {dataKey: "after-shift-rows-7"},
            {dataKey: "after-mix-columns-7"},
            { 
                dataKey: "key-7",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"]
            },
        ])

        gridOverview.addGridRow(4, "roundEightLabel", [
            {dataKey: "round-8-initial"}, 
            {dataKey: "after-sub-bytes-8"},
            {dataKey: "after-shift-rows-8"},
            {dataKey: "after-mix-columns-8"},
            { 
                dataKey: "key-8",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"]
            },
        ])

        gridOverview.addGridRow(5, "roundNineLabel", [
            {dataKey: "round-9-initial"}, 
            {dataKey: "after-sub-bytes-9"},
            {dataKey: "after-shift-rows-9"},
            {dataKey: "after-mix-columns-9"},
            { 
                dataKey: "key-9",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"]
            },
        ])

        gridOverview.addGridRow(6, "roundTenLabel", [
            {dataKey: "round-10-initial"}, 
            {dataKey: "after-sub-bytes-10"},
            {dataKey: "after-shift-rows-10"},
            {dataKey: null, classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"]},
            { 
                dataKey: "key-10",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"]
            },
        ])

        const outputGrid = new Grid(outputGridContainer.id, 4, 4, ["rijndael-cell", "rijndael-cell--tiny"])
        const outputGridMovables =  outputGrid.createMovables(`page-12-output-movables`, ["rijndael-movable-cell", "rijndael-movable-cell--alpha"])
        this.subscribeTo("after-add-round-key-10", outputGridMovables.movables)


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