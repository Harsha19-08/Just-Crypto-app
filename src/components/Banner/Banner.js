import React from 'react'
import {Container, Typography, makeStyles} from "@material-ui/core"
import Carousel from './Carousel'
const useStyles=makeStyles(()=>({
      banner:{
        backgroundImage:"url(./banner.jpg)",
      },
      bannerContent:{
         height:400,
         display:"flex",
         justifyContent:"space-around",
         flexDirection:'column',
         paddingTop:25,
      },

      tagline:{
        display:"flex",
        height:"40%",
        flexDirection:'column',
        textAlign:"center",
        justifyContent:"center"
      },
      carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
      },
      

}))
const Banner=() => {

    const classes =useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                    variant="h2"
                    style={{
                        fontWeight:"bold",
                        marginBottom:15,
                        fontFamily:"Montserrat",
                    }}
                    >
                    Just Crypto
                </Typography>
                
                <Typography
                 variant="subtitle2" 
                 style={{
                    color :"darkgrey",
                    textTransform:"capitalize",
                    fontFamily:"Montserrat",
                 }}
                 
                 >
                   Get all the  Info regarding your favourite Crypto Currency $
                </Typography>

            </div>
            <Carousel/>

        </Container>
        </div>
  )
}

export default Banner