import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import DownArrow from "../images/down-arrow.png";

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#27aae1" };
    else return { color: "#ffffff" };
};

const Menu = ({ history }) => (
    <div className="top-nav">
      <div className="nav-inside">
        <span>React Social</span>
        <ul className="nav" style={{float: "right", margin : "-8px 0px 0px 0px"}}>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home<span> </span>
                    <span>
                      <img src={`${DownArrow}`}/>
                    </span>
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/users")}
                    to="/users"
                >
                    Users<span> </span>
                    <span>
                      <img src={`${DownArrow}`}/>
                    </span>
                </Link>
            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Sign In<span> </span>
                            <span>
                              <img src={`${DownArrow}`}/>
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Sign Up<span> </span>
                            <span>
                              <img src={`${DownArrow}`}/>
                            </span>
                        </Link>
                    </li>
                </>
            )}

            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                <li className="nav-item">
                    <Link
                        to={`/admin`}
                        style={isActive(history, `/admin`)}
                        className="nav-link"
                    >
                        Admin<span> </span>
                        <span>
                          <img src={`${DownArrow}`}/>
                        </span>
                    </Link>
                </li>
            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(
                                history,
                                `/user/${isAuthenticated().user._id}`
                            )}
                            className="nav-link"
                        >
                          My Profile<span> </span>
                          <span>
                            <img src={`${DownArrow}`}/>
                          </span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={
                                (isActive(history, "/signup"),
                                { cursor: "pointer", color: "#fff" })
                            }
                            onClick={() => signout(() => history.push("/"))}
                        >
                            Sign Out<span> </span>
                            <span>
                              <img src={`${DownArrow}`}/>
                            </span>
                        </span>
                    </li>
                </>
            )}
        </ul>
    </div>
  </div>
);

export default withRouter(Menu);
