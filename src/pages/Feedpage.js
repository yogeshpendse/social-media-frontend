import { Posts } from "../features/posts/posts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

export function Feedpage() {
  return (
    <div>
      <Posts />
      {/* <Link
        style={{ position: "fixed", bottom: "0", right: "0", margin: "2rem" }}
        className="btn btn-primary"
        to="/compose"
      >
        +
      </Link> */}
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
