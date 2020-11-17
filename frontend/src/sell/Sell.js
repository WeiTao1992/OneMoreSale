import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import Link from '@material-ui/core/Link';
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
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
<<<<<<< HEAD
import { sell } from '../util/apis';
import { useQueryCache } from 'react-query';
import { useMutation } from 'react-query';
import moment from 'moment';
import defaultQueryFn from '../util/defaultQueryFn';
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom';
import { image} from '../util/apis';
import Paper from "@material-ui/core/Paper";
import Carousel from 'nuka-carousel';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

//------------------------------------------------------------------------------------------------------//
=======
import ImageUploader from "react-images-upload";
import Carousel from 'nuka-carousel';
import Typography from '@material-ui/core/Typography';
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },

    grid: {
<<<<<<< HEAD
        marginLeft: -42,
=======
        marginLeft: -50,
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
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

<<<<<<< HEAD
    upload: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 16,
        marginLeft: 12,
        width: 380,
        justifyContent: 'center',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(10),
        },
      },

    input: {
        display: 'none',
    },

    uploadButton: {
        marginTop: 20,
    },

    carousel: {
        margin: theme.spacing(1),
    },

    middleGrid: {
        marginLeft: -16,
        marginRight: 16,
    },     

    Logo: {
        height: '60%',
        width: '60%'
    },

  }));

//------------------------------------------------------------------------------------------------------//

export default function Sell() {
    const classes = useStyles();
    let history = useHistory();
    const [mutate, { isLoading  , isError,  error, data : d1 }, ] = useMutation(sell);
    const { isLoading : il, isError : ie, data : d2 } = useQuery(['username', 'userinfo/getUserInfo/'], defaultQueryFn);
    const [mutate1, { data : d3 }, ] = useMutation(image);

    const userName = d2.userName;
    const defaultEmail = d2.account.email;
    const defaultPhone = d2.phone;
    const defaultZipcode = d2.zipCode;
    const defaultAddress = d2.address;

    //const [pictures, setPictures] = useState([]);

    const [values, setValues] = React.useState({
        title: '',
        price: '',
        email: defaultEmail,
        phone: defaultPhone,
        zipcode: defaultZipcode,
        address: defaultAddress,
        category: '',
        condition: '',
        description: '',
        status: 'On Sale',
    });

    const [transaction, setTransaction] = React.useState({
=======
    carousel: {
        margin: theme.spacing(2),
    },

    uploadImage: {
        margin: theme.spacing(2),
        marginTop: 50,
        marginBottom: 50,
    },

    warning: {
        marginLeft: 20,
    },

  }));

const UploadImage = props => {
    const [pictures, setPictures] = useState([]);
  
    const onDrop = picture => {
      setPictures([...pictures, picture]);
    };

    return (
      <ImageUploader
        {...props}
        withIcon={true}
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
        label="Upload your images"
      />
    );
};


export default function Sell() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        title: '',
        price: '',
        email: '',
        phone: '',
        postalcode: '',
        address: '',
        category: '',
        condition: '',
        description: '',
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
        paypal: false,
        quickpay: false,
        venmo: false,
        cash: false,
<<<<<<< HEAD
    });

    const [delivery, setDelivery] = React.useState({
=======
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
        dropoff: false,
        pickup: false,
    });

<<<<<<< HEAD
    // const onDrop = picture => {
    //     setPictures([...pictures, picture]);
    // };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleTransactionChange = (event) => {
        setTransaction({ ...transaction, [event.target.name]: event.target.checked });
    };

    const handleDeliveryChange = (event) => {
        setDelivery({ ...delivery, [event.target.name]: event.target.checked });
    };
    
    // Get QueryCache from the context
    const queryCache = useQueryCache();

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

            var curTime = moment();

            let postImage = []
            // for (var p in pictures) {
            //     const pic = pictures[p][p];
            //     console.log("**************" + p);
            //     console.log(pic)
            //     const url = await mutate1({ pic });
            //     console.log(url);
            //     postImage.push({
            //         postImage: url,
            //     });
            // }
            
            const data = await mutate({ values, trans, deliv, curTime, userName, postImage})

            queryCache.invalidateQueries(['home', '/'])
            queryCache.invalidateQueries(['UserAllInfo', 'userinfo/getUserInfo/'])
            history.push(`/item/${data.data.postId}`);            
        } catch(e) {
            console.log(e)
        }
    }

    if (isLoading || il) {
        console.log("Loading")
    }

    if (isError || ie) {
        console.log(error)
        history.push("/login");
    }

//--------------------------------------------------------------------------------------------------//

    return (
        
=======
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    

    const handleCheckboxChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.checked });
    };


    return (
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
        <Container maxWidth="lg">
            <div>
                <Grid 
                    container 
                    direction="row" 
                    justify="space-between" 
                    alignItems="baseline"
                >
<<<<<<< HEAD
                    <Link to="/" variant="body2">
=======
                    <Link href="#" variant="body2">
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
                        back to home
                    </Link>
        
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<Icon>send</Icon>}
                        disableElevation
<<<<<<< HEAD
                        onClick={onPostClick}
=======
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
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
<<<<<<< HEAD
                                    <MenuItem value={"used"}>Used</MenuItem>
                                    <MenuItem value={"acceptable"}>Acceptable</MenuItem>
                                    <MenuItem value={"like new"}>Like New</MenuItem>
                                    <MenuItem value={"brand new"}>Brand New</MenuItem>
