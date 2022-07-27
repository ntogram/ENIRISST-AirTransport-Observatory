import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DisplayData from './DisplayData';
import data1 from './data/dedomena_prosforas.json'
import data2 from './data/data_leitourgias.json'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CallReceivedTwoTone } from '@material-ui/icons';







const useStyles = makeStyles((theme) => ({
  form_root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      
      
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    flexbox_container:{
      display: "flex",
      flexDirection:"row"
    },
   


  },
}));

export default function FormTab (props) {
  const classes = useStyles();
  
  //change with nuts
  const [regionLst,setregionLst]=React.useState([]);  
  const other_airports={
    "ATH":{
      "name":"Διεθνής Αερολιμένας ΑΘηνών «Ελευθέριος Βενιζέλος»",
      "position":[37.935162926,23.93999624],
    },
    
    "LGW":{
        "name":"Διεθνές Αεροδρόμιο Γκάτγουικ",
        "position":[51.1398994404,-0.1580327012]

    },
    "EDI":{
      "name":"Αεροδρόμιο του Εδιμβούργου",
      "position":[55.9499962,-3.370165186]
    },
    
    
    "SKG":{"name":"Διεθνής Κρατικός Αερολιμένας Θεσσαλονίκης «Μακεδονία»",
    "position":[40.524204, 22.976887]}

}



  
  const previndexRef = React.useRef()
  const [init,setinit]=React.useState(false)
  const [selected_region,setRegion]=React.useState("");
  const [error_val,setErrorVal]=React.useState(false)
  const [submitted,setSubmited]=React.useState(false)
  const [table_data,setTableData]=React.useState([]);
  const [group_data,setGroupData]=React.useState([]);
  const [c,setc]=React.useState(false)
  
  const handleChangeRegion = (event, newValue) => {
    console.log("changed")
    console.log(newValue)
    setRegion(newValue);
    setErrorVal(false)
    setSubmited(false)
    props.setregionprovider("box")
    const d1=data1["Αεροδρόμια"]
        let received = d1.filter(function (r) {
          return r["Επίσημη Ονομασία Αεροδρομίου"] === newValue 
        });
       // console.log(received)
        let response=[]
        for (const [key, value] of Object.entries(received[0])) {
            response.push({"name":key,"value":value})
        }
       // console.log(response)
        props.setRegion({"code":received[0]["ΙΑΤΑ"],"name":received[0]["Επίσημη Ονομασία Αεροδρομίου"]
            ,"position":[received[0]["Πλάτος_Latitude"],received[0]["Μήκος_Longtitude"]]
      
      })



   // props.setRegion({})
    props.setConnections([])
   
   
  }


  

  const ClearForm=()=>{
   setRegion("")
   setErrorVal(false) 
   setSubmited(false)
   props.setregionprovider("box")
   props.setRegion({})
   props.setConnections([])

  }
  const SubmitForm=()=>{
   
   
    let s=0
    
    if (selected_region===""){
      setErrorVal(true) 
      s=s+1
    }
    else{
      setErrorVal(false) 
    }
    if (s==0){
      setSubmited(true)
     // console.log(selected_region)
     // console.log(year_range)
      const d1=data1["Αεροδρόμια"]
        let received = d1.filter(function (r) {
          return r["Επίσημη Ονομασία Αεροδρομίου"] === selected_region 
        });
        console.log("S1")
        console.log(received)
        if (received.length!=0){
          let groupresponse=[
            {"name":"Βασικές Πληροφορίες","propvalues":[]},
            {"name":"Τεχνικές Πληροφορίες","propvalues":[]}
          ]
          let response=[]
          let basic_fields=["Επίσημη Ονομασία Αεροδρομίου","Περιοχή / Τοποθεσία","ΙΑΤΑ","Φορείς Διαχείρισης Αεροδρομίων","Περιφέρεια","ΧΑΡΑΚΤΗΡΙΣΜΟΣ ΒΑΣΕΙ ΠΕΡΙΟΧΗΣ ΕΞΥΠΗΡΕΤΗΣΗΣ", "Αριθμός Διαδρόμων","Κωδικός Διαδρόμου","Μήκος διαδρόμου", "Πλάτος διαδρόμου","Πλήθος θέσεων στάθμευσης αεροσκαφών", "Επιφάνεια Κτιριακών Εγκαταστάσεων (τ.μ.)"]
          for (const [key, value] of Object.entries(received[0])) {
            if (basic_fields.includes(key)===true){    
              if(basic_fields.indexOf(key)<6){
                groupresponse[0]["propvalues"].push({"name":key,"value":value})
              }
              else{
                groupresponse[1]["propvalues"].push({"name":key,"value":value})
              }

            response.push({"name":key,"value":value})}
        }
       
        
      

       // console.log(response)
       /* props.setRegion({"code":received[0]["ΙΑΤΑ"],"name":received[0]["Επίσημη Ονομασία Αεροδρομίου"]
            ,"position":[received[0]["Πλάτος_Latitude"],received[0]["Μήκος_Longtitude"]]
      
      })*/
     // console.log("S2")
      setTableData(response)
      setGroupData(groupresponse)
     // console.log("s3")
     
      const d2=data2["Πτήσεις"]
      let code=received[0]["ΙΑΤΑ"]
      console.log("Flights")
       
      received= d2.filter(function (r) {
        return r["Αεροδρόμιο Κωδικός"] === code || r['Α/Δ Προέλευσης']===code || r["Α/Δ Προορισμού"]===code
      });
      console.log("--log--")
      //console.log(received) 
      let connected_airports=[]
      
      for(let i=0;i<received.length;i++){
        if (received[i]["Αεροδρόμιο Κωδικός"]===code){
          connected_airports.push({"name":received[i]["Α/Δ Προέλευσης"],"status":"E"})
          connected_airports.push({"name":received[i]["Α/Δ Προορισμού"],"status":"S"})

         // connected_airports.push(received[i]["Α/Δ Προέλευσης"])
        //  connected_airports.push(received[i]["Α/Δ Προορισμού"])
      }
          else {
              
              if (received[i]["Α/Δ Προέλευσης"]===code){
                connected_airports.push({"name":received[i]["Αεροδρόμιο Κωδικός"],"status":"S"})
               // connected_airports.push(received[i]["Αεροδρόμιο Κωδικός"])

              /*  if (received[i]["Α/Δ Προορισμού"]!==received[i]["Α/Δ Προέλευσης"]){
                  connected_airports.push(received[i]["Α/Δ Προορισμού"])
                }*/
              }
              else{
                if (received[i]["Α/Δ Προορισμού"]===code){
                  connected_airports.push({"name":received[i]["Αεροδρόμιο Κωδικός"],"status":"E"})
                  //connected_airports.push(received[i]["Αεροδρόμιο Κωδικός"])
                 /* if (received[i]["Α/Δ Προορισμού"]!==received[i]["Α/Δ Προέλευσης"]){
                    connected_airports.push(received[i]["Α/Δ Προορισμού"])
                  }*/
                }    
              }
  
          }  

      }
      console.log("Export Connections")
      let all_connected_airports=connected_airports
      connected_airports=[]
      all_connected_airports.filter(function(item){
        var i = connected_airports.findIndex(x => (x.name == item.name && x.status == item.status));
        if(i <= -1){
          connected_airports.push(item);
        }
        return null;
      });
     // console.log(resArr)
      //connected_airports = connected_airports.filter((x, i, a) => a.indexOf(x) === i)
      console.log(connected_airports)
      console.log(d1)
      let connections=[]
      //let airport=""
      let airport=null
      console.log(connected_airports.length)
      for (let j=0;j<connected_airports.length;j++){
        airport=connected_airports[j]
        console.log(j)
        console.log(airport)
        received = d1.filter(function (r) {
                //console.log("inside")
               // console.log(airport)
          return r["ΙΑΤΑ"] ===airport.name
        });
        console.log("filter")
        console.log(received)
       if (received.length>0){
        console.log("filter1")
         console.log(airport)
        connections.push({"code":received[0]["ΙΑΤΑ"],"name":received[0]["Επίσημη Ονομασία Αεροδρομίου"]
        ,"position":[received[0]["Πλάτος_Latitude"],received[0]["Μήκος_Longtitude"]],"status":airport.status

  
                     })
              }
          else{
            console.log("filter2")
            //console.log(connected_airports[j])
            //console.log(other_airports[])
           connections.push({"code":connected_airports[j].name,"name":other_airports[connected_airports[j].name]["name"]
        ,"position":other_airports[connected_airports[j].name]["position"],"status":airport.status

  
                     })}

                }
                console.log("dep")
                console.log(connections)   
                props.setConnections(connections)
        }
              else{
                setTableData([])
                setGroupData([])
              }
              }

      //console.log(connections)
      



      

     
    
    else{
      setSubmited(false)
    }

      console.log("end")
  }

  React.useEffect(() => {
   //console.log("FormTab")
  //  console.log(props)


    if (init===false){
      let airdata=[]
      for (const [index, element] of data1["Αεροδρόμια"].entries()){ 
        {
         // console.log(element)
          airdata.push({"code":element["ΙΑΤΑ"],"name":element["Επίσημη Ονομασία Αεροδρομίου"],
          "position":
          [element["Πλάτος_Latitude"],element["Μήκος_Longtitude"]]
        })   
      } 
    }
    for(let key in other_airports){
      airdata.push ({"code":key,
      "name":other_airports[key]["name"],
     "position":[other_airports[key]["position"][0],other_airports[key]["position"][1]]
     })
    }

    props.setallairports(airdata)
    setinit(true)
  }






  if (regionLst.length===0){
        const d1=data1["Αεροδρόμια"]
        let rst=[]
        for (const [index, element] of d1.entries()){ 
              rst.push(element["Επίσημη Ονομασία Αεροδρομίου"])

        }
        setregionLst(rst)
  }
  //console.log("change region")
  //console.log(props.regionprovider)
  //console.log(props.selected_region)
  //console.log(selected_region)
  if (props.regionprovider==="map" && selected_region!==props.selected_region.name){
   // console.log("form")
    props.setConnections([])
    setRegion(props.selected_region.name)
    setErrorVal(false)
    setSubmited(false)
  
  }
  if (previndexRef.current!==props.index){
    ClearForm()
  }

  previndexRef.current=props.index;
  //  setRegion(props.selected_region)
  // console.log(indicatorLst)
    //console.log(submitted)
    //console.log(geoUnit)
    //console.log(category)
   // console.log(indicator)
   // console.log(year_range)
    //console.log(props.selected_region)

//console.log(3)
 }
)





  return (
    <div>
    <form className={classes.form_root} noValidate autoComplete="off">
    
      <Typography style={{letterSpacing:0,minWidth:"30ch"}} align="left" color="primary" gutterBottom>1.Επιλέξτε αεροδρόμιο</Typography>
      <FormControl variant="filled" style={{minWidth: 750}}  required={true}>
     
        
      <Autocomplete
        
      id="combo-box-demo"
      options={regionLst}
      value={selected_region}
      onChange={handleChangeRegion}
      defaultValue={(selected_region===""?"Περιοχή":selected_region)}
     getOptionLabel={(option) => option
    }
    filterSelectedOptions
      style={{ width: 750 }}
      
      disableClearable
      renderInput={(params) => 
       <TextField {...params} label="Περιοχή" 
       
       
       variant="filled" required />}
    />




        <div style={{display:(error_val==true)?"inline":"none"}}>   
        <FormHelperText error={true}>Πρέπει να επιλέξετε αεροδρόμιο</FormHelperText></div>
        </FormControl>     
     
   
        <br/>
        
        
         <div style={{marginTop:"3%",float:"right"}}>  
        <Button style={{marginRight:"3%"}} variant="contained" color="primary" onClick={SubmitForm}>
              ΥΠΟΒΟΛΗ
          </Button>
          <Button variant="contained" color="secondary" onClick={ClearForm}>
        ΑΚΥΡΩΣΗ
      </Button>   
      </div> 
          








          






    </form>
    <br/>
    <div style={{ display:(submitted?"block":"none"),
      
      marginTop:"8%"}}>
    <DisplayData rows={table_data} grouprows={group_data} data_source={"ΕΛΣΤΑΤ"}/>
    </div>
    </div>     

  );
}