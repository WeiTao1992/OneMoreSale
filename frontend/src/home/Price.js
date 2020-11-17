import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});



export default function Price({
  changePrice,
  curPrice,

}) {
  function valuetext(value) {
    changePrice(value);
    return `${value}`;
  }
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Min Price
      </Typography>
      <Slider
      //FIXME: default
        defaultValue={curPrice}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
      />
      
    </div>
  );
}
