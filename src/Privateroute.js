import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

export function Privateroute(params) {
  const { path, ...rest } = params;
  const token = useSelector((state) => state.account.token);
  // console.log({ location: "Privateroute", loginstatus, token });
  return token !== null && token !== "null" && token ? (
    <Route path={path} {...rest} />
  ) : (
    <Navigate state={{ from: path }} replace to="/account" />
  );
}
