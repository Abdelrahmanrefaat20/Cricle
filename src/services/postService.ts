import axios from "axios";
import type { PostI } from "../interfaces/postI";
import type { GetPostsResponse } from "../types/respone";

class PostsService{
     

    async getAllPosts() : Promise<GetPostsResponse> {
        const { data } = await axios.get("https://route-posts.routemisr.com/posts", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    }

    async  createPost(formData:FormData) {
        const { data } = await axios.post("https://route-posts.routemisr.com/posts", formData,{
            headers: {
                token: localStorage.getItem("token")
            }
        })

        return data;
    }

    async deletePost(postId: string) {
        const { data } = await axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    }

   async likePost(postId: string) {
  const { data } = await axios.put(
    `https://route-posts.routemisr.com/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
}
   async bookMark(postId: string) {
  const { data } = await axios.put(
    `https://route-posts.routemisr.com/posts/${postId}/bookmark`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
}

async sharePost(post: PostI) {
  const { data } = await axios.post(
    `https://route-posts.routemisr.com/posts`,
    {
body: `Shared @${post.user.username} ${ post.body ?  post.body : ""}`,    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;
}

async whoToFollow() {
  const { data } = await axios.get(
    "https://route-posts.routemisr.com/users/suggestions?limit=10",
    {
      headers: {  
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return data;

}





async followUser(userId: string) {
  const { data } = await axios.post(
    `https://route-posts.routemisr.com/users/${userId}/follow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
}


}
 const postsService = new PostsService();
 export default postsService;       