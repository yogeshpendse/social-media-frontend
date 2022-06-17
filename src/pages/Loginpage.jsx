import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setLoginfalse, setLoginAsync } from "../features/account/accountSlice";
import { Link } from "react-router-dom";
export function Loginpage() {
  const dispatch = useDispatch();
  const loginstatus = useSelector((state) => state.account.loginstatus);
  const loginloader = useSelector((state) => state.account.loginloader);
  const [username, setUsername] = useState("testuser");
  const [password, setPassword] = useState("Test@123");
  const usernamebool = username.length > 0 ? false : true;
  const passwordbool = password.length > 0 ? false : true;
  const finalstatus =
    usernamebool === false && passwordbool === false ? false : true;
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.pathname || "/";
  async function implementlogin(params) {
    await dispatch(
      setLoginAsync({
        username: params.username,
        password: params.password,
      })
    );
    navigate(from);
  }
  return (
    <div className="">
      <>
        {loginstatus ? (
          <center>
            <button
              className="btn btn-primary mt-5"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("myuserid");
                localStorage.removeItem("username");
                localStorage.removeItem("loginstatus");
                dispatch(setLoginfalse());
              }}
            >
              logout
            </button>
          </center>
        ) : (
          <div className="login-from">
            <div className="form-group">
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
              onClick={() => implementlogin({ username, password })}
              className="mt-3 d-flex gap-1 align-items-center"
              variant="primary"
              disabled={finalstatus}
            >
              <span>Login</span>
              {loginloader && <div className="loader-sm-light" />}
            </Button>
            <div className="mt-2">
              <Link to="/register">Don't have an account?</Link>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
