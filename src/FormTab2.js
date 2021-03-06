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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import PropTypes from 'prop-types';
import {TabPanel,a11yProps} from './Header'





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
    subtabs:{
      display:"block"
    },


  },
}));

export default function FormTab2 (props) {
  const classes = useStyles();
  const [timegroup,setTimeGroup]=React.useState("")
  const [startdDate, handleStartDateChange] = React.useState(new Date());
  const [endDate, handleEndDateChange] = React.useState(new Date());
  const [analysis_choice,setAnalysisChoice]=React.useState("")
  const [errors,setErrors]=React.useState([false,false])
  const previndexRef = React.useRef()
  const [l1, setl1] = React.useState(false);
  const [tabvalue1,setTabValue1]=React.useState(0)
  const [submitted,setSubmited]=React.useState(false)
  const StartDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <Button variant="contained" onClick={onClick} ref={ref}>{value}</Button>
    
    
  ));
  const EndDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <Button variant="contained" onClick={onClick} ref={ref}>{value}</Button>    
  ));

  


  const handleTab1Change =(event,newValue)=>{
    setTabValue1(newValue)
   }  
  
  const handleChangeTimeGroup = (event) => {
    setTimeGroup(event.target.value);
    let ers=errors
    ers[0]=false
    setErrors(ers)
  }
  
  const handleAnalysisChoice = (event) => {
    setAnalysisChoice(event.target.value);
    let ers=errors
    ers[1]=false
    setErrors(ers)
  }

 

  const ClearForm=()=>{
    setTimeGroup("")
    setAnalysisChoice("");
    handleStartDateChange(new Date())
    handleEndDateChange(new Date())
    setErrors([false,false])
    setSubmited(false)
  

  }
  const SubmitForm=()=>{
   
   
    let s=0
    let ers=[]
    if (timegroup===""){
        ers.push(true)
        s=s+1
      }
      else{
        ers.push(false)
      }
      if (analysis_choice===""){
        ers.push(true)
        s=s+1
      }
      else{
        ers.push(false)
      }


    if (s==0){
      console.log(timegroup)
      console.log(startdDate)
      console.log(endDate)
      console.log(analysis_choice)
      setSubmited(true)

      

     
    }
    else{
      setSubmited(false)
    }

    setErrors(ers)
  }

  React.useEffect(() => {
   console.log("FormTab")
    console.log(props)
  if (previndexRef.current!==props.index){
    ClearForm()
  }

  previndexRef.current=props.index;
  
 }
)





  return (
    <div style={{display:"flex"}}>

    <form className={classes.form_root} noValidate autoComplete="off">
    
      <Typography style={{letterSpacing:0,minWidth:"40ch"}} align="left" color="primary" gutterBottom>1.???????????????? ?????????????? ??????????????????:</Typography>
      <FormControl variant="filled" style={{minWidth: 300}}  required={true}>
      <InputLabel id="demo-simple-select-filled-label">?????????????? ??????????????????</InputLabel>
      <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={timegroup}
          onChange={handleChangeTimeGroup}
          autoWidth={true}
        
        >


          <MenuItem disabled={true} value="">
            <em>?????????????? ??????????????????</em>
          </MenuItem>
          <MenuItem value={"????????"}>????????</MenuItem>
          <MenuItem value={"??????????"}>??????????</MenuItem>
          <MenuItem value={"??????????"}>??????????</MenuItem>
        </Select>
     




        <div style={{display:(errors[0]==true)?"inline":"none"}}>   
        <FormHelperText error={true}>???????????? ???? ?????????????????? ?????????????? ??????????????????</FormHelperText></div>
        </FormControl>     
     
      <br/>
      <Typography style={{letterSpacing:0,minWidth:"40ch"}} align="left" color="primary" gutterBottom>2.A????:</Typography>
      <FormControl variant="filled" style={{minWidth: 300}}  required={true}>
      <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={startdDate}
      onChange={(date) =>{ 
        handleStartDateChange(date)
        handleEndDateChange(date)
      }
      }
      customInput={<StartDateInput />}
      calendarClassName="calendarcolor"
      onCalendarOpen={
        ()=>{
            setl1(true)

        }

      }

      onCalendarClose={
        ()=>{
          setl1(false)
        }
      }

    />

    </FormControl>
        <br/>
        <Typography style={{letterSpacing:0,minWidth:"40ch"}} align="left" color="primary" gutterBottom>3.??????????:</Typography>
      <FormControl variant="filled" style={{minWidth: 300}}  required={true}>
      <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={endDate}
      onChange={(date) => handleEndDateChange(date)}
      minDate={startdDate}
      customInput={<EndDateInput />}
      calendarClassName="calendarcolor"
      onCalendarOpen={
        ()=>{
            setl1(true)

        }

      }

      onCalendarClose={
        ()=>{
          setl1(false)
        }
      }

    />
    </FormControl>
        <br/>
        
      <Typography style={{letterSpacing:0,minWidth:"40ch"}} align="left" color="primary" gutterBottom>4.???????????????? ???????????? ???????????????? ??????????????????:</Typography>
      <FormControl variant="filled" style={{minWidth: 300}}  required={true}>
      {(l1===false)?<InputLabel id="demo-simple-select-filled-label">???????????? ????????????????</InputLabel>:null}
      <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={analysis_choice}
          onChange={handleAnalysisChoice}
          autoWidth={true}
        
        >
          <MenuItem disabled={true} value="">
            <em>???????????? ????????????????</em>
          </MenuItem>
          <MenuItem value={"????????????????????"}>????????????????????</MenuItem>
          <MenuItem value={"NUTS3"}>NUTS3</MenuItem>
          <MenuItem value={"???????????? ??????????????????????"}>???????????? ??????????????????????</MenuItem>
        </Select>
     




        <div style={{display:(errors[1]==true)?"inline":"none"}}>   
        <FormHelperText error={true}>???????????? ???? ?????????????????? ???????????? ????????????????</FormHelperText></div>
        </FormControl>     
     
        <br/>
        
        
         <div style={{marginTop:"3%",float:"center"}}>  
        <Button style={{marginRight:"3%"}} variant="contained" color="primary" onClick={SubmitForm}>
              ??????????????
          </Button>
          <Button variant="contained" color="secondary" onClick={ClearForm}>
        ??????????????
      </Button>   
      </div> 
          








          






    </form>
    
    <div style={{ display:(submitted?"block":"none"),marginLeft:"30%"
      
    }}>
         <Tabs
          value={tabvalue1}
          onChange={handleTab1Change}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          classes={{
            flexContainer: classes.subtabs
          }}
        >
          <Tab label="?????????????? ??????????????????" {...a11yProps(0)} />
          <Tab label="?????????????????? ??????????" {...a11yProps(1)} />
          <Tab label="?????????????????? ??????????????" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={tabvalue1} index={0} > 

                <h1>?????????????? ??????????????????</h1>
          </TabPanel>
          <TabPanel value={tabvalue1} index={1} > 

                <h1>?????????????????? ??????????</h1>
          </TabPanel>
          <TabPanel value={tabvalue1} index={2} > 

                <h1>?????????????????? ??????????????</h1>
          </TabPanel>


  {/*  <DisplayData rows={table_data} data_source={"????????????"}/>*/}
    </div>
   
    </div>     

  );
}