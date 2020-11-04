import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Carousel from 'nuka-carousel';
//import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const API_ROOT = 'https://my-json-server.typicode.com/stinkycc/SHMTest'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        flexGrow:1,
    },
    gridItem:{
        marginTop:3,
        marginBottom:1,
        width:'50%',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title:{
        variant:'h4',
        align:'left',
    },
    item:{
        color:'textSecondary',
        variant:'body2',
        align:'left',
    }
}));

function getItems(setItems) {
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
function getImgs(setItems) {
    fetch(`${API_ROOT}/posts`, {
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
export default function Item() {
    const [post, setPost] = useState("");
    const[imgs, setImgs] = useState([]);
    const classes = useStyles();
    const space = 1;
    useEffect(() => {
        getItems(setPost);
        getImgs(setImgs);
    });

    
    return (
        <Container component="main" maxWidth="l">
            <div >
                
                <Grid container alignItems="center">
                    <Link
                        component="button"
                        onClick={() => {
                            getItems(setPost);
                        }}
                    >
                        Back to result
                    </Link>
                </Grid>
                <Divider/>
                <Grid container spacing={space} >
                    <Grid item className={classes.gridItem} spacing={space} alignItems="center">
                    {/* <AliceCarousel >
                        <img src="https://source.unsplash.com/aZjw7xI3QAA/1144x763" />
                        <img src="https://source.unsplash.com/c77MgFOt7e0/1144x763" />
                        <img src="https://source.unsplash.com/QdBHnkBdu4g/1144x763" />
                    </AliceCarousel>  */}
                    <Carousel>
                    {
                        imgs.map((tile) => (
                            <img src={tile.img}/>
                    ))}
                    </Carousel>
                    </Grid>
                    <Grid item className={classes.gridItem} >
                        <Typography gutterBottom variant="h6" align="left">{post.title}</Typography>
                        <Grid container spacing={space}>
                            <Grid item className={classes.gridItem}>
                                <Typography color="textSecondary" variant="body2" align="left">Seller: {post.user}</Typography>
                                <Typography color="textSecondary" variant="body2" align="left">Price: {post.price}</Typography>
                            </Grid>
                            <Grid item className={classes.gridItem}>
                                <Typography color="textSecondary" variant="body2" align="left">Relaase: {post.data}</Typography>
                                <Typography color="textSecondary" variant="body2" align="left">Status: {post.status}</Typography>
                            </Grid>
                        </Grid>
                        <Divider/>
                        <Grid item className={classes.gridItem} spacing={space}>
                            <Typography color="textSecondary" variant="body2" align="left">Condition: {post.condition}</Typography>
                            <Typography color="textSecondary" variant="body2" align="left">Transaction: &#9737; cash</Typography>
                            <Typography color="textSecondary" variant="body2" align="left">Delivery typ: &#9737; pick up &#9737; mail</Typography>
                        </Grid>
                        <Divider/>
                        <Grid item className={classes.gridItem} spacing={space}>
                            <Typography color="textSecondary" variant="body2" align="left">Description: {post.description}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider/>
                <Grid container spacing={space}>
                    <Grid item className={classes.gridItem} spacing={space}>
                        <Typography gutterBottom variant="h6" align="left">Contact Info</Typography>
                        <Typography color="textSecondary" variant="body2" align="left">Email: {post.email}</Typography>
                        <Typography color="textSecondary" variant="body2" align="left">Phone: {post.phone}</Typography>
                        <Typography color="textSecondary" variant="body2" align="left">Loaction: {post.address} ZipCode:{post.zipcodes}</Typography>
                    </Grid>
                    <Grid item className={classes.gridItem} spacing={space}>
                   
         
                    </Grid>
                </Grid>
            
    
            </div>

        </Container>

    );
}