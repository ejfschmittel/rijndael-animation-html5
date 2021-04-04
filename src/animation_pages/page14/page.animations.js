import AnimationPage from "../../core/AnimationPage"
import Grid from "../../components/Grid"
import {gsap} from "gsap"

import DataController from "../../core/DataController"
import SBox from "../../components/LookupTable"

import {shiftArray} from "../../utils/utils"
import {hexStringToInt} from "../../utils/conversions"

import "./page.styles.scss"

class Page14 extends AnimationPage{
    constructor(id, locale){
        super(id, locale)

        this.FADE_OUT_DELAY = 10;
    }

    init(){
      
        const { primaryGridsOne, primaryGridsTwo, primaryGridsThree, primaryGridsFour, finalGrid} = this.pageElements

        console.log(this.pageElements)

        const primaryLandingsOne = new Grid(primaryGridsOne.id, 4,4, ["page-14-cell"])
        const primaryLandingsTwo = new Grid(primaryGridsTwo.id, 4,4, ["page-14-cell"])
        const primaryLandingsThree = new Grid(primaryGridsThree.id, 4,4, ["page-14-cell"])
        const primaryLandingsFour = new Grid(primaryGridsFour.id, 4,4, ["page-14-cell"])
        const primaryLandings = [primaryLandingsOne, primaryLandingsTwo, primaryLandingsThree, primaryLandingsFour]
  

        const pgOneMovablesOg = primaryLandingsOne.createMovables("pg-one-movables-og", ["rijndael-movable-cell", "rijndael-movable-cell--blue"])
        const pgOneMovablesTransforms = primaryLandingsOne.createMovables("pg-one-movables-transforms", ["rijndael-movable-cell", "rijndael-movable-cell--blue"])
        DataController.subscribe("key", pgOneMovablesOg.movables)
        DataController.subscribe("key", pgOneMovablesTransforms.movables)

        const pgTwoMovablesOg = primaryLandingsTwo.createMovables("pg-two-movables-og", ["rijndael-movable-cell", "rijndael-movable-cell--grey"])
        const pgTwoMovablesTransforms = primaryLandingsTwo.createMovables("pg-two-movables-transforms", ["rijndael-movable-cell", "rijndael-movable-cell--grey"])
        DataController.subscribe("round-key-1", pgTwoMovablesOg.movables)
        DataController.subscribe("round-key-1", pgTwoMovablesTransforms.movables)

        const pgThreeMovablesOg = primaryLandingsThree.createMovables("pg-three-movables-og", ["rijndael-movable-cell", "rijndael-movable-cell--grey"])
        const pgThreeMovablesTransforms = primaryLandingsThree.createMovables("pg-three-movables-transforms", ["rijndael-movable-cell", "rijndael-movable-cell--grey"])
        DataController.subscribe("round-key-2", pgThreeMovablesOg.movables)
        DataController.subscribe("round-key-2", pgThreeMovablesTransforms.movables)

        const pgFourMovablesOg = primaryLandingsFour.createMovables("pg-four-movables-og", ["rijndael-movable-cell", "rijndael-movable-cell--grey"])
        const pgFourMovablesTransforms = primaryLandingsFour.createMovables("pg-four-movables-transforms", ["rijndael-movable-cell", "rijndael-movable-cell--grey"])
        DataController.subscribe("round-key-3", pgFourMovablesOg.movables)
        DataController.subscribe("round-key-3", pgFourMovablesTransforms.movables)

        const pgMovablesOg = [pgOneMovablesOg, pgTwoMovablesOg, pgThreeMovablesOg, pgFourMovablesOg] 
        const pgMovablesTransforms = [pgOneMovablesTransforms, pgTwoMovablesTransforms, pgThreeMovablesTransforms, pgFourMovablesTransforms]

        const finalGridLandings = new Grid(finalGrid.id, 4,4, ["page-14-cell"])
        const finalGridMovables = finalGridLandings.createMovables("pg-four-movables-og", ["rijndael-movable-cell", "rijndael-movable-cell--grey"])
        DataController.subscribe("round-key-10", finalGridMovables.movables)


        const {secondaryGridsOne, secondaryGridsTwo, secondaryGridsThree, secondaryGridsFour} = this.pageElements
        const secondaryLandingsOne = new Grid(secondaryGridsOne.id, 4,4, ["page-14-cell"])
        const secondaryLandingsTwo = new Grid(secondaryGridsTwo.id, 4,4, ["page-14-cell"])
        const secondaryLandingsThree = new Grid(secondaryGridsThree.id, 4,4, ["page-14-cell"])
        const secondaryLandingsFour = new Grid(secondaryGridsFour.id, 4,4, ["page-14-cell"])

        const secondaryLandings = [secondaryLandingsOne, secondaryLandingsTwo, secondaryLandingsThree, secondaryLandingsFour]
       

       
       

        const {rconContainer} = this.pageElements
        const rcon = new Grid(rconContainer.id, 4, 10, ["page-14-rcon-cell"])
        const rconMovables = rcon.createMovables("rcon-container", ["rijndael-movable-cell", "rijndael-movable-cell--yellow"])
        DataController.subscribe("rcon", rconMovables.movables)


        const {sboxContainer} = this.pageElements;
        const sbox = new SBox(sboxContainer.id)
        DataController.subscribe("sBox", sbox.gridMovables.movables)

        const substitutionMovables = primaryLandingsOne.createMovables("subsitution-movables", ["rijndael-movable-cell", "rijndael-movable-cell--yellow"])
        DataController.subscribe("round-key-10", substitutionMovables.movables)

       
      

      


        this.addToPageElements({
            primaryLandingsOne,
            primaryLandingsTwo,
            primaryLandingsThree,
            primaryLandingsFour,
            finalGridLandings,
            secondaryLandingsOne,
            secondaryLandingsTwo,
            secondaryLandingsThree,
            secondaryLandingsFour,
            pgOneMovablesOg,
            pgOneMovablesTransforms,
            pgTwoMovablesOg,
            pgTwoMovablesTransforms,
            pgThreeMovablesOg,
            pgThreeMovablesTransforms,
            pgFourMovablesOg,
            pgFourMovablesTransforms,
            rcon,
            rconMovables,
            primaryLandings,
            secondaryLandings,
            substitutionMovables,
            sbox,
            pgMovablesOg,
            pgMovablesTransforms,
            finalGridMovables
          //  gridMovables
        })

    }




