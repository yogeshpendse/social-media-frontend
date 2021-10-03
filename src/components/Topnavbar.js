import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export function Topnavbar() {
  const username = useSelector((state) => state.account.username);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <span className="navbar-brand">JS</span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <ul
                className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                // style="--bs-scroll-height: 100px;"
              >
                <li className="nav-item">
                  <span className="nav-link active">
                    <Link className="btn btn-light" to="/feed">
                      feed
                    </Link>
                  </span>
                </li>
                {username.length > 0 && (
                  <li className="nav-item">
                    <span className="nav-link active">
                      <Link className="btn btn-light" to="/notification">
                        notification
                      </Link>
                    </span>
                  </li>
                )}
                {username.length > 0 && (
                  <li className="nav-item">
                    <span className="nav-link active">
                      <Link className="btn btn-light" to="/compose">
                        compose
                      </Link>
                    </span>
                  </li>
                )}
                {username.length > 0 && (
                  <li className="nav-item">
                    <span className="nav-link active">
                      <Link className="btn btn-light" to={`/${username}`}>
                        profile
                      </Link>
                    </span>
                  </li>
                )}
                <li className="nav-item">
                  <span className="nav-link active">
                    <Link className="btn btn-light" to="/account">
                      account
                    </Link>
                  </span>
                </li>
              </ul>
              {/* <Nav.Link>
                <span className="nav-item btn btn-light">feed</span>
              </Nav.Link>
              <Nav.Link>
                <span className="nav-item">
                  <NavLink className="btn btn-light" to="/notification">
                    notifications
                  </NavLink>
                </span>
              </Nav.Link>
              <Nav.Link>
                <span className="nav-item">
                  <NavLink className="btn btn-light" to="/compose">
                    compose
                  </NavLink>
                </span>
              </Nav.Link>
              <Nav.Link>
                <span className="nav-item">
                  <NavLink className="btn btn-light" to="/account">
                    account
                  </NavLink>
                </span>
              </Nav.Link>*/}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
