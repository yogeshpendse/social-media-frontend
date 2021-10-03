import { Postform } from "../components/Postform";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Composepage() {
  return (
    <div>
      <h1>This is compose page.</h1>
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
