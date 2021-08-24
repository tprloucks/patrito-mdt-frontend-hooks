import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import ("./Home.css")
export class Home extends Component {
  render() {
    return (
      
      <div style={{ textAlign: "center", marginTop: "15%", fontSize: 15 }}>
        <div class="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
  WARNING
</div>
<div>
  <p style={{color:"white"}}>
  "This system is for the use of authorized users only. 
      Individuals using this computer system without
      authority, or in excess of their authority, are subject
      to having all of their activities on this system
      monitored and recorded by system personnel.  In the
      course of monitoring individuals improperly using this
      system, or in the course of system maintenance, the
      activities of authorized users may also be monitored. 
      Anyone using this system expressly consents to such
      monitoring and is advised that if such monitoring
      reveals possible evidence of criminal activity, system
      personnel may provide the evidence of such monitoring
      to law enforcement officials."
  </p>
  <br />
  <br />
  <br />
  <button>
  <NavLink to="/login" style={{color:"black"}}>Accept</NavLink>
  </button>
</div>
      </div>
      
    );
  }
}
export default Home;