import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseurl } from "../vars";
export function Likesmodal(params) {
  const { show, handleClose, postkey } = params;
  // const tokenval = useSelector((x) => x.account.token);
  const [likeusers, setlikeusers] = useState([]);
  const urlext = postkey || "";
  // console.log({ urlext });
  const url = baseurl + "getalllikes/" + urlext;
  // console.log(url);
  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        setlikeusers(response.data.likeusers);
        // console.log("AxiosCancel: got response", response.data.likeusers);
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log("AxiosCancel: caught cancel");
        } else {
          // console.log(error);
        }
      }
    };
    show && loadData();

    return () => {
      // console.log("AxiosCancel: unmounting");
      source.cancel();
    };
  }, [url, show]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{likeusers.length} Likes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {likeusers.length === 0 ? (
              <h6 className="text-center display-6">no likes</h6>
            ) : (
              <>
                {likeusers.map((x) => (
                  <ListGroup.Item key={x.userid}>
                    <Link to={`/${x.username}`}>
                      <span className="text-decoration-none text-dark">
                        {x.name}
                        <span className="text-secondary">@{x.username}</span>
                      </span>
                    </Link>
                  </ListGroup.Item>
                ))}
              </>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
