import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { Throttle } from 'react-throttle';

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
    constructor(){
        super()
    }
    handleInputChange = (e) => {
        
    }
    render() {
        return (
            <Throttle time="1000" handler="onChange">            
                <Input onChange={this.handleInputChange} loading icon='user' placeholder='Github Username...' />
            </Throttle>
        );
    }
}

export default App;