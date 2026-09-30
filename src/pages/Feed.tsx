import { useContext, useEffect, useState } from "react";
import postsService from "../services/postService";
import type { PostI } from "../interfaces/postI";
import { div } from "framer-motion/client";
import Post from "../components/Post/Post";
import CreatePost from "../components/Post/CreatePost";
import { counterContext } from "../contexts/counterContext";

export default function Feed() {
  const [posts, setposts] = useState<PostI[]>([]);

  useEffect(() => {
    // get posts
    getAllPosts();
  }, []);
  async function getAllPosts() {
    const { data } = await postsService.getAllPosts();
    setposts(data.posts);
  }

  async function deletePost(postId: string) {
    const response = await postsService.deletePost(postId);
    getAllPosts();
  }

  const { liked, setLiked } = useContext(counterContext);

  async function likePost(postId: string) {
    const response = await postsService.likePost(postId);
    setLiked((prev: string[]) =>
      !prev.includes(postId)
        ? [...prev, postId]
        : prev.filter((id) => id !== postId),
    );
    getAllPosts();
  }
  const { bookmarked, setBookmarked } = useContext(counterContext);
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

  return (
    <>
      <div>
        <h1>Feed</h1>

        <CreatePost getAllPosts={getAllPosts} />

        <div className=" grid gap-4">
          {posts.map((post) => (
            <Post
              post={post}
              deletePost={deletePost}
              likePost={likePost}
              bookMark={bookMark}
              sharePost={handleShare}
            />
          ))}
        </div>
      </div>
    </>
  );
}
