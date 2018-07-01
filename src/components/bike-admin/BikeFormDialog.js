import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Checkbox } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
  }
});

class BikeFormDialog extends React.Component {
  state = {
    open: false,
    bike: {}
  };

  addBike() {
    const { bike } = this.state;
    this.props.firebase.ref('bikes').push(bike);
    this.setState({ open: false });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      bike: {
        ...this.state.bike,
        [name]: event.target.value,
      }
    })
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen} className={classes.button} color="primary" variant="contained">Add new bike</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a bike
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="model"
              label="Model"
              type="string"
              fullWidth
              onChange={this.handleChange('model').bind(this)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="color"
              label="Color"
              type="string"
              onChange={this.handleChange('color').bind(this)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="weight"
              label="Weight"
              type="number"
              onChange={this.handleChange('weight').bind(this)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              label="Location"
              type="string"
              onChange={this.handleChange('location').bind(this)}
              fullWidth
            />
            <Checkbox
              color="primary"
              checked={this.state.checkedA}
              onChange={this.handleChange('available').bind(this)}
              value="available"
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addBike.bind(this)} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  firebaseConnect([
    'bikes' // { path: '/todos' } // object notation
  ])
)(BikeFormDialog)