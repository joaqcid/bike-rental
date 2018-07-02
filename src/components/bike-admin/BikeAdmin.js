import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Switch, Button, IconButton, Icon } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import BikeFormDialog from './BikeFormDialog'
import BikeList from './BikeList'

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

  state = {
    isOpen: false,
    bike: {}
  }

  toggleDialog(){
    this.setState({
      openEdit: !this.state.openEdit,      
    });
  }

  render() {
    const { classes, bikes } = this.props;

    return (
      <div>
        <BikeFormDialog isOpen={this.state.openEdit} bike={this.state.bike} toggleDialog={this.toggleDialog.bind(this)} />
        <BikeList />        
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