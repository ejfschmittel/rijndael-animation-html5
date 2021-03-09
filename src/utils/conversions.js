export const generateRandomBinaryString = (length=10) => {
    let binaryString = "";
    for(let i = 0; i < length; i++){
        binaryString += Math.round(Math.random())
    }
    return binaryString;
}

export const generatRandomBinaryStrings = (stringCount=1, length=10) => {
    let binaryStrings = []
    for(let i = 0; i < stringCount; i++){
        binaryStrings.push(generateRandomBinaryString(length))
    }
    return binaryStrings
}

export const getRandomHexValueList = (count=1, length=2) => {
    const hexValueList = []
    for(let i = 0; i < count; i++){
        hexValueList.push(getRandomHexVal(length))
    }
    return hexValueList
}

export const getRandomHexVal = (length=2) => {
    let hex = "";
    for(let i = 0; i < length; i++){
        hex += toHex(Math.floor(Math.random() * 16))
    }
    return hex;
}

export function toHex(d) {
    return  (Number(d).toString(16)).slice(-2).toUpperCase()
}

export const hexStringToInt = (hex) => {
    return parseInt(hex.replace(/^#/, ''), 16);
}