import React, { Component , useState, useEffect} from 'react'
import axios from 'axios'

import Draggable, {DraggableCore} from 'react-draggable'

import { isEmpty } from 'lodash';
import { Button } from '@material-ui/core';


export class PedCheck extends Component {
   
    state={
        pedArray:[],
        pedInfo:[],
        pedSearchInput:"",
        inputError:"",

    }

    // async componentDidMount(){
      
    //   axios.get(`http://localhost:8080/api/ped/get-by-name?fullName=`)
      
    //     .then(response =>{
          
    //       if(response.status === 200 && response !=null){
            
    //         // this.setState({
    //         //   pedArray:response.data.payload
    //         // })
    //         console.log(response.data);
    //       }else{
    //         console.log("we got a problem houston");
    //       }
    //     })
    //     .catch(error=>{
    //       console.log(error);
    //     })
     
    //   }

    getPedInfo=()=>{
      axios.get(`http://localhost:3001/api/ped/get-by-name?fullName=${this.state.pedSearchInput}`)
        .then((response)=>{
          const data = response.data[0]
          // if (data.warrants.length > 0){
          //   alert("Warrants Found!")
          // }
          this.setState({
            pedArray:data
          })
          if (data.wanted===true){
            alert("Warrants Found!")
          }
          console.log('data has been received!!');
        })
        .catch(()=>{
          alert('Error retrieving data!!')
        })
    }
    
    
    

    handlePedOnChange= (event)=>{
      this.setState({
          pedSearchInput:event.target.value
      })
      
  }
    

    handleOnSubmit= async(event)=>{
      event.preventDefault();
      this.getPedInfo()
     
        
     
    }
  
    render() {
        return (
            
            <div>
              
                <Draggable>
                    <form onSubmit={this.handleOnSubmit}>
                        <h1>Persons Check</h1>
                        <input 
                        color="green"
                        type="text" 
                        name="pedInput"
                        onChange={this.handlePedOnChange}
                        
                        placeholder="Full Name"/>
                        
                        <Button variant="outlined" type="submit">Search</Button>
                        <br />
                       
                       
                        <div>
                        <h1><p> {this.state.pedArray.fullName}</p> </h1>
                        DOB: <h1><p> {this.state.pedArray.DOB}</p> </h1>
                        Address: <h1><p> {this.state.pedArray.address}</p> </h1>
                        Status: <h1><p> {this.state.pedArray.license}</p> </h1>
                        Warrants: <h1><p> {this.state.pedArray.warrants}</p> </h1>
                        
                          <br />
                          
                          <br />
                          {/* Address:<h1> <p> {this.state.pedArray.address}</p> </h1>
                          <br />
                          Warrants: <h1><p> {this.state.pedArray.warrants}</p> </h1> */}

                          
                            ***********click to drag***********

                            {/* {this.state.pedArray.map((ped, index)=>{
                                return(
                                    <div key={ped}>
                                      {ped.lastName}, {ped.firstName}
                                    </div>
                                )
                            })} */}
                        </div>
                    </form>
                </Draggable>
               
            </div>
        )
    }
}

export default PedCheck
