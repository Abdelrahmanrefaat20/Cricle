import { useContext, useEffect, useState } from "react";
import postsService from "../services/postService";
import type { PostI } from "../interfaces/postI";
import Post from "../components/Post/Post";
import CreatePost from "../components/Post/CreatePost";
import { counterContext } from "../contexts/counterContext";
import WhoToFollow from "./WhoToFollow";
import commentService from "../services/commentsServices";

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
     await postsService.deletePost(postId);
    getAllPosts();
  }

  const {   setBookmarked , suggestions, setSuggestions ,  setLiked  } = useContext(counterContext);

  async function likePost(postId: string) {
     await postsService.likePost(postId);
    setLiked((prev: string[]) =>
      !prev.includes(postId)
        ? [...prev, postId]
        : prev.filter((id) => id !== postId),
    );
    getAllPosts();
  }
  async function bookMark(postId: string) {
     await postsService.bookMark(postId);
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


  async function  createComment( postId: string, formData: FormData) {
    await commentService.createComment(postId, formData);
         getAllPosts();

  }

  async function deleteComment(postId: string , commentId:string) {
    await commentService.deleteComment(postId,commentId)
     getAllPosts();
  }
  async function editComment(postId: string ,  commentId:string , formData:FormData) {
    await commentService.editComment(postId,commentId , formData)
   await  getAllPosts();
  }

  return (
    <>
      <div className="min-h-screen bg-[#091412] px-4 py-5">
        <div className="mx-auto grid max-w-275 grid-cols-1 gap-3 lg:grid-cols-[1fr_100px]">
          {/* Posts */}
          <main className="min-w-0">

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
                  createComment={createComment}
                  deleteComment={deleteComment}
                  editComment={editComment}
                />
              ))}                             
            </div>
          </main>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <WhoToFollow suggestions={suggestions} /*handleFollow={handleFollow}*/   />
          </aside>
        </div>
      </div>
    </>
  );
}
