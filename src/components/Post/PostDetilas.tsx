import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { counterContext } from "../../contexts/CounterContext";
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
  const  navigate= useNavigate()
  async function getPostData() {
    if (postId) {
      isLoading && setIsLoading(true);
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
    navigate("/" , {
      replace: true
    })
  }

  const { setBookmarked,  setLiked , setFollow
   } =
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
    async function editPost(postId: string, formData: FormData) {
    await postsService.editPost(postId, formData);
    await getPostData();
  }
  async function handleFollow(userId: string) {
    try {
      await postsService.followUser(userId);

      setFollow((prev: any[]) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId],
      );
    } catch (error) {
      console.error("Follow error:", error);
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
              editPost={editPost}
              handleFollow={handleFollow}
            />
          )}
        </main>
      </div>
    </div>
  );
}
