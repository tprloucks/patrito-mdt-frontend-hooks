import React, { Component } from 'react'
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import Axios from '../../lib/Axios';
import { Button } from '@material-ui/core';



export class VehicleCheck extends Component {

    state={
        vehicleSearchInput:"",
        vehicleArray:[]
    }
getVehicleInfo=()=>{
    Axios.get(`/vehicle/get-by-plate?plate=${this.state.vehicleSearchInput}`)
        .then((response)=>{
            const data = response.data[0]

            this.setState({
                vehicleArray:data
            })
            if (data.insurance === false){
                alert("No insurance found!")
            }
            console.log('data received');
        })
        .catch(()=>{
            alert('Error retrieving data!!')
        })
}

handleVehicleOnChange = (event)=>{
    this.setState({
        vehicleSearchInput:event.target.value
    })
}

handleOnSubmit= async(event)=>{
    event.preventDefault();
    this.getVehicleInfo()
   
      
   
  }

    render() {
        return (
            <div>
                <Draggable>
                    <form onSubmit={this.handleOnSubmit}>
                        <h1>Vehicle Check</h1>
                        <input type="text"
                        color="green"
                        placeholder="License Plate#"
                        name="vehicleInput"
                        onChange={this.handleVehicleOnChange}
                       /> 
                       <Button variant="outlined" type="submit">Search</Button>
                       <div>
                        <h1><p> {this.state.vehicleArray.plate}</p> </h1>
                        Make: <h1><p> {this.state.vehicleArray.make}</p> </h1>
                        Model: <h1><p> {this.state.vehicleArray.model}</p> </h1>
                        Color: <h1><p> {this.state.vehicleArray.color}</p> </h1>
                        Insurance Status: <h1><p> {this.state.vehicleArray.insurance}</p> </h1>
                          <br />
                          
                          <br />
                        ***********click to drag***********
                        </div>
                    </form>
                </Draggable>
            </div>
        )
    }
}

export default VehicleCheck