=======
                                    <MenuItem value={1}>Used</MenuItem>
                                    <MenuItem value={2}>Acceptable</MenuItem>
                                    <MenuItem value={3}>Like New</MenuItem>
                                    <MenuItem value={4}>Brand New</MenuItem>
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
                                </Select>
                            </FormControl>


                            <TextField
                                id="item-description"
                                label="Description"
                                multiline
                                rows={10}
<<<<<<< HEAD
=======
                                defaultValue="Describe your item here..."
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
                                variant="outlined"
                                value={values.description}
                                onChange={handleChange('description')}
                            />
                            
                        </form>
                    </Grid>

<<<<<<< HEAD
                    <Grid item xs={4} className={classes.middleGrid}>
=======
                    <Grid item xs={4}>
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
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
<<<<<<< HEAD
                                    required id="item-zipcode"
                                    label="Zip Code"
                                    variant="outlined"
                                    value={values.zipcode}
                                    onChange={handleChange('zipcode')}
=======
                                    required id="item-postalcode"
                                    label="Postal Code"
                                    variant="outlined"
                                    value={values.postalcode}
                                    onChange={handleChange('postalcode')}
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
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
<<<<<<< HEAD
                                        control={<Checkbox  checked={transaction.paypal} onChange={handleTransactionChange} color="primary" name="paypal" />}
=======
                                        control={<Checkbox  checked={values.paypal} onChange={handleCheckboxChange} color="primary" name="paypal" />}
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
                                        className={classes.check2}
                                        label="PayPal"
                                    />
                                    <FormControlLabel
<<<<<<< HEAD
                                        control={<Checkbox checked={transaction.quickpay} onChange={handleTransactionChange} color="primary" name="quickpay" />}
=======
                                        control={<Checkbox checked={values.quickpay} onChange={handleCheckboxChange} color="primary" name="quickpay" />}
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
                                        className={classes.check2}
                                        label="QuickPay"
                                    /> 
                                    <FormControlLabel
<<<<<<< HEAD
                                        control={<Checkbox checked={transaction.venmo} onChange={handleTransactionChange} color="primary" name="venmo" />}
=======
                                        control={<Checkbox checked={values.venmo} onChange={handleCheckboxChange} color="primary" name="venmo" />}
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
                                        className={classes.check2}
                                        label="Venmo"
                                    />                                    
                                    <FormControlLabel
<<<<<<< HEAD
                                        control={<Checkbox checked={transaction.cash} onChange={handleTransactionChange} color="primary" name="cash" />}
=======
                                        control={<Checkbox checked={values.cash} onChange={handleCheckboxChange} color="primary" name="cash" />}
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
                                        className={classes.check2}
                                        label="Cash"
                                    />                                    
                                </FormGroup>
                            </FormControl>

                            <FormControl className={classes.checkbox}>
                                <FormLabel>Delivery Methods</FormLabel>
                                <FormGroup row >
                                    <FormControlLabel
<<<<<<< HEAD
                                        control={<Checkbox checked={delivery.dropoff} onChange={handleDeliveryChange} color="primary" name="dropoff" />}
=======
                                        control={<Checkbox checked={values.dropoff} onChange={handleCheckboxChange} color="primary" name="dropoff" />}
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
                                        className={classes.check1}
                                        label="Drop off"
                                    />
                                    <FormControlLabel
<<<<<<< HEAD
                                        control={<Checkbox checked={delivery.pickup} onChange={handleDeliveryChange} color="primary" name="pickup" />}
=======
                                        control={<Checkbox checked={values.pickup} onChange={handleCheckboxChange} color="primary" name="pickup" />}
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
                                        className={classes.check1}
                                        label="Pick Up"
                                    />
                                </FormGroup>
                            </FormControl>
                        </form>
                    </Grid>

                    <Grid item xs={4}>
<<<<<<< HEAD
                        <Paper className={classes.upload} elevation={1}>
                           <Carousel className={classes.carousel} heightMode="first">
                                <img src="https://laiproject-bucket.s3-us-west-1.amazonaws.com/2020-11-17T20:01:35.605436_placeholder.png" />
                                <img src="https://laiproject-bucket.s3-us-west-1.amazonaws.com/2020-11-17T20:01:35.605436_placeholder.png" />
                            </Carousel>

                            <input
                                accept="image/*"
                                className={classes.input}
                                id="image-upload"
                                multiple
                                type="file"
                            />
                            <label htmlFor="image-upload">
                                <Button 
                                    className={classes.uploadButton} 
                                    variant="contained" 
                                    color="primary" 
                                    component="span"
                                    startIcon={<PhotoCameraIcon />}>
                                    Upload 
                                </Button>
                            </label>
                        </Paper>

                        <Container fixed>
                            <img 
                                src="https://laiproject-bucket.s3-us-west-1.amazonaws.com/2020-11-17T20:07:30.618222_OneMoreSaleLogo.png" 
                                className={classes.Logo}
                            />
                        </Container>
                        
=======
                        <Carousel className={classes.carousel} heightMode="current">
                            <img src="https://source.unsplash.com/aZjw7xI3QAA/1144x763" />
                            <img src="https://source.unsplash.com/c77MgFOt7e0/1144x763" />
                            <img src="https://source.unsplash.com/QdBHnkBdu4g/1144x763" />
                        </Carousel>
                        <UploadImage className={classes.uploadImage} />
                        <Typography variant="caption" className={classes.warning}>
                            Please make sure your information is correct.
                        </Typography>
>>>>>>> 4d00a8a97f5f022bbdb30929e23eb309a6da4676
                    </Grid>
                </Grid>
                <Divider variant="fullWidth"/>
            </div>

        </Container>
    );
}