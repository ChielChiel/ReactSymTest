import React from 'react';
import ReactDOM from 'react-dom';
import ReactSymContextProvider from './contexts/ReactSymContext';
import SoundTable from './components/SoundTable';

class App extends React.Component {
    render() {
        return (
            <ReactSymContextProvider>
                <SoundTable />
            </ReactSymContextProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));