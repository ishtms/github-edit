import React, { Component } from 'react';
import { Image, Message, Button, Icon, Modal, Card, Label } from 'semantic-ui-react';

export default class Results extends Component{
    render(){
        let listOfFollowers = this.props.followers.map((curr, key)=>{
            return (
                <li key={key}>
                    <Card>
                        <Image src={curr.avatar_url} />
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Username : {curr.login}
                            </a>
                        </Card.Content>
                    </Card>
                </li>
            )
        });
        let listOfFollowing = this.props.following.map((curr, key)=>{
            return(
                <li key={key}>
                <Card>
                    <Image src={curr.avatar_url} />
                       <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                Username : {curr.login}
                            </a>
                        </Card.Content>
                    </Card>
                </li>
            )
        })
        return (
            <div>
                <div style={{display: 'inline'}} className="profile-pic">
                    <Image src={this.props.pic} size='medium' circular />
                </div>
                <div className="username">
                    <Message info>
                        <Message.Header>Username</Message.Header>
                        <p>{this.props.username}</p>
                    </Message>
                </div>
                <div className="company">
                    <Message positive>
                        <Message.Header>Company</Message.Header>
                        <p>{this.props.company}</p>
                    </Message>
                </div>
                <div className="email">
                    <Message negative>
                        <Message.Header>Email</Message.Header>
                        <p>{this.props.email}</p>
                    </Message>
                </div>
                <div className="gravatar">
                    <Message negative>
                        <Message.Header>Gravatar</Message.Header>
                        <p>{this.props.gravatar}</p>
                    </Message>
                </div>
                <div className="followers">
                    <Modal trigger={<Button as='div' labelPosition='right'>
                            <Button color='red'>
                                <Icon name='heart' />
                                Followers
                            </Button>
                            <Label as='a' basic color='red' pointing='left'>{this.props.followers.length}</Label>
                            </Button>} closeIcon>
                        <Modal.Header>Followers</Modal.Header>
                        <Modal.Content image scrolling>
                        <Image
                            size='medium'
                            src='https://d30y9cdsu7xlg0.cloudfront.net/png/82735-200.png'
                            wrapped
                        />

                        <Modal.Description>
                            {/*Listing followers here*/}
                                <ul>
                                    {listOfFollowers}
                                </ul>
                        </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </div>
                <div className="following">
                <Modal trigger={<Button as='div' labelPosition='right'>
                            <Button color='red'>
                                <Icon name='heart' />
                                Following
                            </Button>
                            <Label as='a' basic color='red' pointing='left'>{this.props.following.length}</Label>
                            </Button>} closeIcon>
                        <Modal.Header>Following</Modal.Header>
                        <Modal.Content image scrolling>
                        <Image
                            size='medium'
                            src='https://cdn3.iconfinder.com/data/icons/people-professions/512/follower-512.png'
                            wrapped
                        />

                        <Modal.Description>
                            {/*Listing followers here*/}
                                <ul>
                                    {listOfFollowing}
                                </ul>
                        </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </div>
            </div>
        )
    }
}