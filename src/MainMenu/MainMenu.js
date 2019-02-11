import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './MainMenu.css'
import Swal from 'sweetalert2'

class MainMenu extends Component{
   state ={
        categories: [
             {
                 id: 1,
                 name:"Form",
                 image: "/img/form.svg",
                 url:"/mode-trans"
              
             },
             {
                id: 2,
                name:"Historic",
                image: "/img/historic.svg",
                url:"/"
            },
            {
                id: 3,
                name:"Logout",
                image: "/img/logout.svg",
                url:"/"
            }
        ]
    }




    render(){

        return(
            <div>
            <div className="categorie-container">
            <div className="row">
            {this.state.categories.map(cat =>{
                return (
                    <Categories 
                    key={cat.id}
                    name={cat.name} 
                    image={cat.image}
                    url= {cat.url}
                    />
                )
            })}
            </div>
            </div>
            </div>
        )
    }

}
class Categories extends Component{

            logout = () => {
            Swal.fire({
              title: 'Are you sure?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            }).then((result) => {
              if (result.value) {
                Swal.fire(
                  '',
                  'Your are logout',
                  'success'
                )
              }
            })}

    render(){

      
        return(
            <React.Fragment>
            
             <div className="categorie-block">
          <div
            className={`categorie-icon`}
          >
           <Link to={{
              pathname: `${this.props.url}`,
              state: { categories: this.props.name}}}> 
            <img src={this.props.image}  alt={`${this.props.name} Categorie`} /></Link>
          </div>
          <p>
             <b>{this.props.name}</b>
      {/*       <div onClick={this.logout}> Logout</div>*/}
          </p>
        </div>
                       <section>
                   
                </section>
      
            </React.Fragment>
        )
    }
}

export default MainMenu;