    createAnimationIn(){
       
    }



    getRelativeBounds(element){
        const pageBounds = this.page.getBoundingClientRect();
        const elementBounds = element.getBoundingClientRect();

        return {
            x: elementBounds.x - pageBounds.x,
            y: elementBounds.y - pageBounds.y,
            width: elementBounds.width,
            height: elementBounds.height
        }
    }

    addColumns(wi=5, movablesOne, movablesTwo, ogMovables){
        const {primaryLandings, secondaryLandings, equalsSymbol, addSymbolOne, addSymbolTwo} = this.pageElements

        // wi 5 (1, 4, 5, 7)
        const colOneIdx = wi - 4
        const colTwoIdx = wi - 1
        const colThreeIdx = wi + 2

        // movables
        const colOneMovables = movablesOne.getCol(colOneIdx % 4);
        const colTwoMovables = movablesTwo.getCol(colTwoIdx % 4);
        const colResMovables = movablesTwo.getCol(wi % 4);

        // landings
        const landingsAddOne = secondaryLandings[Math.floor(colOneIdx / 4)].getCol(colOneIdx % 4)
        const landingsAddTwo = secondaryLandings[Math.floor(colTwoIdx / 4)].getCol(colTwoIdx % 4)
        const landingsAddRes = secondaryLandings[Math.floor(colThreeIdx / 4)].getCol(colThreeIdx % 4)
        const landingsReturn = primaryLandings[Math.floor(wi / 4)].getCol(wi % 4)

        const landingReturnColTwo = primaryLandings[Math.floor(colTwoIdx / 4)].getCol(colTwoIdx % 4)

        const addCell = secondaryLandings[Math.floor((wi-2) / 4)].getCell(2, (wi-2) % 4)
        const addPos = this.getRelativeBounds(addCell)

        const equalsCell = secondaryLandings[Math.floor((wi+1) / 4)].getCell(2, (wi+1) % 4)
        const equalsPos = this.getRelativeBounds(equalsCell)

        const tl = gsap.timeline();
  
        // prep
        tl.set(equalsSymbol, { x:equalsPos.x, y: equalsPos.y, zIndex: 20})
        tl.set(addSymbolOne, {x: addPos.x, y: addPos.y})
        tl.set([...colResMovables, equalsSymbol, addSymbolOne], {opacity: 0})        
        tl.add(this.moveGroup(colResMovables, landingsAddRes, {duration: .001}))
        
        tl.set(colOneMovables, {opacity: 1})
        tl.add(this.moveGroup(colOneMovables, landingsAddOne,{duration: 1}))
        tl.add(this.moveGroup(colTwoMovables, landingsAddTwo,{duration: 1}))

        // reval equation
        tl.to(addSymbolOne, {opacity: 1})
        tl.to(equalsSymbol,  {opacity: 1})
        tl.to(colResMovables,  {opacity: 1})   

          // move back
          tl.add(this.moveGroup(colResMovables, landingsReturn, {duration: 1}),)

          // hide equation + cleanup
         
          tl.to( [...colOneMovables, ...colTwoMovables, equalsSymbol, addSymbolOne], {opacity: 0})
          tl.add(this.moveGroup(colTwoMovables, landingReturnColTwo, {duration: .001}),)
          tl.set(ogMovables.getCol(wi % 4), {opacity: 1})

        return tl;
    }


