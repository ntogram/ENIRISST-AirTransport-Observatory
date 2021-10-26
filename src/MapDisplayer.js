import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import{ useState, useEffect,useRef} from 'react';
import ReactDOM from 'react-dom';
import {MapContainer, TileLayer, Popup, Marker, useMapEvents,MapConsumer,LayersControl,CircleMarker,Circle,LayerGroup} from "react-leaflet";
import FormTab from './FormTab';
import mapfeatures from './NUTS3/greekregionsr.json'
//import * as L from "leaflet";
import MarkerIcon from './MarkerIcon';
import L from 'leaflet'  // import { curve, Curve } from 'leaflet'; // for TypeScript
import '@elfalem/leaflet-curve'
import { ColorLensOutlined } from '@material-ui/icons';
//helping functions
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => arraysEqual(object[key],value))
}



function MyCircleMarker(props) {
  const [position, setPosition] = useState(props.pos)
  const [name, setName] = useState(props.region_name)
  const [code, setcode] = useState(props.code)
//  const [pathoptions,setPathOptions]=useState({ color: 'orange', fillColor: 'blue' })
 // const [czoom,setczoom]=useState(6)
  /* const map = useMapEvents({
     click(event) {
         console.log("locate")
         let r=getKeyByValue(props.regions,event.latlng)
         console.log(r)
         
           console.log(event.latlng)
           setPosition(event.latlng)
          // map.flyTo(event.latlng, 13)
         
          // setczoom(14)
       
 
        // console.log(props.status)
 
 
     }
     })
   
      useEffect(() => {   
       console.log("1")
      /* let popuel=document.getElementsByClassName("leaflet-marker-icon leaflet-zoom-animated leaflet-interactive")
       console.log(popuel)
       if (popuel.length!=0){
       popuel[0].click()}*/
     
   
 //     }); 
 
 useEffect(() => {   
       // console.log(pathoptions)
       /* if (props.r!=props.region_name){
          setPathOptions({ color: 'orange', fillColor: 'blue' })
        }*/

      }); 
     
  
   
 
     return  <CircleMarker
     center={position}
     pathOptions={(props.r!=props.region_name)? { color: 'orange', fillColor: 'blue' }:{ color: 'yellow', fillColor: 'red' }}
     radius={8}
     eventHandlers={{
      click: (e) => {
        console.log('marker clicked', e)
       // setPathOptions({ color: 'yellow', fillColor: 'darkgreen' })
        props.SendRegion(name,code,position)
      },
    }}  
>
 
 </CircleMarker>
 
 //}
   
 }


function LocationMarker(props) {
 const [position, setPosition] = useState([37.983810, 23.727539])
 const [rtype,setRtype]=useState("Region")
 const prevrtype = useRef();
// const [czoom,setczoom]=useState(6)
  const map = useMapEvents({
    click(event) {
        console.log("locate")
        console.log(props.status)
        console.log(props.rstatus)
        console.log(rtype)

        if (props.status==true &&props.rstatus==false){
          console.log(event.latlng)
          setPosition(event.latlng)
          map.flyTo(event.latlng, 13)
          setRtype("Point")
         // setczoom(14)
        }
        else{
          if (props.status==false &&props.rstatus==true){
            console.log(event.latlng)
            setPosition(event.latlng)
            map.flyTo(event.latlng, 8)
            setRtype("Region")
          }
          else{
          //setPosition(null)
          console.log("NO")}
        }

       // console.log(props.status)


    }
    })
  
     useEffect(() => {   
      console.log("1")
      let popuel=document.getElementsByClassName("leaflet-marker-icon leaflet-zoom-animated leaflet-interactive")
      console.log(popuel)
      if (popuel.length!=0){
      popuel[0].click()}
     // if (prevrtype.current=="Point"&& props.){
       // setRtype(rtype)
     // }
     // setRtype(null) 
    console.log(prevrtype.current)
    console.log(rtype)
    console.log(props.status)
     console.log(props.rstatus)
      prevrtype.current=rtype
     



     /* if (czoom==6){
        map.flyTo(event.latlng, 14)
        setczoom(14)
      }*/
  
     }); 


    if(rtype=="Point"){

  return <Marker  position={position}>
  <Popup position={position}>
           Current location: <pre>{JSON.stringify(position, null, 2)}</pre>
         </Popup>
  </Marker>}
  else{
  //  if(rtype=="Region"){

    return  <CircleMarker
    center={position}
    pathOptions={{ color: 'orange', fillColor: 'blue' }}
    radius={5}
>
<Popup position={position}>
           Current location: 
           <pre>{JSON.stringify(position, null, 2)}</pre>
          

         </Popup>
</CircleMarker>

//}
  }
}





