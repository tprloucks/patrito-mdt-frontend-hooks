import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./Protected.css";
import Map from "../Map/Map";
import PedCheck from "../PedCheck/PedCheck";
import CurrentCallsTable from "../CurrentCallsTable/CurrentCallsTable";
import VehicleCheck from "../VehicleCheck/VehicleCheck";
import Officer from "../Officers/Officer";



function Protected() {
  return (
      <>
    <Map/>
    <PedCheck/>
    <CurrentCallsTable/>
    <VehicleCheck/>
    <Officer/>
    </>
  );
}

export default Protected;