    // gets position for symbols in the center of the secondary landings (the top left corner of the third cell of the column)
    getSymbolPosition(idx){
        const {secondaryLandings} = this.pageElements
        const cell = secondaryLandings[Math.floor((idx) / 4)].getCell(2, (idx) % 4)
        const bounds = this.getRelativeBounds(cell)
        return {x: bounds.x, y: bounds.y}
    }

    createPreFadeIn(){

        const {
            equalsSymbol,
            addSymbolOne,
            addSymbolTwo,
            textS,
            textA,
            textB,
            textInitial,
            textXor,
            substitutionMovables,
            sbox,
            textRotWord,
            pgMovablesOg,
            pgMovablesTransforms,
            finalGridMovables,
            textSubbytes
        } = this.pageElements
        const obj = {val: 0};

        const tl = gsap.timeline();
        tl.to(obj, {val: 1, duration: .001})
        tl.set([  
            textSubbytes,
            textRotWord, 
            sbox.component,
            ...substitutionMovables.movables,
            equalsSymbol,addSymbolOne,addSymbolTwo,
            textS,textA,textB, textInitial,textXor,], {opacity: 0})

        for(let i = 1; i < 4; i++){
            tl.set([...pgMovablesOg[i].getCol(0), ...pgMovablesTransforms[i].getCol(0)],{
                background: "#888",
            })
            tl.set([...pgMovablesOg[i].movables, ...pgMovablesTransforms[i].movables], {opacity: 0})
        }

        tl.set(finalGridMovables.getCol(0),{ background: "#888"})
        tl.set(finalGridMovables.movables, {opacity: 0})

        return tl;
    }

