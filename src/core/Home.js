import React, { Component } from "react";
import Posts from "../post/Posts";
import StatusBar from "../post/StatusBar";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            error: "",
        };
    }

    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            // one id has many other ids (followers) and vice versa
            return follower._id === jwt.user._id;
        });
        return match;
    };

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                let following = this.checkFollow(data);
                this.setState({ user: data, following }); //?
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
      const { redirectToSignin, user } = this.state;
      return (
            <div className="row content">
                <div className="col-md-2 col-sm-6">
                    <div className="main_left">
                    {!isAuthenticated() && (
                        <>
                            <div className="profile_preview"><p>Please Login</p></div>
                        </>
                    )}

                    {isAuthenticated() && (
                        <>
                            <div className="profile_preview">
                              <p>Hello {isAuthenticated().user.name}</p>
                              <p> {user.followers.length} Followers</p>
                            </div>
                        </>
                    )}
                      <ul className="menu_left">
                          <li><i className="icon ion-ios-paper" style={{color : "#8dc63f"}}></i> My Newsfeed</li>
                          <li><i className="icon ion-ios-people" style={{color : "#662d91"}}></i> People Nearby</li>
                          <li><i className="icon ion-ios-contacts" style={{color : "#ee2a7b"}}></i> Friends</li>
                          <li><i className="icon ion-ios-document" style={{color : "#f7941e"}}></i> Messages</li>
                          <li><i className="icon ion-ios-images" style={{color : "#1c75bc"}}></i> Images</li>
                          <li><i className="icon ion-ios-videocam" style={{color : "#9e1f63"}}></i> Videos</li>
                      </ul>
                    </div>
                </div>
                <div className="col-md-8 col-sm-6">
                  <StatusBar/>
                  <Posts/>
                </div>
                <div className="col-md-2 col-sm-6">
                </div>
            </div>
    );
  }
}
export default Home;
