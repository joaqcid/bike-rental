import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

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
    this.props.closeBikeFormDialog();
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
    const { classes, bike } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen} className={classes.button} color="primary" variant="contained">Add new bike</Button>
        <Dialog
          open={this.state.open || this.props.isOpen}
          onClose={this.handleClose.bind(this)}
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
              value={bike.model}
            />
            <TextField
              autoFocus
              margin="dense"
              id="color"
              label="Color"
              type="string"
              onChange={this.handleChange('color').bind(this)}
              fullWidth
              value={bike.color}
            />
            <TextField
              autoFocus
              margin="dense"
              id="weight"
              label="Weight"
              type="number"
              onChange={this.handleChange('weight').bind(this)}
              fullWidth
              value={bike.weight}
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              label="Location"
              type="string"
              onChange={this.handleChange('location').bind(this)}
              fullWidth
              value={bike.location}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={this.state.checkedA}
                  onChange={this.handleChange('available').bind(this)}
                  value="available"
                  checked={bike.available}
                />
              }
              label="Available"
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
    'bikes'
  ])
)(BikeFormDialog)