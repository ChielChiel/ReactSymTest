import React, {createContext } from 'react';
export const ReactSymContext = createContext();

class ReactSymContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sounds: [{title: "Ik dacht dat dat kon"}, {title: "Lekker wijntje Leo"}],
        };
    }
    //create
    createSound() {

    }

    //read
    readSound() {

    }

    //update
    updateSound() {

    }

    //delete
    deleteSound() {

    }

    render() {
        return (
            <ReactSymContext.Provider value={{
                ...this.state,
                createSound: this.createSound.bind(this),
                updateSound: this.updateSound.bind(this),
                deleteSound: this.deleteSound.bind(this),
            }}>
                {this.props.children}
            </ReactSymContext.Provider>
        );
    }
}

export default ReactSymContextProvider;