import React, { useContext  } from 'react';
import { ReactSymContext } from '../contexts/ReactSymContext';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Content } from 'react-bulma-components/dist';
import SoundCard from './SoundCard';


function SoundTable() {
    const context = useContext(ReactSymContext)
    return (
        <div>
            <Button color="primary">My Bulma button</Button>
            <Content>
            {/* <ul> */}
                {context.sounds.map((sound, index) => (
                    <SoundCard title={sound.title} audio={sound.mp3} image={sound.image} key={index} />
                ))}
            {/* </ul> */}
            </Content>
            
        </div>

    );
}

export default SoundTable;