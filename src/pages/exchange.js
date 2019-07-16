import React, { Component } from 'react';
import Stockbox from '../components/stockbox.js';
import AuthService from '../components/AuthService';
import axios from "axios";
import './exchange.css';

const instance = axios.create({
    headers: {
      common: {        // can be common or any other method
        header1: null
      }
    }
  })

class Exchange extends Component {
    constructor(props){
        super(props);

        this.state = {
            stocks : [],
            mounted : false
        }
        
        this.Auth = new AuthService();
        this.listAllStocks = this.listAllStocks.bind(this);
        this.listMyStocks = this.listMyStocks.bind(this);
        this.setHeaders = this.setHeaders.bind(this);
        this.clickAllStocks = this.clickAllStocks.bind(this);
        this.clickMyStocks = this.clickMyStocks.bind(this);
    }

    listMyStocks(){
        this.props.instance.get(`${this.props.defURL}/api/mystocklist`)
        .then(res =>
             this.setState({
                stocks : res.data.data
            }));
    }

    listAllStocks(){
         this.props.instance.get(`${this.props.defURL}/api/stocklist`)
        .then(res =>
            this.setState({
               stocks: res.data.data
           }));
    }

    componentDidMount(){
        this.listAllStocks();
        this.setState({mounted : true})
        
    }

    setHeaders() {
        let token = `Bearer ${this.Auth.getToken()}`;
        if (!!token) {
            instance.defaults.headers.common['Authorization'] = token;
        } else {
            instance.defaults.headers.common['Authorization'] = null;
        }
    }

    clickAllStocks(e){
        e.stopPropagation();

        this.listAllStocks();
    }

      clickMyStocks(e){
        e.stopPropagation();

        this.listMyStocks();
        console.log('clicked');
    }

    render() {
        let stocks = this.state.stocks;
        let mounted = this.state.mounted;

        return (
            <div>
                <h1> Welcome to the stock exchange!</h1>
                <div className = 'PageSwitcher'>
                    <div className = 'PageSwitcher__Item' onClick = {this.clickAllStocks}>All Stocks</div>
                    <div className = 'PageSwitcher__Item' onClick = {this.clickMyStocks}>My Stocks</div>
                </div>
                <div className = 'grid'>
                    {
                        mounted ? 
                        stocks.map(stock => <Stockbox key = {stock.id} stock = {stock}/>)
                        :
                    null
                    }
                </div>
            </div>
        )
    }
}

export default Exchange;

