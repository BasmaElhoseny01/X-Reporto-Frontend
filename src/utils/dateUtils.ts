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

export const formatDate = (input: string): string => {
  const date = new Date(input);

  const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // Months are zero-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = padZero(date.getMinutes());
  // const seconds = padZero(date.getSeconds());

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const formattedHours = padZero(hours);

  return `${month}-${day}-${year} ${formattedHours}:${minutes}${ampm}`;
};

// Example usage:
// const inputDate = '2024-07-06T13:45:31.185639';
// const formattedDate = formatDate(inputDate);
// console.log(formattedDate); // Output: "07-06-2024 01:45PM"

export const timeAgo = (input: string): string => {
  const inputDate = new Date(input);
  const currentDate = new Date();

  const diffInSeconds = Math.floor(
    (currentDate.getTime() - inputDate.getTime()) / 1000
  );
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return diffInSeconds === 1
      ? "1 second ago"
      : `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return diffInMinutes === 1
      ? "1 minute ago"
      : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  } else if (diffInDays < 365) {
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  } else {
    return diffInYears === 1 ? "1 year ago" : `${diffInYears} years ago`;
  }
};

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
