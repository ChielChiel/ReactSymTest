import React, { createContext } from 'react';
import axios from 'axios';

export const ReactSymContext = createContext();

class ReactSymContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sounds: [],
        };
        //this.readSound();
    }
    //create
    //sound = {title : title, transcriptie: transcriptie, image: thumbnail, mp3: filePath, spelers: [acteurs], video_id: id, start: start, end: end }
    createSound(event, sound) {
        event.preventDefault();
        axios.post('/api/sound/create', sound)
            .then(response => {
                console.log(response.data);
                // let data = [...this.state.sounds];
                // data.push(response.data.sound);
                // this.setState({
                //     sounds: sound,
                // });
            }).catch(error => {
                console.error(error);
            })
    }

    //read
    readSound() {
        //event.preventDefault();
        //console.log(searchTerm);
        axios.get('/api/sound/read')
            .then(response => {
                this.setState({
                    sounds: response.data,
                });
            }).catch(error => {
                console.error(error);
            })
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