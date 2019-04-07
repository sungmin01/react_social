import React, { Component } from "react";
import { Link } from "react-router-dom";

import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { listByUser } from "../post/apiPost";

class MyNewsFeed extends Component {
  constructor() {
      super();
      this.state = {
          user: { following: [], followers: [] },
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
    const { user, posts } = this.state;
      return (
          <div className="row">
              {posts.slice(0, this.state.visible).map((post, i) => {

                  return (
                      <div className="main-card" key={i}>
                          <div className="main-card-detail mt-3">
                              <div className="img-wrap">
                                  <img
                                      src={`${process.env.REACT_APP_API_URL}/post/photo/${
                                          post._id}`
                                      }
                                      alt={post.title}
                                      onError={e => e.target.style.display = 'none'}
                                      className="img-inside"
                                  />
                              </div>
                              <h5 className="card-title">{post.title}</h5>
                              <p className="card-text">
                                  {post.body.substring(0, 100)}
                              </p>
                              <br />
                              <Link
                                  to={`/post/${post._id}`}
                                  className="btn btn-raised btn-primary btn-sm"
                              >
                                  Read more
                                  </Link>
                              <hr />
                          </div>
                      </div>
                  );
              })}
          </div>
      )
  };
}

export default MyNewsFeed;
