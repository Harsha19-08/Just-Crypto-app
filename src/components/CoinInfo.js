import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from './config/Api';
import {Line} from "react-chartjs-2";
import { CircularProgress, ThemeProvider, createTheme, makeStyles } from '@material-ui/core';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { chartDays } from './config/Data';
import SelectButton from './SelectButton';
ChartJS.register(...registerables);

const CoinInfo = ({coin}) => {
   const [historicalData,setHistoricalData]=useState();
   const[days,setDays]=useState(1);
   const [flag,setflag] = useState(false);

   const {currency} =CryptoState();

   const fetchHistoricalData=async()=>{
    try {
        const response = await fetch(HistoricalChart(coin.id,days,currency));
        if (!response.ok) {
          throw new Error('Failed to fetch coin data');
        }
        const data = await response.json();
        setHistoricalData(data.prices);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }   }

      useEffect(()=>{
        fetchHistoricalData();
      },[days]);
      const darkTheme =createTheme({
        palette:{
            primary:
            {main:"#fff",},
            type:"dark",

        },
      })
const useStyles=makeStyles((theme)=>({
     container:{
        width:"75%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        marginTop:25,
        padding:40,
        [theme.breakpoints.down("md")]:{
            width:"100%",
            marginTop:0,
            padding:20,
            paddingTop:0,
        },
     }
}))

const classes=useStyles();



  return <ThemeProvider  theme={darkTheme}>
    <div className={classes.container}>
         {/* chart */}

         {!historicalData?(
                <CircularProgress 
                style={{color:"gold"}}
                size={250}
                thickness={1}/>
            ):(
            <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
                {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
              
            </div>
              



            </>)
         }


         {/* buttons */}

    </div>

  </ThemeProvider>
        


  
}

export default CoinInfo