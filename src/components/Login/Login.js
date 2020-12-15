import React, { Component } from 'react';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            system: 'Login',
            email: '',
            password: '',
            forgotpass: 'forgotpass',
        }
    }
    // Change from login to register/signup
    changeSystem = () => {
        this.setState({system: "Register"});
        this.setState({forgotpass: "hide"});
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        if (this.state.system === 'Login') {
            // Call your function to login here
        } else {
            // Call your function to signup / register here
        }
    }
    // Handles email change
    handleEmailChange = (evt) => {
        this.setState({
            email: evt.target.value,
        });
    }
    // Handles password change
    handlePassChange = (evt) => {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {
        return (
            <div className="login-modal">
                <form onSubmit={this.handleSubmit}>
                    <div className="login-container">
                        <label className={this.state.system}>Full Name</label>
                        <input id="fn" type={this.state.system} placeholder="Enter Full Name" name="fullname"/>

                        <label>Email</label>
                        <input id="em" type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" name="email" required/>

                        <label>Password</label>
                        <input id="ps" type="password" value={this.state.password} onChange={this.handlePassChange} placeholder="Enter Password" name="psw" required/>

                        <button className="login-system" type="submit">{this.state.system}</button>
                    </div>
                </form>
                <div className="login-container">
                    <button className={this.state.forgotpass}>Forgot Password?</button>
                    <span className="login-register">Don't have account? <button type="reset" className="login-registerbtn" onClick={this.changeSystem}>Register</button></span>
                </div>
                <br/>
                <div className={"login-container"}>
                    <h1 className={'login-text'}>OR</h1>
                    <br/>
                    <button className={"login-Oauth"}><i className="fab fa-google"/> - Login with Google</button>
                </div>
            </div>
        )
    }
}

export default Login;