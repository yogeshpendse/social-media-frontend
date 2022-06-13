import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
export function Topnavbar() {
  const loginstatus = useSelector((state) => state.account.loginstatus);
  const username = useSelector((state) => state.account.username);
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="text-white text-decoration-none font-italic" to="/">
            Chimes
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <span className="nav-link active">
                  <Link className="btn text-white" to="/">
                    feed
                  </Link>
                </span>
              </li>

              <li className="nav-item">
                <span className="nav-link active">
                  <Link className="btn text-white" to="/notification">
                    notification
                  </Link>
                </span>
              </li>

              <li className="nav-item">
                <span className="nav-link active">
                  <Link className="btn text-white" to="/compose">
                    compose
                  </Link>
                </span>
              </li>

              {loginstatus && (
                <li className="nav-item">
                  <span className="nav-link active">
                    <Link className="btn text-white" to={`/${username}`}>
                      profile
                    </Link>
                  </span>
                </li>
              )}

              <li className="nav-item">
                <span className="nav-link active">
                  <Link className="btn text-white" to="/login">
                    account
                  </Link>
                </span>
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
