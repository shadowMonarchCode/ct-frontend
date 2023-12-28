import Loader from "@/components/shared/Loader";
import User from "@/components/shared/User";
import { useUserContext } from "@/context/AuthContext";

const Profile = () => {
  const { user, isLoading } = useUserContext();
  if (isLoading) return <Loader />;
  return (
    <section className="h-full w-full overflow-x-hidden overflow-y-auto p-5 scrollbar">
      <h2 className="h2-semibold">My Profile</h2>
      <User data={user} />
    </section>
  );
};

export default Profile;
