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

export interface TypographyCustomVariants {}

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
    main10: true;
    main18: true;
    main20: true;
    main21: true;
    main22: true;
    main24: true;
    main32: true;
    secondary14: true;
    secondary16: true;
    secondary28: true;
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;
    subtitle1: true;
    subtitle2: true;
    body1: true;
    body2: true;
    body3: true;
    body4: true;
    button: true;
    caption: true;
    overline: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true;
    primary: true;
    secondary: true;
    tertiary: true;
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
      h1: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(40),
      },
      h2: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(32),
      },
      h3: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(28),
      },
      h4: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(24),
      },
      h5: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(20),
      },
      h6: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(16),
      },
      subtitle1: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(16),
      },
      subtitle2: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(14),
      },
      body1: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(20),
      },
      body2: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(16),
      },
      body3: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0.4px',
        lineHeight: 1.25,
        fontSize: pxToRem(14),
      },
      body4: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '2%',
        lineHeight: 1.25,
        fontSize: pxToRem(12),
      },
      button: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0%',
        lineHeight: 1.25,
        fontSize: pxToRem(14),
      },
      caption: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0%',
        lineHeight: 1.25,
        fontSize: pxToRem(12),
      },
      overline: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: '0%',
        lineHeight: 1.25,
        fontSize: pxToRem(10),
      },
      main10: {
        fontFamily: FONT,
        fontWeight: 500,
        letterSpacing: pxToRem(0.15),
        lineHeight: 1.25,
        fontSize: pxToRem(10),
      },
      main18: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: 1.25,
        fontSize: pxToRem(18),
      },
      main20: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: 1.25,
        fontSize: pxToRem(20),
      },
      main22: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: 1.25,
        fontSize: pxToRem(22),
      },
      main21: {
        fontFamily: FONT,
        fontWeight: 800,
        lineHeight: 1.25,
        fontSize: pxToRem(21),
      },
      main24: {
        fontFamily: FONT,
        fontWeight: 400,
        lineHeight: 1.25,
        fontSize: pxToRem(24),
      },
      main32: {
        fontFamily: FONT,
        fontWeight: 400,
        lineHeight: 1.25,
        fontSize: pxToRem(32),
      },
      secondary14: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: 1.25,
        fontSize: pxToRem(14),
      },
      secondary16: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: 1.25,
        fontSize: pxToRem(16),
      },
      secondary28: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: 1.25,
        fontSize: pxToRem(28),
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
            ...theme.typography.button,
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
            ...theme.typography.button,
            padding: '8px 12px',
            maxHeight: '32px',
            borderRadius: '1000px',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
          sizeSmall: {
            ...theme.typography.button,
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
              ...theme.typography.button,
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
