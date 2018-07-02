import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux'
import { compose } from 'redux'

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3,
    },
});

class BikeRow extends Component {
    render() {
        <TableRow key={key}>
            <TableCell>{key}</TableCell>
            <TableCell>{bikes[key].model}</TableCell>
            <TableCell>{bikes[key].color}</TableCell>
            <TableCell numeric>{bikes[key].weight}</TableCell>
            <TableCell>{bikes[key].location}</TableCell>
            <TableCell>{bikes[key].available ? 'yes' : 'no'}</TableCell>
            <TableCell>
                <IconButton className={classes.button} aria-label="Edit" onClick={event => this.handleEdit(event, key, bikes[key])} >
                    <Icon>edit</Icon>
                </IconButton>
                <IconButton className={classes.button} aria-label="Delete" onClick={event => this.handleDelete(event, key)}>
                    <Icon>delete</Icon>
                </IconButton>
            </TableCell>
        </TableRow>
    }
}

export default compose(
    withStyles(styles),
    firebaseConnect(['...']),
    connect((state) => ({
        ...: state.firebase.data....,
    })),
)(BikeRow)
