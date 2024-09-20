// src/components/DashboardMenu/HourlyVarSelector.tsx
import { FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const HOURLY_VARIABLES = [
  "Temperature",
  "Humidity",
  "Precipitation",
  "Pressure",
  "Cloud Cover",
  "Low Cloud Cover",
  "Mid Cloud Cover",
  "High Cloud Cover",
  "Evapotranspiration",
  "Wind Speed",
  "Wind Direction",
  "Wind Gusts",
  "Shortwave Radiation (Instant)",
  "Diffuse Radiation",
];

interface HourlyVarSelectorProps {
  selectedVariables: string[];
  setSelectedVariables: (variables: string[]) => void;
}

const HourlyVarSelector: React.FC<HourlyVarSelectorProps> = ({ selectedVariables, setSelectedVariables }) => {
  const handleChange = (variable: string) => {
    if (selectedVariables.includes(variable)) {
      setSelectedVariables(selectedVariables.filter((v) => v !== variable));
    } else {
      setSelectedVariables([...selectedVariables, variable]);
    }
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormGroup row>
        {HOURLY_VARIABLES.map((variable) => (
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

export default HourlyVarSelector;