import { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

// Words marked as "difficult", saved in localStorage
const StarredContext = createContext(null);

export function StarredProvider({ children }) {
  const [starred, setStarred] = useLocalStorage('starredWords', []);
  const value = {
    starred,
    isStarred: (key) => starred.includes(key),
    toggle: (key) =>
      setStarred((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key])),
  };
  return <StarredContext.Provider value={value}>{children}</StarredContext.Provider>;
}

export const useStarred = () => useContext(StarredContext);
