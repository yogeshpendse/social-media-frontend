import { useEffect } from "react";
import { useState } from "react";
import { baseurl } from "../vars";
import { ListGroup, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Bigloader } from "./Bigloader";

export function Likesmodal(params) {
  const { show, handleClose, postkey } = params;
  const [likeusers, setlikeusers] = useState([]);
  const [loader, setLoader] = useState(false);
  const urlext = postkey || "";
  const url = `${baseurl}/getalllikes/${urlext}`;
  useEffect(() => {
    setLoader(true);
    let controller = new AbortController();
    const signal = controller.signal;
    (async function () {
      try {
        const response = await axios.get(url, { signal: signal });
        setlikeusers(response.data.likeusers);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        if (axios.isCancel(error)) {
        } else {
          console.log(error);
        }
      }
    })();
    return () => {
      controller.abort();
    };
  }, [url]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!loader && (
              <span className="font-family-sans-serif">
                {likeusers.length} likes
              </span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loader ? (
            <Bigloader />
          ) : (
            <ListGroup>
              {likeusers.length === 0 ? (
                <h6 className="text-center display-6">no likes</h6>
              ) : (
                <>
                  {likeusers.map((x) => (
                    <ListGroup.Item key={x.userid}>
                      <Link
                        to={`/${x.username}`}
                        className="text-decoration-none font-family-sans-serif"
                      >
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
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            <span className="font-family-sans-serif">close</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
