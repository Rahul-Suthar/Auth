import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Progress from "./Progress";
import userLogo from "../../assets/user.svg";

const Profile = () => {
  const { user, tasks} = useOutletContext();
  const [counts, setCounts] = useState({ completed: 0, pending: 0 });

  useEffect(() => {
    if (!tasks) return;

    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = tasks.length - completed;

    setCounts({ completed, pending });
  }, [tasks]);

  return (
    <main className="flex flex-col md:flex-row justify-around gap-6 p-5">

      <div className="p-3 rounded-lg shadow-md w-full md:w-50 md:h-120 flex md:flex-col justify-between md:justify-start gap-5 bg-[#eddadae6]">
        <div className="bg-[#ffffffe6] p-5 rounded-lg shadow flex justify-around items-center">
          <img className="w-25" src={user?.image || userLogo} alt="userLogo" />
        </div>

        <div className="bg-[#ffffffe6] p-3 rounded-lg shadow flex flex-col justify-around items-center">
          <span className="text-lg font-semibold">@{user?.username || "demo12"}</span>
          <div className="border w-full"></div>
          <span>{user?.email || "demo12@gmail.com"}</span>
        </div>

        <div className="bg-[#ffffffe6] p-3 text-center rounded-lg shadow flex items-center justify-center w-55 md:w-40">
          <span>Progress chart</span>
        </div>
      </div>

      <div className="flex flex-col p-2 bg-[#ffffffe6]">
        <div className="p-4 md:w-110 rounded-lg shadow-md w-full flex justify-around gap-5 bg-[#eddadae6]">
          <div className="bg-[#ffffffe6] p-3 rounded-lg shadow flex justify-center items-center">
            <Progress size={100} stroke={8} completed={counts.completed || 0} total={tasks?.length || 0} />
          </div>
          
          <div className="flex flex-col justify-around items-center">
            <span className="text-lg font-semibold">Overall Dedication</span>
            <div className="bg-[#ffffffe6] p-3 rounded-lg shadow flex flex-col justify-around items-center">
              <span>completed - {counts.completed || 0}</span>
              <div className="border w-40"></div>
              <span>Total - {tasks?.length || 0}</span>
            </div>
          </div>
        </div>

        <div className=" h-70 md:110 mt-6 rounded-lg shadow-md w-full flex flex-col items-center gap-10 bg-[#eddadae6]">
          <span className="text-lg font-semibold mt-5">Dedication map</span>
          <div className="bg-[#ffffffe6] p-3 rounded-lg shadow flex flex-col justify-around items-center">
            <span>Heatmap will be here soon...</span>
          </div>
        </div>
      </div>
    </main>
)};

export default Profile;
