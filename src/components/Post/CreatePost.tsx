import { Button, Textarea } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { ImagePlus } from "lucide-react";
import { useContext, useState } from "react";
import { queryClient } from "../../App";
import { authContext } from "../../contexts/authContext";
import postsService from "./../../services/postService";

export default function CreatePost({ getAllPosts }: { getAllPosts: any }) {
  const [showForm, setShowForm] = useState(false);
  const [caption, setCaption] = useState("");

  const [imgfile, setImgfile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [IsLoading, setIsLoading] = useState(false);

  const { userData } = useContext(authContext);


const { mutate } = useMutation({
  mutationFn: createPost,

  onSuccess: () => {
    removeFile();
    setCaption("");
    setShowForm(false);
    setIsLoading(false);

    queryClient.invalidateQueries({
      queryKey: ["posts"],
      type : 'active'
    });
  },
});

  function handelImageChnage(e: any) {
    const imgfile = e.target.files?.[0];
    setImgfile(imgfile);
    const reader = new FileReader();
    reader.onload = function () {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(imgfile);
  }

  function removeFile() {
    setImgfile(null);
    setImagePreview(null);
  }

  async function createPost(e: any) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    if (caption) {
      formData.set("body", caption);
    }
    if (imgfile) {
      formData.set("image", imgfile);
    }

     await postsService.createPost(formData);

   
  }


  

  return (
    <div className="w-full max-w-138 rounded-2xl border border-[#243a38] bg-[#0e1d1b] p-4 text-white mx-auto my-5">
      {showForm ? (
        <form onSubmit={mutate}>
          <div className="flex gap-3">
            <img
              src={userData?.photo}
              alt=""
              className="h-11 w-11 shrink-0 rounded-3xl object-cover"
            />

            <div className="flex-1">
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind?"
                maxLength={280}
                variant="bordered"
                classNames={{
                  base: "auth-input-base",
                  label: "auth-input-label",
                  inputWrapper: "auth-input-wrapper",
                  input: "auth-input",
                }}
              />

              {imagePreview && (
                <div className="relative mt-3 overflow-hidden rounded-xl border border-[#29403e]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-75 w-full object-cover"
                  />

                  <Button
                    type="button"
                    isIconOnly
                    size="sm"
                    radius="full"
                    onPress={removeFile}
                    className="absolute right-2 top-2 bg-black/70 text-white hover:text-red-500 hover:bg-red-500/30"
                  ></Button>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[13px] text-[#8bb5b7]">
                    {caption.length}/280
                  </span>

                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handelImageChnage}
                    className="hidden"
                  />

                  <label
                    htmlFor="fileInput"
                    className="flex cursor-pointer items-center gap-1.5 text-[13px] text-[#8bb5b7] transition hover:text-[#3cc1c4]"
                  >
                    <ImagePlus size={17} />
                    <span>Photo</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="light"
                    onPress={() => {
                      removeFile();
                      setCaption("");
                      setShowForm(false);
                    }}
                    className="text-[13px] text-[#78908e] hover:text-white"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    isLoading={IsLoading}
                    isDisabled={
                      IsLoading || (caption.trim() === "" && imgfile === null)
                    }
                    className="h-10 min-w-17 bg-[#39c2c6] px-5 text-[13px] font-semibold text-[#07100f] hover:bg-[#46d0d3] rounded-full"
                  >
                    {IsLoading ? "Posting..." : "Post"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full text-left text-[14px] text-[#647d7c] transition hover:text-[#8bb5b7]"
        >
          What's on your mind?
        </button>
      )}
    </div>
  );
}
