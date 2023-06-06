import React, { useState } from 'react';
import {Box, Button, Modal, TextField} from "@mui/material";
import {Link} from "react-router-dom";

interface User {
    email: string;
    password: string;
}

// Styles+
// Eslint
// move currentUserEmail to function args
// Formatting (state to the top)+
// localstorage helpers
// extract types to separate file+
// function 'return' usage
// Comments for regexp+

let currentUserEmail: string = '';
const SignUp = () => {
    const [user, setUser] = useState<User>({ email: '', password: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    const boxStyle = {
        width: 300, p: 2,
        borderRadius: '4px',
        textAlign: 'center'
    }


    function isFirstSignUp() {
        const usersJson = localStorage.getItem("users");
        const usersArr = JSON.parse(usersJson || '[]');
        return !usersArr.some((user: { email: string; }) => user.email === currentUserEmail);
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validatePassword = (password: string) => {
        const errors: { [key: string]: string } = {};
        //string contains at least one digit,
        // one lowercase letter, and one uppercase letter,
        // consists of 8 to 36 alphanumeric characters.
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,36}$/;

        if (!regex.test(password)) {
            errors.password =
                'Password must be between 8 and 36 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.';
        }

        if (/[а-яА-ЯЁё]/.test(password)) {
            errors.password = 'Password cannot contain Cyrillic characters.';
        }

        return errors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const passwordErrors = validatePassword(user.password);
        currentUserEmail = user.email;
        let existingUsers: User[];

        if (Object.keys(passwordErrors).length) {
            setErrors(passwordErrors);
        } else {
            let usersArrayJson = localStorage.getItem('users');

            existingUsers = JSON.parse(usersArrayJson || '[]');

            if (isFirstSignUp()) {
                existingUsers.push(user);
                localStorage.setItem('users', JSON.stringify(existingUsers));
            } else {
                const userExists = existingUsers.some(existingUser => existingUser.email === currentUserEmail);
                if (userExists) {
                    const currentUser = existingUsers.find(existingUser => existingUser.email === currentUserEmail);
                    if (currentUser?.password === user.password) {
                        setModalMessage('Password is the same');
                    } else {
                        setModalMessage('Wrong password');
                    }
                    setIsModalOpen(true);
                }
            }
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    };



    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField

                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
            />
            <TextField

                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
            />
            <Modal open={isModalOpen} onClose={closeModal}>
                <Box sx={boxStyle}>
                    <h2>Modal Title</h2>
                    <p>{modalMessage}</p>
                    <Button variant="contained" onClick={closeModal}>Close</Button>
                </Box>
            </Modal>
            <Button  type="submit" variant="contained" color="primary">
                <Link to="/booking">Go to Booking</Link>
            </Button>
        </form>
    );
};

export default SignUp;
