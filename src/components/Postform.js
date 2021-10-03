import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postPostAsync } from "../features/posts/postSlice";

export const Postform = () => {
  const [value, setValue] = useState("");
  const tokenval = useSelector((x) => x.account.token);
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    const dateval = Date.now();
    if (value.length > 0) {
      dispatch(postPostAsync({ content: value, postid: dateval, tokenval }));
      setValue("");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <div className="">
        <textarea
          type="text"
          className="form-control"
          placeholder="Say what's on your mind"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={value.length > 0 ? false : true}
      >
        Submit
      </button>
    </form>
  );
};
