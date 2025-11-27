import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    info: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a0f',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
      disabled: '#64748b',
    },
    divider: 'rgba(99, 102, 241, 0.12)',
    action: {
      active: '#f1f5f9',
      hover: 'rgba(99, 102, 241, 0.08)',
      selected: 'rgba(99, 102, 241, 0.16)',
      disabled: 'rgba(241, 245, 249, 0.3)',
      disabledBackground: 'rgba(241, 245, 249, 0.12)',
    },
  },
  typography: {
    fontFamily: '\"Inter\", \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", Arial, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      '@media (max-width:768px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (max-width:768px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      '@media (max-width:768px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      '@media (max-width:768px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      '@media (max-width:768px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      '@media (max-width:768px)': {
        fontSize: '1.1rem',
      },
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#cbd5e1',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#94a3b8',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      fontSize: '0.95rem',
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.4,
      color: '#64748b',
    },
    overline: {
      fontWeight: 600,
      fontSize: '0.75rem',
      lineHeight: 1.4,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#94a3b8',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 0 20px rgba(99, 102, 241, 0.3)',
    '0 10px 30px rgba(99, 102, 241, 0.2)',
    '0 20px 40px rgba(99, 102, 241, 0.15)',
    '0 30px 60px rgba(99, 102, 241, 0.1)',
    ...Array(15).fill('0 25px 50px -12px rgba(0, 0, 0, 0.25)'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#475569 #1e293b',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 4,
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            border: '1px solid #1e293b',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#1e293b',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-corner': {
            backgroundColor: '#1e293b',
          },
        },
        '*': {
          '&::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 4,
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            border: '1px solid #1e293b',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#1e293b',
            borderRadius: 4,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textTransform: 'none',
          letterSpacing: '0.02em',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '\"\"',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.5s ease',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px -10px rgba(99, 102, 241, 0.6)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:focus-visible': {
            outline: '2px solid #6366f1',
            outlineOffset: '2px',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            boxShadow: '0 10px 25px -10px rgba(99, 102, 241, 0.6)',
          },
          '&:disabled': {
            background: 'rgba(99, 102, 241, 0.3)',
            color: 'rgba(255, 255, 255, 0.5)',
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: '#6366f1',
          color: '#6366f1',
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderColor: '#4f46e5',
          },
        },
        text: {
          color: '#cbd5e1',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
            color: '#f1f5f9',
          },
        },
        sizeSmall: {
          padding: '8px 16px',
          fontSize: '0.85rem',
        },
        sizeLarge: {
          padding: '16px 32px',
          fontSize: '1.1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: 16,
          border: '1px solid rgba(99, 102, 241, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(99, 102, 241, 0.3)',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
          },
        },
        elevation1: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        elevation3: {
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(99, 102, 241, 0.1)',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '\"\"',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(99, 102, 241, 0.4)',
            boxShadow: '0 20px 40px -15px rgba(99, 102, 241, 0.3)',
          },
          '&:hover::before': {
            opacity: 1,
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingBottom: 16,
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
        },
        title: {
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#f1f5f9',
        },
        subheader: {
          fontSize: '0.9rem',
          color: '#cbd5e1',
          fontWeight: 500,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          borderTop: '1px solid rgba(99, 102, 241, 0.1)',
          justifyContent: 'space-between',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
            },
            '& fieldset': {
              borderColor: 'rgba(99, 102, 241, 0.2)',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: 'rgba(99, 102, 241, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6366f1',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#cbd5e1',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#6366f1',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: '#f1f5f9',
            '&::placeholder': {
              color: '#94a3b8',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(99, 102, 241, 0.2)',
            borderWidth: 2,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(99, 102, 241, 0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6366f1',
          },
        },
        icon: {
          color: '#cbd5e1',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 12,
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#cbd5e1',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            color: '#f1f5f9',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            color: '#f1f5f9',
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.25)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(99, 102, 241, 0.1)',
          backgroundImage: 'linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, transparent 100%)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 8px',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderLeft: '3px solid #6366f1',
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.25)',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#cbd5e1',
          minWidth: 40,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#f1f5f9',
          fontWeight: 500,
        },
        secondary: {
          color: '#94a3b8',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          border: '1px solid',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        filled: {
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgba(99, 102, 241, 0.4)',
          color: '#a5b4fc',
        },
        outlined: {
          borderColor: 'rgba(99, 102, 241, 0.4)',
          color: '#a5b4fc',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: 0,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.1)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: 'rgba(51, 65, 85, 0.8)',
            color: '#f1f5f9',
            fontWeight: 700,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '2px solid rgba(99, 102, 241, 0.2)',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            transition: 'background-color 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.05)',
            },
            '&:last-child .MuiTableCell-root': {
              borderBottom: 'none',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
          color: '#cbd5e1',
          fontSize: '0.9rem',
          padding: '16px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid',
          fontWeight: 500,
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '\"\"',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            backgroundColor: 'currentColor',
          },
        },
        standardSuccess: {
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: 'rgba(16, 185, 129, 0.3)',
          color: '#6ee7b7',
        },
        standardError: {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          color: '#fca5a5',
        },
        standardWarning: {
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderColor: 'rgba(245, 158, 11, 0.3)',
          color: '#fcd34d',
        },
        standardInfo: {
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderColor: 'rgba(99, 102, 241, 0.3)',
          color: '#a5b4fc',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 20,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#f1f5f9',
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: '#cbd5e1',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: '1px solid rgba(99, 102, 241, 0.1)',
          padding: '16px 24px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          borderRadius: 8,
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
          },
          '&:focus-visible': {
            outline: '2px solid #6366f1',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 8,
          fontSize: '0.85rem',
          fontWeight: 500,
          color: '#f1f5f9',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        },
        arrow: {
          color: 'rgba(15, 23, 42, 0.95)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          height: 8,
        },
        bar: {
          borderRadius: 4,
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#6366f1',
        },
        circle: {
          strokeLinecap: 'round',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          '&::after': {
            background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.1)',
          borderRadius: '12px !important',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
          },
        },
        content: {
          color: '#f1f5f9',
          fontWeight: 600,
        },
        expandIconWrapper: {
          color: '#cbd5e1',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          color: '#cbd5e1',
          borderTop: '1px solid rgba(99, 102, 241, 0.1)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
        },
        indicator: {
          backgroundColor: '#6366f1',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          color: '#94a3b8',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: '#cbd5e1',
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
          },
          '&.Mui-selected': {
            color: '#6366f1',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 58,
          height: 32,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(26px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                backgroundColor: '#6366f1',
                opacity: 1,
                border: 0,
              },
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 28,
            height: 28,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          },
          '& .MuiSwitch-track': {
            borderRadius: 16,
            backgroundColor: 'rgba(99, 102, 241, 0.3)',
            opacity: 1,
            transition: 'background-color 300ms',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(99, 102, 241, 0.6)',
          '&.Mui-checked': {
            color: '#6366f1',
          },
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'rgba(99, 102, 241, 0.6)',
          '&.Mui-checked': {
            color: '#6366f1',
          },
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: '#cbd5e1',
          fontWeight: 500,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#6366f1',
          height: 6,
        },
        thumb: {
          height: 20,
          width: 20,
          backgroundColor: '#6366f1',
          border: '2px solid #fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 0 0 8px rgba(99, 102, 241, 0.16)',
          },
        },
        track: {
          height: 6,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
        },
        rail: {
          height: 6,
          borderRadius: 3,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
        },
      },
    },
  },
});

export default theme;