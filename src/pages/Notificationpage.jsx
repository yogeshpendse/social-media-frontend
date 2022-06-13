import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { baseurl } from "../vars";
import { Bigloader } from "../components/Bigloader";
import { Link } from "react-router-dom";
import axios from "axios";
export function Notificationpage() {
  const tokenval = useSelector((item) => item.account.token);
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(false);
  // const handleClose = () =>set
  const url = `${baseurl}/notification/notification`;
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        setLoader(true);
        const response = await axios.get(url, {
          signal: signal,
          headers: { authorization: tokenval },
        });
        if (response.status === 200) {
          setState(response.data.finalrecs);
        }
        setLoader(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("unmounted");
        } else {
          console.log("an error has occured");
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [url, tokenval]);

  return (
    <div>
      {loader ? (
        <>
          <Bigloader />
        </>
      ) : (
        <div>
          <div className="d-flex justify-content-center mt-3">
            <div className="list-group notification-width">
              {[...state].map((item) => (
                <Link
                  key={item._id}
                  className="text-decoration-none"
                  to={`/post/${item.creator}_${item.postid}`}
                >
                  <span className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      {item.type === "like" && (
                        <h5 className="mb-1">{item.name} liked your post.</h5>
                      )}
                      {item.type === "post" && (
                        <h5 className="mb-1">{item.name} posted something.</h5>
                      )}
                    </div>
                    <small>check it out</small>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
