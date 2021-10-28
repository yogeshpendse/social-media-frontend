import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postPostAsync } from "../features/posts/postSlice";

export const Postform = () => {
  const [value, setValue] = useState("");
  const tokenval = useSelector((x) => x.account.token);
  const buttonstatus = value.length > 0 && value.length < 301 ? false : true;
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
      className="d-flex justify-content-center align-items-center flex-column mt-4 font-family-sans-serif"
    >
      <div className="compose-width">
        <textarea
          type="text"
          className="form-control font-family-sans-serif"
          placeholder="Say what's on your mind"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          style={{ minHeight: "10rem" }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={buttonstatus}
      >
        Submit
      </button>
    </form>
  );
};
