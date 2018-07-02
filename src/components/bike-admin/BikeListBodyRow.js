import React, { Component } from 'react'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Switch, Button, IconButton, Icon } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3,
    },
});

class BikeListBodyRow extends Component {
    handleDelete(event, key) {
        const { firebase } = this.props;
        firebase.ref(`/bikes/${key}`).set(null);
    }

    handleEdit(event, key, item) {
        this.setState({
            openEdit: true,
            bike: item,
        });
    }

    render() {
        const { key, bike, classes } = this.props;
        return (
            <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{bike.model}</TableCell>
                <TableCell>{bike.color}</TableCell>
                <TableCell numeric>{bike.weight}</TableCell>
                <TableCell>{bike.location}</TableCell>
                <TableCell>{bike.available ? 'yes' : 'no'}</TableCell>
                <TableCell>
                    <IconButton className={classes.button} aria-label="Edit" onClick={event => this.handleEdit(event, key, bike)} >
                        <Icon>edit</Icon>
                    </IconButton>
                    <IconButton className={classes.button} aria-label="Delete" onClick={event => this.handleDelete(event, key)}>
                        <Icon>delete</Icon>
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(BikeListBodyRow)