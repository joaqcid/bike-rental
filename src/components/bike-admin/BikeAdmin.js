import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Switch, Button, IconButton, Icon } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import BikeFormDialog from './BikeFormDialog'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
  },
  table: {
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class BikeAdmin extends Component {

  handleDelete(event, key) {
    const { firebase } = this.props;
    firebase.ref(`/bikes/${key}`).set(null);
  }

  handleEdit(event, key) {
    const { firebase } = this.props;
    firebase.ref(`/bikes/${key}`).set(null);
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
              <TableCell>
                <IconButton className={classes.button} aria-label="Edit" onClick={event => this.handleEdit(event, key)} >
                  <Icon>edit</Icon>
                </IconButton>
                <IconButton className={classes.button} aria-label="Delete" onClick={event => this.handleDelete(event, key)}>
                  <Icon>delete</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          )
        )

    return (
      <div>
        <BikeFormDialog />
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bikesList}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  firebaseConnect([
    'bikes'
  ]),
  connect((state) => {
    return {
      bikes: state.firebase.data.bikes,
    }
  })
)(BikeAdmin)