import { useDispatch } from "react-redux";
import { falsifyloginstatus } from "./accountSlice";
export function Account() {
  const dispatch = useDispatch();
  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-primary btn-sm"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("myuserid");
          localStorage.removeItem("username");
          dispatch(falsifyloginstatus());
          window.location.reload();
        }}
      >
        logout
      </button>
    </div>
  );
}
