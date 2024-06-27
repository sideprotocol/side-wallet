import { createTheme } from "@mui/material";

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1200,
      xl: 1440,
    },
  },
  palette: {
    mode: "light",
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      default: "#fff",
    },
    primary: {
      main: "#0DD4C3",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          "&.MuiMenuItem-root.Mui-selected": {
            backgroundColor: "#6DE5DA !important",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "62px",
          background: "#fff",
          borderRadius: "8px",
          p: "0 12px 0 24px",
          mb: "24px",
          "& input": {
            color: "#000",
            fontSize: "16px",
            fontFamily: "Inter, sans-serif",
            p: 0,
            "::placeholder": {
              opacity: 0.4,
            },
          },
          "& .Mui-disabled": {
            textFillColor: "#6C7080",
          },
          "&.MuiOutlinedInput-root": {
            fieldset: {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          paddingLeft: "37px",
          borderCollapse: "separate",
          background: "transparent",
          ".MuiTableRow-root": {
            background: "transparent",
            borderBottom: "1px solid rgba(36, 45, 57, 0.60)",
          },
          ".MuiTableCell-root": {
            border: "none",
            color: "#fff",
            padding: "14px 24px",
            "&:last-child": {
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
              paddingRight: "24px",
            },
            "&:first-of-type": {
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
              paddingLeft: "37px",
            },
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          paddingLeft: "37px",
          ".MuiTableRow-root": {
            "& td": { border: 0 },
          },
          ".MuiTableCell-root": {
            padding: "16px 24px",
            // paddingTop:'16px',
            // paddingBottom:'16px',
            "&:first-of-type": { paddingLeft: "24px" },
            "&:last-child": { paddingRight: "24px" },
          },
        },
      },
    },
  },
});

export default customTheme;
