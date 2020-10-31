import React, { useContext, useState } from 'react';
import { ReactSymContext } from '../contexts/ReactSymContext';
import ReactAudioPlayer from 'react-audio-player';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Image from 'react-bulma-components/lib/components/image';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Card from 'react-bulma-components/lib/components/card';
import Media from 'react-bulma-components/lib/components/media';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';


function SoundCard(props) {
    const context = useContext(ReactSymContext);
    return (
        // <li>
            <Card style={{ padding: '10px', width: 450 }}>
                <Card.Image size="3by2" src={props.image}  />
                <Card.Content>
                    <Media>
                        <Media.Item>
                            <Heading size={4}>{props.title}</Heading>
                            <Heading subtitle size={6}>Transcriptie van audio</Heading>
                        </Media.Item>
                    </Media>
                    <Content>
                        <AudioPlayer
                            src={'build/media/' + props.audio}
                            onPlay={e => console.log("onPlay")}
                        />
                    </Content>
                </Card.Content>
            </Card>
        // </li>
    );
}

export default SoundCard;