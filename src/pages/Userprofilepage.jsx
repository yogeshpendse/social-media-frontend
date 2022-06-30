import { useParams } from "react-router";
import {
  getUsersAsync,
  postUserfollow,
  postUserunfollow,
} from "../features/user/userSlice";
import { Userposts } from "../components/Userposts";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export function Userprofilepage() {
  const paramval = useParams();
  const dispatch = useDispatch();
  const userpostloader = useSelector((item) => item.user.userpostloader);
  const tokenval = useSelector((state) => state.account.token);
  const useridofpage = useSelector((state) => state.user.useridofpage);
  const nameval = useSelector((state) => state.user.nameval);
  const posts = useSelector((state) => state.user.posts);
  const myuserid = useSelector((state) => state.account.userid);
  const userfollowers = useSelector((state) => state.user.followers);
  const includeboolval = [...userfollowers].includes(myuserid);
  const usernameval = paramval.username;
  useEffect(() => {
    let isout = true;
    if (isout) {
      dispatch(getUsersAsync({ username: usernameval }));
    }
    return () => {
      isout = false;
    };
  }, [dispatch, usernameval]);
  function unfol() {
    // console.log("consolelog unfollow");
    dispatch(
      postUserunfollow({ userid: useridofpage, token: tokenval, myuserid })
    );
  }
  function foll() {
    if (tokenval === "null" || tokenval === null) {
      toast.error("please login", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // console.log("consolelog follow");
      dispatch(
        postUserfollow({ userid: useridofpage, token: tokenval, myuserid })
      );
    }
  }

  return (
    <div>
      <div>
        <img
          src="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
          // className="rounded mx-auto d-block"
          className="mx-auto d-block profilepage__image"
          alt="profile"
        />
      </div>
      {!userpostloader && <h1 className="text-center">{nameval}</h1>}
      <h5 className="text-center">@{paramval.username} </h5>
      {useridofpage !== myuserid && (
        <div className="d-flex justify-content-center">
          {!userpostloader && (
            <>
              {includeboolval ? (
                <button onClick={unfol} className="btn btn-outline-primary">
                  unfollow
                </button>
              ) : (
                <button onClick={foll} className="btn btn-primary">
                  follow
                </button>
              )}
            </>
          )}
        </div>
      )}
      <Userposts
        myuserid={myuserid}
        name={nameval}
        paramval={paramval}
        posts={posts}
      />
    </div>
  );
}
