import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

export function Calendario({ onTimeSelect }) {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 600);

  const handleDateChange = (newValue) => {
    if (newValue && !newValue.isSame(selectedDate)) {
      setSelectedDate(newValue);
      if (onTimeSelect) {
        onTimeSelect(newValue);
      }
    }
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          margin: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          marginBottom: '15px',
        }}
      >
        {isMobile ? (
          <MobileDateTimePicker
            value={selectedDate}
            onChange={handleDateChange}
            disableCloseOnSelect
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        ) : (
          <StaticDateTimePicker
            value={selectedDate}
            onChange={handleDateChange}
            orientation="landscape"
            disableCloseOnSelect
            sx={{
              width: '100%',
              height: '100%',
              '& .MuiStaticDateTimePicker-root': {
                width: '100%',
                height: '100%',
              },
            }}
          />
        )}
      </Box>
    </LocalizationProvider>
  );
}
