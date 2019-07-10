import React, { Component} from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import AuthService from './components/AuthService';

const defURL = 'http://localhost:3000';
const bigbigbig = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRlOTg2MTRiOTNlNjYyMDg1NTIwMDJjNThmOWZkYTM3NjAzNGY4M2JkM2U4NzliMmU5Zjc4ODlmNjc0N2FhOGM0NzY5Nzc2ODljNjdjYTFiIn0.eyJhdWQiOiIxIiwianRpIjoiZGU5ODYxNGI5M2U2NjIwODU1MjAwMmM1OGY5ZmRhMzc2MDM0ZjgzYmQzZTg3OWIyZTlmNzg4OWY2NzQ3YWE4YzQ3Njk3NzY4OWM2N2NhMWIiLCJpYXQiOjE1NjE5MjA5ODMsIm5iZiI6MTU2MTkyMDk4MywiZXhwIjoxNTkzNTQzMzgzLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.c3y_NjO5oQdF-vcB_GhHYTmg1YpuWE64_lw7gcmopAnhol2AFvOmbj_k7uVHS-A_wHkDLNWsbTkecNQzPT9PV4bSX1WAKp1gnZHbHMEH38Mduv8qlMeOLlHjZ8QAYu1b9xoC4PUo24_fAtcDtYp3UaDpNAelGMMs3PcyO0EyWpfCGKPUAj7oT4QiglaIw8wTu4o7VmXDRTsG08cjTS6RnqcdNBTc0D3vtMORbEQVdqP45pOJsqMMvC3M_zLvCokUzBm57jXTa_Wh7WUokqj2Eo3P6kA2wOzGQ_tr53SA8C_RmDRkr3gp2G9QBeQetTLoChPhJbG-QWdltnkBCQ2cAiKW-HpQCb3UV-6eimKNXqAfexdfvp1koUnlnVGrRSb2eCCqO9THRx-s7CoDooqmQpiIpV6jmy5UbuFw62Hz3Fa-J5obTiN71OuvK1HqCcLhOCDm-SJ9ofsufKJ-pVp3T0JRxef82TILh4LAbKE-cTUJRCYwjMsXKVRcoSmxiABLTlTDkFlmaXOjf6JcS6t2cDu8edoBo-TEGWYcfLI2d-WdkbFzZODY9rmqjXcMAAZB6UnHCBIBqG3WDQt932Lul1t2jhdUoYXg1z0tijcFP_T40rx3GS8DdWp0HC36vtUWOgV9idxYz7dS_Zsm4jqQX5GNn6l4lrSzt9QpBDa-7QM;'

const instance = axios.create({
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
      this.setState({user: res.data.user,
      isLoggedIn: true})
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
  }

  componentWillMount(){
    if(this.Auth.loggedIn()){
        this.logIn();
    } 
  }

  render(){

    return (
      <Router basename="/">
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
              {
              this.state.isLoggedIn ? 
              <div>
                <div onClick = {this.logOut}>Log Out </div>
                You're logged in! Welcome {this.state.user.name}
              </div> 
              :
              <div>
                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink exact to="/register" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                You're not logged in!
              </div>
              }
              </div>
              <Route exact path="/register" render={(props) => <Register {...props} logIn={this.logIn}/>}/>
              <Route path="/sign-in" render={(props) => <Login {...props} logIn={this.logIn}/>}/>
              <Route path="/exchange" render={(props) => <Exchange {...props}/>}/>
    
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
