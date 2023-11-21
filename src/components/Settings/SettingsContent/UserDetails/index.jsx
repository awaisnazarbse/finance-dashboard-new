import DetailsForm from "./DetailsForm";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/utils/Loader";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const UserDetails = () => {
  const { user } = useAuth();


  const { data, isLoading } = useQuery(
    ["user-details"],
    async () => {
      const ref = doc(db, "users", user?.uid);
      const res = await getDoc(ref);
      return { id: res.id, ...res.data() };
    },
    {
      enabled: !!user,
      initialData: user,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white shadow-lg rounded-sm flex flex-col space-y-8">
      <div className="pt-20 pl-20">
        <span className="text-2xl font-bold">Edit Profile</span>
      </div>
      <UserAvatar data={data} />
      <DetailsForm data={data} />
    </div>
  );
};

export default UserDetails;
