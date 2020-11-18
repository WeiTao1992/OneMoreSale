import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled({
  currentPage,
  totalNumbers,
  changePage,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(currentPage);
  const handleChange = (event, value) => {
    setPage(value);
    changePage(value);
  };

  return (
    <div className={classes.root}>
      <Pagination color = "primary" count={totalNumbers} page={page} onChange={handleChange} />
    </div>
  );
}
