// https://ant.design/docs/react/customize-theme#seedtoken

export const palette = {
  primary: "#1890FF",
  secondary: "#E6F7FF",
  dark: "#001529",

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
  // Add more colors as needed for your design system
};

// // Create the theme object
export const theme = {
  token: {
    // Seed Token
    colorPrimary: palette.primary,

    colorSuccess: palette.success,
    colorError: palette.error,
    colorWarning: palette.warn,
    colorInfo: palette.info,
    colorLink: palette.link,

    colorTextBase: palette.black,

    borderRadius: 2, // border-radius for base components default[6]

    // fontFamily: "Roboto",
    fontFamily: "Arial", 
    // [Defaults]
    fontSize: 14, // base font size default[14]

    // Alias Token
    // colorBgContainer: "#f6ffed",

    // [Defaults]
    // fontSizeHeading1:38,
    // fontSizeHeading2:30,
    // fontSizeHeading3:24,
    // fontSizeHeading4:20,
    // fontSizeHeading5:16,
    // fontSizeSM:12,
    // fontSizeLG:16,
    // fontSizeXL:20,
  },
};

export default theme;
