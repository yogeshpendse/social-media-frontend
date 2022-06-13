import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Bigloader } from "../components/Bigloader";
import { baseurl } from "../vars";
import { Likesmodal } from "../components/Likesmodal";
import { postLikesAsync } from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";

export function Postpage() {
  const { postidval } = useParams();
  const url = `${baseurl}/getpost/${postidval}`;
  const tokenval = useSelector((x) => x.account.token);
  const [postkey, setPostkey] = useState("");
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  function clikcer2(params) {
    const { creator, postid } = params;
    const keyval = `${creator}_${JSON.stringify(postid)}`;
    setPostkey(keyval);
    handleShow();
  }
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoader(true);
    (async () => {
      try {
        const response = await axios.get(url, {
          signal,
        });
        setLoader(false);
        setData(response.data.data);
      } catch (error) {
        setLoader(false);
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
  }, [url]);
  async function clikcer(params) {
    await dispatch(postLikesAsync(params));
  }
  return (
    <div>
      {loader ? (
        <Bigloader />
      ) : (
        <div className="mt-3 d-flex justify-content-center">
          <div className="card post-width">
            <h5 className="card-header">
              <Link to={`/${data?.username}`} className="text-decoration-none">
                <span className="text-dark">{data.name}</span>&nbsp;
                <span className="text-secondary text-black-50">
                  @{data.username}
                </span>
              </Link>
            </h5>
            <div className="card-body">
              <p className="card-text">{data?.postdata?.content}</p>
              <span
                onClick={() =>
                  clikcer({
                    creator: data?.postdata?.creator,
                    postid: data?.postdata?.postid,
                    tokenval,
                  })
                }
                className="btn btn-sm"
              >
                <i className="bi bi-heart" />
              </span>
              &nbsp;
              <span
                onClick={() =>
                  clikcer2({
                    postid: data.postdata.postid,
                    creator: data.postdata.creator,
                  })
                }
                className="btn btn-sm"
              >
                <i className="bi bi-person" />
              </span>
            </div>
          </div>
        </div>
      )}
      {show && (
        <Likesmodal handleClose={handleClose} show={show} postkey={postkey} />
      )}
    </div>
  );
}
