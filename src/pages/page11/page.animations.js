import{gsap} from "gsap"

import AnimationPage from "../../core/AnimationPage"
import GridOverview from "../../components/GridOverview"



class Page11 extends AnimationPage{
    constructor(){
        super()
    }

    init(){
        const {overview} = this.pageElements
        const gridOverview = new GridOverview(overview.id, this)

        gridOverview.addGridRow(2, "inputLabel", [
            { dataKey: "initial-state"}, 
            { dataKey: null, classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"] },
            { dataKey: null, classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"] },
            { dataKey: null, classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"] },
            { 
                dataKey: "key-0",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--beta"]
            },
        ])

        gridOverview.addGridRow(3, "roundOneLabel", [
            {dataKey: "round-1-initial"}, 
            {dataKey: "after-sub-bytes-1"},
            {dataKey: "after-shift-rows-1"},
            {dataKey: "after-mix-columns-1"},
            { 
                dataKey: "key-1",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"]
            },
        ])

        gridOverview.addGridRow(4, "roundTwoLabel", [
            {dataKey: "round-2-initial"}, 
            {dataKey: "after-sub-bytes-2"},
            {dataKey: "after-shift-rows-2"},
            {dataKey: "after-mix-columns-2"},
            { 
                dataKey: "key-2",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"]
            },
        ])

        gridOverview.addGridRow(5, "roundThreeLabel", [
            {dataKey: "round-3-initial"}, 
            {dataKey: "after-sub-bytes-3"},
            {dataKey: "after-shift-rows-3"},
            {dataKey: "after-mix-columns-3"},
            { 
                dataKey: "key-3",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"]
            },
        ])

        gridOverview.addGridRow(6, "roundFourLabel", [
            {dataKey: "round-4-initial"}, 
            {dataKey: "after-sub-bytes-4"},
            {dataKey: "after-shift-rows-4"},
            {dataKey: "after-mix-columns-4"},
            { 
                dataKey: "key-4",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"]
            },
        ])

        gridOverview.addGridRow(7, "roundFiveLabel", [
            {dataKey: "round-5-initial"}, 
            {dataKey: "after-sub-bytes-5"},
            {dataKey: "after-shift-rows-5"},
            {dataKey: "after-mix-columns-5"},
            { 
                dataKey: "key-5",
                classes: ["rijndael-movable-cell", "rijndael-movable-cell--eta"]
            },
        ])


        this.addToPageElements({gridOverview})
        

    }


    createPreFadeIn(){

        const {gridOverview} = this.pageElements;


        const titles = [...this.page.querySelectorAll(".rijndael-grid-overview__title")]

        const obj = {val: 0}
        const tl = gsap.timeline();
        tl.to(obj, {val: 1, duration: .0001})
        tl.set(this.page, {opacity: 0})

        tl.set([...titles], {opacity: 0})
        tl.set(gridOverview.rows.flat(), {opacity: 0})
        return tl;
    }

    createAnimationMain(){
        const {gridOverview, text} = this.pageElements;
        const titles = [...this.page.querySelectorAll(".rijndael-grid-overview__title")]

        const tl = gsap.timeline();

        tl.to(text, {opacity: 0, delay: 3})
        tl.to(titles, {opacity: 1})
        tl.to(gridOverview.rows[0], {opacity: 1})
        tl.to(gridOverview.rows[1], {opacity: 1})
        tl.to(gridOverview.rows[2], {opacity: 1})
        tl.to(gridOverview.rows[3], {opacity: 1})
        tl.to(gridOverview.rows[4], {opacity: 1})
        tl.to(gridOverview.rows[5], {opacity: 1})

        return tl;


    }   
}

export default Page11