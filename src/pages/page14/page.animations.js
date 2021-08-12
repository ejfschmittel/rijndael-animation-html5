import AnimationPage from "../../core/AnimationPage"
import Grid from "../../components/Grid"
import {gsap} from "gsap"


import SBox from "../../components/LookupTable"

import {shiftArray} from "../../utils/utils"
import {hexStringToInt} from "../../utils/conversions"



class Page14 extends AnimationPage{
    constructor(id, locale){
        super(id, locale)

        this.FADE_OUT_DELAY = 10;
    }

    init(){
      
        const { primaryGridsOne, primaryGridsTwo, primaryGridsThree, primaryGridsFour, finalGrid} = this.pageElements

        // create upper grid landings 
        const primaryLandingsOne = new Grid(primaryGridsOne.id, 4,4, ["page-14-cell"])
        const primaryLandingsTwo = new Grid(primaryGridsTwo.id, 4,4, ["page-14-cell"])
        const primaryLandingsThree = new Grid(primaryGridsThree.id, 4,4, ["page-14-cell"])
        const primaryLandingsFour = new Grid(primaryGridsFour.id, 4,4, ["page-14-cell"])
        const primaryLandings = [primaryLandingsOne, primaryLandingsTwo, primaryLandingsThree, primaryLandingsFour]
  
        // create movables for the upper grids
        const pgOneMovablesOg = primaryLandingsOne.createMovables("pg-one-movables-og", ["rijndael-movable-cell", "rijndael-movable-cell--beta"])
        const pgOneMovablesTransforms = primaryLandingsOne.createMovables("pg-one-movables-transforms", ["rijndael-movable-cell", "rijndael-movable-cell--beta"])
        this.subscribeTo("key-0", pgOneMovablesOg.movables)
        this.subscribeTo("key-0", pgOneMovablesTransforms.movables)

        const pgTwoMovablesOg = primaryLandingsTwo.createMovables("pg-two-movables-og", ["rijndael-movable-cell", "rijndael-movable-cell--eta"])
        const pgTwoMovablesTransforms = primaryLandingsTwo.createMovables("pg-two-movables-transforms", ["rijndael-movable-cell", "rijndael-movable-cell--eta"])
        this.subscribeTo("key-1", pgTwoMovablesOg.movables)
        this.subscribeTo("key-1", pgTwoMovablesTransforms.movables)

        const pgThreeMovablesOg = primaryLandingsThree.createMovables("pg-three-movables-og", ["rijndael-movable-cell", "rijndael-movable-cell--eta"])
        const pgThreeMovablesTransforms = primaryLandingsThree.createMovables("pg-three-movables-transforms", ["rijndael-movable-cell", "rijndael-movable-cell--eta"])
        this.subscribeTo("key-2", pgThreeMovablesOg.movables)
        this.subscribeTo("key-2", pgThreeMovablesTransforms.movables)

        const pgFourMovablesOg = primaryLandingsFour.createMovables("pg-four-movables-og", ["rijndael-movable-cell", "rijndael-movable-cell--eta"])
        const pgFourMovablesTransforms = primaryLandingsFour.createMovables("pg-four-movables-transforms", ["rijndael-movable-cell", "rijndael-movable-cell--eta"])
        this.subscribeTo("key-3", pgFourMovablesOg.movables)
        this.subscribeTo("key-3", pgFourMovablesTransforms.movables)

        const pgMovablesOg = [pgOneMovablesOg, pgTwoMovablesOg, pgThreeMovablesOg, pgFourMovablesOg] 
        const pgMovablesTransforms = [pgOneMovablesTransforms, pgTwoMovablesTransforms, pgThreeMovablesTransforms, pgFourMovablesTransforms]

        const finalGridLandings = new Grid(finalGrid.id, 4,4, ["page-14-cell"])
        const finalGridMovables = finalGridLandings.createMovables("pg-four-movables-og", ["rijndael-movable-cell", "rijndael-movable-cell--eta"])
        this.subscribeTo("key-10", finalGridMovables.movables)

        // create lowergrid landings
        const {secondaryGridsOne, secondaryGridsTwo, secondaryGridsThree, secondaryGridsFour} = this.pageElements
        const secondaryLandingsOne = new Grid(secondaryGridsOne.id, 4,4, ["page-14-cell"])
        const secondaryLandingsTwo = new Grid(secondaryGridsTwo.id, 4,4, ["page-14-cell"])
        const secondaryLandingsThree = new Grid(secondaryGridsThree.id, 4,4, ["page-14-cell"])
        const secondaryLandingsFour = new Grid(secondaryGridsFour.id, 4,4, ["page-14-cell"])

        const secondaryLandings = [secondaryLandingsOne, secondaryLandingsTwo, secondaryLandingsThree, secondaryLandingsFour]
       

       
        // create rcon 
        const {rconContainer} = this.pageElements
        const rcon = new Grid(rconContainer.id, 4, 10, ["page-14-rcon-cell"])
        const rconMovables = rcon.createMovables("rcon-container", ["rijndael-movable-cell", "rijndael-movable-cell--alpha"])
        this.subscribeTo("rcon", rconMovables.movables)

        // create sbox
        const {sboxContainer} = this.pageElements;
        const sbox = new SBox(sboxContainer.id)
        this.subscribeTo("sbox", sbox.gridMovables.movables)

        const substitutionMovables = primaryLandingsOne.createMovables("subsitution-movables", ["rijndael-movable-cell", "rijndael-movable-cell--alpha"])
        this.subscribeTo("key-shedule-subbed-bytes", substitutionMovables.movables)

       
      
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


        const tl = this.getPreFadeInTimeline() 
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


    getWiCol(arr, wi=0){
        const GRID_COLS = 4; 
        const gridIndex = Math.floor(wi / GRID_COLS)
        const gridColIndex = wi % GRID_COLS;
        return arr[gridIndex].getCol(gridColIndex)
        
    }


    addColumns(wi=5){
        const {
            primaryLandings, 
            secondaryLandings, 
            equalsSymbol, 
            addSymbolOne,
            pgMovablesOg,
            pgMovablesTransforms,
        } = this.pageElements


        // movables             
        const colOneMovables = this.getWiCol(pgMovablesTransforms, wi - 4)
        const colTwoMovables= this.getWiCol(pgMovablesTransforms, wi - 1)
        const colResMovables = this.getWiCol(pgMovablesTransforms, wi)


        const tl = gsap.timeline();
  
        // position symbols and hide movables
        tl.set(addSymbolOne, {...this.getSymbolPosition(wi-2)})
        tl.set(equalsSymbol, {...this.getSymbolPosition(wi+1)})
        tl.set([...colResMovables, equalsSymbol, addSymbolOne], {opacity: 0})   

        
        // position result movables 
        tl.add(this.moveGroup2(colResMovables, this.getWiCol(primaryLandings, wi),this.getWiCol(secondaryLandings, wi+2), {duration: .001}))

        // move columns down for equation
        tl.set(colOneMovables, {opacity: 1})
        tl.add(this.moveGroup2(colOneMovables, this.getWiCol(primaryLandings, wi-4), this.getWiCol(secondaryLandings, wi-4), {duration: 1}))
        tl.add(this.moveGroup2(colTwoMovables, this.getWiCol(primaryLandings, wi-1), this.getWiCol(secondaryLandings, wi-1), {duration: 1}))

         // reval equation symbols & result
         tl.to(addSymbolOne, {opacity: 1})
         tl.to(equalsSymbol,  {opacity: 1})
         tl.to(colResMovables,  {opacity: 1})  

        // move result back up
        tl.add(this.moveGroup2(colResMovables, this.getWiCol(secondaryLandings, wi+2), this.getWiCol(primaryLandings, wi), {duration: 1}),)

        // hide equation + cleanup
        tl.to( [...colOneMovables, ...colTwoMovables, equalsSymbol, addSymbolOne], {opacity: 0})
        tl.add(this.moveGroup2(colTwoMovables, this.getWiCol(secondaryLandings, wi-1), this.getWiCol(primaryLandings, wi-1), {duration: .001}),)
        tl.set(this.getWiCol(pgMovablesOg, wi), {opacity: 1})

        return tl;
    }


    createAnimationMain(){ 
        const isMobile = window.screen.width <= 800;

     
        const tl = gsap.timeline();
        tl.add(this.createFirstColTimeline(4, !isMobile))
    
        const {textXor} = this.pageElements
        tl.to(textXor, {opacity: 1})

        tl.add(this.addColumns(5))
        tl.add(this.addColumns(6))
        tl.add(this.addColumns(7))
  
        tl.to(textXor, {opacity: 0})


        const {rconMovables, pgFourMovablesOg, finalGridMovables} = this.pageElements
        const { rconLabel} = this.pageElements

       
        // add second iteration
        if(!isMobile){   
            tl.add(this.createFirstColTimeline(8, false))

            
            tl.add(this.addColumns(9))
            tl.add(this.addColumns(10))
            tl.add(this.addColumns(11))

            
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



    createFirstColTimeline(wi=4, showInfoTexts=false){
        const {
            primaryLandings, 
            secondaryLandings, 
            equalsSymbol, 
            addSymbolOne,
            addSymbolTwo,
            pgMovablesOg,
            substitutionMovables,
            pgMovablesTransforms,
            rcon,
            rconMovables
        } = this.pageElements

        // texts  
        const { textInitial,textA,textB,textS,textRotWord } = this.pageElements


   
        // define movable columns
        const gridIndex = Math.floor(wi/4);


       
        const equationLeftMovables = this.getWiCol(pgMovablesTransforms,wi-4)
        const equationRightMovables = this.getWiCol(pgMovablesTransforms,wi-1)
        const subbedColMovables = substitutionMovables.getCol(gridIndex-1)
        const rconColMovables = rconMovables.getCol(gridIndex-1)
        const resultColMovables = this.getWiCol(pgMovablesTransforms,wi)
        
       
        

        const tl = gsap.timeline();
     
        // hide + move result column to initial result position
        tl.set(resultColMovables, {opacity: 0})
        tl.add(this.moveGroup2(resultColMovables, this.getWiCol(primaryLandings,wi), this.getWiCol(secondaryLandings,wi+5), {duration: .001}))

      
        // move symbols to positions (hidden)
        tl.set(addSymbolOne, {...this.getSymbolPosition(wi - 2)})
        tl.set(addSymbolTwo, {...this.getSymbolPosition(wi + 1)})
        tl.set(equalsSymbol, {...this.getSymbolPosition(wi + 4)})

        // optional info text
        if(showInfoTexts){ tl.to(textInitial, {opacity: 1}) }

        // move column wi-1 down 
        const bounds = this.getRelativeBounds(this.getWiCol(secondaryLandings,wi-1)[0])
        tl.to(textRotWord, {x: bounds.x + 50, y: bounds.y + 30 , duration: .001, delay: 2})
        tl.to(textInitial, {opacity: 0})
        tl.add(this.moveGroup2(equationRightMovables,this.getWiCol(primaryLandings,wi-1), this.getWiCol(secondaryLandings,wi-1), {duration: 1}))

        // shift col
        tl.to([textRotWord], {opacity: 1})
        if(showInfoTexts){ tl.to([textA, textS], {opacity: 1}, "<") }
        tl.add(this.shiftColumn(equationRightMovables, this.getWiCol(secondaryLandings,wi-1), {}))
        tl.to(textRotWord, {opacity: 0})
 
        

        // substitute bytes
        tl.add(this.createSubstitutionTimeline(wi))
    
        // move adds and reveal equation
        tl.set(equationLeftMovables, {opacity: 1})
        tl.add(this.moveGroup2(equationLeftMovables, this.getWiCol(primaryLandings,wi-4), this.getWiCol(secondaryLandings,wi-4), {duration: 1}))
        tl.to(addSymbolOne, {opacity: 1})
      

        // move rcon col up
        tl.add(this.moveGroup2(rconColMovables,rcon.getCol(gridIndex-1), this.getWiCol(secondaryLandings,wi+2), {duration: 1}))

        // reveal optional text
        if(showInfoTexts){ tl.to(textB, {opacity: 1}) }

        // reval equation symbols & result
        tl.to(addSymbolTwo, {opacity: 1})
        tl.to(equalsSymbol,{opacity: 1})
        tl.to(resultColMovables, {opacity: 1})


        // move back result
        tl.add(this.moveGroup2(resultColMovables, this.getWiCol(secondaryLandings,wi+5), this.getWiCol(primaryLandings,wi), {duration: 1}))


        // show column underneath result (for moving later)
        tl.set(this.getWiCol(pgMovablesOg, wi), {opacity: 1})

        // hide equation
        tl.to([addSymbolOne, addSymbolTwo, equalsSymbol], {opacity: 0})
        tl.to([textS, textA, textB], {opacity: 0})
        tl.to([...equationLeftMovables, ...equationRightMovables, ...rconColMovables, ...substitutionMovables.movables], {opacity: 0})

        // move last col back
        tl.add(this.moveGroup2(equationRightMovables, this.getWiCol(secondaryLandings,wi-1), this.getWiCol(primaryLandings,wi-1), {duration: .001}))
        tl.set(equationRightMovables, {opacity: 1})
  
        return tl;
    }


 

    createSubstitutionTimeline(wi=4){
        const {substitutionMovables, secondaryLandings, primaryLandings, sbox, pgMovablesTransforms} = this.pageElements;

        const gridIndex = Math.floor(wi / 4);

        // movables
        const subbedColMovables = substitutionMovables.getCol(gridIndex - 1)
        const shiftedColumn = shiftArray([...this.getWiCol(pgMovablesTransforms, wi-1)], -1)

        const tl = gsap.timeline();

        // prepare results
        tl.add(this.moveGroup2(subbedColMovables, this.getWiCol(primaryLandings, gridIndex-1), this.getWiCol(secondaryLandings, wi-1)), {duration: .001})

        // reveal sbox
        tl.to(sbox.component, {opacity: 1})

        
        // reveal subbytes from sbox
        for(let i = 0; i < 4; i++){           
            const cellLanding = this.getSBoxCellLanding(sbox, shiftedColumn[i])
            const cellSub = subbedColMovables[i]

            if(i == 0){
                tl.add(this.moveToLanding2(cellSub, this.getWiCol(secondaryLandings, wi-1)[0], cellLanding, {duration: .001})) 
                tl.to(cellSub, {opacity: 1})
                tl.add(this.moveToLanding2(cellSub, cellLanding, this.getWiCol(secondaryLandings, wi-1)[0], {duration: 1.5}))
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
        tl.add(this.moveToLandingAdvanced2(movables[0], landings[0], landings[3], {offsetX: -100}), "shift")
        tl.add(this.moveToLanding2(movables[1], landings[1], landings[0]), "shift+=.5")
        tl.add(this.moveToLanding2(movables[2], landings[2], landings[1]), "shift+=.5")
        tl.add(this.moveToLanding2(movables[3], landings[3], landings[2]), "shift+=.5")
        return tl;
    }
}

export default Page14