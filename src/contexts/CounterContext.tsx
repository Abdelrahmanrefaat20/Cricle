import { createContext, useState, type ReactElement } from "react";
import type { SuggestionI } from "../interfaces/SuggestionI";
export const counterContext = createContext<any>({});

export default function CounterContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [counter, setcounter] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionI[]>([]);
  const [follow, setFollow] = useState<SuggestionI[]>([]);
  return (
    <counterContext.Provider
      value={{
        counter,
        setcounter,
        liked,
        setLiked,
        bookmarked,
        setBookmarked,
        suggestions,
        setSuggestions,
        follow,
        setFollow,
      }}
    >
      {children}
    </counterContext.Provider>
  );
}
