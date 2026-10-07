import type { PostI } from "../../interfaces/postI";
import Comment from "../Comment";
import CommentFooter from "../CommentFooter";
import type { CommentI } from "./../../interfaces/commentI";
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
  comments,
  handleFollow,
  editPost,
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
  comments?: CommentI[];
  handleFollow?: (suggestionId: string) => void;
  editPost: (postId: string, formData: FormData) => Promise<void>;
}) {
  return (
    <article className="w-full max-w-138 rounded-2xl border border-[#243a38] bg-[#0e1d1b] p-4 text-white mx-auto">
      {/* Post Header */}
      <PostHeader post={post} deletePost={deletePost} handleFollow={handleFollow} editPost={editPost}/>

      {/* Post Footer */}

      <PostFooter
        post={post}
        likePost={likePost}
        bookMark={bookMark}
        sharePost={sharePost}
      />

        <CommentFooter postId={post._id}  createComment={createComment}/>

      {comments && comments.length > 0
        ? comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              createComment={createComment}
              post={post}
              deleteComment={deleteComment}
              editComment={editComment}
            />
          ))
        : post.topComment && (
            <Comment
              comment={post.topComment}
              createComment={createComment}
              post={post}
              deleteComment={deleteComment}
              editComment={editComment}
            />
          )}
    </article>
  );
}
