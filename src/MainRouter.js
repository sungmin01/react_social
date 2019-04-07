import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './core/Home'
import Footer from './core/Footer'
import Toolbar from './core/Toolbar/Toolbar'
import SideDrawer from './core/SideDrawer/SideDrawer'
import Backdrop from './core/Backdrop/Backdrop'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'
import FindPeople from './user/FindPeople'
import NewPost from './post/NewPost'
import EditPost from './post/EditPost'
import SinglePost from './post/SinglePost'
import MyNewsFeed from './core/MyNewsFeed'
import PrivateRoute from './auth/PrivateRoute'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'
import Admin from './admin/Admin'

class MainRouter extends Component {
    constructor() {
        super()
        this.state = {
            sideDrawerOpen: false
        }
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {
                sideDrawerOpen: !prevState.sideDrawerOpen
            }
        })
    }

    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false })
    }

    render() {
        let backdrop

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />
        }

        return (
            <div>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer show={this.state.sideDrawerOpen} />
                {backdrop}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/followers" component={Home} />
                    <Route path="/following" component={Home} />
                    <Route path="/gallery" component={Home} />
                    <Route path="/videos" component={Home} />
                    <PrivateRoute exact path="/admin" component={Admin} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route
                        exact
                        path="/reset-password/:resetPasswordToken"
                        component={ResetPassword}
                    />
                    <PrivateRoute exact path="/post/create" component={NewPost} />
                    <Route exact path="/post/:postId" component={SinglePost} />
                    <PrivateRoute
                        exact
                        path="/post/edit/:postId"
                        component={EditPost}
                    />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <PrivateRoute
                        exact
                        path="/user/edit/:userId"
                        component={EditProfile}
                    />
                    <PrivateRoute exact path="/user/:userId" component={Profile} />
                    <PrivateRoute exact path="/user/mynewsfeed/:userId" component={Home} />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default MainRouter
