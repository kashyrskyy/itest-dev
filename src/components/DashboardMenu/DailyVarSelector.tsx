// src/components/DashboardMenu/DailyVarSelector.tsx
import { FormControl, FormControlLabel, Checkbox, FormGroup, FormLabel } from '@mui/material';

const DAILY_VARIABLES = [
  "Max Temperature",
  "Min Temperature",
  "Mean Temperature",
  "Daylight Duration",
  "Sunshine Duration",
  "Precipitation Hours",
  "Shortwave Radiation (Sum)",
];

interface DailyVarSelectorProps {
  selectedVariables: string[];
  setSelectedVariables: (variables: string[]) => void;
}

const DailyVarSelector: React.FC<DailyVarSelectorProps> = ({ selectedVariables, setSelectedVariables }) => {
  // Handle changes in checkbox selection
  const handleChange = (variable: string) => {
    if (selectedVariables.includes(variable)) {
      // Remove the variable if it's already selected
      setSelectedVariables(selectedVariables.filter((v) => v !== variable));
    } else {
      // Add the variable if it's not selected yet
      setSelectedVariables([...selectedVariables, variable]);
    }
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">Select Daily Variables</FormLabel>
      <FormGroup row>
        {DAILY_VARIABLES.map((variable) => (
          <FormControlLabel
            key={variable}
            control={
              <Checkbox
                checked={selectedVariables.includes(variable)}
                onChange={() => handleChange(variable)}
              />
            }
            label={variable}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default DailyVarSelector;