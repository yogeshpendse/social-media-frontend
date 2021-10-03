import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostsAsync, postLikesAsync } from "./postSlice";
import { Likesmodal } from "../../components/Likemodal";

export function Posts(params) {
  // const op = useSelector((x) => x.post.posts);
  const tokenval = useSelector((x) => x.account.token);
  const userposts = useSelector((x) => x.post.userposts);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [postkey, setPostkey] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const postarray = [...op];
  useEffect(() => {
    dispatch(getPostsAsync());
  }, [dispatch]);
  // const clikcer = (params) => console.log(params);
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
  }
  // console.log({ userposts });
  return (
    <>
      <hr />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        removetoken
      </button>
      {/* <h1>Token : {tokenval}</h1> */}
      <div className="d-flex justify-content-center align-items-center flex-column">
        {userposts.map((x) => {
          return (
            <div key={x._id} className="card w-50 mt-2">
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    to={`/${x.username}`}
                    className="text-decoration-none text-dark"
                  >
                    {x.name}&nbsp;
                    <span className="text-black-50">@{x.username}</span>
                  </Link>
                </h5>
                <Link
                  to={`/post/${x.creator + "_" + JSON.stringify(x.postid)}`}
                  className="text-decoration-none"
                >
                  <p className="card-text text-dark">{x.content}</p>
                </Link>
                <br />
                <button
                  onClick={() =>
                    clikcer({ creator: x.creator, postid: x.postid, tokenval })
                  }
                  className="btn btn-primary btn-sm"
                >
                  <i className="bi bi-heart-fill"></i>
                </button>
                &nbsp;&nbsp;&nbsp;
                <button
                  onClick={() =>
                    clikcer2({ creator: x.creator, postid: x.postid, tokenval })
                  }
                  className="btn btn-primary btn-sm"
                >
                  <i className="bi bi-person-lines-fill"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Likesmodal handleClose={handleClose} show={show} postkey={postkey} />
    </>
  );
}