//const LocationMarker = props => {


  /*const map = useMapEvents({
    click(event) {
      console.log(props.layer_name)
      //map.locate()
     // console.log(event.latlng)
     // const { lat, lng } = event.latlng;
     // setPosition(event.latlng)
     // map.flyTo(event.latlng, 12)
      //map.
      
      }
    })


   // console.log(props.layer_name)



  return props.position === null ? null : (
    <Marker  position={props.position} {...props}>
     <Popup  position={props.position}>
              Current location: <pre>{JSON.stringify(props.position, null, 2)}</pre>
            </Popup>
    </Marker>
  )

  /*const [position, setPosition] = useState(null)
  const initMarker = ref => {
    if (ref) {
      console.log(ref)
    //  ref.leafletElement.openPopup()
    }
  }



  const map = useMapEvents({
    click(event) {
      //map.locate()
      console.log(event.latlng)
      const { lat, lng } = event.latlng;
      setPosition(event.latlng)
      map.flyTo(event.latlng, 12)
      //map.
      
      }
    })*/
    
    /*locationfound(event) {

      
      map.flyTo(event.latlng, map.getZoom())
    },*/
  
/*  useEffect(() => {   
    console.log("0")
    let popuel=document.getElementsByClassName("leaflet-marker-icon leaflet-zoom-animated leaflet-interactive")
    console.log(popuel)
    if (popuel.length!=0){
    popuel[0].click()}

   });
    
    // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });




  return position === null ? null : (
    <Marker ref={initMarker} position={position} {...props}>
     <Popup  position={position}>
              Current location: <pre>{JSON.stringify(position, null, 2)}</pre>
            </Popup>
    </Marker>
  )

//  return <Marker ref={selectedMarker} {...props}/>*/
//}




/*
function LocationMarker() {
  const [position, setPosition] = useState(null)

  const map = useMapEvents({
    click(event) {
      //map.locate()
      console.log(event.latlng)
      const { lat, lng } = event.latlng;
      setPosition(event.latlng)
      
      
      }
    
    
    /*locationfound(event) {

      
      map.flyTo(event.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker ref={selectedMarker} position={position}>
     <Popup position={position}>
              Current location: <pre>{JSON.stringify(position, null, 2)}</pre>
            </Popup>
    </Marker>
  )
}
*/




class MapDisplayer extends Component {
  constructor(props) {
    super(props);
    


    this.layercontrol = React.createRef();
    this.state = {
      currentPos: null,
      initpos:[37.983810, 23.727539],
      status:false,
      rstatus:true,
      selected_region:"",
      map:null,
      a_connections:[],
      d_connections:[],
     

    




      



    };
    


  
   this.handleClick = this.handleClick.bind(this);
   this.selectRegion = this.selectRegion.bind(this);
   this.calculateCurvePath=this.calculateCurvePath.bind(this)
   this.clearMap = this.clearMap.bind(this);
   this.clearLinks=this.clearLinks.bind(this)
  }



  componentDidMount() {
    

    document.addEventListener('click', this.handleClick);
   
  }
  componentWillUnmount() {
   document.removeEventListener('click', this.handleClick);
  }

