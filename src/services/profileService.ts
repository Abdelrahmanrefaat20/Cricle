import axios from "axios";

class ProfileService {

async getProfile() {
    const { data } = await axios.get("https://route-posts.routemisr.com/users/profile-data", {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    return data;

}


}
const profileService = new ProfileService();
export default profileService;
