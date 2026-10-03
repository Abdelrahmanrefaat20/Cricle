import { Button, Input } from "@heroui/react";
import { Heart } from "lucide-react";
import type { CommentI } from "../interfaces/commentI";

export default function Comment({ comment }: { comment: CommentI }) {
  return (
    
    <>
      {comment && (
        <>
          <div className="my-4 ml-14 border-t border-[#243a38]" />
          <div className="ml-13">
            <div className="flex gap-3">
              <img
                src={comment.commentCreator.photo}
                alt=""
                className="h-11 w-11 shrink-0 rounded-3xl object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold">
                    {comment.commentCreator.name}
                  </span>

                  <span className="text-[12px] text-[#78908e]">
                    @{comment.commentCreator.username}
                  </span>
                </div>

                <p className="mt-0.5 text-[14px] leading-5 text-white">
                  {comment.content}
                </p>

                <div className="mt-2 flex flex-col gap-2">
                  <button className="flex w-fit items-center gap-1 text-[12px] text-[#769694] hover:text-[#38c5ca]">
                    <Heart size={13} />
                    <span>{comment.likes}</span>
                  </button>

                  <button className="w-fit text-[13px] text-[#7da19e] hover:text-[#38c5ca]">
                    Reply
                  </button>
                </div>
              </div>
            </div>

            {/* Nested Reply */}
            {<></>}
            {/* <div className="ml-13 mt-4 flex gap-3">
              <Avatar
                name="L"
                className="h-8 w-8 shrink-0 bg-[#7654d8] text-[13px] text-white"
              />

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold">Lina Farouk</span>

                  <span className="text-[12px] text-[#78908e]">@lina</span>
                </div>

                <p className="mt-0.5 text-[14px] leading-5 text-white">
                  Zamalek, near the bridge.
                </p>

                <button className="mt-2 flex items-center gap-1 text-[12px] text-[#769694] hover:text-[#38c1c4]">
                  <Heart size={13} />
                  <span>1</span>
                </button>
              </div>
            </div> */}
          </div>

          {/* Add Comment */}

          <div className="ml-14 mt-4 flex items-center gap-3">
            <Input
              placeholder="Write a comment"
              variant="bordered"
              radius="lg"
              classNames={{
                base: "auth-input-base",
                label: "auth-input-label",
                inputWrapper: "auth-input-wrapper",
                input: "auth-input",
              }}
            />

            <Button className="h-10 min-w-19 bg-[#39c2c6] px-5 text-[13px] font-semibold text-[#07100f] hover:bg-[#46d0d3] rounded-full">
              Send
            </Button>
          </div>
        </>
      )}
    </>
  );
}
