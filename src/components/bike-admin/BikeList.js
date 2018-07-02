import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Switch, Button, IconButton, Icon } from '@material-ui/core'

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3,
    },
});

class LoadingRow extends Component {
    render() {
        return (
            <TableRow><TableCell>Loading...</TableCell></TableRow>
        )
    }
}

class NoResultsFoundRow extends Component {
    render() {
        return (
            <TableRow><TableCell>No results found</TableCell></TableRow>
        )
    }
}

class BikeBodyRow extends Component {
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
withStyles(styles)(BikeBodyRow)

class BikeList extends Component {
    render() {
        const { classes, bikes } = this.props;
        const bikesList = !isLoaded(bikes) ?
            <LoadingRow />
            : isEmpty(bikes) ?
                <NoResultsFoundRow />
                : Object.keys(bikes).map(
                    (key, id) => (<BikeBodyRow key={key} bike={bikes[key]} />)
                )

        return (
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
        )
    }
}

export default compose(
    withStyles(styles),
    firebaseConnect(['bikes']),
    connect((state) => ({
        bikes: state.firebase.data.bikes,
    })),
)(BikeList)