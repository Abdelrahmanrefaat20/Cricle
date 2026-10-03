import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Ellipsis } from "lucide-react";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import type { PostI } from "../../interfaces/postI";

export default function PostHeader({ post, deletePost }: { post: PostI; deletePost: (postId: string) => void }) {


  const { userData } = useContext(authContext);

  return (
    <div className="relative flex gap-3">
      <img
        src={post.user.photo}
        alt=""
        className="h-11 w-11 shrink-0 rounded-3xl object-cover"
      />

      <div className="min-w-0 flex-1 pr-8">
        <div className="flex items-center gap-1.5">
          <span className="text-[15px] font-bold">
            {post.user.name}
          </span>

          <span className="text-[13px] text-[#78908e]">
            @{post.user.username}
          </span>
        </div>

        {post.body && (
          <p className="mt-0.5 text-[15px] font-medium leading-6 text-[#f2f5f4]">
            {post.body}
          </p>
        )}

        {post.image && (
          <div className="my-2 w-full overflow-hidden rounded-xl">
            <img
              src={post.image}
              alt=""
              className="w-full rounded-xl object-cover"
            />
          </div>
        )}
      </div>


      {
        post.user._id === userData?._id && (
  <Dropdown placement="bottom-end" className=" bg-[#0e1d1b] border border-[#243a38] text-white overflow-hidden">
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
          // onAction={handleAction}
        >
          <DropdownItem key="edit">
            Edit
          </DropdownItem>

          <DropdownItem
            key="delete"
            color="danger"
            className="text-danger"
            onClick={() => deletePost(post._id)}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
        )
      }

    
    </div>
  );
}