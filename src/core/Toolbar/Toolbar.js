import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";
import DownArrow from "../../images/down-arrow.png";
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar = (props) => (
  <div className="top-nav">
    <div className="nav-inside">
      <span className="logo_s">React Social</span>
      <div className="toolbar__toggle-button">
          <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <ul className="nav" style={{float: "right", margin : "-8px 0px 0px 0px"}}>
          <li className="nav-item">
              <Link
                  className="nav-link"
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
                          onClick={() => signout(() => window.location.reload())}
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

export default toolbar;
