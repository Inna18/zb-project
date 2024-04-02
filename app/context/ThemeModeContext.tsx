'use client';

import { createContext, useReducer } from 'react';

interface Props {
  mode: string;
  changeMode: (mode: string) => void;
}

export const ThemeModeContext = createContext<Props>({
  mode: 'light',
  changeMode: (mode: string) => {},
});

const themeModeReducer = (
  state: Object,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { mode: action.payload };
    default:
      return state;
  }
};

export const ThemeModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeModeReducer, {
    mode: 'light',
  });

  const changeMode = (mode: string) => {
    dispatch({ type: 'CHANGE_MODE', payload: mode });
  };

  return (
    <ThemeModeContext.Provider value={{ ...state, changeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};
