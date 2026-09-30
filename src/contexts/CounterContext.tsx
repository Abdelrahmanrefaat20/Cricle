import { createContext, useState, type ReactElement } from "react";
export const counterContext = createContext<any>({});

export default function CounterContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [counter, setcounter] = useState(0);
const [liked, setLiked] = useState<string[]>([]);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  return (
    <counterContext.Provider
      value={{
        counter,
        setcounter,
        liked,
        setLiked,
        bookmarked,
        setBookmarked,
      }}
    >
      {children}
    </counterContext.Provider>
  );
}