    createAnimationMain(){

       
        const isMobile = window.screen.width <= 800;

        const tl = gsap.timeline();

        tl.add(this.createSubTimeline(1, true))


        const {pgOneMovablesTransforms, pgTwoMovablesTransforms, pgTwoMovablesOg, textXor} = this.pageElements
        tl.to(textXor, {opacity: 1})
        tl.add(this.addColumns(5,pgOneMovablesTransforms, pgTwoMovablesTransforms, pgTwoMovablesOg ))
        tl.add(this.addColumns(6,pgOneMovablesTransforms, pgTwoMovablesTransforms, pgTwoMovablesOg ))
        tl.add(this.addColumns(7,pgOneMovablesTransforms, pgTwoMovablesTransforms, pgTwoMovablesOg ))
        tl.to(textXor, {opacity: 0})


        const {rconMovables, pgFourMovablesOg, finalGridMovables} = this.pageElements
        const {pgThreeMovablesTransforms, pgThreeMovablesOg, rconLabel} = this.pageElements
        if(!isMobile){   
            tl.add(this.createSubTimeline(2, false))

            
            tl.add(this.addColumns(9,pgTwoMovablesTransforms, pgThreeMovablesTransforms, pgThreeMovablesOg ))
            tl.add(this.addColumns(10,pgTwoMovablesTransforms, pgThreeMovablesTransforms, pgThreeMovablesOg ))
            tl.add(this.addColumns(11,pgTwoMovablesTransforms, pgThreeMovablesTransforms, pgThreeMovablesOg ))

            
            tl.to(pgFourMovablesOg.movables, {opacity: 1})
            tl.to(rconMovables.getCol(2), {opacity: 0}, "<")
        }

        const rconStart = isMobile ?  1 : 3;
        // disappear rcon
        for(let i = rconStart; i < 10; i++){
            tl.to(rconMovables.getCol(i), {opacity: 0, duration: .2, delay: .3})
        }

        tl.to(rconLabel, {opacity: 0}, "<")

        tl.to(finalGridMovables.movables, {opacity: 1})
       

        return tl;
    }



