import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"

import Grid from "../../components/Grid"
import LookupTable from "../../components/LookupTable"
import DataController from "../../core/DataController"


import SVGLoop from "../../components/SVGLoop"

import "./page.styles.scss"
import SVG from "../../components/SVGLoop"

class Page5 extends AnimationPage{
    constructor(){
        super("page-5");
    }

    init(){
        const {svgContainer}  = this.pageElements;

        const svg = new SVGLoop(svgContainer.id, 300)


        this.addToPageElements({
            svg
        })

    }

    createPreFadeIn(){



        const {
            animatableBackground,
            body,
            page,
            runner,
            svg
        } = this.pageElements

    
        const obj = {val: 0}
        const tl = gsap.timeline()
        tl.to(obj,{val: 1, duration: .0001})
        tl.set(animatableBackground, {y: "100%"})
        tl.set([page, body], {opacity: 0})

      


 

        return tl;
    }

    createAnimationIn(){

        const {
            animatableBackground,
            animatableBackgroundBar,
            bar,
            titleMask,
            body,
            page,
        } = this.pageElements


      

        const barBounds = bar.getBoundingClientRect()

        console.log(barBounds)
        const tl = gsap.timeline()

        // move in background
        tl.to(animatableBackground, {y: 0})

        // move bar down
        tl.to(animatableBackgroundBar, {y: barBounds.y})
        tl.set(animatableBackgroundBar, {opacity: 0})
        tl.set(page, {opacity: 1}, "<")

        // reveal title
        tl.to(titleMask, {x: "100%"})

        // show body
        tl.to(body, {opacity: 1}, this.getAutoLabel())

        return tl;
    }

    createAnimationMain(){
        const {runner, svg, labelsLast, labelsMain, labelsInit} = this.pageElements
        const tl = gsap.timeline();
       
        const labelsMainGroup = labelsMain.querySelectorAll(".rijndael-rounded-label")

        tl.to(runner, {duration: 1, ease: "none", motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
            start: 0,
            end: .09
        }})


        tl.to(runner, {duration: 1, ease: "none", motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
            start: .09,
            end: .69
        }})

        tl.timeScale(.2)

        const subTl = gsap.timeline({repeat: 6, onRepeat: () => {
            console.log("repeat")
            
        }})

        subTl.to(runner, {duration: 1, ease: "none", motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
            start: .09,
            end: .69
        }}, "rijndael-page-5-main-round")

        // rgb(234,228,130) yellow
        // rgb(79,154,133) green
        // rgb(243,137,124) red
        // rgb(78,165,236) blue

        // blue .12 => .14
        // red .15 => .17
        // yellow .18 => .20
        // green  21 => 23

        // .09 / 69 => 6
        const mul = (t) => t / 60 * 2; 

        const e = (start, end, progress, time) => (time / (end-start)) * (progress-start)  
        
        subTl.to(labelsMainGroup[0], {background: "rgb(78,165,236,  1)", duration: .001}, `rijndael-page-5-main-round+=${e(.09, .69, .12, 1)}`)
        subTl.to(labelsMainGroup[0], {background: "rgb(78,165,236, .5)", duration: .001}, `rijndael-page-5-main-round+=${e(.09, .69, .14, 1)}`)

        subTl.to(labelsMainGroup[1], {background: "rgb(243,137,124,  1)", duration: .001}, `rijndael-page-5-main-round+=${e(.09, .69, .15, 1)}`)
        subTl.to(labelsMainGroup[1], {background: "rgb(243,137,124, .5)", duration: .001}, `rijndael-page-5-main-round+=${e(.09, .69, .17, 1)}`)

        subTl.to(labelsMainGroup[2], {background: "rgb(234,228,13,  1)", duration: .001}, `rijndael-page-5-main-round+=${e(.09, .69, .18, 1)}`)
        subTl.to(labelsMainGroup[2], {background: "rgb(234,228,13, .5)", duration: .001}, `rijndael-page-5-main-round+=${e(.09, .69, .20, 1)}`)

        subTl.to(labelsMainGroup[3], {background: "rgb(79,154,133,  1)", duration: .001}, `rijndael-page-5-main-round+=${e(.09, .69, .21, 1)}`)
        subTl.to(labelsMainGroup[3], {background: "rgb(79,154,133, .5)", duration: .001}, `rijndael-page-5-main-round+=${e(.09, .69, .23, 1)}`)
     
       

   
        
        tl.add(subTl)


        tl.to(runner, {duration: 3, ease: "none", motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
            start: .69,
            end: 1
        }})


        /*gsap.to(runner, {duration: 1, motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
        }})*/
        return tl;
    }
}


export default Page5