import React, { Component } from 'react';


const Stockbox = (props) => (
        <div className = 'stockbox-box'>
            <div className = 'stockbox-name'>
                {props.stock.user_name}: {props.stock.email}
            </div>
            <div className = 'stockbox-details'>
                <h3>{props.stock.product_name}</h3>
                <p>stock count: {props.stock.stock_count} <span>price: {props.stock.price}</span></p>
            </div>       
        </div>
)

export default Stockbox;

/** <div className = 'stockbox-name'>
                {props.stock.user_name + ': ' + props.stock.email}
            </div>
            <div className = 'stockbox-details'>
                <h1>stock name: {props.stock.product_name}</h1>
                <p>stock count: {props.stock.stock_count} <span>price: {props.stock.price}</span></p>
            </div> */