import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // blue-600
      dark: '#1d4ed8', // blue-700
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      500: '#6b7280',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
        },
        outlined: {
          borderColor: '#d1d5db',
          color: '#374151',
          '&:hover': {
            backgroundColor: '#f9fafb',
            borderColor: '#d1d5db',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
  },
});