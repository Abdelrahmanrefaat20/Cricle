import { createContext, useEffect, useState, type ReactElement } from "react";
import type { SuggestionI } from "../interfaces/SuggestionI";
export const counterContext = createContext<any>({});

export default function CounterContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [counter, setcounter] = useState(0);
  const [liked, setLiked] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("likedPosts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  //  useEffect(() => {
  //   localStorage.setItem("likedPosts", JSON.stringify(liked));
  // }, [liked]);
  const [bookmarked, setBookmarked] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("bookmarkedPosts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  //  useEffect(() => {
  //   localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarked));
  // }, [bookmarked]);
  const [suggestions, setSuggestions] = useState<SuggestionI[]>([]);
  const [follow, setFollow] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("followedUsers");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("followedUsers", JSON.stringify(follow));
    localStorage.setItem("likedPosts", JSON.stringify(liked));
    localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarked));
  }, [follow, liked, bookmarked]);
  const [profile, setProfile] = useState<any>(null);
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
        profile,
        setProfile,
      }}
    >
      {children}
    </counterContext.Provider>
  );
}
