import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import { CSVLink } from "react-csv";
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import PropTypes from 'prop-types';
import {TabPanel,a11yProps} from './Header'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: "PowderBlue",
    fontStyle:"oblique",
    fontFamily: "Brush Script MT",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);




function createData(name,value,indicator_values) {
  return { name, value, indicator_values
};
  
  };









const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',

      
    },
  },
});

function EmptyRow(props) {

  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <StyledTableCell component="th" scope="row">
         Δεν υπάρχουν διαθέσιμα δεδομένα
        </StyledTableCell>
        
        
      </StyledTableRow>      
    </React.Fragment>
  );
}

function Row(props) {
  const { row } = props;
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const classes = useRowStyles();
 
  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
      <StyledTableCell>
          {
          (row.name==="Βασικές Πληροφορίες")?
          
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen1(!open1)}>
            {open1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            
          </IconButton>:
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen2(!open2)}>
          {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          
        </IconButton>

          
          
          }
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        {
          (row.name==="Βασικές Πληροφορίες")?
        <Collapse in={open1} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
               Βασικές Πληροφορίες
              </Typography>
              <Table size="large" aria-label="other_info">
                <TableHead>
                  <TableRow>
                    <TableCell>Όνομα Πεδίου</TableCell>
                    <TableCell align="right">Τιμή Πεδίου</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.propvalues.map((proprow) => (
                    <TableRow key={proprow.name}>
                      <TableCell component="th" scope="row">
                        {proprow.name}
                      </TableCell>
                      
                      <TableCell align="right">
                        {proprow.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            </Collapse>:
                 <Collapse in={open2} timeout="auto" unmountOnExit>
                 <Box margin={1}>
                   <Typography variant="h6" gutterBottom component="div">
                    Τεχνικές Πληροφορίες
                   </Typography>
                   <Table size="large" aria-label="indicator_values">
                     <TableHead>
                       <TableRow>
                         <TableCell>Όνομα Πεδίου</TableCell>
                         <TableCell align="right">Τιμή Πεδίου</TableCell>
                       </TableRow>
                     </TableHead>
                     <TableBody>
                       {row.propvalues.map((proprow) => (
                         <TableRow key={proprow.name}>
                           <TableCell component="th" scope="row">
                             {proprow.name}
                           </TableCell>
                           
                           <TableCell align="right">
                             {proprow.value}
                           </TableCell>
                         </TableRow>
                       ))}
                     </TableBody>
                   </Table>
                 </Box>
                 </Collapse>}
                  </StyledTableCell>






    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  hbutton:{
    margin: theme.spacing(1),
    display:"none"
  },
  tab1:{
    display:"flex",
    
   // justifyContent:"flex-end"

  },
  subtabs:{
    display:"block"
  },
}));


export default function DisplayData(props) {
  const classes = useStyles();
  const headers=[
    { label: "Όνομα Πεδίου", key: "name" },
    { label: "Τιμή Πεδίου", key: "value" },

  ]
  const [tabvalue1,setTabValue1]=React.useState(0)

  const csvLinkEl = React.createRef();
  const [filename,setfilename]=React.useState("")
  const [data,setdata]=React.useState([])

  const downloadCSV=()=>{
    console.log(props.rows)
    csvLinkEl.current.link.click();
   // console.log(filename)
   // console.log(data)
   // console.log(headers)

  }
  const handleTab1Change =(event,newValue)=>{
    setTabValue1(newValue)
   }  
  React.useEffect(() => {
    console.log(props.rows)
    console.log(props.grouprows)
    if (props.rows.length===0){
      if (filename!=="" || data.length>0){
        setfilename("")
        setdata([])
      }
    }
    else{
      
   //   console.log(filename)
      let fname=props.rows[2]["value"]+".csv"//need change
      //fname=fname.replace(/,|, |-|/g,'_')
      //fname=(fname.replace(",","_")).substr(1)
     // let dataentry=[]
      if (filename!=fname){
          setfilename(fname)
          
          setdata(props.rows)
        
      }
      }
      
      
//console.log(2)

}
)


  return (
    <div>
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
          <Tab label="ΠΛΗΡΟΦΟΡΙΕΣ" {...a11yProps(0)} />
          <Tab label="ΕΙΚΟΝΕΣ" {...a11yProps(1)} />
        </Tabs>


      
      <TabPanel value={tabvalue1} index={0}>
     
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={(props.rows.length===0)?classes.hbutton:classes.button}
        startIcon={<SaveIcon />}
        onClick={downloadCSV}
      >
        ΑΠΟΘΗΚΕΥΣΗ
      </Button>
      <CSVLink
          headers={headers}
          filename={filename}
          data={data}
          ref={csvLinkEl}
        />


    <br/>
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
  
            <StyledTableCell>Όνομα Πεδίου</StyledTableCell>
            <StyledTableCell align="right">Τιμή Πεδίου</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(props.rows.length===0)?<EmptyRow/>:
          (props.grouprows.map((row) => (
            <Row key={row.name} row={row} />
          )))
}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <Typography variant="overline" color="primary"> ΠΗΓΗ ΔΕΔΟΜΕΝΩΝ: {props.data_source}</Typography>  
    
    </TabPanel>
    <TabPanel value={tabvalue1} index={1} > 

        <h1>ΕΙΚΟΝΕΣ</h1>
        </TabPanel>
    </div>     
  );
}
