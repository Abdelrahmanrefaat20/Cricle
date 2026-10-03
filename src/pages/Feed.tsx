import { useContext, useEffect, useState } from "react";
import postsService from "../services/postService";
import type { PostI } from "../interfaces/postI";
import Post from "../components/Post/Post";
import CreatePost from "../components/Post/CreatePost";
import { counterContext } from "../contexts/counterContext";
import WhoToFollow from "./WhoToFollow";

export default function Feed() {
  const [posts, setposts] = useState<PostI[]>([]);

  useEffect(() => {
    // get posts
    getAllPosts();
    whoToFollow();
  }, []);
  async function getAllPosts() {
    const { data } = await postsService.getAllPosts();
    setposts(data.posts);
  }

  async function deletePost(postId: string) {
    const response = await postsService.deletePost(postId);
    getAllPosts();
  }

  const { bookmarked, setBookmarked , suggestions, setSuggestions ,liked, setLiked , follow, setFollow} = useContext(counterContext);

  async function likePost(postId: string) {
    const response = await postsService.likePost(postId);
    setLiked((prev: string[]) =>
      !prev.includes(postId)
        ? [...prev, postId]
        : prev.filter((id) => id !== postId),
    );
    getAllPosts();
  }
  async function bookMark(postId: string) {
    const response = await postsService.bookMark(postId);
    setBookmarked((prev: string[]) =>
      !prev.includes(postId)
        ? [...prev, postId]
        : prev.filter((id) => id !== postId),
    );
    getAllPosts();
  }

  const handleShare = async (post: PostI) => {
    try {
      await postsService.sharePost(post);
      getAllPosts();
    } catch (error) {
      console.error(error);
    }
  };

  async function whoToFollow() {
    const response = await postsService.whoToFollow();
    setSuggestions(response.data.suggestions);
    getAllPosts();
  }

  // async function handleFollow(suggestionId: string) {
  //   const response = await postsService.followUser(suggestionId);
  //   setFollow((prev) => [...prev, response.data.user]);
  // } 

  return (
    <>
      <div className="min-h-screen bg-[#091412] px-4 py-5">
        <div className="mx-auto grid max-w-275 grid-cols-1 gap-3 lg:grid-cols-[1fr_100px]">
          {/* Posts */}
          <main className="min-w-0">
            <h1 className="mb-4 text-xl font-bold text-white fixed">Feed</h1>                               

            <CreatePost getAllPosts={getAllPosts} />

            <div className="mt-4 grid gap-4">
              {posts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  deletePost={deletePost}
                  likePost={likePost}
                  bookMark={bookMark}
                  sharePost={handleShare}
                />
              ))}
            </div>
          </main>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <WhoToFollow suggestions={suggestions} /*handleFollow={handleFollow}*/  follow={follow} />
          </aside>
        </div>
      </div>
    </>
  );
}
