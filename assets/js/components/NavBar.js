import React, { useContext } from 'react';
import { ReactSymContext } from '../contexts/ReactSymContext';
import 'react-bulma-components/dist/react-bulma-components.min.css';
//import { Level, Heading, Field, Control, Button, Input } from 'react-bulma-components/lib/components/';
import Level from 'react-bulma-components/lib/components/level';
import { Field, Control, Input } from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';





function NavBar() {
    //const context = useContext(ReactSymContext);

    return (
        <Level renderAs="nav" className="lit">
            <Level.Side align="left">
                <Level.Item>
                    <Heading size={5} subtitle>
                        <strong>123</strong> posts
                    </Heading>
                </Level.Item>
                <Level.Item>
                    <Field kind="addons">
                        <Control>
                            <Input placeholder="Find a post" type="text" onChange={(event)=>console.log(event.target.value)} />
                        </Control>
                        <Control>
                            <Button renderAs="button" color="primary">Search</Button>
                        </Control>
                    </Field>
                </Level.Item>
            </Level.Side>
            <Level.Side align="right">
                <Level.Item>
                    <strong>All</strong>
                </Level.Item>
                <Level.Item>
                    <a>Published</a>
                </Level.Item>
                <Level.Item>
                    <a>Drafts</a>
                </Level.Item>
                <Level.Item>
                    <a>Deleted</a>
                </Level.Item>
                <Level.Item>
                    <Button renderAs="a" color="success">
                        New
                    </Button>
                </Level.Item>
            </Level.Side>
        </Level>

    );
}

export default NavBar;