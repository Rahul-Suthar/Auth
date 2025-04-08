import { useOutletContext } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";

const Profile = () => {
  const { user } = useOutletContext();
  return (
    <main>
      <h1 className="text-2xl font-bold">Profile</h1>
      {user && (
        <div className="flex justify-between mt-5">
          <FaCircleUser
            className={`w-30 h-30 text-gray-600`}
          />

          <div className="text-lg flex flex-col items-start justify-center">
            <p>Username : - {user?.username}</p>
            <p>Email : - {user?.email}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
