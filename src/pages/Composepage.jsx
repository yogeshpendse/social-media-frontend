import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { postPostAsync } from "../features/post/postSlice";
export function Composepage() {
  const [value, setValue] = useState("");
  const tokenval = useSelector((x) => x.account.token);
  const chimeloader = useSelector((item) => item.post.chimeloader);
  const buttonstatus = value.length > 0 && value.length < 301 ? false : true;
  const dispatch = useDispatch();
  async function handlepost(params) {
    const dateval = Date.now();
    const postasyncdata = {
      content: params.content,
      postid: dateval,
      tokenval: params.tokenval,
    };
    await dispatch(postPostAsync(postasyncdata));
    setValue("");
  }
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column mt-4 font-family-sans-serif">
        <div className="compose-width">
          <textarea
            type="text"
            className="form-control font-family-sans-serif textarea-height"
            placeholder="chime in"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <Button
          onClick={() => handlepost({ content: value, tokenval })}
          className="mt-3 d-flex align-items-center justify-content-center"
          variant="primary"
          disabled={buttonstatus}
        >
          <span className="me-1">Chime</span>
          {chimeloader && <div className="loader-sm-light" />}
        </Button>
      </div>
    </div>
  );
}
