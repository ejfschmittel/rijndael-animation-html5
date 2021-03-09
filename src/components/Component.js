/*
    Base Class for all components

*/


class Component{
    constructor(id){
        this.id = id;
        this.component = document.getElementById(id)
    }

    getComponent = () => this.component;
}

export default Component;