import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Icon, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const managerMenuListItems = (
    <div>
        <Link to="bikes" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <Icon>directions_bike</Icon>
                </ListItemIcon>
                <ListItemText primary="Bikes" />
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <Icon>person</Icon>
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="Bookings" />
        </ListItem>
    </div>
);

export const userMenuListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <Icon>directions_bike</Icon>
            </ListItemIcon>
            <ListItemText primary="Bikes" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="My Reservations" />
        </ListItem>
    </div>
);