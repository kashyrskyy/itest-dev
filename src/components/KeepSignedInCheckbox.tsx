// src/components/KeepSignedInCheckbox.tsx
import { FormControlLabel, Checkbox } from "@mui/material";

interface KeepSignedInCheckboxProps {
  keepSignedIn: boolean;
  onChange: (checked: boolean) => void;
}

const KeepSignedInCheckbox: React.FC<KeepSignedInCheckboxProps> = ({
  keepSignedIn,
  onChange,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          aria-label="Keep me signed in"
          checked={keepSignedIn}
          onChange={(e) => onChange(e.target.checked)}
          color="primary"
        />
      }
      label="Keep me signed in"
      sx={{ mb: 2 }}
    />
  );
};

export default KeepSignedInCheckbox;