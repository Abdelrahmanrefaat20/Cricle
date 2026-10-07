import axios from "axios";
import type {
    CreateCommentResponse,
    DeleteCommentResponse,
    GetPostCommentsResponse,
} from "../types/respone";

class CommentService {
  async createComment(
    postId: string,
    formData: FormData,
  ): Promise<CreateCommentResponse> {
    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  }
  async editComment(
    postId: string,
    commentId: string,
    formData: FormData,
  ): Promise<CreateCommentResponse> {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    console.log(data);

    return data;
  }

  async deleteComment(
    postId: string,
    commentId: string,
  ): Promise<DeleteCommentResponse> {
    const { data } = await axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  }

  async getPostComment(postId: string) :Promise<GetPostCommentsResponse>  {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return data;
  }
}
const commentService = new CommentService();
export default commentService;
