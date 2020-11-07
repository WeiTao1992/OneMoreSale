import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Carousel from 'nuka-carousel';
import { Link } from "react-router-dom";
//import AliceCarousel from 'react-alice-carousel';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useQuery } from 'react-query'
import Moment from 'react-moment'

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
//const API_ROOT = '3.15.9.180/oms'
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

function getItems(setItems) {
    //fetch(`${API_ROOT}/post/getpostbyid?id=224`, {
    fetch(`${API_ROOT}/post`, {
        method: 'GET',
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load post');
        })
        .then(data => {
            setItems(data);
        }).catch((e) => {
        console.error(e);
    });
}
const getPosts = async () => {
    const response = await fetch(`${API_ROOT}/post`)
    return response.json()
  }
export default function Item() {
    //const {status, post, isFetching, error} = useQuery('post', getPosts)
    const[post, setPost] = useState("");
    const classes = useStyles();
    const space = 5;
    
    useEffect(() => {
        getItems(setPost);
    },[]);
    // if (status === 'loading') {
    //     return <div>loading...</div> // loading state
    // }
    
    // if (status === 'error') {
    //     return <div>{error.message}</div> // error state
    // }
    
    return (
        <Container component="main" maxWidth="l">
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
                        post.postImage != null ? post.postImage.map((tile) => (<img src={tile.img}/>)) : <p></p>
                    }
                    </Carousel>
                    </Grid>
                    <Grid item className={classes.gridItem} >
                        <Typography gutterBottom variant="h6" align="left">{post.postTitle}</Typography>
                        <Grid container spacing={space}>
                            <Grid item className={classes.gridInItem}>
                                
                                <Typography color="textSecondary" variant="body2" align="left">Seller: {post.postOwner}</Typography>
                                <Typography color="textSecondary" variant="body2" align="left">Price: {post.postPrice}</Typography>
                            </Grid>
                            <Grid item className={classes.gridInItem}>
                                
                                <Typography color="textSecondary" variant="body2" align="left">Relaase: <Moment format="YYYY/MM/DD">{post.postDate}</Moment></Typography>
                                <Typography color="textSecondary" variant="body2" align="left">Status: {post.status}</Typography>
                            </Grid>
                        </Grid>
                        <Divider/>
                        <Grid item className={classes.gridItem} spacing={space}>
                            <Typography color="textSecondary" variant="body2" align="left">Condition: {post.postCondition}</Typography>
                            <Typography color="textSecondary" variant="body2" align="left">Transaction:{                
                                post.transactionMethod != null ? post.transactionMethod.map((item) => (<a>&#9737; {item.transactionMethod} </a>)) : <p></p>
                            }</Typography>
                            <Typography color="textSecondary" variant="body2" align="left">Delivery type:  
                            {                
                                post.deliveryType != null ? post.deliveryType.map((item) => (<a>&#9737; {item.deliveryType} </a>)) : <p></p>
                            }</Typography>
                        </Grid>
                        <Divider/>
                        <Grid item className={classes.gridItem} spacing={space}>
                            <Typography color="textSecondary" variant="body2" align="left">Description: {post.postDescription}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider/>
                <Grid container spacing={space}>
                    <Grid item className={classes.gridImg} spacing={space}>
                        <Typography gutterBottom variant="h6" align="left">Contact Info</Typography>
                        <Typography color="textSecondary" variant="body2" align="left">Email: {post.postEmail}</Typography>
                        <Typography color="textSecondary" variant="body2" align="left">Phone: {post.postPhone}</Typography>
                        <Typography color="textSecondary" variant="body2" align="left">Loaction: {post.postAddress} ZipCode:{post.postZipcode}</Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} spacing={space}>
                         {/* <MapComponent></MapComponent> */}
                    </Grid>
                </Grid> 
            </div>
    
        </Container>

    );
}

