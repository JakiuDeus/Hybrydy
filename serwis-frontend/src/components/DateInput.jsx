import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateInput(props) {
    const [date, setValue] = React.useState(dayjs());


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Data zgłoszenia"
                    value={date}
                    onChange={(newValue) => setValue(newValue)}
                />
        </LocalizationProvider>
    );
}
