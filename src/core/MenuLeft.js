import React, { Component } from "react";
import { Link } from "react-router-dom";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import DefaultProfile from "../images/avatar.jpg";

class MenuLeft extends Component {
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
    const { user } = this.state;
    return (
      <div className="main_left">
      {!isAuthenticated() && (
          <>
              <div className="profile_preview"><p>Please Login</p></div>
          </>
      )}

      {isAuthenticated() && (
          <>
              <div className="profile_preview">
                <div className="profile-image">
                  <img className="main-user-image" src={`${process.env.REACT_APP_API_URL}/user/photo/${
                    user._id}`}
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    />
                </div>
                <p>Hello {isAuthenticated().user.name}</p>
                <p> {user.followers.length} Followers</p>
              </div>
          </>
      )}
        <ul className="menu_left">
            <li><i className="icon ion-ios-paper" style={{color : "#8dc63f"}}></i> <Link
                className=""
                to={`/user/mynewsfeed/${user._id}`}
            >
                My Newsfeed
            </Link></li>
            <li><i className="icon ion-ios-contacts" style={{color : "#ee2a7b"}}></i> My Friends</li>
            <li><i className="icon ion-ios-images" style={{color : "#1c75bc"}}></i> My Images</li>
            <li><i className="icon ion-ios-videocam" style={{color : "#9e1f63"}}></i> My Videos</li>
        </ul>
      </div>
  )
  };
}

export default MenuLeft;