    createSubTimeline(gridIndex=1, infoTexts=false){     
        const {
            primaryLandings,
            secondaryLandings,
            pgMovablesOg,
            pgMovablesTransforms,
            rconMovables,
            addSymbolOne,
            addSymbolTwo,
            equalsSymbol,
            textInitial,
            textA,
            textB,
            textS,
            substitutionMovables,
            textRotWord
        } = this.pageElements

        // movables
        const lastColMovables = pgMovablesTransforms[gridIndex-1].getCol(3);
        const firstColMovables =  pgMovablesTransforms[gridIndex-1].getCol(0)
        const rconColMovables = rconMovables.getCol(gridIndex-1)
        const resultMovables = pgMovablesTransforms[gridIndex].getCol(0)

        // landings
        const lastColOgLanding = primaryLandings[gridIndex-1].getCol(3);
        const addOneLanding = secondaryLandings[gridIndex-1].getCol(0)
        const addTwoLanding = secondaryLandings[gridIndex-1].getCol(3)
        const addThreeLanding = secondaryLandings[gridIndex].getCol(2)
        const resultLanding = secondaryLandings[gridIndex+1].getCol(1)
        const resultDestinationLanding = primaryLandings[gridIndex].getCol(0)
    

        const tl = gsap.timeline();


        // hide + move result column to initial result position
        tl.set(resultMovables, {opacity: 0})
        tl.add(this.moveGroup(resultMovables, resultLanding, {duration: .001}))

        const basePos = 2 + ((gridIndex-1) * 4)
        // move symbols to positions (hidden)
        tl.set(addSymbolOne, {...this.getSymbolPosition(basePos)})
        tl.set(addSymbolTwo, {...this.getSymbolPosition(basePos+3)})
        tl.set(equalsSymbol, {...this.getSymbolPosition(basePos+6)})

        // reveal initial text
        if(infoTexts){
            tl.to(textInitial, {opacity: 1})
        }

        // move down and shift col
        //const bounds = addTwoLanding[0].getBounds();
        const bounds = this.getRelativeBounds(addTwoLanding[0])
        tl.to(textRotWord, {x: bounds.x + 50, y: bounds.y + 30 , duration: .001, delay: 2})
        tl.to(textInitial, {opacity: 0})
        tl.add(this.moveGroup(lastColMovables, addTwoLanding, {duration: 1}))
        tl.to([textRotWord], {opacity: 1})

        if(infoTexts){
            tl.to([textA, textS], {opacity: 1}, "<")
        }
       
        tl.add(this.shiftColumn(lastColMovables, addTwoLanding, {}))
        tl.to(textRotWord, {opacity: 0})

        // add rotword text
        // add subbytes 
        tl.add(this.createSubstitutionTimeline(
            lastColMovables,
            substitutionMovables.getRow(0),
            addTwoLanding,
        ))

  
        // move adds and reveal equation
        tl.set(firstColMovables, {opacity: 1})
        tl.add(this.moveGroup(firstColMovables, addOneLanding, {duration: 1}))
        tl.to(addSymbolOne, {opacity: 1})

        // move rcon col up
        tl.add(this.moveGroup(rconColMovables, addThreeLanding, {duration: 1}))

        // reveal rest of equation 
        if(infoTexts){
            tl.to(textB, {opacity: 1})
        }
        tl.to(addSymbolTwo, {opacity: 1})
        tl.to(equalsSymbol,{opacity: 1})
        tl.to(resultMovables, {opacity: 1})


        // move back result
        tl.add(this.moveGroup(resultMovables, resultDestinationLanding, {duration: 1}))

        // hide / reset equation
        // show column underneath result (for moving later)
        tl.set(pgMovablesOg[gridIndex].getCol(0), {opacity: 1})

        // hide equation
        tl.to([addSymbolOne, addSymbolTwo, equalsSymbol], {opacity: 0})
        tl.to([textS, textA, textB], {opacity: 0})
        tl.to([...lastColMovables, ...firstColMovables, ...rconColMovables, ...substitutionMovables.movables], {opacity: 0})

        // move last col back
        tl.add(this.moveGroup(lastColMovables, lastColOgLanding, {duration: .001}))
        tl.set(lastColMovables, {opacity: 1})

        return tl;    
    }

  
    createSubstitutionTimeline(toSubCol, subbedCol, landings){
        const {sbox } = this.pageElements
        const tl = gsap.timeline();

        const shiftedColum = shiftArray([...toSubCol], 1)

        //subbytes movabes, shifted col

        // move subbyte movables to equation landings
        tl.add(this.moveGroup(subbedCol, landings), {duration: .001})

        // reveal sbox
        tl.to(sbox.component, {opacity: 1})



        // reveal subbytes from sbox
        for(let i = 0; i < 4; i++){           
            const cellLanding = this.getSBoxCellLanding(sbox, shiftedColum[i])
            const cellSub = subbedCol[i]

            if(i == 0){
                tl.add(this.moveToLanding(cellSub, cellLanding, {duration: .001})) 
                tl.to(cellSub, {opacity: 1})
                tl.add(this.moveToLanding(cellSub, landings[0], {duration: 1.5}))
            }else{
                // highlight sbox cell + reveal cell landing
                tl.to(cellLanding, {background: "#FFCC61"})
                tl.to(cellSub, {opacity: 1})
                tl.to(cellLanding, {background: "#fff"})
            }
        }

        // hide sbox
        tl.to(sbox.component, {opacity: 0})

        return tl;
    }

    getSBoxCellLanding(sbox, cell){
        const text = cell.innerHTML;
        const subX = hexStringToInt(text[0])
        const subY = hexStringToInt(text[1])
        const cellLanding = sbox.grid.getCell(subX, subY) 
        return cellLanding;
    }


    shiftColumn(movables, landings){
        const tl = gsap.timeline();
        tl.add(this.moveToLandingAdvanced(movables[0], landings[3], {offsetX: -100}), "shift")
        tl.add(this.moveToLanding(movables[1], landings[0]), "shift+=.5")
        tl.add(this.moveToLanding(movables[2], landings[1]), "shift+=.5")
        tl.add(this.moveToLanding(movables[3], landings[2]), "shift+=.5")
        return tl;
    }
}

export default Page14