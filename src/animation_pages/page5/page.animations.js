import AnimationPage from "../../core/AnimationPage"

import {gsap} from "gsap"

import Grid from "../../components/Grid"



import SVGLoop from "../../components/SVGLoop"

import "./page.styles.scss"


class Page5 extends AnimationPage{
    constructor(){
        super()
    }

    init(){
        const {svgContainer, runner}  = this.pageElements;

        const svg = new SVGLoop(svgContainer.id, 300)

        const grid = new Grid(runner.id, 4,4, ["page-5-runner-cell"])


        this.counter = 0;

        this.addToPageElements({
            svg,
            grid,
        })

    }

    createPreFadeIn(){

        const {
            animatableBackground,
            body,
            page,
            runner,
            svg,
            counter
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

        tl.call(() => {counter.innerHTML = 0; this.counter =0;})

 

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



    // one rund through the whole motion path 0 to 1 should take 10 seconds
    getMotionPathDuration(startProgress, endProgress){
        const MOTION_PATH_DURATION_SECONDS = 10;
        return (endProgress - startProgress) * MOTION_PATH_DURATION_SECONDS;
    }

    createAnimationMain(){
        const {svg, runner, labelsLast, labelsMain, labelsInit, counter} = this.pageElements

        const svgSegments = svg.info.segments;


        const tl = gsap.timeline();

    

        tl.add(this.createSegmentWithLabelTL(0, svgSegments, runner, svg, labelsInit, [
            "#4f9c81"
        ]))


        for(let i = 1; i < 9; i++){

            tl.add(this.createSegmentWithLabelTL(1, svgSegments, runner, svg, labelsMain, [
                "#4b759c",
                "#b86158", 
                "#e6dd65", 
                "#4f9c81"
            ]), `main-round-${i}`)

            tl.call(() => { counter.innerHTML = i; })
            tl.add(this.createSegmentTL(2, svgSegments, runner, svg.path))
        }

        tl.add(this.createSegmentWithLabelTL(3, svgSegments, runner, svg, labelsMain, [
            "#4b759c",
            "#b86158", 
            "#e6dd65", 
            "#4f9c81"
        ]), "main-round-9")
        tl.call(() => { counter.innerHTML = 9; })

        tl.add(this.createSegmentWithLabelTL(4, svgSegments, runner, svg, labelsLast, [
            "#4b759c",
            "#b86158", 
            "#e6dd65", 
        ]), "final-round")
        tl.call(() => { counter.innerHTML = 10; })
        return tl;
    }


    createSegmentWithLabelTL(segmentIndex, segments, runner, svg, labels, colors=[]){
        const labelElements = labels.querySelectorAll(".rijndael-rounded-label")
        const endProgress = segmentIndex == segments.length -1 ? 1 : segments[segmentIndex+1].progress;
        const duration = this.getMotionPathDuration(segments[segmentIndex].progress,endProgress)

        const svgBounds = svg.svg.getBoundingClientRect();
        
    
        const tl = gsap.timeline();
        tl.add(this.createSegmentTL(segmentIndex, segments, runner, svg.path), "segOne")

        for(let i = 0; i < labelElements.length; i++){
            const bounds = labelElements[i].getBoundingClientRect()
            const relativeLabelYStart = bounds.y -svgBounds.y - segments[segmentIndex].y ;
            const relativeLabelYEnd = bounds.y -svgBounds.y - segments[segmentIndex].y + bounds.height; 
            const highlightStart = (relativeLabelYStart / segments[segmentIndex].length) * duration;
            const highlightEnd = (relativeLabelYEnd / segments[segmentIndex].length) * duration;

            const initalBackground = labelElements[i].style.background;
            tl.to(labelElements[i], {background: colors[i] || "#fff", duration: .001}, `segOne+=${highlightStart}`)
            tl.to(labelElements[i], {background: initalBackground, duration: .001}, `segOne+=${highlightEnd}`)
        }

       
        return tl;
    }


    createSegmentTL(index, segments, runner, path){
        const tl = gsap.timeline();

        const endProgress = index == segments.length -1 ? 1 : segments[index+1].progress;

        const duration = this.getMotionPathDuration( segments[index].progress, endProgress)
        tl.to(runner, {motionPath: {
            path: path,
            alignOrigin: [0.5, 0.5],
            align: path,
            start: segments[index].progress,
            end: endProgress,
        }, duration,  ease: "none",}, `segment-${index+1}`)
        return tl;
    }

 
}


export default Page5