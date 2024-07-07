import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

export const HistoryContainer = styled("div")`
  width: 100%;
  overflow-y: scroll;

  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* Track color */
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* Thumb color */
    border-radius: 3px; /* Rounded corners of the thumb */
  }
`;
