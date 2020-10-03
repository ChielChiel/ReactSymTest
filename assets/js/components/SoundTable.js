import React, {useContext } from 'react';
import { ReactSymContext } from '../contexts/ReactSymContext';


function SoundTable() {
    const context = useContext(ReactSymContext)
    return (
        <ol>
            {context.sounds.map(sound => (
                <li><h3>{sound.title}</h3></li>
            ))}
        </ol>
    );
}

export default SoundTable;