  selectRegion(value1,value2,value3){
    if (this.state.map!=null){
      console.log("Clearing")
      console.log(this.props.connections)
      this.clearMap()
    }
    this.setState({selected_region:value1},function(){
        console.log(this.state.selected_region)
    })

    /*for (let i=0;i<this.props.allairports.length;i++){
      allairports_elem.push(<MyCircleMarker r={this.state.selected_region} SendRegion={this.selectRegion}
      pos={this.props.allairports[i].position} region_name={this.props.allairports[i].name}/>) 
     // allairports_elem.push(<MarkerIcon  r={this.props.selected_region.name} SendRegion={this.selectRegion} region={this.props.allairports[i]} itype={1} />)
 
    }*/

    //console.log(value)
    this.props.setRegion({"name":value1,"position":value3,"code":value2})
    this.props.setregionprovider("map")
  }


  componentDidUpdate(prevProps, prevState, snapshot){
   console.log("allagi")
   console.log(this.props)
   console.log(this.state)
   
   //console.log(this.state)
  // console.log(prevState)
 // console.log(this.props.regionprovider)
 // console.log(this.state.selected_region)
  //console.log(this.props.selected_region.name)
  console.log(this.props.connections)
   if (this.props.regionprovider==="box" && this.state.selected_region!=this.props.selected_region.name){
    
       this.clearMap(0)
     
      this.setState({selected_region:this.props.selected_region.name})
   }
  
   if (this.props.connections.length===0 && this.props.regionprovider==="map"){
  
      this.clearMap(0)
    
   }



  let p1=this.props.selected_region
  let p2=prevProps.selected_region
  //console.log(p1)
 // console.log(p2)
  //console.log(this.state.map)
  if (Object.keys(p1).length === 0 && Object.keys(p2).length!==0){
      console.log("clearing")
      
      this.clearMap(0)
  } 
  
 // console.log(this.props.selected_region)
  
  


               
      
  



}



  calculateCurvePath(start,end){
    let startpoint=[parseFloat(start[0]),parseFloat(start[1])]
    let endpoint=[parseFloat(end[0]),parseFloat(end[1])]
    let offsetX=endpoint[1]-startpoint[1]
    let offsetY=endpoint[0]-startpoint[0]
    let r=Math.sqrt( Math.pow(offsetX, 2) + Math.pow(offsetY, 2) )
    let theta = Math.atan2(offsetY, offsetX);
    let thetaOffset=0.314
    let r2 = (0.5*r)/(Math.cos(thetaOffset))
    let theta2=theta + thetaOffset
    let midpointX=(r2 * Math.cos(theta2)) +startpoint[1]
    let midpointY=(r2 * Math.sin(theta2)) + startpoint[0]
    let midpoint=[midpointY,midpointX]
    return ['M',startpoint,
    'Q', midpoint,
    endpoint
   ]
  }
  clearLinks(){
    let options=document.getElementsByClassName("leaflet-control-layers-selector")
    console.log("c1")
    if (options.length==2){
        console.log("c1")
        if (options[0].checked==false && options[1].checked==false){
          console.log("c2")
          this.clearMap(1)
          if (this.state.status===true){
            this.setState({status:false})}
          this.forceUpdate()
        }

    }


  }
  clearMap(c){
    if (this.state.map!=null){
      console.log(this.state.map)
    for(let i in this.state.map._layers){   
      console.log(this.state.map._layers[i])     
        if( this.state.map._layers[i]._path != undefined)
        {
            //console.log(this.state.map._layers[i])
            try{
              if(this.state.map._layers[i].hasOwnProperty("_radius")){
                    continue
              }
              this.state.map.removeLayer( this.state.map._layers[i]);
            }
            catch(e){
                console.log("problem with " + e +  this.state.map._layers[i]);
            }
        }
    }
    if (this.layercontrol.current!==null){
    this.layercontrol.current.remove(this.state.map)
    }
    if (c===0){
      this.layercontrol.current=null
    }
 
  }
}



