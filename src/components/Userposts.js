import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postLikesAsync } from "../features/posts/postSlice";
import { Likesmodal } from "./Likemodal";

export function Userposts(params) {
  const { posts, name, paramval } = params;
  // myuserid
  const tokenval = useSelector((x) => x.account.token);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [postkey, setPostkey] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function clikcer(params) {
    // creator, postid, tokenval
    // console.log({ ...params, location: "Userposts.js" });
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

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        {posts.map((x) => {
          return (
            <div key={x._id} className="card w-50 mt-2">
              <div className="card-body">
                <span className="card-title">{name}</span>&nbsp;
                <span>@{paramval.username}</span>
                <Link
                  to={`/post/${x.creator + "_" + JSON.stringify(x.postid)}`}
                  className="text-decoration-none text-body"
                >
                  <p className="card-text">{x.content}</p>
                </Link>
                <button
                  onClick={() =>
                    clikcer({ creator: x.creator, postid: x.postid, tokenval })
                  }
                  className="btn btn-primary btn-sm"
                >
                  <i className="bi bi-heart-fill"></i>
                </button>
                &nbsp;&nbsp;&nbsp;
                {/* <Link
                  className="btn btn-light"
                  to={`/post/${x.creator + "_" + JSON.stringify(x.postid)}`}
                >
                  <span className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-eye"></i>
                  </span>
                </Link> */}
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
        <Likesmodal handleClose={handleClose} show={show} postkey={postkey} />
      </div>
    </>
  );
}
