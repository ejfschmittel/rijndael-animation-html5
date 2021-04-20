/**
 * handles everything regarding the rijndael form
 * 
*/


import Rijndael from "./aes/rijndael-block.js"
import Utils from "./aes/utils.js"

import {intToHexStringArray} from "../utils/conversions"


const FORM_BTN_ID = "rijndael-form-button"
const OUTPUT_FIELD_ID = "rijndael-form-ouput"
const KEY_FIELD_ID = "rijndael-form-key-input"
const PLAINTEXT_FIELD_ID = "rijndael-form-plaintext-input"

class RijndaelFormController{

    

    constructor(controller){
        this.controller = controller

        this.formButton = document.getElementById(FORM_BTN_ID)
        this.outputField = document.getElementById(OUTPUT_FIELD_ID)
        this.KeyField = document.getElementById(KEY_FIELD_ID)
        this.plaintextField = document.getElementById(PLAINTEXT_FIELD_ID)


     
     

        this.errors = null;

        // add event listener
        this.formButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.onEcryptClick();
        })

        // prime store
        this.onEcryptClick();
    }


    excuteRijndaelAES({plaintext, key}){
        const cipher = new Rijndael(key, 'ecb');
        const [ciphertext, info] = cipher.encrypt(plaintext, 128);
        return [ciphertext, info]
    }


    prepareRijndaelDataForDisplay(aesInfo){
        const {block1, keySize, mode, key} = aesInfo;

        let temp = {...block1};


  
        Object.keys(temp).forEach(key => {
            const val = temp[key].slice();

            switch(key){
                case "key-schedule":
                    for(let i = 0; i < val.length / 16; i++){
                        const slice = val.slice(i*16, i*16+16)
                        temp[`key-${i}`] = intToHexStringArray(this.toGridByRow(4,4, slice));
                    }
                    return;

                case "sbox":
                    temp[key] = intToHexStringArray(val)
           
                    return;
                default: 
                    temp[key] = intToHexStringArray(this.toGridByRow(4,4, val))
                    return;
            }

        })

  

        return {
            keySize, 
            mode, 
            key,
            ...temp,
            // custom rcon
           // rcon: [...new Array()]
        }
    }


    toGridByRow = (rows, cols, elements) => {
        let newArr = new Array(elements.length)
        for(let i = 0; i < cols; i++){
            for(let j = 0; j < rows; j++){
                newArr[j*rows+i] = elements[i*cols+j]
            }
        }
        return newArr;
    }


    gatherFormData(){
        return {
            plaintext: this.plaintextField.value,
            key: this.KeyField.value,
        }
    }

    validateFormData(data){

        return true;
    }


    

    onEcryptClick(){
        const formData = this.gatherFormData();

        if(this.validateFormData(formData)){
      
            const [ciphertext, info] = this.excuteRijndaelAES(formData);


            // update output field
            const cipherTextAscii =Utils.intArrayToAsciiString(ciphertext)
            this.outputField.value = cipherTextAscii;


            // prepare data for animation
            const preparedInfo = this.prepareRijndaelDataForDisplay(info)
            // call data controller to update
            console.log("update datacontroller")
            console.log(preparedInfo)
            this.controller.dataController.updateStoreByObject(preparedInfo)
        }
    }
}

export default RijndaelFormController