import { useParams } from "react-router";
import { Userposts } from "../components/Userposts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getUsersAsync,
  postUserfollow,
  postUserunfollow,
} from "../features/user/userSlice";
export function Userprofilepage() {
  const paramval = useParams();
  const rhekr = useSelector((state) => state.account.token);
  const useridofpage = useSelector((state) => state.user.useridofpage);
  const nameval = useSelector((state) => state.user.nameval);
  const posts = useSelector((state) => state.user.posts);
  const dispatch = useDispatch();
  const myuserid = useSelector((state) => state.account.userid);
  const userfollowers = useSelector((state) => state.user.followers);
  const includeboolval = [...userfollowers].includes(myuserid);

  useEffect(() => {
    dispatch(getUsersAsync({ username: paramval.username }));
  }, [dispatch, paramval.username]);

  function unfol() {
    // console.log("consolelog unfollow");
    dispatch(
      postUserunfollow({ userid: useridofpage, token: rhekr, myuserid })
    );
  }
  function foll() {
    if (rhekr === "null" || rhekr === null) {
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
        postUserfollow({ userid: useridofpage, token: rhekr, myuserid })
      );
    }
  }
  return (
    <>
      <h1 className="text-center">{nameval}</h1>&nbsp;
      <h5 className="text-center">@{paramval.username} </h5>
      {useridofpage !== myuserid && (
        <div className="d-flex justify-content-center">
          {includeboolval ? (
            <button onClick={unfol} className="btn btn-outline-primary">
              unfollow
            </button>
          ) : (
            <button onClick={foll} className="btn btn-primary">
              follow
            </button>
          )}
        </div>
      )}
      <Userposts
        myuserid={myuserid}
        name={nameval}
        paramval={paramval}
        posts={posts}
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
