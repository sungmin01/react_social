import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

import PrivateRoute from '../auth/PrivateRoute'
import Posts from '../post/Posts'
import StatusBar from '../post/StatusBar'
import MenuLeft from './MenuLeft'
import MyNewsFeed from './MyNewsFeed'
import Followers from './Followers'
import Following from './Following'
import Gallery from './Gallery'
import Videos from './Videos'

import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { listByUser } from "../post/apiPost";

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

class Home extends Component {
    constructor() {
        super();
        this.state = {
            redirectToSignin: false,
            error: "",
            posts: []
        };
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.loadPosts(data._id);
            }
        });
    };

    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
          if (isAuthenticated()) {
            const userId = isAuthenticated().user._id;
            this.init(userId);
          } else {
          console.log("needs login");
        }
    }

    render() {
        return (
            <div className="row content">
                <div className="col-md-3 col-sm-5">
                    <MenuLeft/>
                </div>
                <div className="col-md-7 col-sm-5">
                    <Switch>
                        <Route exact path="/" component={StatusBarAndPosts} />
                        <Route
                          path="/user/mynewsfeed/:userId"
                          render={(props) => <MyNewsFeed {...props} posts={this.state.posts} />}
                        />
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
