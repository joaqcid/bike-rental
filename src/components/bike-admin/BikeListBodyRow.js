import React, { Component } from 'react'
import { TableRow, TableCell, IconButton, Icon } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3,
    },
});

class BikeListBodyRow extends Component {
    handleDelete(event, fid) {
        const { firebase } = this.props;
        firebase.ref(`/bikes/${fid}`).set(null);
    }

    render() {
        const { fid, bike, classes, openBikeFormDialog } = this.props;
        return (
            <TableRow key={fid}>
                <TableCell>{fid}</TableCell>
                <TableCell>{bike.model}</TableCell>
                <TableCell>{bike.color}</TableCell>
                <TableCell numeric>{bike.weight}</TableCell>
                <TableCell>{bike.location}</TableCell>
                <TableCell>{bike.available ? 'yes' : 'no'}</TableCell>
                <TableCell>
                    <IconButton className={classes.button} aria-label="Edit" onClick={event => openBikeFormDialog(event, fid, bike)} >
                        <Icon>edit</Icon>
                    </IconButton>
                    <IconButton className={classes.button} aria-label="Delete" onClick={event => this.handleDelete(event, fid)}>
                        <Icon>delete</Icon>
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }
}

export default compose(
    withStyles(styles),
    firebaseConnect()
)(BikeListBodyRow)