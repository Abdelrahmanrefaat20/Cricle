import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Ellipsis, ImagePlus } from "lucide-react";
import { useState } from "react";
import type { ChangePasswordData } from "../../types/loginDate";
import profileService from "../../services/profileService";

export default function ProfileHeader({
  profile,
  onPhotoUpdated,
  getProfile,
}: {
  profile: any;
  onPhotoUpdated?: () => void;
  getProfile: () => Promise<void>;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isPassOpen,
    onOpen: onPassOpen,
    onOpenChange: onPassOpenChange,
  } = useDisclosure();

  const [imgfile, setImgfile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setImgfile(selected);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(selected);
  }

  function removeFile() {
    setImgfile(null);
    setImagePreview(null);
  }

  async function updatePhoto(e: React.FormEvent) {
    e.preventDefault();
    if (!imgfile) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.set("photo", imgfile);
      await profileService.updateProfilePhote(formData);
      getProfile();
      removeFile();
      onPhotoUpdated?.();
      onClose();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  async function ChangePassword(e: React.FormEvent) {
    e.preventDefault();

    const dataPassword: ChangePasswordData = { password, newPassword };

    try {
      setIsLoading(true);
      await profileService.changePassowrd(dataPassword);
      getProfile();
      setPassword("");
      setNewPassword("");
      onPassOpenChange();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#243a38] bg-[#0e1d1b]">
      <div className="h-28 bg-linear-to-r from-[#3bc1c4] via-[#55a9d0] to-[#7654d8]" />

      <div className="relative mt-2.5 px-4 pb-5">
        <img
          src={profile?.photo}
          alt=""
          className="h-11 w-11 shrink-0 rounded-3xl object-cover"
        />

        <div className="pt-5">
          <h1 className="text-[18px] font-bold text-white">{profile?.name}</h1>
          <p className="text-[13px] text-[#78908e]">@{profile?.username}</p>

          <div className="mt-3 flex items-center gap-1 text-[12px] text-[#78908e]">
            <span className="text-[#8bb5b7]">{profile?.bookmarksCount}</span>
            bookmarks
            <span className="text-[#8bb5b7]">{profile?.followersCount}</span>
            followers
            <span className="text-[#8bb5b7]">{profile?.followingCount}</span>
            following
          </div>

          <Dropdown
            placement="bottom-end"
            className="overflow-hidden border border-[#243a38] bg-[#0e1d1b] text-white"
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

            <DropdownMenu aria-label="Profile actions">
              <DropdownItem key="edit" onPress={onPassOpen}>
                Change Password
              </DropdownItem>
              <DropdownItem key="profilephoto" onPress={onOpen}>
                Update Profile Photo
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Modal is outside the Dropdown */}
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          onOpenChange();
          if (!open) removeFile(); // clear the preview when closed
        }}
        backdrop="blur"
      >
        <ModalContent className="bg-[#0e1d1b] text-white">
          <ModalHeader>Update Profile Photo</ModalHeader>
          <ModalBody className="pb-6">
            <form onSubmit={updatePhoto} className="flex flex-col gap-4">
              {imagePreview ? (
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-[#29403e]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    isIconOnly
                    size="sm"
                    radius="full"
                    onPress={removeFile}
                    className="absolute right-1 top-1 h-6 w-6 min-w-6 bg-black/70 text-white hover:bg-red-500/30 hover:text-red-500"
                  ></Button>
                </div>
              ) : (
                <p className="text-center text-[13px] text-[#78908e]">
                  No photo selected
                </p>
              )}

              <input
                id="profilePhotoInput"
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="flex items-center justify-between">
                <label
                  htmlFor="profilePhotoInput"
                  className="flex cursor-pointer items-center gap-1.5 text-[13px] text-[#8bb5b7] transition hover:text-[#3cc1c4]"
                >
                  <ImagePlus size={17} />
                  <span>Choose photo</span>
                </label>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading || !imgfile}
                  className="h-10 min-w-17 rounded-full bg-[#39c2c6] px-5 text-[13px] font-semibold text-[#07100f] hover:bg-[#46d0d3]"
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isPassOpen}
        onOpenChange={(open) => {
          onPassOpenChange();
          if (!open) {
            setPassword("");
            setNewPassword("");
          }
        }}
        backdrop="blur"
      >
        <ModalContent className="bg-[#0e1d1b] text-white">
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody className="pb-6">
            <form onSubmit={ChangePassword} className="flex flex-col gap-4">
              <Input
                type="password"
                label="Current password"
                variant="bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
              />

              <Input
                type="password"
                label="New password"
                variant="bordered"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                isRequired
              />

              <Button
                type="submit"
                isLoading={isLoading}
                isDisabled={isLoading || !password || !newPassword}
                className="h-10 rounded-full bg-[#39c2c6] px-5 text-[13px] font-semibold text-[#07100f] hover:bg-[#46d0d3]"
              >
                {isLoading ? "Saving..." : "Change password"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
