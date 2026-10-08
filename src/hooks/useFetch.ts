import { useEffect, useState } from "react";
import postsService from "../services/postService";
import type { PostI } from "../interfaces/postI";

export default function useFetch() {
  const [post, setpost] = useState<PostI[]>([]);
  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const { data } = await postsService.getAllPosts();
    setpost(data.posts);
  }
  return post;
}
