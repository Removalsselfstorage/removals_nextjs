import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';


const MuiCalendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker 
      orientation='portrait'
      disablePast 
      />
    </LocalizationProvider>
  );
};

export default MuiCalendar;
