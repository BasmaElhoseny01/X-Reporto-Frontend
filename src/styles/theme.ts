export const palette = {
  primary: "#1890FF",
  secondary: "#E6F7FF",
  // dark: "#001529",
  dark: "#1C2222",

  success: "#389E0D", // Success
  error: "#FF4D4F", // Error
  warn: "#FFA318", // Warning
  info: "#1890FF", // Info (e.g., for alerts)
  link: "#1890FF", // Link (e.g., for links)

  black: "#000000", // Black (e.g., for text)

  grey_light: "#f0f0f0",
  grey_silver: "#bfbfbf",

  grey50: "#f2f2f2", // Very light grey (e.g., for backgrounds)
  grey100: "#e0e0e0", // Light grey (e.g., for borders)
  grey200: "#bdbdbd", // Medium grey (e.g., for alternate backgrounds)
  grey300: "#9e9e9e", // Dark grey (e.g., for disabled elements)

  white: "#ffffff", // White (e.g., for backgrounds, text)
};

const baseTheme = {
  borderRadius: 2,

  // Typography
  fontFamily: "Arial",
  fontSize: 14,
};

// // Create the theme object
export const lightTheme = {
  token: {
    ...baseTheme,

    // Seed Token
    colorPrimary: palette.primary,

    colorSuccess: palette.success,
    colorError: palette.error,
    colorWarning: palette.warn,
    colorInfo: palette.info,
    colorLink: palette.link,

    // Text Colors
    colorTextBase: palette.black,

    // Background and Component Colors
    colorBgLayout: palette.white, // Light mode background
    colorBgContainer: palette.white, // Light mode container background
    colorBgNavBar: palette.dark, // Light mode navbar background
  },
};

export const darkTheme = {
  token: {
    ...baseTheme,
    // Seed Token
    colorPrimary: palette.primary,

    colorSuccess: palette.success,
    colorError: palette.error,
    colorWarning: palette.warn,
    colorInfo: palette.info,
    colorLink: palette.link,

    // Text Colors
    colorTextBase: palette.white,

    // Background and Component Colors
    colorBgLayout: palette.dark, // Dark mode layout background
    colorBgContainer: palette.dark, // Dark mode container background
    colorBgNavBar: palette.primary, // Dark mode navbar background
  },
};
