import { ToastContainer, toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoTrashBinOutline, IoAdd } from "react-icons/io5";
import { FiEdit3, FiSave } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Progress from "./Progress";

const Home = () => {
  const { apiResponse, tasks, setTasks } = useOutletContext();
  const toastShown = useRef(false);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [counts, setCounts] = useState({ completed: 0, pending: 0 });
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!tasks) return;

    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = tasks.length - completed;

    setCounts({ completed, pending });

    if (apiResponse?.message && !toastShown.current) {
      toast(apiResponse.message);
      toastShown.current = true;
    }

    return () => {
      toast.dismiss();
    };
  }, [apiResponse, tasks]);

  const handleAddTask = async () => {
    const title = task.trim();
    if (!title) return toast.error("Task cannot be empty.");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${apiUrl}/tasks`,
        { title: task },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks((prev) => [...prev, res.data]);
      setTask("");
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error adding task!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error deleting task!");
    }
  };

  const handleUpdate = async (id) => {
    const title = editInput.trim();
    if (!title) return toast.error("Task cannot be empty.");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${apiUrl}/tasks/${id}`,
        { title: editInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
      setEditingId(null);
      setEditInput("");
      toast.success("Task updated!");
    } catch (err) {
      toast.error("Error updating Task");
    }
  };

  const handleToggle = async (task) => {
    try {
      const token = localStorage.getItem("token");

      const updatedStatus =
        task.status === "completed" ? "pending" : "completed";

      const res = await axios.put(
        `${apiUrl}/tasks/${task._id}`,
        { status: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));

      toast.success(`Marked as ${updatedStatus}!`);
    } catch (err) {
      toast.error("Failed to update task status!");
    }
  };

  return (
    <main className="flex flex-col md:flex-row justify-around gap-5 md:w-200 p-5">
      <ToastContainer className="z-10" />

      <div className="p-3 rounded-lg shadow-md w-full md:w-45 md:h-120 flex md:flex-col justify-between md:justify-start gap-5 bg-[#eddadae6]">
        <div className="bg-[#ffffffe6] p-3 rounded-lg shadow flex justify-around items-center">
          <Progress 
            completed={counts.completed || 0}
            total={tasks?.length || 0} />
        </div>

        <div className="bg-[#ffffffe6] p-3 rounded-lg shadow flex flex-col gap-2 justify-around items-center">
          <span className="text-lg font-semibold">Tasks Summary</span>
          <span>completed - {counts.completed || 0}</span>
          <div className="border w-full"></div>
          <span>pending - {counts.pending || 0}</span>
          <div className="border w-full"></div>
          <span>Total - {tasks?.length || 0}</span>
        </div>

        <div className="bg-[#ffffffe6] p-3 text-center rounded-lg shadow flex items-center justify-center w-55 md:w-40">
          <span>Progress chart</span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-4 ">
          <input
            type="text"
            className="px-4 py-3 rounded shadow-lg bg-[#ffffffe6] w-full"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="button"
            disabled={!task.trim()}
            onClick={handleAddTask}
            className="bg-[#3E8BFF] px-3 rounded cursor-pointer hover:bg-blue-700"
          >
            <IoAdd className="w-7 h-7" />
          </button>
        </div>

        {/* Tasks table */}
        <section className="bg-[#ffffffe6] rounded-lg shadow-lg mt-8 h-100 md:w-120 overflow-y-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#eddadae6] rounded-lg text-gray-700 tracking-wider">
              <tr>
                <th className="p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={() => tasks.forEach(() => {task.status = "completed"})}
                      className="accent-[#3E8BFF] cursor-pointer w-4.5 h-4.5"
                    />
                  </div>
                </th>
                <th className="p-4 w-full">Task</th>
                <th className="px-5 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.length > 0 ? (
                [...tasks]
                  .sort((a, b) => (a.status === "pending" ? -1 : 1))
                  .map((task, index) => (
                    <tr className="border-b bg-white hover:bg-gray-100 ">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={task.status === "completed"}
                            onChange={() => handleToggle(task)}
                            className="accent-[#3E8BFF] w-4.5 h-4.5 cursor-pointer"
                            disabled={editingId === task._id}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {editingId === task._id ? (
                          <input
                            autoFocus
                            type="text"
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            className="border rounded p-2 w-full"
                          />
                        ) : (
                          task.title
                        )}
                      </td>

                      <td className="px-5 py-2 flex justify-center items-center gap-2">
                        {editingId === task._id ? (
                          <>
                            <button
                              onClick={() => handleUpdate(task._id)}
                              className="text-green-600 py-2 px-3 hover:underline cursor-pointer"
                            >
                              <FiSave className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setEditInput("");
                              }}
                              className="text-gray-500 hover:underline cursor-pointer"
                            >
                              <GiCancel className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingId(task._id);
                                setEditInput(task.title);
                              }}
                              className="text-blue-600 py-2 px-3 cursor-pointer"
                            >
                              <FiEdit3 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="text-red-600 hover:underline cursor-pointer"
                            >
                              <IoTrashBinOutline className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr className="hover:bg-gray-100">
                  <td colSpan="3" className="text-gray-500 text-center py-4">
                    No tasks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
)};

export default Home;
