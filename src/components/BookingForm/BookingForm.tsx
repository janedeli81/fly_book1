import React from 'react';
import Calendar from "./Calendar";

export default function BookingForm(){
    return(
        <div>
            <Calendar startDate={new Date()}/>
        </div>
    )
}
