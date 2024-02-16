import { AppBar, Container, MenuItem, Select,
    ThemeProvider,
    Toolbar, Typography, 
    createTheme, makeStyles,
    } from '@material-ui/core'
 import React from 'react'
 import {  useNavigate } from 'react-router-dom';
 import { CryptoState } from '../CryptoContext';
 
 
 const useStyles=makeStyles(()=>({
   title:{
     flex:1,
     backgroundColor:"black",
     color:"white",
     fontFamily:"Montserrat",
     fontWeight:"bold",
     cursor:"pointer",
   }
 }));
 const Header=()=> {
    
   const classes=useStyles();
  const history = useNavigate();
   const {currency,setCurrency } =CryptoState();
   console.log(currency);
 
 
  const darkTheme=createTheme({
   palette:{
     primary:{
       main:"#fff",
     },
     type:"dark",
   }
  })
   return (
     <ThemeProvider theme={darkTheme}>
 
     
     <AppBar color ="transparent" position='static'>
       <Container>
         <Toolbar>
           <Typography onClick={()=> history("/")} 
           className={classes.title} 
           variant='h6'
           >Just Crypto</Typography>
           <Select variant='outlined' style={{
             width:100,
             height:40,
             marginLeft:15,
             
           }}
           value={currency}
           onChange={(e) => setCurrency(e.target.value)}>
 
 
             <MenuItem value={"USD"}>USD</MenuItem>
             <MenuItem value={"INR"}>INR</MenuItem>
           </Select>
 
            
         </Toolbar>
       </Container>
     </AppBar>
   </ThemeProvider>
   );
 };
 
 export default Header
 