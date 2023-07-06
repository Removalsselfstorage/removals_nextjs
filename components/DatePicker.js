import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from '@/utils/theme';

export default function BasicDatePicker() {
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
          boxShadow: 1,
          borderRadius: 2,
          border: 1,
        //   borderColor: 'red',
          // p: 0,
          minWidth: 300,
          color: colors.primary,
          height: 56,
          '&:hover': {
            color: colors.primary,
            // backgroundColor: 'white',
          },
          
        }}
      />
    </LocalizationProvider>
  );
}
