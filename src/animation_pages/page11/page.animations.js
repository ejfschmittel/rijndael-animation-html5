import AnimationPage from "../../core/AnimationPage"

import "./page.styles.scss"
import{gsap} from "gsap"
import GridOverview from "../../components/GridOverview"
class Page11 extends AnimationPage{
    constructor(id, locale){
        super(id, locale)
    }

    init(){
        const {overview} = this.pageElements
        const gridOverview = new GridOverview(overview.id)

        gridOverview.addGridRow(2, this.text("inputLabel"), [{}, 
            { dataKey: null, classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"] },
            { dataKey: null, classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"] },
            { dataKey: null, classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"] },
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--blue"]},
        ])

        gridOverview.addGridRow(3, this.text("roundOneLabel"), [{}, 
            {},
            {},
            {},
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"]},
        ])

        gridOverview.addGridRow(4, this.text("roundTwoLabel"), [{}, 
            {},
            {},
            {},
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"]},
        ])

        gridOverview.addGridRow(5, this.text("roundThreeLabel"), [{}, 
            {},
            {},
            {},
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"]},
        ])

        gridOverview.addGridRow(6, this.text("roundFourLabel"), [{}, 
            {},
            {},
            {},
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"]},
        ])

        gridOverview.addGridRow(7, this.text("roundFiveLabel"), [{}, 
            {},
            {},
            {},
            { classes: ["rijndael-movable-cell", "rijndael-movable-cell--grey"]},
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

        tl.to(text, {opacity: 0})
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