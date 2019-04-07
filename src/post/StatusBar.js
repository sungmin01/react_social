import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";

class StatusBar extends Component {
    constructor() {
        super();
        this.state = {
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { body, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();

        if (!isAuthenticated()) { //
            alert("Please Login First!");
        } else if (this.isValid()){

            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        body: ""
                    });
                    window.location.reload();
                }
            });
        }
    };

    newPostForm = (body) => (
        <form>
            <div className="form-group" style={{margin : "50px 0 25px 0"}}>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                    placeholder="Write what you wish"
                />
            </div>

            <input
                onChange={this.handleChange("photo")}
                type="file"
                accept="image/*"
            />
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Create Post
            </button>
        </form>
    );

    render() {
        const {
            body,
            photo,
            user,
            error,
            loading
        } = this.state;

        return (
            <div className="container">
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.newPostForm(body)}
            </div>
        );
    }
}

export default StatusBar;
