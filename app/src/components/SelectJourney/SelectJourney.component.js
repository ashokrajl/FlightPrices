import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function ControlledOpenSelect(props) {
    const classes = useStyles();
    const [route, setRoute] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = event => {
        props.changeRoute(event.target.value);
        setRoute(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <form autoComplete="off">
            <Button className={classes.button} onClick={handleOpen}>
                Select your route
            </Button>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-controlled-open-select">route</InputLabel>
                <Select
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={route}
                    onChange={handleChange}
                    inputProps={{
                        route: 'route',
                        id: 'demo-controlled-open-select',
                    }}
                >
                    <MenuItem value={"SIN – KUL"}>SIN – KUL</MenuItem>
                    <MenuItem value={"KUL – SIN"}>KUL – SIN</MenuItem>
                    <MenuItem value={"KUL – SFO"}>KUL – SFO</MenuItem>
                </Select>
            </FormControl>
        </form>
    );
}
