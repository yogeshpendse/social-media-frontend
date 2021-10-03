import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import { Loginform } from "../components/Loginform";
import { Signupform } from "../components/Signupform";
import { Account } from "../features/account/account";
import { useSelector } from "react-redux";

export function Accountpage() {
  const { state } = useLocation();
  const [toggle, settoggle] = useState("login");
  const token = useSelector((state) => state.account.token);
  // console.log({ token });

  return (
    <div>
      {token !== "null" && token && <Account state={state} />}
      {token === "null" && (
        <>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => settoggle("login")}
            >
              login
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => settoggle("register")}
            >
              register
            </button>
          </div>

          {toggle === "login" && (
            <>
              <Loginform />
            </>
          )}
          {toggle === "register" && (
            <>
              <Signupform />
            </>
          )}
        </>
      )}
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
