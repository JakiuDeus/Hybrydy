import * as React from "react";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

export default function Potential() {
    const [potentialDate, setValue] = React.useState(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Szac. ukończenie"
                value={potentialDate}
                onChange={(newValue) => setValue(newValue)}
            />
        </LocalizationProvider>
    );
}