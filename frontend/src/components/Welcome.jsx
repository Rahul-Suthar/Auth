import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Welcome = () => {

    useEffect(() => {
        const checkApi = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                const res = await axios.get(`${apiUrl}`);
                    console.log(res.data.message);
            }
            catch (error) {
                console.error("API is not running", error);
            }
        }

        checkApi();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center relative h-screen bg-[#f8f6f3] text-gray-800">
            <div className="text-3xl absolute top-30 font-bold mb-10 text-gray-700">Welcome to Task Manager</div>

            <div className="flex gap-6">
                <Link to="/auth/login" className="group">
                    <div className="relative px-6 py-3 bg-white rounded-lg shadow-lg text-gray-700
                        font-semibold border border-gray-300 hover:shadow-green-800 hover:scale-110 transition-all duration-300">
                        Login
                    </div>
                </Link>

                <Link to="/auth/register" className="group">
                    <div className="relative px-6 py-3 bg-white rounded-lg shadow-lg text-gray-700
                        font-semibold border border-gray-300 hover:shadow-green-800 transition-all duration-300 hover:scale-110">
                        Register
                    </div>
                </Link>
            </div>
        </div>
    );
};


export default Welcome;