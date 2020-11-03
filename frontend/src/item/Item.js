import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {API_ROOT} from "../constants";
import {useState, useEffect} from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '100%',
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
      title: {
        color: theme.palette.primary.light,
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
    }));

    function getItems(setItems) {
        fetch(`${API_ROOT}/posts`, {
            method: 'GET',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to load posts');
            })
            .then(data => {
                setItems(data);
            }).catch((e) => {
            console.error(e);
        });
    }
export default function Item() {
    const [post, setPost] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        getItems(setPost);
    });
    return (
        <Container component="main" maxWidth="xs">
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
                <Divider variant="middle" /> 
                <GridList className={classes.gridList} cols={2.5}>
                    {post.map((tile) => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img}/>
                        <GridListTileBar
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                />
          </GridListTile>
        ))}
      </GridList>
            </div>
        
        </Container>
     
    );
}