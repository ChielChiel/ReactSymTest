import React, { useContext, useState, Component } from 'react';
import { ReactSymContext } from '../contexts/ReactSymContext';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Level from 'react-bulma-components/lib/components/level';
import { Field, Control, Input, Label, Textarea} from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import YouTube from 'react-youtube';
import Button from 'react-bulma-components/lib/components/button';
import Table from 'react-bulma-components/lib/components/table';
import Container from 'react-bulma-components/lib/components/container';

class Download extends Component {
    static contextType = ReactSymContext;
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: 'https://www.youtube.com/watch?v=f8j4v_cY5mA&feature=emb_rel_pause',
            videoId: '',
            start: 0,
            end: 10,
            player: null,
            progress: 0,
            duration: 60,
            title: null,
            transcription: null,
            spelsers: null,
            isLoading: false,
            isValidVideo: false,
        };
    }

    custom = (e) => {
        e.target.playVideo();
        e.target.seekTo(parseFloat(this.state.start))
        e.target.opts = this.getPlayerVars();
    }
//https://stackoverflow.com/questions/14379459/fetch-all-youtube-videos-using-curl
    handleUrlChange = (e) => {
        const vidId = this.youtube_parser(e.target.value);
        this.setState({ videoId: vidId, videoUrl: e.target.value });
    }



    handleStart = (e) => {
        this.setState({ duration: this.state.player.getDuration() });
        this.interval = setInterval(() => this.setState({ progress: this.state.player.getCurrentTime() }), 100);
    }

    youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    getPlayerVars = () => {
        var toReturn = {
            // width: '100%',

            playerVars: {
                start: this.state.start,
                end: this.state.end,
                controls: 0,
                modestbranding: 1,
                fs: 0,
            }
        };
        return toReturn;
    }

    prettyTime = duration => {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = (duration % 60).toFixed(1)

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    onReady = (e) => {
        this.setState({ player: e.target })
    }



    submitForm = e => {
        this.setState({isLoading: true});

    }




    render() {
        const { videoUrl, videoId, end, start, player, progress, isLoading, isValidVideo } = this.state
        const vars = this.getPlayerVars();
        return (
            <Container>
                <Field kind="addons">
                    <Control className="is-expanded">
                        <Input placeholder="https://www.youtube.com/watch?v=Hy7rws3mQ0o" type="text" value={videoUrl} onChange={(e) => this.handleUrlChange(e)} />
                    </Control>
                    <Control>
                        <Button renderAs="button" disabled={videoId == ''} onClick={(event) => { this.setState({ start: start - 1, }) }}>Start Editing</Button>
                    </Control>
                </Field>

                <Level className="levelVid">
                    <Level.Side align="left" className="vid">
                        <Level.Item className="viditem">
                            <YouTube
                                containerClassName="youtube-responsive-container"
                                className="ytcon"
                                videoId={videoId}
                                opts={vars}
                                onReady={(yt) => this.onReady(yt)}
                                onPlay={(event) => this.handleStart(event)}
                                onEnd={(event) => this.custom(event)}
                            />
                        </Level.Item>
                    </Level.Side>
                    {player != null &&

                        <Level.Side align="right" className="vidData has-text-right">
                            <Level.Item>
                                <Table className="is-striped">
                                    <thead>
                                        <tr>
                                            <th>Video</th>
                                        </tr>
                                        <tr>
                                            <th>

                                            </th>
                                            <th>
                                                Seconde
                                            </th>
                                            <th title="(mm:ss,ms)">
                                                Tijd
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Voortgang</td>
                                            <td>{(progress != null) ? progress.toFixed(1) : "0.00"}</td>
                                            <td>{this.prettyTime(progress)}</td>
                                        </tr>
                                        <tr>
                                            <td>Lengte</td>
                                            <td>{(player.getDuration() != null) ? player.getDuration().toFixed(1) : "0:00"}</td>
                                            <td>{this.prettyTime(player.getDuration())}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Level.Item>

                        </Level.Side>
                    }


                </Level>

                <Level style={{ width: '70%' }}>
                    <Level.Side align="left">
                        <Level.Item>
                            <div>
                                <p>Begintijd (sec) {this.prettyTime(progress)}</p>
                                <Field kind="addons">
                                    <Control style={{ width: '30%' }}>
                                        <Input placeholder="20" type="number" min="0" disabled={!isValidVideo} value={this.state.start} onChange={(e) => this.setState({ start: (parseFloat(e.target.value) != null ? parseFloat(e.target.value) : 0), })} />
                                    </Control>
                                    <Control>
                                        <Button renderAs="button" disabled={(start <= 0) || !isValidVideo} onClick={(event) => { this.setState({ start: start - 1, }) }}>-</Button>
                                    </Control>
                                    <Control>
                                        <Button renderAs="button" disabled={(start >= (this.state.duration - 2)) || !isValidVideo} onClick={(event) => { this.setState({ start: start + 1, }) }}>+</Button>
                                    </Control>
                                </Field>
                            </div>
                        </Level.Item>

                    </Level.Side>
                    <Level.Side align="right">
                        <Level.Item>
                            <div>
                                <p>Eindtijd (sec)</p>
                                <Field kind="addons">
                                    <Control style={{ width: '30%' }}>
                                        <Input placeholder="30" type="number" disabled={!isValidVideo} value={this.state.end} max={this.state.duration} onChange={(e) => this.setState({ end: parseFloat(e.target.value), })} />
                                    </Control>
                                    <Control>
                                        <Button renderAs="button" type="submit" disabled={((end - 1) <= start) || !isValidVideo} onClick={(event) => { this.setState({ end: end - 1, }) }}>-</Button>
                                    </Control>
                                    <Control>
                                        <Button renderAs="button" type="submit" disabled={(end >= (this.state.duration - 1)) || !isValidVideo} onClick={(event) => { this.setState({ end: end + 1, }) }}>+</Button>
                                    </Control>
                                </Field>
                            </div>
                        </Level.Item>
                    </Level.Side>
                </Level>
                <Container>
                    <Field>
                        <Label>Titel</Label>
                        <Control>
                            <Input value={this.state.title} disabled={!isValidVideo} onChange={(e) => this.setState({title: e.target.value})} placeholder="Titel van fragment" />
                        </Control>
                    </Field>
                    <Field>
                        <Label>Transcriptie</Label>
                        <Control>
                            <Textarea value={this.state.transcription} disabled={!isValidVideo} onChange={(e) => this.setState({transcription: e.target.value})} placeholder="Wat wordt er precies gezegd, alleen text" />
                        </Control>
                    </Field>
                    <Field>
                        <Label>Spelers
                        </Label>
                        <Control>
                            <Input value={this.state.spelsers} disabled={!isValidVideo} onChange={(e) => this.setState({spelsers: e.target.value})} placeholder="Grote spelers?" />
                        </Control>
                    </Field>
                </Container>

                <Button renderAs="button" loading={isLoading} color="primary" disabled={!isValidVideo} style={{marginTop: '1rem'}} onClick={(e) => {this.submitForm(e)}}>Post!</Button>
            </Container>
        );
    }
}

export default Download;