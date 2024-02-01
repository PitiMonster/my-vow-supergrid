const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        DEFAULT: colors.black
      },
      white: {
        DEFAULT: "#FFF",
        "t-50": "#FFFFFF80",
        0: "#FFF",
        50: "#FBFBFF",
        100: "#E7E7E7",
        150: "#FCFDFF",
        200: "#F6F6F6",
        250: "#E4E8F0",
        300: "#F8F9FD",
        350: "#F8F9FF",
        400: "#F8F8F8",
        450: "#F0F0F0",
        500: "#F4F4F4",
        550: "#FBFBFB",
        600: "#EAEDFB",
        650: "#F6F8FF",
        700: "#EAEEFF",
        750: "#EBEBEB",
        800: {
          DEFAULT: "#EFEFEF",
          "t-20": "#EFEFEF33"
        },
        900: "#DBE2F9"
      },
      red: {
        10: "#FFECEC",
        20: "#FFE3E3",
        44: "#FFEFEF",
        100: {
          DEFAULT: "#F5626C",
          "t-10": "#f5626c1a"
        },
        150: "#FDE3E3",
        200: "#FFA8A8",
        300: "#FFD7E8",
        500: {
          DEFAULT: "#D14836"
        },
        600: "#FFF3F3"
      },
      blue: {
        10: "#4765FF",
        20: "#E7F6FF",
        30: "#D9F1FF",
        40: "#172B71",
        50: "#A3B1E4",
        60: "#F2F4FC",
        69: "#C7DAFF",
        70: "#F9FAFE",
        80: "#678FFF",
        90: "#6A9DFF",
        100: "#D4DCF9",
        110: "#6D85FF",
        150: "#F3F5FF",
        200: "#284097",
        250: "#DDF2FE",
        300: {
          DEFAULT: "#4164E2",
          "t-35": "#4164e259"
        },
        350: "#3756C8",
        400: "#4E728D",
        450: "#4466E4",
        500: "#8CA2F3",
        550: "#D6DFFF",
        600: {
          DEFAULT: "#20A3A9",
          "t-20": "#20a3a966"
        },
        650: "#EFF2FF",
        700: "#3E5286",
        750: "#2F4BB1",
        800: {
          DEFAULT: "#11224D",
          "t-50": "#11224D80"
        },
        850: "#005976",
        900: {
          DEFAULT: "#132D90",
          "t-80": "#2B429B"
        },
        950: "#142A81"
      },
      gray: {
        10: "#EDF0F9",
        20: "#F7F8FE",
        50: "#FCFDFF",
        100: "#F8F9FD",
        200: "#FAFAFA",
        300: "#AFB6CA",
        400: "#838383",
        450: "#C5D8E8",
        500: "#F3F5FF",
        550: "#A7B2E7",
        600: {
          DEFAULT: "#6F6F6F",
          "t-20": "#6F6F6F33"
        },
        700: "#CFD4E8",
        750: "#CFD1D7",
        800: "#8890A6",
        900: {
          DEAFULT: "#131921",
          "t-50": "#13192180",
          "t-20": "#13192133"
        }
      },
      yellow: {
        100: "#FFF8CA",
        500: "#FFD84D",
        600: "#FFEEAD"
      },
      orange: {
        200: "#FFEAE3",
        300: "#EDBB80",
        400: "#FF720C"
      },
      pink: {
        50: "#FFA8A8",
        200: "#C8079D",
        300: "#F765A3",
        400: "#E961A2",
        500: "#FF7EB5",
        600: "#D81F77"
      },
      green: {
        20: "#D9FFDB",
        30: "#E7FFE7",
        40: "#A4DC79",
        100: "#EBFFE4",
        200: "#DBF1DE",
        300: "#C5E4E8",
        400: "#228179",
        500: "#77AB60",
        600: "#BAEABF",
        700: "#588C30"
      },
      violet: {
        200: "#E2DBF1",
        300: "#D9D7F2",
        500: "#431390",
        550: "#36097E"
      },
      cream: {
        300: "#FFF4EC",
        400: "#FFEAE3"
      }
    },
    fontSize: {
      8: ["0.5rem", "1.125rem"],
      10: ["0.625rem", "0.84375rem"],
      11: ["0.6875rem", "0.875rem"],
      12: ["0.75rem", "1.125rem"],
      13: ["0.8125rem", "1.125rem"],
      14: ["0.875rem", "1.125rem"],
      15: ["0.9375rem", "1.125rem"],
      16: ["1rem", "1.375rem"],
      18: ["1.125rem", "1.375rem"],
      20: ["1.25rem", "1.75rem"],
      22: ["1.375rem", "1.875rem"],
      24: ["1.5rem", "1.8rem"],
      26: ["1.625rem", "1.95rem"],
      30: ["1.875rem", "2.5625rem"],
      32: ["2rem", "2.5625rem"],
      34: ["2.125rem", "2.90625rem"],
      40: ["2.5rem", "3.375rem"],
      42: ["2.625rem", "2.625rem"]
    },
    extend: {}
  },
  plugins: []
};
