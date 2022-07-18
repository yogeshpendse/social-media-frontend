import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Privateroute } from "./privateroute/privateroute";
import { Composepage } from "./pages/Composepage";
import { Loginpage } from "./pages/Loginpage";
import { Notificationpage } from "./pages/Notificationpage";
import { Userprofilepage } from "./pages/Userprofilepage";
import { Postpage } from "./pages/Postpage";
import { Profilepage } from "./pages/Profilepage";
import { Topnavbar } from "./components/Topnavbar";
import { Registerpage } from "./pages/Registerpage";
import { Searchpage } from "./pages/Search";
function App() {
  return (
    <div>
      <div className="nav-stiicks">
        <Topnavbar />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Searchpage />} />
        <Route
          path="/compose"
          element={
            <Privateroute>
              <Composepage />
            </Privateroute>
          }
        />
        <Route
          path="/notification"
          element={
            <Privateroute>
              <Notificationpage />
            </Privateroute>
          }
        />
        <Route exact path="/post/:postidval" element={<Postpage />} />
        <Route path="/:username" element={<Userprofilepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route
          path="/profile"
          element={
            <Privateroute>
              <Profilepage />
            </Privateroute>
          }
        />
        <Route path="/register" element={<Registerpage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
export default App;
