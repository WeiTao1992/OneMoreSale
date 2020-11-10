import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Carousel from 'nuka-carousel';
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Moment from 'react-moment'
import { useQuery } from 'react-query'
import axios from "axios";
import Button from '@material-ui/core/Button';
import {useParams} from 'react-router-dom'
// import defaultQueryFn from '../util/defaultQueryFn';

const containerStyle = {
    width: '100%',
    height: '200px'
  };
   
  const center = {
    lat: 37,
    lng: -121
  };
   
function MapComponent() {
    const [map, setMap] = React.useState(null)
   
    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      setMap(map)
    }, [])
   
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])
   
    return (
      <LoadScript
        googleMapsApiKey="*********"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
React.memo(MapComponent)

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const API_ROOT = 'https://my-json-server.typicode.com/stinkycc/SHMTest'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        flexGrow:1,
    },
    button: {
        margin: theme.spacing(1),
    },

    gridItem:{
        marginTop:3,
        marginBottom:1,
        width:'60%',
    },
    gridInItem:{
        marginTop:2,
        marginBottom:1,
        width:'50%',
    },
    gridImg:{
        marginTop:5,
        marginBottom:3,
        width:'40%',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title:{
        variant:'h4',
        align:'left',
    },
    carousel: {
        margin: theme.spacing(2),
    },
    item:{
        color:'textSecondary',
        variant:'body2',
        align:'left',
    }
}));

async function getItems() {
    const { data } = await axios.get(`${API_ROOT}/post`)
    return data;
    
}

export default function Item(props) {
    const { isLoading, isError, data } = useQuery(['postItem', 'post'], getItems);

    //const data = props.postItem;

    //const { id } = useParams();
    //const { isLoading, isError, data } = useQuery(['postItem', `post/getpostbyid?id=${id}`], defaultQueryFn);
    
    const { id } = useParams();

    const classes = useStyles();
    const space = 5;  
    if (isLoading) {
        return <div>loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }
    return (
        <Container component="main" maxWidth="l">
            {/* <Button onClick={() => { console.log(id) }}>hhhh{id}</Button> */}
            <div>
                <Grid container align='left'>
                <Link to="/">
                    Back to result
                </Link>
                </Grid>
                <Divider/>
                <br></br>
                <Grid container spacing={space} >
                    <Grid item  className={classes.gridImg} spacing={space} alignItems="center">
                    <Carousel  heightMode="current">
                    {                
                        data.postImage != null ? data.postImage.map((tile) => (<img src={tile.img}/>)) : <p></p>
                    }
                    </Carousel>
                    </Grid>
                    <Grid item className={classes.gridItem} >
                        <Typography gutterBottom variant="h6" align="left">{data.postTitle}</Typography>
                        <Grid container spacing={space}>
                            <Grid item className={classes.gridInItem}>
                                
                                <Typography color="textSecondary" variant="body2" align="left">Seller: {data.postOwner}</Typography>
                                <Typography color="textSecondary" variant="body2" align="left">Price: {data.postPrice}</Typography>
                            </Grid>
                            <Grid item className={classes.gridInItem}>
                                
                                <Typography color="textSecondary" variant="body2" align="left">Relaase: <Moment format="YYYY/MM/DD">{data.postDate}</Moment></Typography>
                                <Typography color="textSecondary" variant="body2" align="left">Status: {data.postStatus}</Typography>
                            </Grid>
                        </Grid>
                        <Divider/>
                        <Grid item className={classes.gridItem} spacing={space}>
                            <Typography color="textSecondary" variant="body2" align="left">Condition: {data.postCondition}</Typography>

                            <Typography color="textSecondary" variant="body2" align="left">Transaction:{                
                                data.transactionMethod != null ? data.transactionMethod.map((item) => (<a>&#9737; {item.transactionMethod} </a>)) : <p></p>
                            }</Typography>
                            <Typography color="textSecondary" variant="body2" align="left">Delivery type:  
                            {                
                                data.deliveryType != null ? data.deliveryType.map((item) => (<a>&#9737; {item.deliveryType} </a>)) : <p></p>
                            }</Typography>
                        </Grid>
                        <Divider/>
                        <Grid item className={classes.gridItem} spacing={space}>
                            <Typography color="textSecondary" variant="body2" align="left">Description: {data.postDescription}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider/>
                <Grid container spacing={space}>
                    <Grid item className={classes.gridImg} spacing={space}>
                        <Typography gutterBottom variant="h6" align="left">Contact Info</Typography>
                        <Typography color="textSecondary" variant="body2" align="left">Email: {data.postEmail}</Typography>
                        <Typography color="textSecondary" variant="body2" align="left">Phone: {data.postPhone}</Typography>
                        <Typography color="textSecondary" variant="body2" align="left">Loaction: {data.postAddress} ZipCode:{data.postZipcode}</Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} spacing={space}>
                         {/* <MapComponent></MapComponent> */}
                    </Grid>
                </Grid> 
            </div>
    
        </Container>

    );
}

