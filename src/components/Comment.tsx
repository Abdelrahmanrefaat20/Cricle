import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@heroui/react";
import { useContext, useState } from "react";
import type { CommentI } from "../interfaces/commentI";
import { Ellipsis } from "lucide-react";
import { authContext } from "../contexts/AuthContext";

export default function Comment({
  comment,
  post,
  deleteComment,
  editComment,
}: {
  comment: CommentI;
  createComment: (postId: string, formData: FormData) => Promise<void>;
  post: any;
  deleteComment: (postId: string, commentId: string) => Promise<any>;
  editComment: (
    postId: string,
    commentId: string,
    formData: FormData,
  ) => Promise<any>;
}) {
  const { userData } = useContext(authContext);

   const [commentContentEdit, setCommentContentEdit] = useState(
    comment?.content || "",
  );
   const [isLoadingCommentEdit, setIsLoadingCommentEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);



  async function handelEditComment(e: any) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("content", commentContentEdit);
    setIsLoadingCommentEdit(true);
    await editComment(post._id, comment._id, formData);
    setEditMode(false);
    setIsLoadingCommentEdit(false);
  }
  return (
    <>
      {comment && (
        <>
          <div className="  my-4 ml-14 border-t border-[#243a38]" />
          <div className=" relative ml-13">
            <div className="flex gap-3">
              <img
                src={comment.commentCreator.photo}
                alt={comment.commentCreator.name}
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

                {!editMode ? (
                  <p className="mt-0.5 text-[14px] leading-5 text-white">
                    {comment.content}
                  </p>
                ) : (
                  <>
                    <form
                      onSubmit={handelEditComment}
                      className="ml-14 mt-4 flex items-center gap-3"
                    >
                      <Input
                        placeholder="Edit a comment"
                        variant="bordered"
                        radius="lg"
                        value={commentContentEdit}
                        onChange={(e) => setCommentContentEdit(e.target.value)}
                        classNames={{
                          base: "auth-input-base",
                          label: "auth-input-label",
                          inputWrapper: "auth-input-wrapper",
                          input: "auth-input",
                        }}
                      />

                      <Button
                        type="submit"
                        isLoading={isLoadingCommentEdit}
                        disabled={commentContentEdit.trim().length < 2}
                        className="h-10 min-w-19 rounded-full bg-[#39c2c6] px-5 text-[13px] font-semibold text-[#07100f] hover:bg-[#46d0d3]"
                      >
                        Edit
                      </Button>

                      <Button
                        type="button"
                        onPress={() => {
                          setEditMode(false);
                          setCommentContentEdit(comment.content);
                        }}
                        className="h-10 min-w-19 rounded-full bg-red-700 px-5 text-[13px] font-semibold text-[#07100f] hover:bg-red-900"
                      >
                        Cancel
                      </Button>
                    </form>
                  </>
                )}

                <div className="mt-2 flex flex-col gap-2">
                  {/* <button className="flex w-fit items-center gap-1 text-[12px] text-[#769694] hover:text-[#38c5ca]">
                    <Heart size={13} />
                    <span>{comment.likes}</span>
                  </button> */}
                  {/* 
                  <button className="w-fit text-[13px] text-[#7da19e] hover:text-[#38c5ca]">
                    Reply
                  </button> */}
                </div>
              </div>
            </div>

            {comment.commentCreator._id === userData._id && (
              <Dropdown
                placement="bottom-end"
                className=" bg-[#0e1d1b] border border-[#243a38] text-white overflow-hidden"
              >
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    className="absolute right-0 top-0 h-8 w-8 min-w-8 text-[#78908e] hover:bg-[#172825] hover:text-white"
                  >
                    <Ellipsis size={20} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  aria-label="Post actions"
                 >
                  <DropdownItem key="edit" onClick={() => setEditMode(true)}>
                    Edit
                  </DropdownItem>

                  <DropdownItem
                    key="delete"
                    color="danger"
                    className="text-danger"
                    onClick={() => deleteComment(post._id, comment._id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}

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
        </>
      )}

    </>
  );
}
