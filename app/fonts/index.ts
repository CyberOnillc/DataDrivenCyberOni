import localFont from "next/font/local";
import { Abel, Inter, Nunito } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});
export const inter = localFont({
  src: [
    {
      path: "./Inter/Inter-VariableFont_slnt,wght.ttf",
    }
  ],
  variable: "--font-inter",
});
export const abel = localFont({
  src: [{
    path: "./Abel/Abel-Regular.ttf",
  }],
  variable: "--font-abel",
});

export const nunito = localFont({
  src: [
    {
      path: "./Nunito/Nunito-VariableFont_wght.ttf",
    }

  ],
  variable: "--font-nunito",
});
export const kyiv = localFont({
  src: [
    {
      path: "./KyivTypeSans-VarGX.ttf",
    }

  ],
  variable: "--font-kyiv",
});



