'use client'

import {createContext, useReducer} from "react";

interface Props {
    mode: string,
    changeMode: ((mode: string) => void)
} 

export const ModeContext = createContext<Props>({
    mode: "light",
    changeMode: ((mode: string) => {})
});

const themeReducer = (state: any, action: {type: string, payload: string}) => {
    switch (action.type) {
      case "CHANGE_MODE":
        return { ...state, mode: action.payload }
      default:
        return state;
    }
}

export const ModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    mode: "light"
  });

  const changeMode = (mode: string) => {
    console.log("mode: ", mode)
    dispatch({ type: "CHANGE_MODE", payload: mode })
  }

  return (
    <ModeContext.Provider value={{ ...state, changeMode }}>
      {children}
    </ModeContext.Provider>
  )
}