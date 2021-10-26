//import "./styles.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import { useState, useEffect} from "react";
import greenmarkericon from "./images/green_marker_icon.png"
export default function MarkerIcon(props) {
  const LeafIcon = L.Icon.extend({
    options: {}
  });

  
  
  useEffect(() => {
    
    console.log(props.r)
  })
  return (<Marker position={props.region.position}
   
  
  
  >
    <Popup>
   Αεροδρόμιο: 
      <pre>{JSON.stringify(props.region.position, null, 2)}</pre>
      <pre style={{whiteSpace:"initial"}}> {props.region.code}</pre>
      <pre style={{whiteSpace:"initial"}}> {props.region.name}</pre>
   </Popup>
    </Marker>)
  
 /* return
    (
      props.itype==0?(<Marker position={props.position} icon={greenIcon}>
      <Popup>
      Eπιλεγμένο αεροδρόμιο: 
        <pre>{JSON.stringify(props.region.position, null, 2)}</pre>
        <pre style={{whiteSpace:"initial"}}> {props.region.code}</pre>
        <pre style={{whiteSpace:"initial"}}> {props.region.name}</pre>
     </Popup>
      </Marker>):
      (<Marker position={props.position} icon={blueIcon}>
        <Popup>
        Aεροδρόμιο: 
          <pre>{JSON.stringify(props.region.position, null, 2)}</pre>
          <pre style={{whiteSpace:"initial"}}> {props.region.code}</pre>
          <pre style={{whiteSpace:"initial"}}> {props.region.name}</pre>
       </Popup>
        </Marker>)

    )*/
 /* return (
    {

        props.itype==0?
    
        <Marker position={props.position} icon={greenIcon}>
        <Popup>
        Eπιλεγμένο αεροδρόμιο: 
          <pre>{JSON.stringify(props.selected_region.position, null, 2)}</pre>
          <pre style={{whiteSpace:"initial"}}> {props.selected_region.code}</pre>
          <pre style={{whiteSpace:"initial"}}> {props.selected_region.name}</pre>
       </Popup>
        </Marker>:
        <Marker position={props.position} icon={blueIcon}>
        <Popup>
        Aεροδρόμιο: 
          <pre>{JSON.stringify(props.region.position, null, 2)}</pre>
          <pre style={{whiteSpace:"initial"}}> {props.region.code}</pre>
          <pre style={{whiteSpace:"initial"}}> {props.region.name}</pre>
       </Popup>
        </Marker>
     
  );*/
}
