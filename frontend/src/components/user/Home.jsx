import { ToastContainer, toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { useEffect, useRef } from "react";

const Home = () => {
  const { apiResponse, setApiResponse } = useOutletContext();
  const toastShown = useRef(false);

  useEffect(() => {
    if (apiResponse?.message && !toastShown.current) {
      toast(`${apiResponse.message}`);
      toastShown.current = true;
    }

    return () => {
      toast.dismiss();
    }
  }, [apiResponse]);

  return (
    <main>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <ToastContainer />
    </main>
  );
};

export default Home;
