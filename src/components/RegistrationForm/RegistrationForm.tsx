import React, { useState } from 'react';
import {Box, Button, Modal, TextField} from "@mui/material";

interface User {
    email: string;
    password: string;
}

let currentUserEmail: string = '';
const SignUp = () => {
    const [user, setUser] = useState<User>({ email: '', password: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    function isFirstSignUp() {
        const usersJson = localStorage.getItem("users");
        const usersArr = JSON.parse(usersJson || '[]');
        return !usersArr.some((user: { email: string; }) => user.email === currentUserEmail);
    }




    // function registerNewUser() {
    //
    // }
    //
    // function goToMainPage() {
    //
    // }
    //
    // function isUserPasswordSame() {
    //     return false;
    // }
    //
    // function showLoginErrow() {
    //
    // }
    //
    // if (isFirstSignUp()) {
    //     //- якщо юзер входить вперше - це означає реєстрацію + авто вхід.
    //     registerNewUser();
    //     goToMainPage();
    // } else {
    //     if (isUserPasswordSame()) {
    //         // - якщо юзер входить не вперше - перевіряємо чи співпадають паролі (дістаємо існуючих юзеров з local storage),
    //         goToMainPage();
    //     } else {
    //         // якщо ні - показуємо помилку входу.
    //         showLoginErrow();
    //     }
    //
    // }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validatePassword = (password: string) => {
        const errors: { [key: string]: string } = {};
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


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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
                <Box sx={{ width: 300, p: 2, bgcolor: 'background.paper', borderRadius: '4px', textAlign: 'center' }}>
                    <h2>Modal Title</h2>
                    <p>{modalMessage}</p>
                    <Button variant="contained" onClick={closeModal}>Close</Button>
                </Box>
            </Modal>
            <Button  type="submit" variant="contained" color="primary">
                Go to booking!
            </Button>
        </form>
    );
};

export default SignUp;
