import React, { Component } from 'react';
import './login.css';
import AuthService from '../components/AuthService';

class Register extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }

    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.register(this.state.name, this.state.email,this.state.password)
            .then(res => {
                this.props.logIn();
                this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.logIn();
            this.props.history.replace('/');
        }
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit ={this.handleFormSubmit}>
                    <header>Name</header>
                    <input
                            className="form-item"
                            placeholder="Joe Shmoe"
                            name="name"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <header>Email</header>
                        <input
                            className="form-item"
                            placeholder="you@email.com"
                            name="email"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <header>Password</header>
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <header>Verify Password</header>
                        <input
                            className="form-item"
                            placeholder="Verify Password"
                            name="verifypassword"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
}

export default Register;