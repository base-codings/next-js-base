import { Theme, ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { ColorPartial } from "@mui/material/styles/createPalette";
import React from 'react';

const theme = createTheme();
const {
  typography: { pxToRem },
} = theme;

const FONT = 'Bagoss, Inter, Arial';

export interface PalletOptionsGradient {
  primaryGradient: string;
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteColor extends ColorPartial {
    primary: {
      300: string;
      950: string;
    };
  }

  interface TypeText {
    muted: string;
    reversed: string;
    reservedMedium: string;
    highlight: string;
  }

  interface TypeBackground {
    default: string;
    paper: string;
    surface: string;
    header: string;
    disabled: string;
  }

  interface Palette {
    other: {
      standardInputLine: string;
      borderPrimary400: string;
      transparentWhite16: string;
    };
    neutral: {
      '100': string;
      '200': string;
      '300': string;
      '400': string;
      '500': string;
      '600': string;
      '700': string;
      '800': string;
      '900': string;
      white: string;
      black: string;
    };
  }

  interface PaletteOptions {
    gradients: PalletOptionsGradient;
  }
}

export interface TypographyCustomVariants {
  display1: React.CSSProperties;
  display2: React.CSSProperties;
  display3: React.CSSProperties;
  subheader1: React.CSSProperties;
  subheader2: React.CSSProperties;
  description: React.CSSProperties;
  buttonL: React.CSSProperties;
  buttonM: React.CSSProperties;
  buttonS: React.CSSProperties;
  helperText: React.CSSProperties;
  tooltip: React.CSSProperties;
  main10: React.CSSProperties;
  main18: React.CSSProperties;
  main20: React.CSSProperties;
  main21: React.CSSProperties;
  main24: React.CSSProperties;
  secondary21: React.CSSProperties;
  main16: React.CSSProperties;
  secondary16: React.CSSProperties;
  main14: React.CSSProperties;
  secondary14: React.CSSProperties;
  main12: React.CSSProperties;
  secondary12: React.CSSProperties;
  secondary10: React.CSSProperties;
  body3: React.CSSProperties;
  body4: React.CSSProperties;
  caption2: React.CSSProperties;
  overline1: React.CSSProperties;
  overline2: React.CSSProperties;
  overline3: React.CSSProperties;
  button1: React.CSSProperties;
  button2: React.CSSProperties;
  button3: React.CSSProperties;
}

declare module '@mui/material/styles' {
  interface TypographyVariants extends TypographyCustomVariants {}

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions extends TypographyCustomVariants {}

  interface BreakpointOverrides {
    xsm: true;
    xxl: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true;
    display2: true;
    display3: true;
    panel1: true;
    subheader1: true;
    subheader2: true;
    description: true;
    buttonM: true;
    buttonS: true;
    buttonL: true;
    helperText: true;
    tooltip: true;
    main10: true;
    main18: true;
    main20: true;
    main21: true;
    main22: true;
    main24: true;
    main32: true;
    secondary21: true;
    main16: true;
    secondary16: true;
    main14: true;
    secondary14: true;
    main12: true;
    secondary12: true;
    secondary10: true;
    subtitle1: false;
    subtitle2: false;
    button: false;
    overline: false;
    body3: true;
    body4: true;
    caption2: true;
    overline1: true;
    overline2: true;
    overline3: true;
    button1: true;
    button2: true;
    button3: true;
    boxOutlined: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true;
    primary: true;
    secondary: true;
    tertiary: true;
    // surface: true;
    // primary: true;
    // secondary: true;
    // ghost: true;
  }
  interface ButtonPropsSizeOverrides {
    small: true;
    large: true;
    medium: true;
    XLarge: true;
    XSmall: true;
  }
}

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => {
  const getColor = (lightColor: string, darkColor: string) => (mode === 'dark' ? darkColor : lightColor);
  return {
    breakpoints: {
      keys: ['xs', 'xsm', 'sm', 'md', 'lg', 'xl', 'xxl'],
      values: {
        xs: 0,
        xsm: 640,
        sm: 760,
        md: 960,
        lg: 1280,
        xl: 1575,
        xxl: 1800,
      },
    },
    palette: {
      mode,
      primary: {
        main: getColor('#b9e15b', '#b9e15b'),
        light: getColor('#62677B', '#a5aab9'),
        dark: getColor('#101114', '#D2D4DC'),
        contrast: getColor('#FFFFFF', '#0F121D'),
        '200': getColor('#F4DAB4', '#F4DAB4'),
        '300': getColor('#EAB873', '#EAB873'),
        '600': getColor('#CF6C27', '#CF6C27'),
        '900': getColor('#3C1B0E', '#3C1B0E'),
        '950': getColor('#3C1B0E', '#3C1B0E'),
      },
      secondary: {
        main: getColor('#FF607B', '#F48FB1'),
        light: getColor('#FF607B', '#F6A5C0'),
        dark: getColor('#B34356', '#AA647B'),
      },
      error: {
        main: getColor('#F89F1A', '#F89F1A'),
        light: getColor('#D26666', '#E57373'),
        dark: getColor('#BC0000', '#D32F2F'),
        '100': getColor('#4F1919', '#FBB4AF'), // for alert text
        '200': getColor('#F9EBEB', '#2E0C0A'), // for alert background
      },
      warning: {
        main: getColor('#F89F1A', '#FFA726'),
        light: getColor('#FFCE00', '#FFB74D'),
        dark: getColor('#C67F15', '#F57C00'),
        '100': getColor('#63400A', '#FFDCA8'), // for alert text
        '200': getColor('#FEF5E8', '#301E04'), // for alert background
      },
      info: {
        main: getColor('#0062D2', '#29B6F6'),
        light: getColor('#0062D2', '#4FC3F7'),
        dark: getColor('#002754', '#0288D1'),
        '100': getColor('#002754', '#A9E2FB'), // for alert text
        '200': getColor('#E5EFFB', '#071F2E'), // for alert background
      },
      success: {
        main: getColor('#47AE89', '#32D583'),
        light: getColor('#90FF95', '#90FF95'),
        dark: getColor('#318435', '#388E3C'),
        '100': getColor('#1C4B1E', '#C2E4C3'), // for alert text
        '200': getColor('#ECF8ED', '#0A130B'), // for alert background
      },
      text: {
        primary: getColor('#723B64', '#723B64'),
        secondary: getColor('#FAF1F8', '#FAF1F8'),
      },
      background: {
        default: getColor('#FAFAFA', '#FAFAFA'),
        paper: getColor('#FAF1F8', '#FAF1F8'),
        surface: getColor('#FAF0F8', '#FAF0F8'),
      },
      divider: getColor('#EAEBEF', '#EBEBEF14'),
      action: {
        active: getColor('#8E92A3', '#EBEBEF8F'),
        hover: getColor('#F1F1F3', '#EBEBEF14'),
        selected: getColor('#EAEBEF', '#EBEBEF29'),
        disabled: getColor('#eeeff1', '#A5AAB9'),
        disabledBackground: getColor('#EAEBEF', '#EBEBEF1F'),
        focus: getColor('#F1F1F3', '#EBEBEF1F'),
      },
      other: {
        standardInputLine: getColor('#383D511F', '#EBEBEF6B'),
        borderPrimary400: getColor('#E49E53', '#E49E53'),
        transparentWhite16: getColor('#FFFFFF29', '#FFFFFF29'),
      },
      neutral: {
        white: getColor('#FFF5FD', '#FFF5FD'),
        // "100": getColor("#eeeff1", "#eeeff1"),
        // "200": getColor("#e5e5ed", "#e5e5ed"),
        // "300": getColor("#cacbd9", "#cacbd9"),
        // "400": getColor("#b1b5c4", "#b1b5c4"),
        // "500": getColor("#a5aab9", "#a5aab9"),
        // "600": getColor("#959eac", "#959eac"),
        // "700": getColor("#808691", "#808691"),
        // "800": getColor("#5a616c", "#5a616c"),
        // "900": getColor("#373c45", "#101114"),
        black: getColor('#0f1d33', '#0f1d33'),
      },
      pink: {
        '100': getColor('#EDE1ED', '#EDE1ED'),
        // "200": getColor("#fadafd", "#fadafd"),
        // "300": getColor("#f9c4f9", "#f9c4f9"),
        // "400": getColor("#f3afee", "#f3afee"),
        // "500": getColor("#eb9dde", "#eb9dde"),
        // "600": getColor("#da89ca", "#da89ca"),
        '700': getColor('#493042', '#493042'),
        // "800": getColor("#824a75", "#824a75"),
        // "900": getColor("#5c3251", "#5c3251"),
      },
      gradients: {
        primaryGradient: 'linear-gradient(180deg, #FCA2FF 0%, #F53CA8 100%)',
      },
    },
    spacing: 4,
    typography: {
      fontFamily: FONT,
      subtitle1: undefined,
      subtitle2: undefined,
      button: undefined,
      overline: undefined,
      display1: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(112),
        fontSize: pxToRem(96),
      },
      display2: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(96),
        fontSize: pxToRem(80),
      },
      display3: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(86),
        fontSize: pxToRem(72),
      },
      h1: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(76),
        fontSize: pxToRem(64),
      },
      h2: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(56),
        fontSize: pxToRem(48),
      },
      h3: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(48),
        fontSize: pxToRem(40),
      },
      h4: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(44),
        fontSize: pxToRem(36),
      },
      h5: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(40),
        fontSize: pxToRem(32),
      },
      h6: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(32),
        fontSize: pxToRem(24),
      },
      body1: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(28),
        fontSize: pxToRem(20),
      },
      body2: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(24),
        fontSize: pxToRem(16),
      },
      body3: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: pxToRem(20),
        height: pxToRem(20),
        fontSize: pxToRem(14),
      },
      body4: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '2%',
        lineHeight: pxToRem(18),
        fontSize: pxToRem(12),
      },
      panel1: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: '160%',
        color: theme.palette.text.reversed,
        fontSize: pxToRem(18),
      },
      subheader1: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.24),
        lineHeight: pxToRem(12),
        fontSize: pxToRem(12),
      },
      subheader2: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.1),
        lineHeight: pxToRem(16),
        fontSize: pxToRem(12),
      },
      description: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(-0.14),
        lineHeight: '143%',
        fontSize: pxToRem(14),
      },
      // mean caption01
      caption: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0%',
        lineHeight: pxToRem(20),
        fontSize: pxToRem(14),
      },
      caption2: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0%',
        lineHeight: pxToRem(18),
        fontSize: pxToRem(12),
      },
      overline1: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.32px',
        lineHeight: pxToRem(16),
        fontSize: pxToRem(16),
      },
      overline2: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '2%',
        lineHeight: pxToRem(20),
        fontSize: pxToRem(14),
      },
      overline3: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '2%',
        lineHeight: pxToRem(18),
        fontSize: pxToRem(12),
      },
      button1: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0%',
        lineHeight: pxToRem(14),
        fontSize: pxToRem(14),
      },
      button2: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0%',
        lineHeight: pxToRem(12),
        fontSize: pxToRem(12),
      },
      button3: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0%',
        lineHeight: pxToRem(10),
        fontSize: pxToRem(10),
      },
      buttonL: {
        fontFamily: FONT,
        fontWeight: 400,
        lineHeight: pxToRem(14),
        fontSize: pxToRem(14),
        letterSpacing: '0.4px',
      },
      buttonM: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.46),
        lineHeight: pxToRem(12),
        fontSize: pxToRem(12),
      },
      buttonS: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.12),
        lineHeight: pxToRem(10),
        textTransform: 'uppercase',
        fontSize: pxToRem(10),
      },
      helperText: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.28),
        lineHeight: pxToRem(14),
        fontSize: pxToRem(14),
      },
      tooltip: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(16),
        fontSize: pxToRem(12),
      },
      main10: {
        fontFamily: FONT,
        fontWeight: 500,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(10),
        fontSize: pxToRem(10),
      },
      main18: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(26),
        fontSize: pxToRem(18),
      },
      main20: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(28),
        fontSize: pxToRem(20),
      },
      main22: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(32),
        fontSize: pxToRem(22),
      },
      main21: {
        fontFamily: FONT,
        fontWeight: 800,
        lineHeight: '133.4%',
        fontSize: pxToRem(21),
      },
      main24: {
        fontFamily: FONT,
        fontWeight: 400,
        lineHeight: pxToRem(32),
        fontSize: pxToRem(24),
      },
      main32: {
        fontFamily: FONT,
        fontWeight: 400,
        lineHeight: pxToRem(40),
        fontSize: pxToRem(32),
      },
      secondary21: {
        fontFamily: FONT,
        fontWeight: 400,
        lineHeight: '133.4%',
        fontSize: pxToRem(21),
      },
      main16: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(24),
        fontSize: pxToRem(16),
      },
      secondary16: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(24),
        fontSize: pxToRem(16),
      },
      main14: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(20),
        fontSize: pxToRem(14),
      },
      secondary14: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(20),
        fontSize: pxToRem(14),
      },
      main12: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.1),
        lineHeight: pxToRem(16),
        fontSize: pxToRem(12),
      },
      secondary12: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.24),
        lineHeight: pxToRem(10),
        fontSize: pxToRem(10),
        verticalAlign: 'sub',
      },
      secondary10: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.24),
        lineHeight: pxToRem(10),
        fontSize: pxToRem(8),
        verticalAlign: 'sub',
      },
    },
  } as ThemeOptions;
};

export function getThemedComponents(theme: Theme) {
  return {
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: 'primary',
        },
        styleOverrides: {
          root: {
            borderRadius: '8px',
            position: 'relative',
            zIndex: 1,
          },
          sizeLarge: {
            ...theme.typography.buttonL,
            padding: '10px 16px',
            maxHeight: '48px',
            borderRadius: '24px',
            fontSize: pxToRem(14),
            lineHeight: pxToRem(20),
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
          sizeMedium: {
            ...theme.typography.buttonM,
            padding: '8px 12px',
            maxHeight: '32px',
            borderRadius: '1000px',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
          sizeSmall: {
            ...theme.typography.buttonS,
            padding: '8.5px 16px',
            maxHeight: '24px',
            borderRadius: '1000px',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
        },

        variants: [
          // size config
          {
            props: { size: 'XLarge' },
            style: {
              ...theme.typography.buttonL,
              padding: '14px 24px',
              maxHeight: '48px',
              borderRadius: '8px',
              fontSize: pxToRem(14),
              lineHeight: pxToRem(20),
              '--spinner-scale': 4,
            },
          },
        ],
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontWeight: 400,
          },
        },
      },
    },
  } as ThemeOptions;
}
