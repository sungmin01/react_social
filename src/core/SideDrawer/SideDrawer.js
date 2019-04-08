import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";
import DownArrow from "../../images/down-arrow.png";
import './SideDrawer.css';

const sideDrawer = (props) => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
      <li className="">
          <Link
              className=""
              to="/"
          >
              Home<span> </span>
              <span>
                <img src={`${DownArrow}`}/>
              </span>
          </Link>
      </li>

      <li className="">
          <Link
              className=""
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
              <li className="">
                  <Link
                      className=""
                      to="/signin"
                  >
                      Sign In<span> </span>
                      <span>
                        <img src={`${DownArrow}`}/>
                      </span>
                  </Link>
              </li>
              <li className="">
                  <Link
                      className=""
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
              <li className="">
                  <Link
                      to={`/user/${isAuthenticated().user._id}`}
                      className=""
                  >
                    My Profile<span> </span>
                    <span>
                      <img src={`${DownArrow}`}/>
                    </span>
                  </Link>
              </li>

              <li className="">
                  <span
                      className=""
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
    </nav>
  );
};

export default sideDrawer;