  handleClick(e) {
   console.log("pr")
   console.log(this.state.map)
   this.clearLinks()
 
  // console.log(e.latlng)
  /* const map = useMapEvents({
    click(event) {
        console.log("locate")
        let r=getKeyByValue(props.regions,event.latlng)
        console.log(r)
        
          console.log(event.latlng)
          setPosition(event.latlng)
         // map.flyTo(event.latlng, 13)
        
         // setczoom(14)
      

       // console.log(props.status)


    }
    })*/




  //  console.log(e.target)
   /* if(e.target.className=="leaflet-control-layers-selector"){
      console.log("alex")
    //console.log(this.layercontrol.current)
    if (this.state.status!=this.layercontrol.current._layerControlInputs[1].checked){
      this.setState({status:this.layercontrol.current._layerControlInputs[1].checked,rstatus:this.layercontrol.current._layerControlInputs[0].checked},function(){
        console.log(this.state.status)
        console.log(this.state.rstatus)
      })
    }}
    else{
      console.log(this.layercontrol.current)
      if(this.state.status=true && this.state.rstatus==false){
        this.layercontrol.current._layerControlInputs[1].checked=true
        this.layercontrol.current._layerControlInputs[0].checked=false
      }
      //console.log(this.state.status)
     // console.log(this.state.rstatus)

    }
   /* if (this.state.rstatus!=this.layercontrol.current._layerControlInputs[0].checked){
      this.setState({rstatus:this.layercontrol.current._layerControlInputs[0].checked},function(){
        console.log(this.state.status)
        console.log(this.state.rstatus)
      }*/
        
        
        
    }
   //
   
 
     // console.log('You clicked INSIDE the component.')
    
 // }

  /*componentDidUpdate(prevProps, prevState, snapshot){
    if (this.state.status!=prevState.status)



  }
  
  
}*/


