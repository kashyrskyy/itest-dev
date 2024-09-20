// src/utils/csvUtils.ts
export const convertToCSV = (data: any[], headers: string[]): string => {
    const csvHeaders = headers.join(',');
    const csvRows = data.map((row) => {
      return headers.map((header) => {
        const value = row[header] !== undefined ? row[header] : '';
        return `"${value}"`;
      }).join(',');
    });
    return `${csvHeaders}\n${csvRows.join('\n')}`;
  };  