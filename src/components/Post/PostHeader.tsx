import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { Ellipsis, ImagePlus, X } from "lucide-react";
import { useContext, useState } from "react";
import { authContext } from "../../contexts/AuthContext";
import type { PostI } from "../../interfaces/postI";
import { counterContext } from "../../contexts/CounterContext";

export default function PostHeader({
  post,
  deletePost,
  handleFollow,
  editPost,
}: {
  post: PostI;
  deletePost: (postId: string) => void;
  handleFollow?: (suggestionId: string) => void;
  editPost: (postId: string, formData: FormData) => Promise<void>;
}) {
  const { userData } = useContext(authContext);

  const [body, setBody] = useState(post.body ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(post.image ?? null);
  const [isLoadingPostEdit, setIsLoadingPostEdit] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const imgFile = e.target.files?.[0];

    if (!imgFile) return;

    setImageFile(imgFile);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(imgFile);
  }

  function removeImage() {
    setImageFile(null);
    setPreview(null);
  }

  function resetForm() {
    setBody(post.body ?? "");
    setImageFile(null);
    setPreview(post.image ?? null);
  }

  async function handleSubmit(onClose: () => void) {
    const formData = new FormData();
    formData.set("body", body);
    if (imageFile) formData.set("image", imageFile);

    try {
      setIsLoadingPostEdit(true);
      await editPost(post._id, formData);
      onClose();
    } finally {
      setIsLoadingPostEdit(false);
    }
  }
   const {follow} = useContext(counterContext)
  return (
    <>
      <div className="relative flex gap-3">
        <img
          src={post.user.photo}
          alt=""
          className="h-11 w-11 shrink-0 rounded-3xl object-cover"
        />

        <div className="min-w-0 flex-1 pr-8">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-bold">{post.user.name}</span>

            <span className="text-[13px] text-[#78908e]">
              @{post.user.username}
            </span>

            {post.user._id !== userData?._id && (
              <Button
                onPress={() => handleFollow?.(post.user._id)}
                //   className={
                //     post.user.following
                //       ? "h-6 min-w-15 border border-[#29403e] bg-transparent px-2 text-[13px] font-semibold text-[#d7e2e0] rounded-full"
                //       : "h-6 min-w-10 bg-[#39c2c6] px-2 text-[13px] font-semibold text-[#07100f] rounded-full"
                //   }
                // >
                //   {post.user.following ? "Following" : "Follow"}

                className={
                  follow.includes(post.user._id)
                    ? "h-6 min-w-15 border border-[#29403e] bg-transparent px-2 text-[13px] font-semibold text-[#d7e2e0] rounded-full"
                    : "h-6 min-w-10 bg-[#39c2c6] px-2 text-[13px] font-semibold text-[#07100f] rounded-full"
                }
              >
                {follow.includes(post.user._id) ? "Following" : "Follow"}
              </Button>
            )}
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

        {post.user._id === userData?._id && (
          <Dropdown
            placement="bottom-end"
            className="bg-[#0e1d1b] border border-[#243a38] text-white overflow-hidden"
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

            <DropdownMenu aria-label="Post actions">
              <DropdownItem key="edit" onPress={onOpen}>
                Edit
              </DropdownItem>

              <DropdownItem
                key="delete"
                color="danger"
                className="text-danger"
                onPress={() => deletePost(post._id)}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          onOpenChange();
          if (!open) resetForm();
        }}
        placement="center"
        size="lg"
        classNames={{
          base: "bg-[#0e1d1b] border border-[#243a38] text-[#f2f5f4]",
          header: "border-b border-[#243a38]",
          body: "py-5",
          footer: "border-t border-[#243a38]",
          closeButton: "hover:bg-[#172825] text-[#78908e] hover:text-white",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-[#f2f5f4]">
                  Edit Post
                </h2>

                <p className="text-sm font-normal text-[#78908e]">
                  Update your post content or image.
                </p>
              </ModalHeader>

              <ModalBody>
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-[#d7e2e0] ">Post image</p>
                  <Textarea
                    placeholder="What's on your mind?"
                    value={body}
                    onValueChange={setBody}
                    minRows={3}
                    classNames={{
                      base: "auth-input-base",
                      label: "auth-input-label",
                      inputWrapper: "auth-input-wrapper",
                      input: "auth-input",
                    }}
                  />

                  <div>
                    <p className="text-sm text-[#d7e2e0] mb-2">Post image</p>

                    {preview ? (
                      <div className="relative overflow-hidden rounded-xl border border-[#243a38] bg-[#07100f]">
                        <img
                          src={preview}
                          alt="Post preview"
                          className="w-full max-h-75 object-cover"
                        />

                        <Button
                          isIconOnly
                          size="sm"
                          onPress={removeImage}
                          aria-label="Remove image"
                          className="absolute top-3 right-3 min-w-8 w-8 h-8 bg-black/70 text-white hover:bg-black/90"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor={`post-image-${post._id}`}
                        className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#29403e] bg-[#07100f] transition hover:border-[#39c2c6]"
                      >
                        <ImagePlus size={25} className="text-[#78908e]" />

                        <span className="text-sm text-[#78908e]">
                          Click to upload a new image
                        </span>

                        <input
                          id={`post-image-${post._id}`}
                          type="file"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="light"
                  onPress={onClose}
                  isDisabled={isLoadingPostEdit}
                  className="text-[#78908e] hover:bg-[#172825] hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  isLoading={isLoadingPostEdit}
                  onPress={() => handleSubmit(onClose)}
                  className="bg-[#39c2c6] text-[#07100f] font-semibold px-6"
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
