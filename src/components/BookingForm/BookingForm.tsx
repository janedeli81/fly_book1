import React from 'react';
import Calendar from "./Calendar";
import FormatSelect from "./FormatSelect";

export default function BookingForm(){
    return(
        <div>
            <FormatSelect/>
            <Calendar startDate={new Date()} date={0}/>
        </div>
    )
}
