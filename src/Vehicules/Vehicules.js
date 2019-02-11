import React, { Component } from 'react';

export class Vehicules extends Component{
    render(){
        return (
            <>
                <button  onClick={this.props.handleClick} className='vehicules-block' id={this.props.idVehicule.bus}>Bus</button>
                <button  onClick={this.props.handleClick} className='vehicules-block' id={this.props.idVehicule.tram}>Tram</button>
                <button  onClick={this.props.handleClick} className='vehicules-block' id={this.props.idVehicule.metro}>Metro</button>
                <button  onClick={this.props.handleClick} className='vehicules-block' id={this.props.idVehicule.train}>Train</button>
                <button  onClick={this.props.handleClick} className='vehicules-block' id={this.props.idVehicule.trolley}>Trolley</button>
                <button  onClick={this.props.handleClick} className='vehicules-block' id={this.props.idVehicule.ferry}>Ferry</button>
                <button  onClick={this.props.changeGlobal}>Global</button>
                
            </>
        )

    }
}
