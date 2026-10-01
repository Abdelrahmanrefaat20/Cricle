import { Button } from "@heroui/react";
import { useContext, useEffect } from "react";
import { counterContext } from "../../contexts/counterContext";
import ProfileHeader from "./ProfileHeader";
import profileService from "../../services/profileService";

export default function Profile() {
    const { counter, setcounter } = useContext(counterContext);


    async function getProfile() {
        const response = await profileService.getProfile();
        setcounter(response.data);
    }

    useEffect(() => {
        getProfile();
    }, []);

  return (
    <div>
     <ProfileHeader />
    </div>
  );
}
