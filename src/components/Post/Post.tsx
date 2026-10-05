import type { PostI } from "../../interfaces/postI";
import Comment from "../Comment";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export default function Post({
  post,
  deletePost,
  likePost,
  bookMark,
  sharePost,
  createComment,
  deleteComment,
  editComment,
}: {
  post: PostI;
  deletePost: (postId: string) => void;
  likePost: (postId: string) => void;
  bookMark: (postId: string) => void;
  sharePost: (post: PostI) => void;
  createComment: (postId: string, formData: FormData) => Promise<void>;
  deleteComment: (postId: string, commentId: string) => Promise<any>;
  editComment: (
    postId: string,
    commentId: string,
    formData: FormData,
  ) => Promise<any>;
}) {
  return (
    <article className="w-full max-w-138 rounded-2xl border border-[#243a38] bg-[#0e1d1b] p-4 text-white mx-auto">
      {/* Post Header */}
      <PostHeader post={post} deletePost={deletePost} />

      {/* Post Footer */}

      <PostFooter
        post={post}
        likePost={likePost}
        bookMark={bookMark}
        sharePost={sharePost}
      />

      {/* Comment */}
      <Comment
        comment={post.topComment}
        createComment={createComment}
        post={post}
        deleteComment={deleteComment}
        editComment={editComment}
      />
    </article>
  );
}
