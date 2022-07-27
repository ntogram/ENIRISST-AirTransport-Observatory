import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from "./images/footer.png"
const useStyles = makeStyles((theme) => ({
    logox:{
        display:"flex",
        marginLeft:"auto",
        marginRight:"auto",
      }
    }))



export default function Footer() {
    const classes = useStyles();
    return (<footer>
    
    <img src={logo} alt="ENIRISST_SUPPORT" className={classes.logox}/>
          
       </footer>
    )
}