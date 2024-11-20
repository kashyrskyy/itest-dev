import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface SensorDataTableProps {
  data: any[];
  selectedVariables: string[];
}

const SensorDataTable: React.FC<SensorDataTableProps> = ({ data, selectedVariables }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            {selectedVariables.map((variable) => (
              <TableCell key={variable}>{variable}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.Date}</TableCell> {/* Directly use preprocessed timestamps */}
              {selectedVariables.map((variable) => (
                <TableCell key={variable}>{row[variable]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SensorDataTable;