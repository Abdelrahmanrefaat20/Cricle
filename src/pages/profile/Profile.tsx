import { useContext, useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { counterContext } from "../../contexts/counterContext";
import type { PostI } from "../../interfaces/postI";
import { authServices } from "../../services/authService";
import postsService from "../../services/postService";
import profileService from "../../services/profileService";
import ProfileHeader from "./ProfileHeader";

export default function Profile() {
  const { profile, setProfile } = useContext(counterContext);

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await authServices.getUserData();
        setProfile(res.data.user); // adjust to your real response shape
      } catch (error) {
        console.error(error);
      }
    }
    getProfile();
  }, []);

  const [posts, setPosts] = useState<PostI[]>([]);

  async function getUserPosts() {
    if (!profile?.id) return;
    try {
      const res = await profileService.getUserPosts(profile.id);
      setPosts(res.data.posts); // adjust to your real response shape
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUserPosts();
  }, [profile?.id]);
  const {
    setBookmarked,
    setLiked,
  } = useContext(counterContext);

  async function deletePost(postId: string) {
     await postsService.deletePost(postId);
    getUserPosts();
  }

  async function likePost(postId: string) {
     await postsService.likePost(postId);
    setLiked((prev: string[]) =>
      !prev.includes(postId)
        ? [...prev, postId]
        : prev.filter((id) => id !== postId),
    );
    getUserPosts();
  }
  async function bookMark(postId: string) {
     await postsService.bookMark(postId);
    setBookmarked((prev: string[]) =>
      !prev.includes(postId)
        ? [...prev, postId]
        : prev.filter((id) => id !== postId),
    );
    getUserPosts();
  }

  const handleShare = async (post: PostI) => {
    try {
      await postsService.sharePost(post);
      getUserPosts();
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="mx-auto mt-5 min-h-screen w-full max-w-275 px-4">
      <ProfileHeader profile={profile} />

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
    </div>
  );
}
