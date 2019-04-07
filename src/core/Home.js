import React, { Component } from "react";
import Posts from "../post/Posts";
import StatusBar from "../post/StatusBar";
import MenuLeft from "./MenuLeft";

class Home extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
      return (
            <div className="row content">
                <div className="col-md-3 col-sm-5">
                  <MenuLeft/>
                </div>
                <div className="col-md-7 col-sm-5">
                  <StatusBar/>
                  <Posts/>
                </div>
                <div className="col-md-2 col-sm-5">
                </div>
            </div>
    );
  }
}
export default Home;
