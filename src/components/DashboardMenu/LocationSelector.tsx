// src/components/DashboardMenu/LocationSelector.tsx
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface LocationSelectorProps {
  location: string;
  setLocation: (location: string) => void;
}

const LOCATIONS = ["Pearl Harbor", "Kaneohe", "Makapu’u"];

const LocationSelector: React.FC<LocationSelectorProps> = ({ location, setLocation }) => {
  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel>Location</InputLabel>
      <Select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        label="Location"
      >
        {LOCATIONS.map((loc) => (
          <MenuItem key={loc} value={loc}>
            {loc}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LocationSelector;
