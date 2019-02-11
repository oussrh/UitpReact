import React, { Component } from 'react';
import axios from 'axios';

import FrequenceSelect from './FrequenceSelect/FrequenceSelect';
import CommentInput from './CommentInput/CommentInput';
import MotivationSelect from './MotivationSelect/MotivationSelect';

import "./Incident.css"

const url = "http://127.0.0.1:8000/api";
class Filds extends Component {

state = {
    incidents:[],
    typeIncidents:[],
    activeIndex: 0,
    transports:[],
    motivation: []
  };

  componentDidMount() {
    
    axios.get(`${url}/incidents/`)
      .then(res => {
        this.setState({
          incidents: res.data
        });
        this.props.getLngIncidents(res.data.length)
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
    //******************************************** */
    axios.get(`${url}/TypeIncidents/`)
      .then(res => {
        this.setState({
          typeIncidents: res.data
        });
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
    //****************************************************/
    axios.get(`${url}/Transports/`)
      .then(res => {
        this.setState({
          transports: res.data
        });
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
    //*******************************************************/
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

  render() {
    return (
      
      <>
          {
            
            this.state.typeIncidents.map((t, i) =>
              <Incident
                key = {i}
                entries = {this.props.entries}
                transports = {this.state.transports}
                testL = {this.props.testL}
                isGlobal = {this.props.isGlobal}
                categoryId={t.id}
                categoryName={t.nomType}
                motivation={this.state.motivation} 
                isDisplayed={this.state.activeIndex === i ? true : false}
                index={i}
                items={this.state.incidents.filter(e => (e.idTypeIncidents === t.id))} 
                handleChange={this.props.inputHandel}
              />
            )
            
          }
          <div className="footer-form">
          
            <button
                className={this.state.activeIndex > 0 ? "blue-btn prev" : "btn-hidden"} 
                onClick= {(e) =>{
                e.preventDefault();
                this.setState( prev => ({ activeIndex: prev.activeIndex - 1 }));
                }
                }
              >
                Prev
              </button>
              
              
              <button
                className={this.state.activeIndex < this.state.typeIncidents.length-1 ?"blue-btn next " : "btn-hidden"}
                onClick= {(e) =>{
                e.preventDefault();
                this.setState( prev => ({ activeIndex: prev.activeIndex + 1 }))
                }
                }
              >
                Next
              </button>

              <button className={this.state.activeIndex === this.state.typeIncidents.length-1 ? "blue-btn submit" : "btn-hidden"} type = "submit" 
              value = "Submit"
              onClick = {
              this.props.onSubmit
              }
              >
              Submit
              </button> 
          </div>
      </>
    )
  }
}

export default Filds;
/*##########################################################################################*/
/*##########################################################################################*/
class Incident extends Component {
  state = {
    transImg : []
  }

  componentDidMount(){
    const newTransImg = []

    this.props.testL.map(idTrans => 
      this.props.transports.filter( (trans) => (trans.id === idTrans) &&  newTransImg.push(trans.nom)
      ))
      this.setState({transImg:newTransImg});
  }
  render() {
    let {
      categoryId,
      categoryName,
      items,
      handleChange,
      isDisplayed,
      testL,
      isGlobal,
      motivation,
      entries
    } = this.props
    if(!isDisplayed) {
      return null;
    }
    if(!isGlobal){
    return (
            <>
            <h2 className='incident blue'>{categoryName}</h2>
            <div className="grid blue">
              <h4 className='incident blue'>&nbsp;</h4>
              <h4 className='frequence blue'>
                { 
                   this.state.transImg.map( x => <div key={x}>{x}</div>)
                }
                </h4>
              <h4 className='comment blue'>Comment</h4>
              <h4 className='motivation blue'>Motivation</h4>
            </div> 
            {
              items.filter( e => (e.idTypeIncidents === categoryId))
              .map( (x,index)  => 
                
                <div className="grid" key={x.id} id={x.id}>
                  <span className="incident">{x.nomIncident}</span>
                  
                  <div className="frequenceBox" id={x.id}>
                    {
                      testL.map( md => 
                      
                          <FrequenceSelect 
                            key={md} 
                            id={md} 
                            onChange={handleChange} 
                            freq={entries[index].frequence}/>
                      )
                    }
                    </div>
                    
                    <CommentInput
                      id={x.id}
                      onChange={handleChange} 
                      entries = {entries}/>
                    
                    <MotivationSelect 
                      id={x.id} 
                      onChange={handleChange} 
                      motiv = {entries[index].motivation}/>

                  </div>
                
              )
            }
        </>
    )
    }
    else{
      return(
        //Global
        <>
          <h2 className='incident blue'>{categoryName}</h2>
          <div className="grid blue">
            <h4 className='incident blue'>&nbsp;</h4>
            <h4 className='Frequence blue'>Frequence</h4>
            <h4 className='comment blue'>Comment</h4>
            <h4 className='motivation blue'>Motivation</h4>
          </div> 
              { 
                items.filter( e => (e.idTypeIncidents === categoryId))
                .map( x  =>
                    <div className="grid" key={x.id} id={x.id}>
                      <div className="incident">{x.nomIncident}</div>
                      <select className="frequence" name="frequence" onChange={handleChange}>
                          <option value={-1}>-1</option>
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                      </select>
                      <input type="text" className="comment" placeholder="comment" name="commentaire" onChange={handleChange}/>
                          
                          <select className="motivation" placeholder="motivation" name="motivation" onChange={handleChange}>
                            <option hidden>motivation</option>
                            {
                              motivation.map(motivation => (
                                <option key={motivation.id} value={motivation.id}>{motivation.choix}</option>
                              ))
                            }
                          </select>
                    </div>
                )
              }
        </>
      )
    }
  
  }
}