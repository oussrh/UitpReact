import React, { Component } from "react";
import "./SelectMode.css";
import {Link} from 'react-router-dom';

class TransportsContainer extends Component {
  state = {
    transports: [
      {
        id: 1,
        name: "Bus",
        image: "/img/bus.svg"
      },
      {
        id: 2,
        name: "Tram",
        image: "/img/tram.svg"
      },
      {
        id: 3,
        name: "Metro",
        image: "/img/metro.svg"
      },
      {
        id: 4,
        name: "Train",
        image: "/img/train.svg"
      },
      {
        id: 5,
        name: "Trolley",
        image: "/img/trolley.svg"
      },
      {
        id: 6,
        name: "Ferry",
        image: "/img/ferry.svg"
      }
    ],
    vehiculeSelected: [],
    classNameStyle: {
      bgOrange: "",
      avalaible: "",
      selected: ""
    },
    isGlobalActive: false,
    isGlobal: false
  };

  isGlobal = () => {
    // eslint-disable-next-line
    {this.state.isGlobalActive &&
      this.setState({ isGlobal: !this.state.isGlobal }, () => {
        if(this.state.isGlobal){
          this.setState({classNameStyle:{bgOrange:"bgOrange",avalaible:"avalaible"}})
        }else{
          this.setState({classNameStyle:{bgOrange:"",avalaible:"avalaible"}})
        }
      });
    }
  };

  handleClick = id => () => {
    const newvehiculeSelected = this.state.vehiculeSelected;
    const index = newvehiculeSelected.indexOf(id);
    index === -1
      ? newvehiculeSelected.push(id)
      : newvehiculeSelected.splice(index, 1);
    this.setState({ vehiculeSelected: newvehiculeSelected });

    this.state.vehiculeSelected.length >= 2
      ? this.setState({ isGlobalActive: true }, () => {
        this.setState({classNameStyle:{avalaible:"avalaible"}})
        })
      : this.setState({ isGlobalActive: false, isGlobal: false }, () => {
        this.setState({classNameStyle:{avalaible:""}})
        });
  };

  render() {
    return (
      <>
        <div className='transport-container'>
          <section className="header">
            <div
              onClick={this.isGlobal}
              className={`global-btn ${this.state.classNameStyle.bgOrange} ${this.state.classNameStyle.avalaible}`}
            >
              Global Note
          </div>
          </section>

          <section style={this.state.style} className="container">
            <div className="row">
              {this.state.transports.map(transport => {
                return (
                  <Transport
                    key={transport.id}
                    handleClick={this.handleClick(transport.id)}
                    allIsSelected={this.state.allIsSelected}
                    name={transport.name}
                    image={transport.image}
                    selectedStyle={this.state.classNameStyle}
                    vehiculeSelected={this.state.vehiculeSelected}
                  />
                );
              })}
            </div>
          </section>
          <section className="footer">
            <div
              className={`prev-btn`}
            >
              Prev
            </div>
            <Link to={{ 
            pathname: "/Form", 
            state: {
              vehiculeSelected: this.state.vehiculeSelected,
              is_global: this.state.isGlobal
            } 
          }}>
            <div className={`next-btn ${this.state.vehiculeSelected.length >= 1 && "avalaible"}`} >
              Next
            </div></Link> 

          </section>
        </div>
      </>
    );
  }
}



class Transport extends Component {
   state={
     select:""
   }


  selfClick = () =>{
    this.state.select === "" ? this.setState({select:"selected"}) : this.setState({select:""})
  }
  render() {
    return (
       <>
        <div className="transport-block">
          <div
            onClick={() => {
              this.props.handleClick();
              this.selfClick()
            }}
            className={`vehicules-icon ${this.props.selectedStyle.selected} ${this.state.select}`}
          >
            <img src={this.props.image} alt={`${this.props.name} transport`} />
          </div>
          <p>
            <b>{this.props.name}</b>
          </p>
        </div>
       </>
    );
  }
}


export default TransportsContainer