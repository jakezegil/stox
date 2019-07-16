import React, { Component} from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Exchange from "./pages/exchange.js";
import AuthService from './components/AuthService';

const defURL = 'http://localhost:3000';


var instance = axios.create({
  headers: {
    common: {        // can be common or any other method
      header1: null
    }
  }
})


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedIn : false,
      user : null
    }

    this.Auth = new AuthService();
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.setHeaders = this.setHeaders.bind(this);
  }

  logIn(){
    this.setHeaders();
    instance.get(`${defURL}/api/user`)
    .then(res => {
      this.setState({
        user: res.data.user,
        isLoggedIn: true})
    }).catch(err=>{
      console.log(err);
      this.setState({isLoggedIn: false});
    })
  }

  setHeaders() {
    let token = `Bearer ${this.Auth.getToken()}`;
    if (!!token) {
        instance.defaults.headers.common['Authorization'] = token;
    } else {
        instance.defaults.headers.common['Authorization'] = null;
    }
  }


  logOut(){
    this.Auth.logout(); 
    this.setState({user : null,
      isLoggedIn : false});
    
    instance = axios.create({
      headers: {
        common: {        // clear headers
          header1: null
        }
      }
    });

  }

  componentWillMount(){
    if(this.Auth.loggedIn()){
        this.logIn();
    } 
  }

  render(){
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <Router basename="/">
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
              {
              isLoggedIn ? 
              <div>
                <div onClick = {this.logOut}>Log Out </div>
                You're logged in! Welcome {this.state.user.name}
              </div> 
              :
              <div>
                <Redirect to="/"/>
                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink exact to="/register" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                You're not logged in!
              </div>
              } 
              </div>
              <Route path="/register" render={(props) => <Register {...props} logIn={this.logIn}/>}/>
              <Route exact path="/" render={(props) => isLoggedIn ? <Redirect to='/exchange' /> : <Login {...props} logIn={this.logIn}/>}/>
              <Route path="/sign-in" render={(props) => <Login {...props} logIn={this.logIn}/>}/>
              <Route path="/exchange" render={(props) => <Exchange instance = {instance} defURL = {defURL} {...props}/>}/>           
    
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

//<Exchange instance = {instance} defURL = {defURL} {...props}/>}/>
//render={(props) => isLoggedIn ? <Redirect to="/exchange"/> : <Login {...props} logIn={this.logIn}/> }