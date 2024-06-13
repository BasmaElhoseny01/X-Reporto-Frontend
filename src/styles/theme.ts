// https://ant.design/docs/react/customize-theme#seedtoken

export const palette = {
  primary: "#00b96b", // Primary color (e.g., for buttons, links)
  secondary: "#ff0000", // Secondary color (e.g., for accents)

  success: "#52c41a", // Success
  error: "#ff4d4f", // Error
  warn: "#faad14", // Warning
  info: "#1677ff", // Info (e.g., for alerts)
  link: "#1677ff", // Link (e.g., for links)

  black: "#000000", // Black (e.g., for text)

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

    borderRadius: 2,  // border-radius for base components default[6]

    fontFamily: "fantasy",
    // [Defaults]
    // fontSize: 14, // base font size default[14]

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
