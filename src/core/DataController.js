

/*
    Manages Data displayed in the animation
    works by subscribing to dat 

    this.store: {key: [...data]}
    this.subscriptions: {key: [...subscribedElements]}

    
*/

import {getRandomHexValueList} from "../utils/conversions"


const INITIAL_DATA = {
    "shiftRowsGrid": getRandomHexValueList(16, 2)
}

class DataController{

    constructor(){
        this.store = {...INITIAL_DATA}
        this.subscriptions = {}
    }


    subscribe(key, elements){
        const oldSubscriptions = key in this.subscriptions ? this.subscriptions[key] : []

        this.subscriptions = {
            ...this.subscriptions,
            [key]: [...oldSubscriptions, elements]
        }

        // set data for just subscribed elements
        this.setSubscriberData(this.getData(key), elements)
    }

    callSubscribers(key){
        const data = this.getData(key)
        const subscribers = this.getSubscribers(key)

        subscribers.forEach(elements => {
            this.setSubscriberData(data, elements)
        })
    }


    setSubscriberData(data, elements){
        // transform to array
        elements = Array.isArray(elements) ? elements : [elements]

        elements.forEach((element, idx) => {
            const elementDisplayData = Array.isArray(data) ? data[idx] : data;
            element.innerHTML = elementDisplayData 
        })
    }


    updateStore(key, value){
        // update store & call subscribers 
        this.store = {...this.state, [key]:value}
        this.callSubscribers(key)
    }
    

    getSubscribers(key){
        if(!key in this.subscriptions) return []
        return this.subscriptions[key]
    }

    getData(key){
        if(!key in this.store) throw new Error(`key '${key}' not found in data store.`)
        return this.store[key]
    }

}

// singelton data controller
export default new DataController();