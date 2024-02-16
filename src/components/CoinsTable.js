import React, { useCallback, useEffect, useState } from 'react'
import { CoinList } from './config/Api';
import { CryptoState } from '../CryptoContext';
import {useNavigate} from "react-router-dom"
import {Pagination} from "@material-ui/lab"
import {Container, LinearProgress, Table,TableRow, TableCell, TableContainer, TableHead, TextField, ThemeProvider, Typography, createTheme, TableBody, makeStyles} from "@material-ui/core";



export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const CoinsTable=()=> {
    const [coins,setCoins] =useState([]);
    const [loading,setLoading]=useState(false);
    const [search,setSearch]=useState("");
    const [page,setPage]=useState(1);
    const history=useNavigate();
    const { currency,symbol } = CryptoState();
  
    const fetchCoins = useCallback(async () => {
      try {
          const response = await fetch(CoinList(currency));
          if (!response.ok) {
              throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setCoins(data);
          setLoading(false);
      } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
      }
  }, [currency]);
  console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, []);
     



  const darkTheme =createTheme({
    palette:{
      primar:{
        main:"#fff",
      },
      type:"dark",

    },
  });
     const handleSearch =()=>{
      return coins.filter((coin)=>(
          coin.name.toLowerCase().includes(search)||
          coin.symbol.toLowerCase().includes(search)
      )
      );
     };

     const useStyles = makeStyles(()=>({
           row:{
            backgroundColor:"#16171a",
            fontFamily:"Monteserrat",
            cursor:"pointer",
             "&:hover":{
              backgroundColor:"#131111",
                  
            },

            pagination:{
                "&.MuiPginationItem-root":{
                  color:"white"
                }
            },
           } ,
     }))

     const classes=useStyles();







  return <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign:"center"}}>

      <Typography
        variant="h4"
        style={{margin:18,fontFamily:"Montserrat"}}>
          Cryptocurrency Prices by Market Cap
        </Typography>

      <TextField
      label ="Search for a Crypto Currency.."
      variant="outlined"
      style={{marginBottom:20,width:"100%"}}

      onChange={(e)=>setSearch(e.target.value)}
      />
      <TableContainer>
        
          {loading? (
              
              <LinearProgress style={{backgroundColor:"gold"}}/>
          ):
          (
           <Table>
               <TableHead style={{backgroundColor:"white"}}>
                  <TableRow>
                    {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                      <TableCell
                      style={{
                        color:'black',
                        fontWeight:"900",
                        fontFamily:"Monteserrat",
                      }}
                      key={head}
                      align={head==="Coin"?"":"right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>

               

               </TableHead>
                   <TableBody>
                           {
                            handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                               const profit = row.price_change_percentage_24h>0;
                                 return (
                                  <TableRow
                                  onClick={()=>history(`/coins/${row.id}`)}
                                    className={classes.row}
                                    key={row.name}
                                  >    
                                         <TableCell component='th' scope='row'
                                         style={{
                                            display:'flex',
                                            gap:15,
                                         }}>
                                          <img
                                          src={row?.image}
                                          alt={row.name}
                                          height="50"
                                          style={{marginBottom:10}}
                                          
                                          />

                                          <div  style={{display:"flec",flexDirection:"column"}}>
                                            <span
                                            style={{
                                              textTransform:"uppercase",
                                              fontSize:22,
                                            }}>

                                              {row.symbol}
                                            </span>
                                            <span style={{ color:"darkgrey"}}>{row.name}</span>
                                          </div>

                                         </TableCell>

                                         <TableCell align='right'>
                                             {symbol}{" "}
                                             {numberWithCommas(row.current_price.toFixed(2))}
                                         </TableCell>

                                         <TableCell
                                         align='right'
                                         styel={{
                                          color:profit>0?"rgb(14,230,129)":"red",
                                          fontWeight:500,
                                         }}>
                                          {  profit && "+"}
                                          {row.price_change_percentage_24h.toFixed()}%
                                         </TableCell>
                                         <TableCell  align='right'>
                                          {symbol}{" "}
                                          {numberWithCommas(
                                            row.market_cap.toString().slice(0,-6)
                                          )}
                                           M
                                         </TableCell>
                                    

                                  </TableRow>
                                 )
                            
                              })
                           }
                   </TableBody>

           </Table>
         )}
      </TableContainer>
           
               
                
                
         <Pagination
         count={(handleSearch().length/10).toFixed(0)}
         style={
          {
            
            padding:20,
            display:"flex",
            justifyContent:"center",
          }
         }
         classes={{ul :classes.pagination}}
         onChange={(_,value) =>{
          setPage(value);
          window.scroll(0,450);
         }}
         
         />

         



    </Container>

  </ThemeProvider>
  
}

export default CoinsTable