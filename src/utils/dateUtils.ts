export function convertToLongDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Full day of the week (e.g., "Monday")
    year: "numeric", // Full numeric representation of the year (e.g., "2024")
    month: "long", // Full month name (e.g., "January")
    day: "numeric", // Day of the month (e.g., "1")
  };

  return date.toLocaleDateString("en-US", options);
}

// // Example usage:
// const currentDate = new Date(); // Assuming today's date is 2024-06-13
// const longDate = convertToLongDate(currentDate);
// console.log(longDate); // Output: "Monday, June 13, 2024"
