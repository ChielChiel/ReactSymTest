import React from 'react';
import ReactDOM from 'react-dom';
import ReactSymContextProvider from './contexts/ReactSymContext';
import SoundTable from './components/SoundTable';
import NavBar from './components/NavBar';
import '../css/app.css';
import Download from './components/Download'

class App extends React.Component {
    render() {
        return (
            <ReactSymContextProvider>
                <NavBar />
                <div className="main-content">
                    <Download />
                    {/* <SoundTable /> */}
                </div>
            </ReactSymContextProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));