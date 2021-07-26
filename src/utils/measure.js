

let startTime = null;



export const startTimer = () => {
    startTime = performance.now()
}

export const logTimer = () => {
    const currentTime = performance.now() - startTime;
 
    console.log("--------------------")
    console.log("Measured time: " + currentTime);
    console.log("---------------------")
}