import React from 'react';
// import { Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';

const RegistrationPage: React.FC = () => {
    return (
        <div>
            <h1>Registration Page</h1>
            <RegistrationForm />
            {/*<Link to="/booking">Go to Booking</Link>*/}


        </div>
    );
};

export default RegistrationPage;
