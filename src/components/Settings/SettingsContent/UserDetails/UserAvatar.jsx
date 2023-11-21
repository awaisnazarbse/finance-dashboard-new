import { storage } from "@/config/firebase";
import userApi from "@/lib/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Upload } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";

const UserAvatar = ({ data }) => {
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    ["user-details"],
    async (url) => {
      return await userApi.updateUserAvatar(data.id, url);
    },
    {
      onError: (data) => {},
      onSuccess: () => {
        queryClient.invalidateQueries(["user-details"]);
      },
    }
  );
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-fit flex items-center justify-center">
        <Avatar
          icon={<AiOutlineUser />}
          className="flex items-center justify-center"
          src={data?.img}
          size={100}
        />
        <Upload
          customRequest={(e) => {
            const imageRef = ref(
              storage,
              `profile_images/${e.file.name + e.file.uid}`
            );
            uploadBytes(imageRef, e.file).then((snapshot) => {
              e.onSuccess("ok");
              getDownloadURL(snapshot.ref).then((url) => {
                updateMutation.mutate(url);
              });
            });
          }}
          showUploadList={false}
        >
          <div className="h-8 w-8 absolute bottom-0 right-0 bg-[#1569BD] rounded-full flex items-center justify-center cursor-pointer">
            <Image alt="alt text" src="/icons/pen.svg" width={12} height={12} />
          </div>
        </Upload>
      </div>
    </div>
  );
};

export default UserAvatar;
