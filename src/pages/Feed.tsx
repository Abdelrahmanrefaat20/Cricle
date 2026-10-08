import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import LoadingScreen from "../components/LoadingScreen";
import CreatePost from "../components/Post/CreatePost";
import Post from "../components/Post/Post";
import { counterContext } from "../contexts/counterContext";
import type { PostI } from "../interfaces/postI";
import commentService from "../services/commentsServices";
import postsService from "../services/postService";
import WhoToFollow from "./WhoToFollow";

export default function Feed() {
  const {
    data: posts = [],
    isLoading,isFetching,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getAllPosts,
    select: (data) => data.data.posts,
    staleTime: 30_000 ,
    // refetchInterval: 30_000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 3,
    retryDelay: 3000,
  });

  const { data: whoToFollow = [] } = useQuery({
    queryKey: ["WhoToFollow"],
    queryFn: postsService.whoToFollow,
    select: (data) => data.data.suggestions,
  });

  async function deletePost(postId: string) {
    await postsService.deletePost(postId);
    refetchPosts();
  }

  const { setBookmarked, setLiked, setFollow } = useContext(counterContext);

  async function likePost(postId: string) {
    await postsService.likePost(postId);
    setLiked((prev: string[]) =>
      !prev.includes(postId)
        ? [...prev, postId]
        : prev.filter((id) => id !== postId),
    );
    refetchPosts();
  }
  async function bookMark(postId: string) {
    await postsService.bookMark(postId);
    setBookmarked((prev: string[]) =>
      !prev.includes(postId)
        ? [...prev, postId]
        : prev.filter((id) => id !== postId),
    );

    refetchPosts();
  }

  const handleShare = async (post: PostI) => {
    try {
      await postsService.sharePost(post);

      refetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

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

  async function createComment(postId: string, formData: FormData) {
    await commentService.createComment(postId, formData);

    refetchPosts();
  }

  async function deleteComment(postId: string, commentId: string) {
    await commentService.deleteComment(postId, commentId);
    refetchPosts();
  }
  async function editComment(
    postId: string,
    commentId: string,
    formData: FormData,
  ) {
    await commentService.editComment(postId, commentId, formData);
    refetchPosts();
  }

  async function editPost(postId: string, formData: FormData) {
    await postsService.editPost(postId, formData);
    refetchPosts();
  }

  return (
    <>
      <div className="min-h-screen bg-[#091412] px-4 py-5">
        <div className="mx-auto grid max-w-275 grid-cols-1 gap-1 lg:grid-cols-[1fr_100px]">
          {/* Posts */}
          <main className="min-w-0">

               {isFetching && !isLoading && (
          <div className="fixed bg-[#07100f] border border-[#29403e] px-6 py-3 shadow-2xl rounded-4xl inset-s-1/2 -translate-1/2 mt-2">
            <Spinner color="success" size="sm" />
          </div>
        )}
            <CreatePost getAllPosts={refetchPosts} />

            <div className="mt-4 grid gap-4">
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <>
                  {posts.map((post) => (
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
                      handleFollow={handleFollow}
                      editPost={editPost}
                    />
                  ))}
                </>
              )}
            </div>
          </main>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <WhoToFollow
              suggestions={whoToFollow}
              handleFollow={handleFollow}
            />
          </aside>
        </div>
      </div>
    </>
  );
}
