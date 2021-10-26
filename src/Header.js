import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import logo from './images/enirisst_logo.jpg'
import logobeta from './images/enirisst_logobeta.jpg'
import FormTab from './FormTab';
import FormTab2 from './FormTab2';
import MapDisplayer from './MapDisplayer';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  subtabs:{
    display:"block"
  },
  
  toolbar: {
    minHeight: 32,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'center',
    marginLeft:"5%",
    textAlign: 'center',
    color:'PowderBlue',
    fontFamily: "Brush Script MT",
    fontStyle:"oblique"

  },
  logo: {
    maxWidth: 160,
  },
  logox:{
    display:"flex",
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"10%"
  },
  graph_preview:{
    marginLeft:"10%",
    maxWidth:700,
    maxHeight:700

  },
  tab1:{
    display:"flex",
    
   // justifyContent:"flex-end"

  }
  

}));


export function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };


 export function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }





export default function Header() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [tabvalue1,setTabValue1]=React.useState(0)

  const [selected_region,setRegion]=React.useState({});
  const [connections,setConnections]=React.useState([]);
  const [cur,setcur]=React.useState("initial")
  const [allairports,setallairports]=React.useState()
  const [regionprovider,setregionprovider]=React.useState("box")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 const handleTab1Change =(event,newValue)=>{
  setTabValue1(newValue)
 }



const changecursor=(value) =>{
  setcur(value)
}

 

  React.useEffect(() => {
    console.log(4)
    console.log("Header")
    console.log(connections)
     // console.log(chart_xlabels)
     
     // console.log(cleargraph)


   }
  )

  return (
    <div style={{cursor:cur,marginBottom:(value!==1)?"15%":"0%"}}className={classes.root}>
      <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <img src={logo} alt="ENIRISST" className={classes.logo} />
     
       
          
          <Typography className={classes.title} variant="h5">
            ΠΑΡΑΤΗΡΗΤΗΡΙΟ ΑΕΡΟΠΟΡΙΚΩΝ ΜΕΤΑΦΟΡΩΝ
          </Typography>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable" centered={true}
          scrollButtons="auto" >
          <Tab label="ΣΧΕΤΙΚΑ"   {...a11yProps(0)} />
          <Tab label="ΑΕΡΟΔΡΟΜΙΑ ΤΗΣ ΕΛΛΑΔΑΣ"  {...a11yProps(1)} />
          <Tab label="ΠΕΡΙΒΑΛΛΟΝΤΙΚΟ ΑΠΟΤΥΠΩΜΑ" {...a11yProps(2)} />
          <Tab label="ΑΠΟΔΟΤΙΚΟΤΗΤΑ ΑΕΡΟΔΡΟΜΙΩΝ"  {...a11yProps(3)} />
          <Tab label="ΕΠΟΧΙΚΟΤΗΤΑ"  {...a11yProps(4)} />
          <Tab label="ΜΟΝΤΕΛΟ ΠΡΟΒΛΕΨΗΣ ΑΕΡΟΠΟΡΙΚΗΣ ΚΙΝΗΣΗΣ"  {...a11yProps(5)} />
        </Tabs>



          </Toolbar>
        
      </AppBar>
      <TabPanel value={value} index={0}>
       <div>
       <h1>ΣΧΕΤΙΚΑ</h1> 
       <img src={logobeta} alt="ENIRISST" className={classes.logox} />
         </div> 
      
      </TabPanel>
      <TabPanel value={value} index={1}>

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
          <Tab label="ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ" {...a11yProps(0)} />
          <Tab label="ΕΠΙΒΑΤΙΚΗ ΚΙΝΗΣΗ" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={tabvalue1} index={0}>
        <div className={classes.tab1}>


      
<FormTab setallairports={setallairports}  btnclick={changecursor} setConnections={setConnections} index={tabvalue1}
        regionprovider={regionprovider}   setregionprovider={setregionprovider} selected_region={selected_region} 
setRegion={setRegion} /> 

<MapDisplayer allairports={allairports} connections={connections} selected_region={selected_region} 
     regionprovider={regionprovider} 
     setRegion={setRegion}
     setregionprovider={setregionprovider}

/>
</div>
        </TabPanel>
        <TabPanel value={tabvalue1} index={1} > 

        <FormTab2/>
        </TabPanel>

      
      
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div>
       <h1>ΠΕΡΙΒΑΛΛΟΝΤΙΚΟ ΑΠΟΤΥΠΩΜΑ</h1> 
       <img src={logobeta} alt="ENIRISST" className={classes.logox} />
         </div> 
      </TabPanel>
      <TabPanel value={value} index={3}>
      <div>
       <h1>ΑΠΟΔΟΤΙΚΟΤΗΤΑ ΑΕΡΟΔΡΟΜΙΩΝ</h1>
       <img src={logobeta} alt="ENIRISST" className={classes.logox} />
         </div> 
      
     
      </TabPanel>
      <TabPanel value={value} index={4}>
      <div>
       <h1>ΕΠΟΧΙΚΟΤΗΤΑ</h1>
       <img src={logobeta} alt="ENIRISST" className={classes.logox} />
         </div> 
     
     
      </TabPanel>
      <TabPanel value={value} index={5}>
      <div>
      <h1>ΜΟΝΤΕΛΟ ΠΡΟΒΛΕΨΗΣ ΑΕΡΟΠΟΡΙΚΗΣ ΚΙΝΗΣΗΣ</h1>
       <img src={logobeta} alt="ENIRISST" className={classes.logox} />
         </div> 


     

     
      </TabPanel>




    </div>
  );
}