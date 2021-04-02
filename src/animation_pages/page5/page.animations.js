import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"

import Grid from "../../components/Grid"
import LookupTable from "../../components/LookupTable"
import DataController from "../../core/DataController"


import SVGLoop from "../../components/SVGLoop"

import "./page.styles.scss"
import SVG from "../../components/SVGLoop"

class Page5 extends AnimationPage{
    constructor(id, locale){
        super(id, locale)
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

      

        tl.to(runner, {duration: 1, ease: "none", duration: 0.001, motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
            start: 0,
            end: 0,
        }},)

 

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


   getTLDuration(dist){
        return dist * 10
    }

    middleTl( point1, point2, centerTimelineDuration){
    const {runner, svg, labelsLast, labelsMain, labelsInit} = this.pageElements
        const tl = gsap.timeline();
       // const centerTimelineDuration = this.getTLDuration(point2-point1)
       tl.to(runner, {duration: 1, ease: "none", duration: centerTimelineDuration , motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
            start: point1,
            end: point2,
        }}, "rijndael-page-5-main-round")

   
       const labelsMainGroup = labelsMain.querySelectorAll(".rijndael-rounded-label")
        const start1 = centerTimelineDuration/2 - (centerTimelineDuration / 100) * 25
        tl.to(labelsMainGroup[0], {background: "#4b759c", duration: .001}, `rijndael-page-5-main-round+=${start1}`)
        tl.to(labelsMainGroup[0], {background: "#B2D7F9", duration: .001}, `rijndael-page-5-main-round+=${start1+.1}`)

        const start2 = centerTimelineDuration/2 - (centerTimelineDuration / 100) * 15
        tl.to(labelsMainGroup[1], {background: "#b86158", duration: .001}, `rijndael-page-5-main-round+=${start2}`)
        tl.to(labelsMainGroup[1], {background: "#FACCC7", duration: .001}, `rijndael-page-5-main-round+=${start2+.1}`)

        const start3 = centerTimelineDuration/2 - (centerTimelineDuration / 100) * 0
        tl.to(labelsMainGroup[2], {background: "#e6dd65", duration: .001}, `rijndael-page-5-main-round+=${start3}`)
        tl.to(labelsMainGroup[2], {background: "#ECE9BF", duration: .001}, `rijndael-page-5-main-round+=${start3+.1}`)

        const start4 = centerTimelineDuration/2 - (centerTimelineDuration / 100) * -15
        tl.to(labelsMainGroup[3], {background: "#4f9c81", duration: .001}, `rijndael-page-5-main-round+=${start4}`)
        tl.to(labelsMainGroup[3], {background: "#A3C0B6", duration: .001}, `rijndael-page-5-main-round+=${start4+.1}`)


        return tl;
    }

    endTl(point4, endTLDuration){
        const {runner, svg, labelsLast, labelsMain, labelsInit} = this.pageElements
        const tl = gsap.timeline();

       tl.to(runner, {duration: 1, ease: "none", duration: endTLDuration , motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
            start: point4,
            end: 1,
        }}, "rijndael-page-5-final-round")

   
       const labelsMainGroup = labelsLast.querySelectorAll(".rijndael-rounded-label")
     

       const start1 = endTLDuration/2 - (endTLDuration / 100) * 25
       tl.to(labelsMainGroup[0], {background: "#4b759c", duration: .001}, `rijndael-page-5-final-round+=${start1}`)
       tl.to(labelsMainGroup[0], {background: "#B2D7F9", duration: .001}, `rijndael-page-5-final-round+=${start1+.1}`)

       const start2 = endTLDuration/2 - (endTLDuration / 100) * 10
       tl.to(labelsMainGroup[1], {background: "#b86158", duration: .001}, `rijndael-page-5-final-round+=${start2}`)
       tl.to(labelsMainGroup[1], {background: "#FACCC7", duration: .001}, `rijndael-page-5-final-round+=${start2+.1}`)

       const start4 = endTLDuration/2 - (endTLDuration / 100) * -15
       tl.to(labelsMainGroup[2], {background: "#4f9c81", duration: .001}, `rijndael-page-5-final-round+=${start4}`)
       tl.to(labelsMainGroup[2], {background: "#A3C0B6", duration: .001}, `rijndael-page-5-final-round+=${start4+.1}`)


        return tl;
    }

        createAnimationMain(){
        const {runner, svg, labelsLast, labelsMain, labelsInit, counter} = this.pageElements
        const tl = gsap.timeline();
       
      

        const {point1: p1, point2: p2, point3: p3, point4: p4} = svg.dimensions


        const point1 = Math.round((p1 + Number.EPSILON) * 100) / 100
        const point2 = Math.round((p2 + Number.EPSILON) * 100) / 100
        const point3 = Math.round((p3 + Number.EPSILON) * 100) / 100
        const point4 = Math.round((p4 + Number.EPSILON) * 100) / 100
 
        console.log(counter)

        this.currentCounter = 0;

        counter.innerHTML = this.currentCounter;



        // initial round
        tl.to(runner, {duration: 1, ease: "none", duration: this.getTLDuration(point1), motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
            start: 0,
            end: point1,
        }},)

        
        // slow first main rounds
        tl.call(() => {this.currentCounter++; counter.innerHTML = this.currentCounter})
        tl.add(this.middleTl(point1, point2, this.getTLDuration(point2-point1)))
        tl.to(runner, {duration: 1, ease: "none", duration: this.getTLDuration(point3-point2), motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
            start: point2,
            end: point3,
        }})

        // repeating faster rounds 2-8
        const repeatingTL = gsap.timeline({
            repeat: 6, 
            onStart: () => {this.currentCounter++; counter.innerHTML = this.currentCounter},
            onRepeat: () => {this.currentCounter++; counter.innerHTML = this.currentCounter}
        });
        repeatingTL.add(this.middleTl(point3, point4,this.getTLDuration(point4- point3) / 4))
        repeatingTL.to(runner, {duration: 1, ease: "none", duration: this.getTLDuration(point3-point2) / 4, motionPath: {
            path: svg.path,
            alignOrigin: [0.5, 0.5],
            align: svg.path,
            start: point2,
            end: point3,
        }})
       

        tl.add(repeatingTL)

        // last main round
        tl.call(() => {this.currentCounter++; counter.innerHTML = this.currentCounter})
        tl.add(this.middleTl(point3, point4,this.getTLDuration(point4- point3)))


        // final round
        tl.call(() => {this.currentCounter++; counter.innerHTML = this.currentCounter})
        tl.add(this.endTl(point4, this.getTLDuration(1-point4)))


        return tl;
    }
}


export default Page5