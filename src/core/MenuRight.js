import React, { Component } from "react";
import { findPeople, follow, list } from "../user/apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

class MenuRight extends Component {
  constructor() {
      super();
      this.state = {
          users: [],
          error: "",
          open: false
      };
  }

  init = () => {
    list().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            this.setState({ users: data });
        }
    });
  };

  componentDidMount() {
      if (!isAuthenticated()) {
          this.init();
        } else {
          const userId = isAuthenticated().user._id;
          const token = isAuthenticated().token;

          findPeople(userId, token).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              this.setState({ users: data });
          }
      });
    }
  }

  clickFollow = (user, i) => {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      follow(userId, token, user._id).then(data => {
          if (data.error) {
              this.setState({ error: data.error });
          } else {
              let toFollow = this.state.users;
              toFollow.splice(i, 1);
              this.setState({
                  users: toFollow,
                  open: true,
                  followMessage: `Following ${user.name}`
              });
          }
      });
  };

  render() {
      const { users, open } = this.state;
      return (
        <div className="main_right">
            <div><p>Who to follow</p></div>
              {users.map((user, i) => (
                <div className="follow-div" key={i}>
                  <img
                      className="home-img-users"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${
                          user._id
                      }`}
                      onError={i => (i.target.src = `${DefaultProfile}`)}
                      alt={user.name}
                  />
                 {user.name}

                 {isAuthenticated() && (
                     <>
                       <button
                           onClick={() => this.clickFollow(user, i)}
                           className="btn btn-raised btn-info float-right btn-sm"
                       >
                           Follow
                       </button>
                     </>
                 )}

                 {!isAuthenticated() && (
                     <>
                       {this.init()}
                     </>
                 )}

                </div>
              ))
        }
        </div>
    )
  }
}

export default MenuRight;
