import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useQuery } from 'react-query';
import defaultQueryFn from '../util/defaultQueryFn';
import { useMutation } from 'react-query';
import { accountUpdatePassword } from '../util/apis';
import { accountUpdateAddress } from '../util/apis';
import { accountItemDelete } from '../util/apis';
import { useQueryCache } from 'react-query';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    list: {
        width: "100%",
        backgroundColor: theme.palette.background.default,
    },

    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2),
    },
    paper1: {
        margin: theme.spacing(2),
    },
    avatar:{
         marginTop: theme.spacing(3),
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
    },
    title: {
        margin: theme.spacing(4, 0, 2),
      },
    select: {
        margin: theme.spacing(16),
    },
}));

//---------------------------------------------------
// function generate(element) {
//     return [0, 1].map(
//         (value) =>
//       React.cloneElement(element, {
//         key: value,
//       }),
//     );
//   }

//---------------------------------------------------
export default function Account() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);

    const { isLoading, isError, data } = useQuery(['UserAllInfo', 'userinfo/getUserInfo/'], defaultQueryFn);

    const [ mutate ] = useMutation(accountUpdatePassword); 
    const [ mutate1 ] = useMutation(accountUpdateAddress);
    const [ mutate2 ] = useMutation(accountItemDelete);

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [address, setAddress] = React.useState();
    const [phone, setPhone] = React.useState();


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    // Get QueryCache from the context
    const queryCache = useQueryCache()

    const handleSave = async () => {
        try {
        const UserInfoData = await mutate({ username, password })
        console.log(UserInfoData)

        queryCache.invalidateQueries(['UserAllInfo', 'userinfo/getUserInfo/'])
        } catch(e) {
        console.log(e)
        }       
        setOpen(false);
    }

    const handleSave1 = async () => {
        try {
        const UserAddressData = await mutate1({ address, phone })
        console.log(UserAddressData)

        queryCache.invalidateQueries(['UserAllInfo', 'userinfo/getUserInfo/'])
        } catch(e) {
        console.log(e)
        }
        setOpen1(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
        setOpen1(false);
    };

    const handleClickOpen1 = () => {
        setOpen(false);
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    

    //-----------------------------------------------------
    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error!!!</span>
    }

    //handle corner case of address
    let fullAddress = data.address;
    if (data.zipCode) {
        fullAddress += ', ' + data.zipCode;
    }

    localStorage.setItem('nickname', data.userName);
    return (
    <Container maxWidth="lg">
       

    {/* <div>test: {data.postList[0].postPrice}</div> */}
    {/*      
        { data.postList.map((ItemTest) => (
                <div>heh{ItemTest.postPrice}</div>
            ))
        } */}
            

        <Grid container direction="row" justify="space-between" alignItems="baseline">
            <Link to="/">Back to Home</Link>
            <Link to="/roomlist">Chat Message</Link>
        </Grid>
        <Divider variant="fullWidth"/>

        <div className={classes.avatar}>
             <Avatar src={data.userImage} />
             {/* <Avatar src={data.userImage} />      */}
             <Typography variant="subtitle1">{data.userName}</Typography>
        </div>

        <div className={classes.root}>
            <Grid container wrap="nowrap" alignItems="flex-start">
                <Typography variant="h6">Login and Security</Typography>
            </Grid>
            <Paper className={classes.paper} variant="outlined">
                <Grid container direction="row" justify="space-between">
                    <Typography>Email: {data.account.email}</Typography>
                    <Button variant="contained" onClick={handleClickOpen}>Edit</Button>
                    <Dialog fullWidth ={true} open={open} onClose={handleClose}>
                        <DialogTitle id="form-dialog-title">Login</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="UserName"
                                    type="text"
                                    fullWidth
                                    onChange={handleUsernameChange}/>
                            </DialogContent>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Password"
                                    type="text"
                                    fullWidth
                                    onChange={handlePasswordChange}/>
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleSave} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <div align="left">
                    <FormLabel>UserName: {data.userName}</FormLabel>
                </div>
                <br></br>
                <div align="left">
                    <FormLabel>Password: {data.account.password}</FormLabel>
                </div>  
            </Paper>
        </div>

        <div className={classes.root}>
            <Grid container wrap="nowrap" alignItems="flex-start">
                <Typography variant="h6">Address</Typography>
            </Grid>
            <Paper className={classes.paper} variant="outlined">
                <Grid container direction="row" justify="space-between">
                    <FormLabel>Phone: {data.phone} </FormLabel>
                    <Button variant="contained" onClick={handleClickOpen1}>Edit</Button> 
                    <Dialog fullWidth='true' open={open1} onClose={handleClose1}>
                        <DialogTitle id="form-dialog-title">Address</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Phone"
                                    type="number"
                                    fullWidth
                                    onChange={handlePhoneChange}/>
                            </DialogContent>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Address"
                                    type="text"
                                    fullWidth
                                    onChange={handleAddressChange}/>
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose1} color="primary">Cancel</Button>
                            <Button onClick={handleSave1} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>      
                </Grid> 
                <div align="left">
                    <FormLabel>Address: {fullAddress} </FormLabel>   
                </div> 
            </Paper>
        </div>

        <div className={classes.root}>
            <Grid container wrap="nowrap" alignItems="flex-start">
                <Typography variant="h6">My Items</Typography>
            </Grid> 

            
            <Paper className={classes.paper} variant="outlined">
        
                <List className={classes.list}>{
                    data.postList.map((singleItem)=>(
                    <ListItem>
                        <Paper className={classes.paper1} elevation={0}>
                            <img src="grey_item.png" />
                        </Paper>
                    
                        <Link to={`/item/${singleItem.postId}`}>
                            <ListItemText primary= {singleItem.postTitle} secondary= {singleItem.postCondition} />
                        </Link>
                        <ListItemText primary= {singleItem.postPrice} />
                        <ListItemText primary= {singleItem.postId} />
                        
                        <Select className={classes.select}>
                            <MenuItem value={0}>Sold</MenuItem>
                            <MenuItem value={1}>Unsell</MenuItem>
                        </Select>
                        
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete"
                            onClick={ async ()=>{
                                try {
                                    const postItem = await mutate2(singleItem.postId)
                            
                                    queryCache.invalidateQueries(['UserAllInfo', 'userinfo/getUserInfo/'])
                                    } catch(e) {
                                    console.log(e)
                                    } 
                            }}>
                            <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>))}          
                </List>
            </Paper>
        </div>
    </Container>
);
}
