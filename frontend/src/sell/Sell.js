import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useState } from "react";
import ImageUploader from "react-images-upload";
import { sell } from '../util/apis';
import { useQueryCache } from 'react-query';
import { useMutation } from 'react-query';
import moment from 'moment';
import defaultQueryFn from '../util/defaultQueryFn';
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom';
import axios from "axios";

//------------------------------------------------------------------------------------------------------//

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },

    grid: {
        marginLeft: -32,
    },

    form: {
        '& > *': {
            margin: theme.spacing(2),
            minWidth: 300,
        },
    },

    checkbox: {
        margin: theme.spacing(2),
    },
      
    check1: {
        marginTop:4,
        marginLeft: 12,
        marginRight: 28,
        padding: 6,
    },

    check2: {
        marginTop: 4,
        marginLeft: 42,
        marginRight: 4,
        padding: 6,
    },

    uploadImage: {
        margin: theme.spacing(2),
        marginTop: 20,
        marginBottom: 50,
    },

    middleGrid: {
        marginLeft: -16,
        marginRight: 16,
    },

  }));

export default function Sell(props) {
    const classes = useStyles();
    let history = useHistory();
    const [mutate, { isLoading  , isError,  error, data : d1 }, ] = useMutation(sell);
    const { isLoading : il, isError: ie, data : d2 } = useQuery(['username', 'userinfo/getUserInfo/'], defaultQueryFn);
//------------------------------------------------------------------------------------------------------//

    const [pictures, setPictures] = useState([]);
    
    const onDrop = pics => {
        setPictures(pics);
    };
    
    const [values, setValues] = React.useState({
        title: '',
        price: '',
        email: '',
        phone: '',
        zipcode: '',
        address: '',
        category: '',
        condition: '',
        description: '',
        status: 'On Sale',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [transaction, setTransaction] = React.useState({
        paypal: false,
        quickpay: false,
        venmo: false,
        cash: false,
    });

    const [delivery, setDelivery] = React.useState({
        dropoff: false,
        pickup: false,
    });
    
    const handleTransactionChange = (event) => {
        setTransaction({ ...transaction, [event.target.name]: event.target.checked });
    };

    const handleDeliveryChange = (event) => {
        setDelivery({ ...delivery, [event.target.name]: event.target.checked });
    };
    
    // Get QueryCache from the context
    const queryCache = useQueryCache();

    if (isLoading || il) {
        return <span>Loading</span>;
    }
    
    const userName = d2.userName;

    const onPostClick = async () => {
        try {
            var trans = [];
            for (var t in transaction) {
                if(transaction[t] === true) {
                    trans.push({
                        transactionMethod: t,
                    });
                }
            }


            let deliv = []
            for (var d in delivery) {
                if(delivery[d] === true) {
                    deliv.push({
                        deliveryType: d,
                    });
                }
            }

            let imageUrl = [];
            for (var picture of pictures) {
                let pictFormData = new FormData();
                // console.log("picture");
                // console.log(picture);
                pictFormData.append('file', picture, picture.name);
                // console.log("formdata");
                // console.log(pictFormData);

                // console.log("imageUrl");
                // console.log(imageUrl);

                let currUrl = await axios({
                    method: 'post',
                    url: 'oms/s3/upload/',
                    data: pictFormData,
                    headers: {'Content-Type': 'multipart/form-data' } 
                })
                imageUrl.push ({
                    postImage: currUrl.data
                });
                console.log(imageUrl);
            }   


            var curTime = moment();

            const data = await mutate({ values, trans, deliv, curTime, userName, imageUrl})
            console.log("data")
            console.log(data)
            console.log(data.data.postId)

            queryCache.invalidateQueries(['home', '/'])
            queryCache.invalidateQueries(['UserAllInfo', 'userinfo/getUserInfo/'])
            history.push(`/item/${data.data.postId}`);            
        } catch(e) {
            console.log(e)
        }
    }

    if (isLoading || il) {
        return <span>Loading</span>;
    }

    if (isError || ie) {
        console.log(error)
        history.push("/login");
    }

//--------------------------------------------------------------------------------------------------//

    return (
        
        <Container maxWidth="lg">
            <div>
                <Grid 
                    container 
                    direction="row" 
                    justify="space-between" 
                    alignItems="baseline"
                >
                    <Link to="/" variant="body2">
                        back to home
                    </Link>
        
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<Icon>send</Icon>}
                        disableElevation
                        onClick={onPostClick}
                    >
                        Post
                    </Button>
                
                </Grid>

                <Divider variant="fullWidth"/>
            </div>
            
            <div>
                <Grid container spacing={4} className={classes.grid}>
                    <Grid item xs={4} >
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField
                                required id="item-title"
                                label="Item Title"
                                variant="outlined"
                                value={values.title}
                                onChange={handleChange('title')}
                            /> 

                            <FormControl variant="outlined">
                                <InputLabel htmlFor="price">Price</InputLabel>
                                <OutlinedInput
                                    required id="item-price"                     
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={60}
                                    value={values.price}
                                    onChange={handleChange('price')}
                                />
                            </FormControl>

                            <FormControl variant="outlined">
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="item-category"
                                    label="Category"
                                    value={values.category}
                                    onChange={handleChange('category')}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Automotive & industrial</MenuItem>
                                    <MenuItem value={2}>Beauty & Health</MenuItem>
                                    <MenuItem value={3}>Books</MenuItem>
                                    <MenuItem value={4}>Clothing, Shoes, Jewelry & Watches</MenuItem>
                                    <MenuItem value={5}>Computers</MenuItem>
                                    <MenuItem value={6}>Electronics</MenuItem>
                                    <MenuItem value={7}>Handmade</MenuItem>
                                    <MenuItem value={8}>Home, Garden & Tools</MenuItem>
                                    <MenuItem value={9}>Movies, Music & Games</MenuItem>
                                    <MenuItem value={10}>Outdoors</MenuItem>
                                    <MenuItem value={11}>Pet Supplies</MenuItem>
                                    <MenuItem value={12}>Sports</MenuItem>
                                    <MenuItem value={13}>Toys, Kids & Baby</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined">
                                <InputLabel id="condition-label">Condition</InputLabel>
                                <Select
                                    labelId="condition-label"
                                    id="item-condition"
                                    label="Condition"
                                    value={values.condition}
                                    onChange={handleChange('condition')}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"used"}>Used</MenuItem>
                                    <MenuItem value={"acceptable"}>Acceptable</MenuItem>
                                    <MenuItem value={"like new"}>Like New</MenuItem>
                                    <MenuItem value={"brand new"}>Brand New</MenuItem>
                                </Select>
                            </FormControl>


                            <TextField
                                id="item-description"
                                label="Description"
                                multiline
                                rows={10}
                                variant="outlined"
                                value={values.description}
                                onChange={handleChange('description')}
                            />
                            
                        </form>
                    </Grid>

                    <Grid item xs={4} className={classes.middleGrid}>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField
                                    required id="item-email"
                                    label="Email"
                                    variant="outlined"
                                    value={values.email}
                                    onChange={handleChange('email')}
                                /> 
                            
                            <TextField
                                    required id="item-phone"
                                    label="Phone"
                                    variant="outlined"
                                    value={values.phone}
                                    onChange={handleChange('phone')}
                                /> 

                            <TextField
                                    required id="item-zipcode"
                                    label="Zip Code"
                                    variant="outlined"
                                    value={values.zipcode}
                                    onChange={handleChange('zipcode')}
                                /> 

                            <TextField
                                    id="item-address"
                                    label="Address(Optional)"
                                    multiline
                                    rows={1}
                                    variant="outlined"
                                    value={values.address}
                                    onChange={handleChange('address')}
                                />  


                            <FormControl className={classes.checkbox}>
                                <FormLabel>Transction Methods</FormLabel>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={<Checkbox  checked={transaction.paypal} onChange={handleTransactionChange} color="primary" name="paypal" />}
                                        className={classes.check2}
                                        label="PayPal"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={transaction.quickpay} onChange={handleTransactionChange} color="primary" name="quickpay" />}
                                        className={classes.check2}
                                        label="QuickPay"
                                    /> 
                                    <FormControlLabel
                                        control={<Checkbox checked={transaction.venmo} onChange={handleTransactionChange} color="primary" name="venmo" />}
                                        className={classes.check2}
                                        label="Venmo"
                                    />                                    
                                    <FormControlLabel
                                        control={<Checkbox checked={transaction.cash} onChange={handleTransactionChange} color="primary" name="cash" />}
                                        className={classes.check2}
                                        label="Cash"
                                    />                                    
                                </FormGroup>
                            </FormControl>

                            <FormControl className={classes.checkbox}>
                                <FormLabel>Delivery Methods</FormLabel>
                                <FormGroup row >
                                    <FormControlLabel
                                        control={<Checkbox checked={delivery.dropoff} onChange={handleDeliveryChange} color="primary" name="dropoff" />}
                                        className={classes.check1}
                                        label="Drop off"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={delivery.pickup} onChange={handleDeliveryChange} color="primary" name="pickup" />}
                                        className={classes.check1}
                                        label="Pick Up"
                                    />
                                </FormGroup>
                            </FormControl>
                        </form>
                    </Grid>

                    <Grid item xs={4}>
                        <ImageUploader
                            {...props}
                            withIcon={true}
                            onChange={onDrop}
                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                            maxFileSize={5242880}
                            withPreview={true}
                            label="Upload your images"
                        />
                    </Grid>
                </Grid>
                <Divider variant="fullWidth"/>
            </div>

        </Container>
    );
}