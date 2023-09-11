import { css, Global } from "@emotion/react";

import LatoRegular from "../assets/fonts/Lato/Lato-Regular.ttf";
import LatoBold from "../assets/fonts/Lato/Lato-Bold.ttf";
import LatoLight from "../assets/fonts/Lato/Lato-Light.ttf";
import LatoThin from "../assets/fonts/Lato/Lato-Thin.ttf";

const globalStyles = (
  <Global
    styles={() => css`
      @font-face {
        font-family: "Lato";
        font-style: normal;
        font-weight: regular;
        src: url(${LatoRegular}) format("truetype");
      }
      @font-face {
        font-family: "Lato";
        font-style: normal;
        font-weight: Bold;
        src: url(${LatoBold}) format("truetype");
      }
      @font-face {
        font-family: "Lato";
        font-style: normal;
        font-weight: Light;
        src: url(${LatoLight}) format("truetype");
      }
      @font-face {
        font-family: "Lato";
        font-style: normal;
        font-weight: Thin;
        src: url(${LatoThin}) format("truetype");
      }

      html,
      body {
        margin: 0;
        padding: 0;
        min-height: 100%;
        font-family: "Lato";
        scroll-behavior: smooth;
        background: #f7fafc;
      }
      body {
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        padding-top: 0px;
        margin: 0px;
        font-family: "Lato";
      }
      * {
        box-sizing: border-box;
        &:before,
        &:after {
          box-sizing: border-box;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      ul,
      li,
      h6,
      p,
      img,
      figure {
        margin: 0px;
        padding: 0px;
      }
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        box-shadow: 0 0 0 30px white inset !important;
      }

      input[type="time"]::-webkit-calendar-picker-indicator {
        display: none;
      }
    `}
  />
);

export { globalStyles };
