import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

import PrivateRoute from '../auth/PrivateRoute'
import Posts from '../post/Posts'
import StatusBar from '../post/StatusBar'
import MenuLeft from './MenuLeft'
import MyNewsFeed from './MyNewsFeed'

class StatusBarAndPosts extends Component {
    render() {
        return (
            <div>
                <StatusBar />
                <Posts />
            </div>
        )
    }
}

const Followers = () => <h1>Followers</h1>
const Following = () => <h1>Following</h1>
const Gallery = () => <h1>Gallery</h1>
const Videos = () => <h1>Videos</h1>

class Home extends Component {
    render() {
        return (
            <div className="row content">
                <div className="col-md-3 col-sm-5">
                    <MenuLeft/>
                </div>
                <div className="col-md-7 col-sm-5">
                    <Switch>
                        <Route exact path="/" component={StatusBarAndPosts} />
                        <PrivateRoute exact path="/user/mynewsfeed/:userId" component={MyNewsFeed} />
                        <Route path="/followers" component={Followers} />
                        <Route path="/following" component={Following} />
                        <Route path="/gallery" component={Gallery} />
                        <Route path="/videos" component={Videos} />
                    </Switch>
                    
                </div>
                <div className="col-md-2 col-sm-5"></div>
            </div>
        )
    }
}

export default Home
