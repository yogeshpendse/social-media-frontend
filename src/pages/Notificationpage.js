import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseurl } from "../vars";

export function Notificationpage() {
  const tokenval = useSelector((x) => x.account.token);
  const [state, setState] = useState([]);
  useEffect(() => {
    let source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const requrl = baseurl + "notification/notification";
        const response = await axios.get(requrl, {
          headers: { authorization: tokenval },
          cancelToken: source.token,
        });
        // console.log(response.data.finalrecs);
        setState(response.data.finalrecs);
        // console.log("AxiosCancel: got response", response.data.likeusers);
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log("AxiosCancel: caught cancel");
        } else {
          // console.log(error);
        }
      }
    };
    loadData();

    return () => {
      // console.log("AxiosCancel: unmounting");
      source.cancel();
    };
    // console.log({ response: response });
  }, [tokenval]);
  return (
    <div>
      <h1>This is notification page.</h1>
      <div className="list-group">
        {state.map((x) => {
          return (
            <Link key={x._id} to={`/post/${x.creator + "_" + x.postid}`}>
              <span className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  {x.type === "like" && (
                    <h5 className="mb-1">{x.name} liked your post.</h5>
                  )}
                  {x.type === "post" && (
                    <h5 className="mb-1">{x.name} posted something.</h5>
                  )}
                  {/* <h5 className="mb-1">List group item heading</h5> */}
                </div>
                <small>check it out</small>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
