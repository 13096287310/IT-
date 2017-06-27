import React from 'react';
import erweima from '../images/erweima.png'
export default class Guanzhu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="guanzhu">
                <img src={erweima} alt=""/>
            </div>
        )
    }
}