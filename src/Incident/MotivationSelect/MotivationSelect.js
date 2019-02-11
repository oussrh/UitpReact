import React, { Component } from 'react';
import axios from 'axios';

import "../Incident.css"
const url = "http://127.0.0.1:8000/api";
class MotivationSelect extends Component {
    state={
        motivation:[]
    }
  
    componentDidMount(){
        axios
        .get(`${url}/Motivation`)
        .then(res => {
            this.setState({
            motivation: res.data
            });
        })
        .catch(err => {
            console.log("AXIOS ERROR: ", err);
        });
    }

    render(){

        return(
            <select defaultValue={this.props.motiv} className="motivation" placeholder="motivation" name="motivation" onChange={this.props.onChange} >
                <option hidden></option>      
                {this.state.motivation.map(motivation =>
                
                <option key={motivation.id} value={motivation.id}>{motivation.choix}</option>

                )}
            </select>
        )
    }

}

export default MotivationSelect;