import axios from "axios";
export interface ChangePasswordData {
  password: string;
  newPassword: string;
}
class ProfileService {




async getUserPosts(userId: string) {
  const { data } = await axios.get(
    `https://route-posts.routemisr.com/users/${userId}/posts`,  
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
  return data;
}

async updateProfilePhote(formData:FormData){
    const { data }= await axios.put(
        `https://route-posts.routemisr.com/users/upload-photo`, formData,
         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    )
    return data;
}

async  changePassowrd(ChangePasswordData : ChangePasswordData) {
      const { data }= await axios.patch(
        `https://route-posts.routemisr.com/users/change-password`, ChangePasswordData ,
         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    )
    return data;
}


}
const profileService = new ProfileService();
export default profileService;
