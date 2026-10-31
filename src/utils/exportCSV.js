/**
 * Exports an array of objects to a downloadable CSV file using standard browser Blob.
 * @param {Array<Object>} data
 * @param {string} filename
 */
export const exportToCSV = (data, filename = 'nexus-export.csv') => {
  if (!data || !data.length) {
    throw new Error('No data available to export.');
  }

  // Get headers from first object keys
  const headers = Object.keys(data[0]);

  const csvRows = [];
  // Add header row
  csvRows.push(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','));

  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header] !== undefined && row[header] !== null ? row[header] : '';
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\r\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
