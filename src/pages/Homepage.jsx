import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Likesmodal } from "../components/Likesmodal";
import { Bigloader } from "../components/Bigloader";
import { getPostsAsync, postLikesAsync } from "../features/post/postSlice";
export function Homepage() {
  const posts = useSelector((state) => state.post.userposts);
  const postloader = useSelector((state) => state.post.postloader);
  const [postkey, setPostkey] = useState("");
  const tokenval = useSelector((x) => x.account.token);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  useEffect(() => {
    let isOut = false;
    if (!isOut) {
      dispatch(getPostsAsync());
    }
    return () => {
      isOut = true;
    };
  }, [dispatch]);

  async function clikcer(params) {
    await dispatch(postLikesAsync(params));
  }
  function clikcer2(params) {
    const { creator, postid } = params;
    const keyval = `${creator}_${JSON.stringify(postid)}`;
    setPostkey(keyval);
    handleShow();
  }
  return (
    <div>
      {postloader ? (
        <Bigloader />
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          {[...posts].map((item) => (
            <div key={item._id} className="card post-width mt-2 border rounded">
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    to={`/${item.username}`}
                    className="text-decoration-none text-dark"
                  >
                    {item.name}&nbsp;
                    <span className="teitemt-black-50">@{item.username}</span>
                  </Link>
                </h5>
                <Link
                  to={`/post/${item.creator}_${item.postid}`}
                  className="text-decoration-none mb-2"
                >
                  <p className="card-text text-dark">{item.content}</p>
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
          ))}
        </div>
      )}
      {show && (
        <Likesmodal handleClose={handleClose} show={show} postkey={postkey} />
      )}
    </div>
  );
}
