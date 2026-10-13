import { createContext, useEffect, useState, type ReactElement } from "react";
import type { SuggestionI } from "../interfaces/SuggestionI";
export const counterContext = createContext<any>({});

export default function CounterContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [profile, setProfile] = useState<any>(null);

  const [counter, setcounter] = useState(0);
  const [liked, setLiked] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("likedPosts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarked, setBookmarked] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("bookmarkedPosts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

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
    if (!profile?.id) return;

    const followedUsers = follow.map((userId) => ({
      userId: profile.id,
      followedId: userId,
    }));

    const likedPosts = liked.map((postId) => ({
      userId: profile.id,
      postId,
    }));

    const bookmarkedPosts = bookmarked.map((postId) => ({
      userId: profile.id,
      postId,
    }));

    localStorage.setItem("followedUsers", JSON.stringify(followedUsers));
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarkedPosts));
  }, [follow, liked, bookmarked, profile?.id]);
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
