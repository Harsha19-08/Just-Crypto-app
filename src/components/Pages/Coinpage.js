import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../../CryptoContext';
import { SingleCoin } from '../config/Api';
import { LinearProgress, Typography, makeStyles } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';  
import CoinInfo from '../CoinInfo';
import { numberWithCommas } from '../CoinsTable';

const Coinpage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);

    const { currency, symbol } = CryptoState();

    const fetchCoin = async () => {
        try {
            const response = await fetch(SingleCoin(id));
            if (!response.ok) {
                throw new Error('Failed to fetch coin data');
            }
            const data = await response.json();
            setCoin(data);
        } catch (error) {
            console.error('Error fetching coin data:', error);
        }
    };

    useEffect(() => {
        fetchCoin();
    }, []);

    const useStyles = makeStyles((theme) => ({
      container: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      },
      sidebar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
      },
      heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
      },
      description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
      },
      marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        //making responsive so that it can be displayed in mobile view
        [theme.breakpoints.down("md")]: {
          display: "flex",
          
          justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
          
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          
          flexDirection: "column",
          alignItems: "center",
        },
      },  
    }));

    const classes = useStyles();


    if(!coin) return <LinearProgress style={{backgroundColor: 'gold'}} />;

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                    
                        <img
                            src={coin?.image?.large}
                            alt={coin?.name}
                            height="200"
                            style={{ marginBottom: 20 }}
                        />
                        <Typography variant="h3" className={classes.heading}>
                            {coin?.name}  
                        </Typography>
                        <Typography variant="subtitle1" className={classes.description}>
                            {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
                        </Typography>
                        <div className={classes.marketData}>
                          <span style ={{ display:"flex"}}>
                            <Typography variant="h5" className={classes.heading}>
                              Rank:
                            </Typography>
                            &nbsp;&nbsp;

                            <Typography variant="h5" 
                            style={{fontfamily:"Montserrat",}}>
                              {coin?.market_cap_rank}
                              </Typography>
                          </span>
                               
                             {/* currentprice */}
                          <span style ={{ display:"flex"}}>
                            <Typography variant="h5" className={classes.heading}>
                              Current Price:
                            </Typography>
                            &nbsp;&nbsp;

                            <Typography variant="h5" 
                            style={{fontfamily:"Montserrat",}}>
                              {symbol} {" "} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                              </Typography>
                          </span>



                          {/* marketcap */}
                          <span style ={{ display:"flex"}}>
                            <Typography variant="h5" className={classes.heading}>
                              Market Cap:
                            </Typography>
                            &nbsp;&nbsp;

                            <Typography variant="h5" 
                            style={{fontfamily:"Montserrat",}}>
                              {symbol} {" "} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                              .toString().slice(0, -6))}M 
                              </Typography>
                          </span>
                          
                          
                          </div>

                    
                
            </div>
            {/* chart */}
            <CoinInfo coin={coin} />
        </div>
    );
};

export default Coinpage;
