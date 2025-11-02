/**
 * Export to CSV Utility
 * Converts data array to CSV format and downloads it
 */

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string = 'export.csv',
  columns?: { key: string; label: string }[]
) {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Use provided columns or extract from first data item
  const headers = columns
    ? columns.map((col) => col.label)
    : Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    // Headers
    headers.join(','),
    // Data rows
    ...data.map((row) => {
      const values = columns
        ? columns.map((col) => {
            const value = row[col.key];
            // Handle values that might contain commas, quotes, or newlines
            if (value === null || value === undefined) return '';
            const stringValue = String(value);
            return stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')
              ? `"${stringValue.replace(/"/g, '""')}"`
              : stringValue;
          })
        : headers.map((header) => {
            const value = row[header];
            if (value === null || value === undefined) return '';
            const stringValue = String(value);
            return stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')
              ? `"${stringValue.replace(/"/g, '""')}"`
              : stringValue;
          });
      return values.join(',');
    }),
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

