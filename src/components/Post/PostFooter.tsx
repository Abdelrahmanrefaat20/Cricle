import React, { useContext } from "react";
import type { PostI } from "../../interfaces/postI";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { counterContext } from "../../contexts/counterContext";

export default function PostFooter({
  post,
  likePost,
  bookMark,
  sharePost,
}: {
  post: PostI;
  likePost: any;
  bookMark: any;
  sharePost: (post: PostI) => void;
}) {
  const { liked, setLiked } = useContext(counterContext);
  const { bookmarked, setBookmarked } = useContext(counterContext);
  return (
    <div className="ml-[55px] mt-4 flex items-center gap-7 text-[#8ca9a7]">
      <button
        onClick={() => likePost(post._id)}
        className="flex items-center gap-1 text-[13px] transition"
      >
        <Heart
          size={15}
          strokeWidth={1.5}
          className={
            liked.includes(post._id) ? "text-red-500" : "text-[#8ca9a7]"
          }
          fill={liked.includes(post._id) ? "currentColor" : "none"}
        />

        <span>{post.likesCount}</span>
      </button>

      <button className="flex items-center gap-1 text-[13px] transition hover:text-[#38c5ca]">
        <MessageCircle size={15} strokeWidth={1.5} />
        <span>{post.commentsCount}</span>
      </button>

      <button
        onClick={() => sharePost(post)}
        className="flex items-center gap-1 text-[13px] transition hover:text-[#38c5ca]"
      >
        <Share2 size={15} strokeWidth={1.5} />
        <span>Share</span>
      </button>

      <button
        onClick={() => bookMark(post._id)}
        className="flex items-center gap-1 text-[13px] transition hover:text-[#38c5ca]"
      >
        <Bookmark
          size={15}
          strokeWidth={1.5}
          className={
            bookmarked && bookmarked.includes(post._id)
              ? "text-yellow-500"
              : "text-[#8ca9a7]"
          }
          fill={
            bookmarked && bookmarked.includes(post._id)
              ? "currentColor"
              : "none"
          }
        />
        <span>Save</span>
      </button>
    </div>
  );
}
