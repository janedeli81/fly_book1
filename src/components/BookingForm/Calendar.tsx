import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { format, addMonths, subMonths } from 'date-fns';
import CalendarDate from './CalendarDate';

interface CalendarProps {
    startDate: Date;
}

const Calendar: React.FC<CalendarProps> = ({ startDate = new Date() }) => {
    const [currentMonth, setCurrentMonth] = useState(startDate);

    const handlePrevMonth = () => {
        setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const lastDayOfMonth:number = new Date(year, month + 1, 0).getDate();
        return lastDayOfMonth;
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

        const calendarContainerStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        const monthTextStyle = {
            margin: '0 16px',
        };

        const iconButtonStyle = {
            padding: '8px',
        };

        const calendarGridStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
        };

        const calendarCells = [];

        // Fill in empty cells before the start of the month
        for (let i = 0; i < monthStart; i++) {
            calendarCells.push(<CalendarDate key={`empty-${i}`} date={0}/>);
        }

        // Render days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            calendarCells.push(<CalendarDate key={`day-${day}`} date={day} />);
        }

        return (
            <div>
                <div style={calendarContainerStyle}>
                    <IconButton style={iconButtonStyle} onClick={handlePrevMonth}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <div style={monthTextStyle}>{format(currentMonth, 'MMMM yyyy')}</div>
                    <IconButton style={iconButtonStyle} onClick={handleNextMonth}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <div style={calendarGridStyle}>{calendarCells}</div>
            </div>
        );
    };

    return <div>{renderCalendar()}</div>;
};

export default Calendar;
