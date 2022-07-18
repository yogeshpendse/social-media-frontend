import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
export function Searchpage() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  return (
    <div className="searchpage">
      <div className="usersearch">
        <input
          onChange={(eve) => setValue(eve.target.value)}
          value={value}
          type="text"
          className="form-control"
          placeholder="Username"
        />
        <Button
          onClick={() => navigate(`/${value}`)}
          className="usersearch__btn"
          variant="primary"
        >
          search
        </Button>
      </div>
    </div>
  );
}
