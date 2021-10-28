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
        className="d-flex justify-content-center align-items-center flex-column gap-3"
      >
        <br />
        <br />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          type="text"
          required={true}
          className="border border-none rounded-3 text-center"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required={true}
          type="text"
          className="border border-none rounded-3 text-center"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required={true}
          type="password"
          className="border border-none rounded-3 text-center"
        />
        <button
          className="btn btn-primary btn-sm"
          type="submit"
          disabled={!checkdata(username, password, name)}
        >
          signup
        </button>
      </form>
    </>
  );
}
