import React, {Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import "./Form.css";
import FildsIncidents from '../Incident/Incident';
const url = "http://127.0.0.1:8000/api";

class Form extends Component {

  state = {
    entries: [],
    leng: this.props.location.state.vehiculeSelected,
    Redirect: false,
    rapports: null
  }

 async componentDidMount(){
    
    if(localStorage.getItem("entries")){
      console.log('step1')
      await this.setState({"entries" : JSON.parse(localStorage.getItem("entries"))});
    }

    let res = await axios.get(`${url}/rapports/`)
    let x = await res.data.map(e => 
      e.id)
    let y = x.slice(-1).pop()
    this.setState({
      rapports: y
    })
      // .catch((err) => {
      //   console.log("AXIOS ERROR: ", err);
      // })
}

  getLngIncidents = l => {
    this.count = 1;
    this.incids = []
    this.trans = this.props.location.state.vehiculeSelected;
    while (this.count < l + 1) {
      this.transCount = 0;
      while (this.transCount < this.trans.length) {
        this.incids.push({
          idIncidents: this.count,
          frequence: null,
          commentaire: "",
          motivation: 1,
          idRapport: 1,
          userId: 'uitp@uitp.com',
          idTransport: Number(this.trans[this.transCount])
        });
        this.transCount++;
     }
     this.count++;
    }
    //local Storage
    if(!localStorage.getItem('entries')){
      console.log('do it once')
      localStorage.setItem("entries", JSON.stringify(this.incids))
    }
    //State
    this.setState({
      entries: this.incids,
      length : this.props.location.state.vehiculeSelected,
      isGlobal: this.props.location.state.is_global
    })

  }

  handelInput = (e) => {
    if (this.state.isGlobal) {
      const incidId = (e.target.parentElement.id);
      const inputName = e.target.name;
      const inputValue = e.target.value;
      const elems = this.state.entries.filter(x => x.idIncidents === Number(incidId))
      this.count = 0;
      this.trans = this.props.location.state.vehiculeSelected;
      while (this.count < this.trans.length) {
        elems[this.count][inputName] = Number(inputValue);
        this.setState({elems},()=>{localStorage.setItem('entries',JSON.stringify(this.state.entries))});
        this.count++
      }
    }
    else{
      if(e.target.className === 'frequence'){
        const incidId = (e.target.parentElement.id);
        const Idtrans = (e.target.id);
        const inputValue = e.target.value;
        console.log("test","id incid : ",incidId, "id trans: ",Idtrans, "input value : ",inputValue)
        const elems = this.state.entries.filter(x => x.idIncidents === Number(incidId) && x.idTransport === Number(Idtrans))
        elems[0].frequence = Number(inputValue);
        this.setState({elems},()=>{localStorage.setItem('entries',JSON.stringify(this.state.entries))});
      }
      else{
        const incidId = (e.target.parentElement.id);
        const inputName = e.target.name;
        const inputValue = e.target.value;
        const elems = this.state.entries.filter(x => x.idIncidents === Number(incidId))
        this.count = 0;
        this.trans = this.props.location.state.vehiculeSelected;
        while (this.count < this.trans.length) {
          elems[this.count][inputName] = inputValue;
          this.setState({elems},()=>{localStorage.setItem('entries',JSON.stringify(this.state.entries))});
          this.count++
        }
      }
      
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
      if (this.state.boolean === false){ 

        const validation = Swal.mixin({
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
        })

        validation.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          showLoaderOnConfirm: true,
          reverseButtons: true,

        })

      .then((result) => {
        Swal.fire({ type: 'warning', title: 'Wait',
                    showConfirmButton: false,})
         if (result.value) {
         axios
          .post('http://127.0.0.1:8000/api/detail/', this.state.entries)
           .then((response) => {
              console.log(response)
            
              validation.fire({
                    title:'Your Form was sent.',
                    text:'Click Ok to continue.',
                  type:'success',

                })
                    this.setState({ Redirect: true,
                 })

        })
        .catch(function (error) {
              Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Something went wrong.',
                  })
              console.log(error);
            })
              axios
           .patch(`http://127.0.0.1:8000/api/rapports/${this.state.rapports}/`,{
              is_Done: true,  
            })
            .then(function (response) {
              console.log(response +"eeee");
            })
            .catch(function (error) {
              console.log(error);
            });}
          else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            validation.fire(
              'Cancelled',
            )
          }
        }) }
      else {Swal.fire({
  type: 'error',
  title: 'Forbidden',
  text: 'Formular already sent',
    })}
  }

  render() {
    if(!this.state.rapports){
      return (<div>Loading...</div>)
    }
    return ( 
      <form className='form-container'>
      <FildsIncidents
      entries = {this.state.entries}
      testL = {this.state.leng}
      isGlobal = {this.state.isGlobal}
      inputHandel = {this.handelInput}
      getLngIncidents = {this.getLngIncidents}
      onSubmit = {this.onSubmit}
      /> 
      </form>
    );
  }
}

export default Form;