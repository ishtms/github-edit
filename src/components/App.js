import React, { Component } from 'react';
import { Input, Header, Card, Icon } from 'semantic-ui-react';
import { Throttle } from 'react-throttle';
import Axios from 'axios';
import Results from './results';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            data: {},
            followers: [],
            following: []
        }
    }
    handleInputChange = (e) => {
        let StateObject = Object.assign({}, this.state),
            currentInput = e.target.value;
        
        let StoredValue = JSON.parse(localStorage.getItem(currentInput));

        if(StoredValue){
            StateObject.data = StoredValue.data;
          //StoredValue.followers_url;
          //StoredValue.following_url;

            Axios
                .get(`https://api.github.com/users/${currentInput}/followers?per_page=100`)
                .then((response) => {
                    StateObject.followers = response.data;

                    Axios
                        .get(`https://api.github.com/users/${currentInput}/following?per_page=100`)
                        .then((_response) => {
                            StateObject.following = _response.data;
                        })
                        .then(()=> {
                            this.setState(StateObject);
                        })
                        .catch((err) => {
                            console.error(err);
                        })
                })
                .catch((err) => {
                    console.error(err)
                })
        }else{
            Axios
                .get(`https://api.github.com/users/${currentInput}?access_token=dc29f8ff05e765a7f65fcbfd0791f0a7c5cc15f3`)
                .then((response) => {

                    //Saving info in local storage to access later
                    localStorage.setItem(currentInput, JSON.stringify(response));


                    StateObject.data = response.data;
                    Axios
                        .get(`https://api.github.com/users/${currentInput}/followers?per_page=100`)
                        .then((_response) => {
                            StateObject.followers = _response.data;
                            Axios
                                .get(`https://api.github.com/users/${currentInput}/following?per_page=1000`)
                                .then((__response) => {
                                    // I use _ for one level of chaining, and __ for 2 levels as parameter
                                    StateObject.following = __response.data;
                                })
                        })
                        .then(() => {
                            this.setState(StateObject);
                        })
                        .catch((err) => {
                            console.error(err)
                        })
                        
                })
                
        }
    }
    render() {
        return (
            <div>
                <div className="header">
                    <Header as='h1'>Github Search, by Ishtmeet @ishtmeet-singh</Header>
                    <Card.Content extra>
                        <a>
                            <Icon name='info' />
                            By default, the search limit set by API is 100, so if someone has more than 100 followers or following, it will show the max of 100.
                        </a>
                    </Card.Content>

                </div>
                <div className="input">
                <Throttle time="200" handler="onChange">            
                    <Input onChange={this.handleInputChange} icon='user' placeholder="Example - Gaearon" />
                </Throttle>
                </div>
                <Results username={this.state.data.login} pic={this.state.data.avatar_url || "https://cdn0.iconfinder.com/data/icons/admin-panel-glyph-black/2048/599_-_Subscribers-512.png" } company={this.state.data.company || "N/A"} email={this.state.data.email || "N/A"} gravatar={this.state.data.gravatar_id || "N/A"} followers={this.state.followers} following={this.state.following} />
            </div>
        );
    }
}

export default App;