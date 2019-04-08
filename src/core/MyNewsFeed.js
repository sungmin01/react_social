import React, { Component } from "react";
import { Link } from "react-router-dom";

class MyNewsFeed extends Component {

  render() {
      const { posts } = this.props;
      return (
          <div className="row">
              {posts.map((post, i) => {

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
