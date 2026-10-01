import type { UserI } from "../../interfaces/UserI";
import { authContext } from "../../contexts/authContext";
import { useContext } from "react";

export default function ProfileHeader({ user }: { user: UserI }) {
 const{ userData } = useContext(authContext);
  return (
    <div className="overflow-hidden rounded-2xl border border-[#243a38] bg-[#0e1d1b]">
      {/* Cover */}
      <div className="h-28 bg-gradient-to-r from-[#3bc1c4] via-[#55a9d0] to-[#7654d8]" />

      {/* Profile content */}
      <div className="relative px-4 pb-5">
        {/* Image */}
      <img
        src={userData.photo}
        alt=""
        className="h-11 w-11 shrink-0 rounded-3xl object-cover"
      />

        <div className="pt-12">
          <h1 className="text-[18px] font-bold text-white">
            {user.name}
          </h1>

          <p className="text-[13px] text-[#78908e]">
            @{user.username}
          </p>

          <p className="mt-5 text-[14px] leading-6 text-[#f2f5f4]">
            Designing calm software. Nile-side coffee enthusiast.
          </p>

          <div className="mt-3 flex items-center gap-1 text-[12px] text-[#78908e]">
            <span className="text-[#8bb5b7]">1</span>
            posts

            <span>·</span>

            <span className="text-[#8bb5b7]">128</span>
            followers

            <span>·</span>

            <span className="text-[#8bb5b7]">94</span>
            following
          </div>
        </div>
      </div>
    </div>
  );
}