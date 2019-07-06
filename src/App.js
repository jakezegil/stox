import React, { Component} from "react";
import "./App.css";
import axios from "axios";


class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
      axios.get('/api/open', {headers: 
        { "Accept" : "application/json",
          "Content-Type": "aplication/json",
          "Access-Control-Allow-Origin" : "*"
        }
      })
      .then(res => console.log(res.json())).catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
  }


  render(){
    return(
      <div className="App">
        <h1> Hello, World! </h1>
      </div>
    );
  }
}

export default App;