import { Postform } from "../components/Postform";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Composepage() {
  return (
    <div>
      <Postform />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
