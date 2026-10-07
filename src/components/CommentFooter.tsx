import { Button, Input } from "@heroui/react";
import { useState } from "react";

export default function CommentFooter({
  postId,
  createComment,
}: {
  postId: string;
  createComment: (postId: string, formData: FormData) => Promise<void>;
}) {
  const [commentContent, setcommentContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handelCreateComment(e: any) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.set("content", commentContent);
    await createComment(postId, formData);
    setIsLoading(false);
    setcommentContent("");
  }

  return (
    <>
      <div>
        <form
          onSubmit={handelCreateComment}
          className="ml-14 mt-4 flex items-center gap-3"
        >
          <Input
            placeholder="Write a comment"
            variant="bordered"
            radius="lg"
            value={commentContent}
            onChange={(e) => setcommentContent(e.target.value)}
            classNames={{
              base: "auth-input-base",
              label: "auth-input-label",
              inputWrapper: "auth-input-wrapper",
              input: "auth-input",
            }}
          />

          <Button
            disabled={commentContent.trim().length < 2}
            type="submit"
            isLoading={isLoading}
            onPress={handelCreateComment}
            className="h-10 min-w-19 bg-[#39c2c6] px-5 text-[13px] font-semibold text-[#07100f] hover:bg-[#46d0d3] rounded-full"
          >
            Send
          </Button>
        </form>
      </div>
    </>
  );
}
