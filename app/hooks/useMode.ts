'use client'

import {useContext} from "react";
import {ModeContext} from "../context/ModeContext";

export const useMode = () => {
  const context = useContext(ModeContext);
  console.log(context)

  if (context === undefined) {
    console.log("Error. Use this context inside ThemeProvider scope...")
  }

  return context;
}
