export function ConvertToLongDate(date: Date): string {
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
// const longDate = ConvertToLongDate(currentDate);
// console.log(longDate); // Output: "Monday, June 13, 2024"

export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};
