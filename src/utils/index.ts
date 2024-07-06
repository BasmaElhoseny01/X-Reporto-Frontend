export const hexToRgba = (hex: string, opacity: number) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r},${g},${b},${opacity})`;
};

export const generateID = () => {
  // To Be Implemented
  return Math.random().toString(36).substr(2, 9);
};

export const reDirectToHome = () => {
  window.location.href = "/";
};

export const reDirectToLogin = () => {
  window.location.href = "/login";
};

export const reDirectToAccount = () => {
  window.location.href = "/account";
};
