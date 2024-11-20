import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SensorDataTable from './SensorDataTable';

interface CollapsibleDataTableProps {
  data: any[]; // Data for the table
  selectedVariables: string[]; // Selected variables for the table
}

const CollapsibleDataTable: React.FC<CollapsibleDataTableProps> = ({ data, selectedVariables }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleToggle} sx={{ mt: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="data-table-content"
        id="data-table-header"
      >
        <Typography>View/Export: Data Table</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {data.length > 0 && selectedVariables.length > 0 ? (
            <SensorDataTable data={data} selectedVariables={selectedVariables} />
          ) : (
            <Typography>No data available for the selected time range or variables.</Typography>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CollapsibleDataTable;