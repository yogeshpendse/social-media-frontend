import { useState } from "react";
import { checkdata } from "../function/checkdata";
import { useDispatch } from "react-redux";
import { setSignupAsync } from "../features/account/accountSlice";

export function Signupform() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log({ name, username, password });
    dispatch(setSignupAsync({ name, username, password }));
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        <br />
        <br />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          type="text"
          required={true}
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required={true}
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required={true}
          type="password"
        />
        <button
          className="btn btn-primary btn-sm"
          type="submit"
          disabled={!checkdata(username, password, name)}
        >
          submit
        </button>
      </form>
    </>
  );
}
