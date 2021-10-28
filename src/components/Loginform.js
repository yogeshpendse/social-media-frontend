import { useState } from "react";
import { setLoginAsync } from "../features/account/accountSlice";
import { useDispatch } from "react-redux";

export function Loginform() {
  const [loginusername, setLoginusername] = useState("");
  const [loginpassword, setLoginpassword] = useState("");
  const dispatch = useDispatch();
  const buttonstatus =
    loginusername.length > 0 && loginpassword.length > 0 ? false : true;
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log({ username: loginusername, password: loginpassword });
    dispatch(
      setLoginAsync({ username: loginusername, password: loginpassword })
    );
  };
  return (
    <>
      <br />
      <form
        onSubmit={onSubmit}
        className="d-flex justify-content-center align-items-center flex-column gap-3"
      >
        <input
          value={loginusername}
          onChange={(e) => setLoginusername(e.target.value)}
          placeholder="username"
          required={true}
          type="text"
          className="border border-none rounded-3 text-center"
        />
        <input
          value={loginpassword}
          onChange={(e) => setLoginpassword(e.target.value)}
          placeholder="password"
          required={true}
          type="password"
          className="border border-none rounded-3 text-center"
        />
        <button
          className="btn btn-primary btn-sm"
          type="submit"
          disabled={buttonstatus}
        >
          login
        </button>
      </form>
    </>
  );
}
