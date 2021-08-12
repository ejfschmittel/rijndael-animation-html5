

let startTime = null;


export const startTimer = () => {
    startTime = performance.now()
}

export const logTimer = (message="Measured time") => {
    const currentTime = Date.now() - startTime;
 
    console.log("--------------------")
    console.log(message + ": " + currentTime) + "ms";
    console.log("---------------------")
}