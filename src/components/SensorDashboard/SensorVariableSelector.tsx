import { FormControl, FormControlLabel, Checkbox, FormGroup, FormLabel } from '@mui/material';

const SENSOR_VARIABLES = [
  "Temperature",
  "Ext.Temperature",
  "Humidity",
  "Ext.Humidity",
  "CO2",
  "pH",
  "Salinity",
];

interface SensorVariableSelectorProps {
  selectedVariables: string[];
  setSelectedVariables: (variables: string[]) => void;
}

const SensorVariableSelector: React.FC<SensorVariableSelectorProps> = ({
  selectedVariables,
  setSelectedVariables,
}) => {
  const handleChange = (variable: string) => {
    if (selectedVariables.includes(variable)) {
      setSelectedVariables(selectedVariables.filter((v) => v !== variable));
    } else {
      setSelectedVariables([...selectedVariables, variable]);
    }
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">Select Sensor Variables</FormLabel>
      <FormGroup row>
        {SENSOR_VARIABLES.map((variable) => (
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

export default SensorVariableSelector;