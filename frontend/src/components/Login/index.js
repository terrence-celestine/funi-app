import React, { Component } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    if (username.length == 0 || password.length == 0) {
      console.log("show error here");
    } else {
      this.loginUser();
    }
  }
  handleInputChange(e) {
    let fieldName = e.target.name;
    this.setState({
      [fieldName]: e.target.value,
    });
  }
  loginUser() {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    fetch("/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          this.props.setToken(data.user);
          window.location = "/";
        } else {
          console.log("user not found throw error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  render() {
    return (
      <div id="login-page">
        <h2>Sign In</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => this.handleInputChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => this.handleInputChange(e)}
          />
          <input type="submit" value="Login"></input>
        </form>
      </div>
    );
  }
}
