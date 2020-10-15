import React, { useContext } from 'react';
import { ReactSymContext } from '../contexts/ReactSymContext';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Content } from 'react-bulma-components/dist';

function SoundTable() {
    const context = useContext(ReactSymContext)
    return (
        <div>
            <Button color="primary">My Bulma button</Button>
            <Content>
            <ol>
                {context.sounds.map(sound => (
                    <li><h3>{sound.title}</h3></li>
                ))}
            </ol>
            </Content>
            
        </div>

    );
}

export default SoundTable;