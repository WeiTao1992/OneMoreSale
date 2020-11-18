import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { capitalize } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup({
  curCategory,
  changeCategory,
}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    Automotive: false,
    Beauty: false,
    Books: false,
    Beauty: false,
    Books: false,
    Clothing: false,
    Computers: false,
    Electronics: false,
    Handmade: false,
    Home: false,
    Movies: false,
    Outdoors: false,
    Pet: false,
    Sports: false,
    Toys: false,
  });

  const handleChange = (event) => {

    setState({ ...state, [event.target.name]: event.target.checked });

    if(event.target.checked) {
      curCategory.push(event.target.name);
      changeCategory(curCategory);
    } else {
      var index = curCategory.indexOf(event.target.name);
      if (index > -1) {
        curCategory.splice(index, 1);
      }
      changeCategory(curCategory);
    }
    
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Category</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={state.Automotive} onChange={handleChange} name="Automotive" />}
            label="Automotive & industrial"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Beauty} onChange={handleChange} name="Beauty" />}
            label="Beauty & Health"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Books} onChange={handleChange} name="Books" />}
            label="Books"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Clothing} onChange={handleChange} name="Clothing" />}
            label="Clothing, Shoes, Jewelry & Watches"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Computers} onChange={handleChange} name="Computers" />}
            label="Computers"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Electronics} onChange={handleChange} name="Electronics" />}
            label="Electronics"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Handmade} onChange={handleChange} name="Handmade" />}
            label="Handmade"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Home} onChange={handleChange} name="Home" />}
            label="Home, Garden & Tools"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Movies} onChange={handleChange} name="Movies" />}
            label="Movies, Music & Games"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Outdoors} onChange={handleChange} name="Outdoors" />}
            label="Outdoors"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Pet} onChange={handleChange} name="Pet" />}
            label="Pet Supplies"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Sports} onChange={handleChange} name="Sports" />}
            label="Sports"
          />
          <FormControlLabel
            control={<Checkbox checked={state.Toys} onChange={handleChange} name="Toys" />}
            label="Toys, Kids & Baby"
          />
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
    
    </div>
  );
}
