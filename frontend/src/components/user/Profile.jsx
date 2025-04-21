import { useOutletContext } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";

const Profile = () => {
  const { user } = useOutletContext();
  return (
    <main>
      <h1 className="text-2xl font-bold text-center">Profile</h1>
      {user && (
        <div className="w-110 flex justify-evenly mt-5 border-gray-400 border-2 rounded-lg p-5 bg-white shadow-lg absolute right-5 hover:scale-102 transition-all cursor-pointer">
          <FaCircleUser
            className={`w-30 h-30 text-gray-600`}
          />

          <div className="text-lg flex flex-col items-start justify-center">
            <strong>@{user?.username}</strong>
            <p>{user?.email}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
