import React from 'react';
import ReactDOM from 'react-dom';
import ReactSymContextProvider from './contexts/ReactSymContext';
import SoundTable from './components/SoundTable';
import NavBar from './components/NavBar';

class App extends React.Component {
    render() {
        return (
            <ReactSymContextProvider>
                <NavBar />
                {/* <SoundTable /> */}
            </ReactSymContextProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));