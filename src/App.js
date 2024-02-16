import { BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';

import Header from "./components/Header"; 

import {makeStyles} from "@material-ui/core";
import Homepage from "./components/Pages/Homepage";
import Coinpage from "./components/Pages/Coinpage";
function App() {

const useStyles=makeStyles(()=>({
  App:{
    backgroundColor:"#14161a",
    color:"white",
    minHeight:"100vh",
  },
}));

const classes =useStyles();

  return (
    <BrowserRouter>
       <div className={classes.App}>
       <Header/>  
      <Routes>
      
        <Route path="/" element={<Homepage/>} exact/>
        <Route path="/coins/:id" element={<Coinpage/>}/>
        </Routes>
       </div>
      
    </BrowserRouter >
  );
}

export default App;
