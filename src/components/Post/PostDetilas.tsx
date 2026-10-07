import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { counterContext } from "../../contexts/counterContext";
import type { PostI } from "../../interfaces/postI";
import commentService from "../../services/commentsServices";
import postsService from "../../services/postService";
import type { CommentI } from "./../../interfaces/commentI";
import Post from "./Post";

export default function PostDetilas() {
  const { postId } = useParams();
  const [post, setpost] = useState<PostI>();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setcomments] = useState<CommentI[]>([]);
  async function getPostData() {
    if (postId) {
      const { data } = await postsService.getPostDetilas(postId);
      setpost(data.post);
      getCommentsPost();
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getPostData();
  }, []);
  async function deletePost(postId: string) {
    await postsService.deletePost(postId);
    getPostData();
  }

  const { setBookmarked,  setLiked } =
    useContext(counterContext);

  async function likePost(postId: string) {
    await postsService.likePost(postId);
    setLiked((prev: string[]) =>
      !prev.includes(postId)
        ? [...prev, postId]
        : prev.filter((id) => id !== postId),
    );
    getPostData();
  }
  async function bookMark(postId: string) {
    await postsService.bookMark(postId);
    setBookmarked((prev: string[]) =>
      !prev.includes(postId)
        ? [...prev, postId]
        : prev.filter((id) => id !== postId),
    );
    getPostData();
  }

  const handleShare = async (post: PostI) => {
    try {
      await postsService.sharePost(post);
      getPostData();
    } catch (error) {
      console.error(error);
    }
  };

  async function createComment(postId: string, formData: FormData) {
    await commentService.createComment(postId, formData);
    getPostData();
  }

  async function deleteComment(postId: string, commentId: string) {
    await commentService.deleteComment(postId, commentId);
    getPostData();
  }
  async function editComment(
    postId: string,
    commentId: string,
    formData: FormData,
  ) {
    await commentService.editComment(postId, commentId, formData);
    await getPostData();
  }

  async function getCommentsPost() {
    if (postId) {
      const response = await commentService.getPostComment(postId);

      setcomments(response.data.comments);
    }
  }

  return (
    <div className="min-h-screen bg-[#091412] px-4 py-5">
      <div className="mx-auto grid max-w-275 grid-cols-1 gap-3 lg:grid-cols-[1fr_100px]">
        <main className="min-w-0">
          {post && (
            <Post
              key={post._id}
              post={post}
              deletePost={deletePost}
              likePost={likePost}
              bookMark={bookMark}
              sharePost={handleShare}
              createComment={createComment}
              deleteComment={deleteComment}
              editComment={editComment}
              comments={comments}
            />
          )}
        </main>
      </div>
    </div>
  );
}
