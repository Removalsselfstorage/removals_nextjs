import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from '@/utils/theme';
import { NonceProvider } from 'react-select';
import dayjs from 'dayjs';

export default function BasicDatePicker({setDateValue, dateValue}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        format="DD-MM-YYYY"
        disablePast
        slotProps={
          {
            // textField: { size: 'medium' }
            // layout: {sx: ''}
          }
        }
        sx={{
          bgcolor: 'white',
          boxShadow: 0,
          borderRadius: 2,
          border: 0,
          opacity: 1,
        //   outline: ,
        //   borderColor: 'red',
          // p: 0,
        //   minWidth: 300,
          color: colors.primary,
          height: 45,
        //   weight: 60,
        //   padding: 2,
          '&:hover': {
            color: colors.primary,
            // backgroundColor: 'white',
          },
          
        }}
        value={dateValue}
        onChange={(newValue) => setDateValue(newValue)}
        // defaultValue={dayjs('2023-07-20')}
      />
    </LocalizationProvider>
  );
}
