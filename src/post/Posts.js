import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import DefaultProfile from "../images/avatar.jpg";
import LoadingIamge from "../images/loading.gif";
import { Link } from "react-router-dom";

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            visible: 7
        };
      this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {
      this.setState((prev) => {
        return {visible: prev.visible + 4};
      });
    }

    componentDidMount() {
      list().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              this.setState({ posts: data });
          }
      });
    }

    renderPosts = posts => {
        return (
            <div className="row">
                {posts.slice(0, this.state.visible).map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

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
                              <img
                                  className="home-img-users"
                                  src={`${process.env.REACT_APP_API_URL}/user/photo/${
                                      post.postedBy._id
                                  }`}
                                  onError={i => (i.target.src = `${DefaultProfile}`)}
                                  alt={post.postedBy.name}
                              />
                              <p className="font-italic mark">
                                  Posted by{" "}
                                  <Link to={`${posterId}`}>
                                      {posterName}{" "}
                                  </Link>
                                  on {new Date(post.created).toDateString()}
                              </p>
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
                                <hr/>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts } = this.state; // when there is no posts? and when there are posts but loading?
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {!posts.length ? (<div className="text-center">
                         <img src = {`${LoadingIamge}`} alt="loading"/>
                    </div>) : ""}
                </h2>

                {this.renderPosts(posts)}

                {this.state.visible < this.state.posts.length &&
                   <div className="load-more-wrap"><button onClick={this.loadMore}
                   type="button"
                   className="load-more">Load more</button></div>
                }
            </div>
        );
    }
}

export default Posts;
