import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { Topnavbar } from "./components/Topnavbar";
import { Accountpage } from "./pages/Accountpage";
import { Composepage } from "./pages/Composepage";
import { Feedpage } from "./pages/Feedpage";
import { Profilepage } from "./pages/Profilepage";
import { Notificationpage } from "./pages/Notificationpage";
import { Privateroute } from "./Privateroute";
import { Postpage } from "./pages/Postpage";
import { Userprofilepage } from "./pages/Userprofilepage";
function Doesntexist() {
  return <h1 style={{ textAlign: "center" }}>Error 404</h1>;
}
function App() {
  return (
    <div className="App">
      <Topnavbar />
      <Routes>
        <Route exact path="/" element={<Feedpage />} />
        <Privateroute exact path="/compose" element={<Composepage />} />
        <Route exact path="/feed" element={<Feedpage />} />
        <Privateroute
          exact
          path="/notification"
          element={<Notificationpage />}
        />
        <Route exact path="/post/:postidval" element={<Postpage />} />
        <Route exact path="/account" element={<Accountpage />} />
        <Route exact path="/:username" element={<Userprofilepage />} />
        <Privateroute exact path="/profile" element={<Profilepage />} />
        <Route path="*" element={<Doesntexist />} />
      </Routes>
    </div>
  );
}
export default App;
