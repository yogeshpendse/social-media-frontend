import { useState } from "react";
import { setLoginAsync } from "../features/account/accountSlice";
import { useDispatch } from "react-redux";

export function Loginform() {
  const [loginusername, setLoginusername] = useState("");
  const [loginpassword, setLoginpassword] = useState("");
  const dispatch = useDispatch();

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
        className="d-flex justify-content-center align-items-center flex-column"
      >
        <input
          value={loginusername}
          onChange={(e) => setLoginusername(e.target.value)}
          placeholder="username"
          required={true}
          type="text"
        />
        <input
          value={loginpassword}
          onChange={(e) => setLoginpassword(e.target.value)}
          placeholder="password"
          required={true}
          type="password"
        />
        <button className="btn btn-primary btn-sm" type="submit">
          login
        </button>
      </form>
    </>
  );
}
