import React, { Component } from 'react'
import { compose } from 'redux'
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
    isOpenBikeFormDialog: false,
    bike: {}
  }

  openBikeFormDialog(event, fid, bike) {
    this.setState((prevState, props) => ({
      isOpenBikeFormDialog: true,
      bike: {
        ...bike,
        fid,
      }
    }));    
  }

  closeBikeFormDialog() {
    this.setState((prevState, props) => ({
      isOpenBikeFormDialog: false
    }));    
  }

  render() {
    return (
      <div>
        <BikeFormDialog isOpen={this.state.isOpenBikeFormDialog} bike={this.state.bike} closeBikeFormDialog={this.closeBikeFormDialog.bind(this)} />
        <BikeList openBikeFormDialog={this.openBikeFormDialog.bind(this)} />
      </div>
    )
  }
}

export default compose(
  withStyles(styles)
)(BikeAdmin)