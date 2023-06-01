import React from 'react';
import { Link } from 'react-router-dom';
import BookingForm from "../components/BookingForm/BookingForm";

const BookingPage: React.FC = () => {
    return (
        <div>
            <h1>Booking Page</h1>
            <BookingForm />
            <Link to="/">Go to Registration</Link>
        </div>
    );
};

export default BookingPage;