  render() {
    console.log("render")
    let other_airports=[]
    let airconnections_a=[]
    let airconnections_d=[]
    let curvepath=[]
    let allairports_elem=[]
    if(this.props.allairports!==undefined){
    
    
    // console.log(this.state.selected_region)
    for (let i=0;i<this.props.allairports.length;i++){
      allairports_elem.push(<MyCircleMarker r={this.state.selected_region} SendRegion={this.selectRegion}
      pos={this.props.allairports[i].position} region_name={this.props.allairports[i].name}
      code={this.props.allairports[i].code}
      
      />) 
     // allairports_elem.push(<MarkerIcon  r={this.props.selected_region.name} SendRegion={this.selectRegion} region={this.props.allairports[i]} itype={1} />)
 
    }
   
  }
 // console.log("map")
  console.log(this.props.connections)
  console.log(this.state.map)
  if (this.state.map!==null && this.props.connections.length>0){
   




    let colorl=""
    for (let i=0;i<this.props.connections.length;i++){
          other_airports.push( <MarkerIcon region={this.props.connections[i]} itype={1} />)
         // airconnections.push( <Polyline pathOptions={{ color: 'purple' }} positions={[this.props.selected_region.position,this.props.connections[i].position
          
         // ]} />)
        
          curvepath=this.calculateCurvePath(this.props.selected_region.position,this.props.connections[i].position)
          console.log(i)
          console.log(this.props.selected_region.position)
          console.log(this.props.connections[i].position)
          console.log(curvepath)
   // var path = L.curve(curvepath,
			//		{color:'red',fill:true}).addTo(this.state.map);
              console.log(curvepath)
      /* if(i==0){
        var latlng1 = [23.634501, -102.552783],
            latlng2 = [17.987557, -92.929147];
            curvepath=this.calculateCurvePath(latlng1,latlng2)
            console.log("special")
            console.log(curvepath)
*/
       
        if (this.props.connections[i].status==="S"){
             colorl="red"
         }
        else{
              colorl="blue"
           }

        var p=L.curve(curvepath,{color:colorl,fill:false})
       // var p1=L.curve(curvepath,{color:"blue",fill:false})   
         console.log(p)
          //airconnections.push(p)
        //  console.log("spwo")
          if (colorl=="red"){
                airconnections_d.push(p)
           // console.log(this.departure_layer_group.current)
            //p.addTo(this.departure_layer_group.current)
          }
          else{
            airconnections_a.push(p)
          //  console.log(this.arrival_layer_group.current)
           // p.addTo(this.arrival_layer_group.current)
          }
        //  p1.addTo(this.state.map);
        //  console.log("spwio")
      // }
        
        }
        
        
        var departures= L.layerGroup(airconnections_d)
        var arrivals=L.layerGroup(airconnections_a)
       // departures.addTo(this.state.map)
       // arrivals.addTo(this.state.map)
       
      console.log("boom")
      console.log(airconnections_d)
      console.log(airconnections_a)
      if (this.layercontrol.current===null){
        console.log("ad")
        var overlayMaps = {
          "<span style='color: red'>Αναχωρήσεις</span>": departures.addTo(this.state.map),
          "<span style='color: blue'>Αφίξεις</span>":arrivals.addTo(this.state.map)
      };
        var lc=L.control.layers(null, overlayMaps).addTo(this.state.map);
        console.log(lc)
        this.layercontrol.current=lc
       
       // this.setState({lc:layerscontrol})
      }
      else{
        console.log("rm")
        console.log(this.state.status)
        var overlayMaps = {
          "<span style='color: red'>Αναχωρήσεις</span>": departures,
          "<span style='color: blue'>Αφίξεις</span>":arrivals
      };
        if (this.state.status===true){
          overlayMaps = {
            "<span style='color: red'>Αναχωρήσεις</span>": departures.addTo(this.state.map),
            "<span style='color: blue'>Αφίξεις</span>":arrivals.addTo(this.state.map)
        };
        }
        console.log(this.layercontrol.current)
        this.layercontrol.current.remove(this.state.map)
        var lc=L.control.layers(null, overlayMaps).addTo(this.state.map);
        this.layercontrol.current=lc

      }
     
     
      //console.log("boom1")
     // console.log(options)
    /*  for (let i=0;i<options.length;i++){
        console.log(`boom ${i}`)
        options[i].click()
      }
*/
     
      }
        
        if ((airconnections_a.length>0)||(airconnections_d.length>0)){
          console.log("end_designing")
          if (this.state.status=false){
          this.setState({a_connections:airconnections_a,d_connections:airconnections_d,status:true})
          }
        }

       
        
   // console.log(this.props.selected_region)
  /*   const main_point=[37.7509002686,20,8843002319]

     const other_points=[
          [39.6018981933593,19.9116992950439],
          [39.0567016601562,26.5983009338378],
          [37.0811004639,25.3680992126],
          [35.5317001342773,24.1497001647949]
     ]



     

     let connections=[]
     let other_markers=[]
     for (let i = 0; i <other_points.length; i++) {  
        other_markers.push( <Marker  position={other_points[i]}>
          <Popup position={other_points[i]}>
           Current location: <pre>{JSON.stringify(other_points[i], null, 2)}</pre>
         </Popup>
          </Marker>)
      connections.push([main_point,other_points[i]])
     }
     
     */


     



   /*  const features=mapfeatures["features"]
     let connections=[]
     
     for (let i=0;i<features.length;i++){
       console.log(features[i]["geometry"]['type'])
      connections.push(features[i]["geometry"]["coordinates"])


     }
    // console.log(this.regions)
    // let centers = [];
     //let region_names=[]
     let circlemarkers=[]
     let regional_units=[]
     if (this.props.geoUnit==="NUTS3"){
     const r=this.airports
     const center_names=Object.keys(this.airports)
     for (let i=0;i<connections.length;i++){
       regional_units.push(<Polyline pathOptions={{ color: 'black' }} positions={connections[i]} />)
     }
     for(let i=0;i<center_names.length;i++){
      circlemarkers.push(<MyCircleMarker r={this.state.selected_region} SendRegion={this.selectRegion}
         pos={r[center_names[i]]} region_name={center_names[i]}/>) 
     }
    }
   else{
   //
   if (this.state.selected_region!==""){
     console.log(109)
     this.selectRegion("")
   }
     //this.setState({selected_region:""})
   }*/
     /*Object.keys(r).forEach(function(key) {
      circlemarkers.push(<MyCircleMarker SendRegion={this.selectRegion} pos={r[key]} region_name={key}/>) 
      //centers.push(r[key])
      //region_names.push(key)
  })*/
    /* console.log(regions)
    
     Object.keys(regions).forEach(function(key) {
        
         centers.push(this.regions[key])
     });*/
  //  console.log(connections)




   // console.log(6)
    return (
      
      <MapContainer  style={{ height: '100vh', width: '70%',marginLeft:"5%"}} center={this.state.initpos} zoom={6}
      
      whenCreated={(map) => {
        console.log(map)
        this.setState({map:map})
       }}
      
       whenReady={(map) => {
         console.log("Ready")
        console.log(map)
        //this.setState({map:map})
       }}
      
      >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     

      {allairports_elem}
     {this.props.selected_region.position === undefined ? null : (
      <MarkerIcon region={this.props.selected_region} itype={0} />
  
      )

      }
    {other_airports}
   
    

     {/*  {connections.map((polyline, i) => 
          <Polyline pathOptions={{ color: 'black' }} positions={polyline} />)}*/}


</MapContainer>
         
        
         )



   /* return (
      
        <MapContainer  style={{ height: '100vh', width: '70%',marginLeft:"5%"}} center={this.state.initpos} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        
        <Marker  position={main_point}>
          <Popup position={main_point}>
           Current location: <pre>{JSON.stringify(main_point, null, 2)}</pre>
         </Popup>
          </Marker>
          {other_markers}
          {connections.map((polyline, i) => 
          <Polyline pathOptions={{ color: 'purple' }} positions={polyline} />)}
          
          
          
          





          </MapContainer>
         
        
         )*/
 /*  return (
      <div>
        <MapContainer  style={{ height: '100vh', width: '100wh' }} center={this.state.initpos} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        <LayersControl position="topright" ref={this.layercontrol}>
    
      <LayersControl.BaseLayer checked name="Select region">
      <LocationMarker status={this.state.status} rstatus={this.state.rstatus}/>
     
        
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer  name="Select point">
      <LocationMarker status={this.state.status} rstatus={this.state.rstatus}/>
      </LayersControl.BaseLayer>




      </LayersControl>          

         
        </MapContainer>
      </div>
    )*/
  }
}

export default MapDisplayer;







/*
const MyMarker = props => {

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }

  return <Marker ref={initMarker} {...props}/>
}







function App() {
 // const position = [51.505, -0.09]
 const position = [37.983810, 23.727539]
 const [currentPos, setcurrentPos] = useState(null);
  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]


  const handleClick = (event) => {
    console.log("click")
   // setcurrentPos(event.latlng)
   // getlanguages(type)

  }




  return (
   
      <MapContainer center={position} zoom={6} scrollWheelZoom={true} 
      onClick={handleClick}
      
      
      style={{ height: '100vh', width: '100wh' }}>
    <TileLayer

      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />


  {/*}  {currentPos && <MyMarker position={currentPos}>
            <Popup position={currentPos}>
              Current location: <pre>{JSON.stringify(currentPos, null, 2)}</pre>
            </Popup>
  </MyMarker>}*/
//}
        //  </MapContainer>
    
  //  )
//  }
//
    
  /*  <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>*/
 



   
 /// );
//}

//export default App;
