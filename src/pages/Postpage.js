import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Likesmodal } from "../components/Likemodal";
import { postLikesAsync } from "../features/posts/postSlice";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseurl } from "../vars";

export function Postpage() {
  const paramval = useParams();
  const dispatch = useDispatch();
  const [postkey, setPostkey] = useState("");
  const tokenval = useSelector((x) => x.account.token);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const url = baseurl + "getpost/" + paramval.postidval;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        // console.log("axiosCancel: got response");
        setData(response.data.data);
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
  }, [paramval, url]);
  // console.log({ data });
  function clikcer(params) {
    // creator, postid, tokenval
    // console.log({ ...params, location: "posts.js" });
    dispatch(postLikesAsync(params));
  }
  function clikcer2(params) {
    // creator, postid, tokenval
    const { creator, postid } = params;
    const op = creator + "_" + JSON.stringify(postid);
    // console.log({ op, tokenval, location: "posts.js", function: "clikcer2" });
    setPostkey(op);
    handleShow();
    //   handleShow
  }
  return (
    <>
      {data ? (
        <>
          <div className="card">
            <h5 className="card-header">
              <Link to={`/${data.username}`} className="text-decoration-none">
                <span className="text-dark">{data.name}</span>&nbsp;
                <span className="text-secondary text-black-50">
                  @{data.username}
                </span>
              </Link>
            </h5>
            <div className="card-body">
              <p className="card-text">{data.postdata.content}</p>
              <span
                onClick={() =>
                  clikcer({
                    creator: data.postdata.creator,
                    postid: data.postdata.postid,
                    tokenval,
                  })
                }
                className="btn btn-primary btn-sm"
              >
                <i className="bi bi-heart-fill"></i>
              </span>
              &nbsp;
              <span
                onClick={() =>
                  clikcer2({
                    creator: data.postdata.creator,
                    postid: data.postdata.postid,
                    tokenval,
                  })
                }
                className="btn btn-primary btn-sm"
              >
                <i className="bi bi-person-lines-fill"></i>
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Likesmodal handleClose={handleClose} show={show} postkey={postkey} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
