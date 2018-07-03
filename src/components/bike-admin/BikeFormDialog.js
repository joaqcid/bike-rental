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
  }
});

class BikeFormDialog extends React.Component {

  ok() {
    if (this.props.action === 'create')
      this.addBike();
    else
      this.editBike();

    this.props.close();
  }

  addBike() {
    const { bike } = this.props;
    this.props.firebase.ref('bikes').push(bike);
  }

  editBike() {
    const { bike } = this.props;
    this.props.firebase.ref(`bikes/${this.props.fid}`).update(bike);
  }

  render() {
    const { classes, action, close, bike, isOpen, handleChange } = this.props;
    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={close.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{action === 'create' ? 'Create Bike' : 'Edit Bike'}</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="model"
              label="Model"
              type="string"
              fullWidth
              onChange={handleChange('model').bind(this)}
              value={bike.model}
              inputProps={{ tabIndex: 1 }}
            />
            <TextField
              margin="dense"
              id="color"
              label="Color"
              type="string"
              onChange={handleChange('color').bind(this)}
              fullWidth
              value={bike.color}
              inputProps={{ tabIndex: 2 }}
            />
            <TextField
              margin="dense"
              id="weight"
              label="Weight"
              type="number"
              onChange={handleChange('weight').bind(this)}
              fullWidth
              value={bike.weight}
              inputProps={{ tabIndex: 3 }}
            />
            <TextField
              margin="dense"
              id="location"
              label="Location"
              type="string"
              onChange={handleChange('location').bind(this)}
              fullWidth
              value={bike.location}
              inputProps={{ tabIndex: 4 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={handleChange('available').bind(this)}
                  value="available"
                  checked={bike.available}
                  inputProps={{ tabIndex: 5 }}
                />
              }
              label="Available"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={close.bind(this)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.ok.bind(this)}
              color="primary"
            >
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