import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
  },
  table: {
  },
});

function BikeAdmin({ bikes, firebase }) {
  const { classes } = props;

  const bikesList = !isLoaded(bikes)
    ? 'Loading'
    : isEmpty(bikes)
      ? 'Bike list is empty'
      : Object.keys(bikes).map(
        (key, id) => (
          <TableRow key={key}>
            <TableCell component="th" scope="row">
              {bikes[key].model} {id}
            </TableCell>            
          </TableRow>
        )
      )

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bikesList}
        </TableBody>
      </Table>
    </Paper>
  );
}

BikeAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  firebaseConnect((props) => {
    return [
      { path: '/bikes' }, // object notation
    ]
  }),
  connect((state) => ({
    bikes: state.firebase.data.bikes,
    // profile: state.firebase.profile // load profile
  }))
  // firebaseConnect((props) => {
  //   // Set listeners based on props (prop is route parameter from react-router in this case)
  //   return [
  //     { path: `todos/${props.params.todoId}` }, // create todo listener
  //     // `todos/${props.params.todoId}` // equivalent string notation
  //   ]
  // }),
  // connect(({ firebase }, props) => ({
  //   todo: getVal(firebase, `data/todos/${props.params.todoId}`), // lodash's get can also be used
  // }))
)(BikeAdmin)
// withStyles(styles)(BikeAdmin)