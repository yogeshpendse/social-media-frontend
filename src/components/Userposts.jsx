import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postLikesAsync } from "../features/post/postSlice";
import { Likesmodal } from "./Likesmodal";
import { Bigloader } from "../components/Bigloader";

export function Userposts(params) {
  const { posts, name, paramval } = params;
  // myuserid
  const tokenval = useSelector((x) => x.account.token);
  const userpostloader = useSelector((item) => item.user.userpostloader);
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
    const keyval = `${creator}_${JSON.stringify(postid)}`;
    // console.log({ op, tokenval, location: "posts.js", function: "clikcer2" });
    setPostkey(keyval);
    handleShow();
  }

  return (
    <>
      {userpostloader ? (
        <Bigloader />
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          {posts.map((item) => {
            return (
              <div
                key={item._id}
                className="card post-width mt-2 border rounded"
              >
                <div className="card-body">
                  <span className="card-title">{name}</span>&nbsp;
                  <span>@{paramval.username}</span>
                  <Link
                    to={`/post/${item.creator}_${item.postid}`}
                    className="text-decoration-none text-body"
                  >
                    <p className="card-text">{item.content}</p>
                  </Link>
                  <button
                    onClick={() =>
                      clikcer({
                        creator: item.creator,
                        postid: item.postid,
                        tokenval,
                      })
                    }
                    className="btn btn-sm"
                  >
                    <i className="bi bi-heart" />
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    onClick={() =>
                      clikcer2({
                        creator: item.creator,
                        postid: item.postid,
                        tokenval,
                      })
                    }
                    className="btn btn-sm"
                  >
                    <i className="bi bi-person" />
                  </button>
                </div>
              </div>
            );
          })}
          {show && (
            <Likesmodal
              handleClose={handleClose}
              show={show}
              postkey={postkey}
            />
          )}
        </div>
      )}
    </>
  );
}
