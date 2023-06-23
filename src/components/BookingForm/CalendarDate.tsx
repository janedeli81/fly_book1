import React from 'react';
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {DateProps} from "./types";


const CalendarDate: React.FC<DateProps> = ({ date }) => {
    const calendarCellStyle = {
        border: '1px solid #ccc',
        borderRadius: '4px',
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const currentUserJson = localStorage.getItem('currentUser')
    let userObject = JSON.parse(currentUserJson || '{}');
    const currentUserEmail = userObject.email;


    const [open, setOpen] = React.useState(false);

    return <Card style={calendarCellStyle}>

        {date}
        <br/> 10-00
        <Button
            variant={"contained"}
            size={'small'}
            style={{backgroundColor: 'yellow', color: 'black'}}
            onClick={handleClickOpen}
        >Book</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Booking Information</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please, enter your email to confirm order
                </DialogContentText>
                <TextField
                    type="email"
                    name="email"
                    value={currentUserEmail}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>

        <br/> 14-00 <Button variant={"contained"}
                            size={'small'}
                            style={{backgroundColor: 'yellow', color: 'black'}}
                            onClick={handleClickOpen}
    >Book</Button>
        <br/> 20-00 <Button variant={"contained"}
                            size={'small'}
                            style={{backgroundColor: 'yellow', color: 'black'}}
                            onClick={handleClickOpen}
    >Book</Button>

    </Card>;
};

export default CalendarDate;
