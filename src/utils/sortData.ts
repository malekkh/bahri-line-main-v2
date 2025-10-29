/**
 * Frontend Sorting Utility
 * Handles sorting by different data types: date, number, string
 */

export type SortType = 'date' | 'number' | 'string';

/**
 * Parse a date string in format "DD-Mon-YYYY" or ISO format
 */
const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;

  // Try parsing formats like "04-Jul-2025"
  const months: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  };

  const parts = dateStr.toLowerCase().trim().split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]];
    const year = parseInt(parts[2], 10);
    
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }

  // Try ISO format or standard date parsing
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Extract sortable value from nested object
 */
const getSortValue = (obj: any, path: string): any => {
  if (!obj) return null;

  // Handle nested paths like 'vessel.name' or 'etd.formatted'
  const keys = path.split('.');
  let value = obj;
  
  for (const key of keys) {
    if (value && typeof value === 'object') {
      value = value[key];
    } else {
      return null;
    }
  }
  
  return value;
};

/**
 * Get sort value with preference for raw date when sorting dates
 */
const getSortValueForDate = (obj: any, path: string): any => {
  // For date columns, prefer raw date string for better sorting
  const value = getSortValue(obj, path);
  
  // If the value is an object with raw property (like etd or eta), use raw for sorting
  if (value && typeof value === 'object') {
    if (value.raw) {
      return value.raw;
    }
    // Fallback to formatted if raw not available
    if (value.formatted) {
      return value.formatted;
    }
  }
  
  return value;
};

/**
 * Compare two values based on sort type
 */
const compareValues = (
  a: any,
  b: any,
  sortType: SortType,
  order: 'asc' | 'desc'
): number => {
  // Handle null/undefined values
  if (a == null && b == null) return 0;
  if (a == null) return order === 'asc' ? -1 : 1;
  if (b == null) return order === 'asc' ? 1 : -1;

  let comparison = 0;

  switch (sortType) {
    case 'date': {
      const dateA = typeof a === 'string' ? parseDate(a) : (a instanceof Date ? a : null);
      const dateB = typeof b === 'string' ? parseDate(b) : (b instanceof Date ? b : null);
      
      if (dateA && dateB) {
        comparison = dateA.getTime() - dateB.getTime();
      } else if (dateA) {
        comparison = 1;
      } else if (dateB) {
        comparison = -1;
      } else {
        // Fallback to string comparison if parsing fails
        comparison = String(a).localeCompare(String(b));
      }
      break;
    }
    
    case 'number': {
      const numA = typeof a === 'number' ? a : parseFloat(String(a));
      const numB = typeof b === 'number' ? b : parseFloat(String(b));
      
      if (!isNaN(numA) && !isNaN(numB)) {
        comparison = numA - numB;
      } else if (!isNaN(numA)) {
        comparison = 1;
      } else if (!isNaN(numB)) {
        comparison = -1;
      } else {
        comparison = String(a).localeCompare(String(b));
      }
      break;
    }
    
    case 'string':
    default: {
      comparison = String(a).localeCompare(String(b), undefined, {
        sensitivity: 'base',
        numeric: true,
      });
      break;
    }
  }

  return order === 'asc' ? comparison : -comparison;
};

/**
 * Sort an array of data based on column configuration
 */
export function sortData<T extends Record<string, any>>(
  data: T[],
  columnKey: string,
  sortType: SortType,
  order: 'asc' | 'desc'
): T[] {
  if (!columnKey || !order) {
    return [...data];
  }

  return [...data].sort((a, b) => {
    // For date types, use specialized function that prefers raw dates
    const getValue = sortType === 'date' ? getSortValueForDate : getSortValue;
    const valueA = getValue(a, columnKey);
    const valueB = getValue(b, columnKey);
    return compareValues(valueA, valueB, sortType, order);
  });
}

