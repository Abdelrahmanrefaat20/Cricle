import { Button } from "@heroui/react";
import type { SuggestionI } from "../interfaces/SuggestionI";

export default function WhoToFollow({
  suggestions,
  follow,
}: {
  suggestions: SuggestionI[];
  follow: SuggestionI[];
}) {
  return (
    <div className="fixed top-5 rounded-2xl border border-[#243a38] bg-[#0e1d1b] p-4 mt-20">
      <h2 className="mb-3 text-[16px] font-bold text-[#f2f5f4]">
        Who to follow
      </h2>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.username}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={suggestion.photo}
                alt=""
                className="h-11 w-11 shrink-0 rounded-3xl object-cover"
              />

              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold text-[#f2f5f4]">
                  {suggestion.name}
                </p>

                <p className="text-[12px] text-[#78908e]">
                  @{suggestion.username}
                </p>
              </div>
            </div>

            <Button
              size="sm"
              radius="full"
              // onPress={() => handleFollow(suggestion._id)}
              className={
                suggestion.following
                  ? "h-9 min-w-27 border border-[#29403e] bg-transparent px-4 text-[13px] font-semibold text-[#d7e2e0]"
                  : "h-9 min-w-21 bg-[#39c2c6] px-4 text-[13px] font-semibold text-[#07100f]"
              }
            >
              {suggestion.following ? "Following" : "Follow"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
