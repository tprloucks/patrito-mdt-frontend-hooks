import React, { Component } from 'react'
import axios from 'axios'
import "../CurrentCallsTable/CurrentCallsTable.css"
import Draggable from 'react-draggable'
import { Button } from '@material-ui/core';
export class officer extends Component {
    state = {
        officerArray:[],
        lastName:"",
        badge:"",
        beat:"",
        status:""
    }
async componentDidMount(){
    axios.get("http://localhost:3001/api/officer/get-all-officer")
        .then(response =>{
            if(response.status === 200 && response !=null){
                this.setState({
                    officerArray:response.data.payload
                })
                console.log(response.data.payload);
            }else{
                console.log("Dallas we got a problem");
            }
        })
        .catch(error=>{
            console.log(error);
        })
}
handleOfficerOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
     
    });
  };
handleOnSubmit= async (event)=>{
    event.preventDefault()
    try {
        let userInputObj= {
            badge:this.state.badge,
            lastName:this.state.lastName,
            beat:this.state.beat,
            status:this.state.status
        }
        let success = await axios.post("http://localhost:3001/api/officer/create-officer", userInputObj)
        console.log(success);
        let newArray = [
            ...this.state.officerArray, success.data.payload
        ]
        this.setState({
            officerArray:newArray
        })
        ;
    } catch (error) {
        console.log(error);
    }
}
handleDeleteByID = async(_id)=>{
    console.log("clicked");
    

    try {
        let deletedOfficer = await axios.delete(`http://localhost:3001/api/officer/delete-by-id/${_id}`)
        
        let filteredArray = this.state.officerArray.filter(
            (item)=> item._id !== deletedOfficer.data.payload._id
            
        )
        this.setState({
            officerArray:filteredArray,
        })
        
    } catch (error) {
        console.log(error);
    }
}

render() {
    
    return (
       
        <div>
          <div>
          <div>
            <Draggable>
                <form onSubmit={this.handleOnSubmit}>
                    <h1>Add Officer</h1>
                    <input type="text"
                    id="lastName"
                    // value={lastName}
                    name="lastName" 
                    onChange={this.handleOfficerOnChange}
                    placeholder="Last Name"/>

                    <input type="text"
                    id="badge"
                    // value={badge}
                    name="badge"
                    onChange={this.handleOfficerOnChange}  
                    placeholder="Badge Number"/>

                    <input type="text" 
                    id="beat"
                    // value={beat}
                    name="beat" 
                    onChange={this.handleOfficerOnChange}  
                    placeholder="Beat"/>

                    <input type="text"
                    id="status" 
                    // value={status}
                    name="status" 
                    onChange={this.handleOfficerOnChange}  
                    placeholder="Status"/>

                    <Button variant="outlined" type="submit">Search</Button>
                </form>
            </Draggable>
        </div>
           <Draggable>
             
               
              <table className="container">
              <thead>
             
                <tr>
                  <th><h1>Name</h1></th>
                  <th><h1>Badge</h1></th>
                  <th><h1>Beat</h1></th>
                  <th><h1>Status</h1></th>
                  <th><h1>Actions</h1></th>

                </tr>
              </thead>
             
              <tbody>
              {this.state.officerArray.map((officer)=>{
             return(
            <tr key={officer}>
              <td>{officer.lastName}</td>
              <td>{officer.badge}</td>
              <td>{officer.beat}</td>
              <td>{officer.status}</td>
              
              <td><button onClick={() => this.handleDeleteByID(officer._id)}>Delete</button></td>
        
  
            </tr>
             )
             })}
           </tbody>
              <div>
              
              
        
          
            
           
        
        </div>
        
        </table>
        
        </Draggable>
        
             )
            
          
          </div>
          </div>
        
      
      
    )
            }
}

export default officer
