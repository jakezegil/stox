import React, { Component } from 'react';
import './login.css';
import AuthService from '../components/AuthService';

class Login extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }

    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.login(this.state.email,this.state.password)
            .then(res => {
                this.props.logIn();
                this.props.history.replace('/');
            })
            .catch(err =>{
                console.log(err);
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
                        <input
                            className="form-item"
                            placeholder="you@email.com"
                            name="email"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password"
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

export default Login;