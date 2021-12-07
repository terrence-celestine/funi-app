import React, { Component } from "react";
import "./index.css";
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
    console.log(this.state.username);
    console.log(this.state.password);
    const username = this.state.username;
    const password = this.state.password;
    if (username.length == 0 || password.length == 0) {
      console.log("show error here");
    } else {
      console.log("look up user in database");
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
    console.log("logging in user");
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
        console.log(data.user);
        if (data.user == true) {
          console.log("found user give them a token");
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
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => this.handleInputChange(e)}
          />
          <input
            type="password"
            placeholder="oassword"
            name="password"
            onChange={(e) => this.handleInputChange(e)}
          />
          <input type="submit" value="Login"></input>
        </form>
      </div>
    );
  }
}
