import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Switch, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
  },
  table: {
  },
});

class BikeAdmin extends Component {
  // Build Todos list if todos exist and are loaded  

  handleAdd() {
    const { firebase } = this.props;    
    firebase.ref('/bikes').push().set({model:'fuji 22'});    
  }

  render() {
    const { classes, bikes } = this.props;
    const bikesList = !isLoaded(bikes)
      ? <TableRow><TableCell>Loading...</TableCell></TableRow>
      : isEmpty(bikes)
        ? <TableRow><TableCell>Empty</TableCell></TableRow>
        : Object.keys(bikes).map(
          (key, id) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{bikes[key].model}</TableCell>
              <TableCell>{bikes[key].color}</TableCell>
              <TableCell numeric>{bikes[key].weight}</TableCell>
              <TableCell>{bikes[key].location}</TableCell>
              <TableCell>{bikes[key].available ? 'yes' : 'no'}</TableCell>
            </TableRow>
          )
        )

    return (
      <div>
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

        <Button onClick={this.handleAdd.bind(this)}>
          Add
        </Button>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  firebaseConnect([
    'bikes' // { path: '/todos' } // object notation
  ]),
  connect((state) => ({
    bikes: state.firebase.data.bikes,
    // profile: state.firebase.profile // load profile
  }))
)(BikeAdmin)