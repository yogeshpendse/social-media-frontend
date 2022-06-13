import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSignupAsync } from "../features/account/accountSlice";
import { checkregistrationdata } from "../functions/checkregistrationdata";

export function Registerpage() {
  const [name, setName] = useState("");
  const loader = useSelector((item) => item.account.registrationloader);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const disablebool = checkregistrationdata(username, password, name);
  const dispatch = useDispatch();
  async function processregistration(params) {
    await dispatch(setSignupAsync(params));
  }

  return (
    <>
      <div className="registration-form">
        <div className="form-group">
          <label>name</label>
          <input
            type="text"
            value={name}
            className="form-control"
            placeholder="enter name"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>username</label>
          <input
            type="text"
            value={username}
            className="form-control"
            placeholder="enter username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            placeholder="enter password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button
          className="mt-3 d-flex gap-1 align-items-center"
          variant="primary"
          disabled={disablebool}
          onClick={() => processregistration({ name, username, password })}
        >
          <span>Register</span>
          {loader && <div className="loader-sm-light" />}
        </Button>
        <div className="mt-2">
          <Link to="/login">Have an account?</Link>
        </div>
        <ul className="notice">
          <li className="notice_item">Username can only include alphabets.</li>
          <li className="notice_item">
            Password must include atleast one number, special character and
            capital letter.
          </li>
        </ul>
      </div>
    </>
  );
}
