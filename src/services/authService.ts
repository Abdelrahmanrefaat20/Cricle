import axios from "axios";
import type { RegisterData } from "../types/registerData";
import type { LoginData } from "../types/loginDate";


class AuthServices {



    async signUp(registerData: RegisterData) {
        const { data } = await axios.post(
            "https://route-posts.routemisr.com/users/signup",
            registerData,
        );
        return data;
    }

    async signIn(loginData: LoginData) {
        const { data } = await axios.post(
            "https://route-posts.routemisr.com/users/signin",
            loginData,
        );
        return data;
    }


}

export const authServices = new AuthServices()