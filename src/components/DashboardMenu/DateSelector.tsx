// src/components/DashboardMenu/DateSelector.tsx
import { TextField, Box } from '@mui/material';

interface DateSelectorProps {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
    </Box>
  );
};

export default DateSelector;
