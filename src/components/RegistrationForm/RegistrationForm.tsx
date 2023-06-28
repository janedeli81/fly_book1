import React, { useState } from 'react';
import {
    Box,
    Button, FormControl,
    IconButton,
    InputAdornment, InputLabel,
    Modal, OutlinedInput,
    TextField
} from "@mui/material";
import {Link} from "react-router-dom";

import {Visibility, VisibilityOff} from "@mui/icons-material";
import {storage} from "../../shared/storage";

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
// function 'return' usage+
// Comments for regexp+


const boxStyle = {
    width: 300, p: 2,
    borderRadius: '4px',
    textAlign: 'center'
}
const SignUp = () => {
    const [user, setUser] = useState<User>({ email: '', password: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // function handleInputChange for 2 state - email & password:
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    //
    // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value } = e.target;
    //     setEmail(value);
    // };
    //
    // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value } = e.target;
    //     setPassword(value);
    // };
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
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentUserEmail = user.email;
        const passwordErrors = validatePassword(user.password);
        let existingUsers: User[];



        if (Object.keys(passwordErrors).length) {
            setErrors(passwordErrors);
            setTimeout(() => {
                setErrors({});
            }, 2000); // 2-second timeout for password errors
        } else {

            existingUsers = storage.getObjectFromStorage('users');


            if (isFirstSignUp(currentUserEmail)) {
                existingUsers.push(user);
                localStorage.setItem('users', JSON.stringify(existingUsers));
                return;
            }

            const userExists = existingUsers.some(existingUser => existingUser.email === currentUserEmail);

            if (!userExists) {
                return;
            }
            const currentUser = existingUsers.find(existingUser => existingUser.email === currentUserEmail);
            if (currentUser?.password === user.password) {
                setModalMessage('Password is the same');
            } else {
                setModalMessage('Wrong password');
            }
            setIsModalOpen(true);

            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    };


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    // function for InputAdornment - ?moving to localstorage is not work with it.
    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    //
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
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
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={user.password}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
                />
            {/*<FormControl variant="outlined" fullWidth>*/}
            {/*    <InputLabel htmlFor="password">Password</InputLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="password"*/}
            {/*        type={showPassword ? 'text' : 'password'}*/}
            {/*        name="password"*/}
            {/*        endAdornment={*/}
            {/*            <InputAdornment position="end">*/}
            {/*                <IconButton*/}
            {/*                    aria-label="toggle password visibility"*/}
            {/*                    onClick={handleClickShowPassword}*/}
            {/*                    onMouseDown={handleMouseDownPassword}*/}
            {/*                    edge="end"*/}
            {/*                >*/}
            {/*                    {showPassword ? <VisibilityOff /> : <Visibility />}*/}
            {/*                </IconButton>*/}
            {/*            </InputAdornment>*/}
            {/*        }*/}
            {/*        label="Password"*/}
            {/*    />*/}
            {/*</FormControl>*/}




            <Modal open={isModalOpen} onClose={closeModal}>
                <Box sx={boxStyle}>
                    <h2>Modal Title</h2>
                    <p>{modalMessage}</p>
                    <Button variant="contained" onClick={closeModal}>Close</Button>
                </Box>
            </Modal>
            <Button type="submit" variant="contained" color="primary">
                <Link  to="/booking">OK</Link>
            </Button>
        </form>


    );
};

function isFirstSignUp(currentUserEmail:string) {
    const usersJson = localStorage.getItem("users");
    const usersArr = JSON.parse(usersJson || '[]');
    return !usersArr.some((user: { email: string; }) => user.email === currentUserEmail);
}

export default SignUp;
