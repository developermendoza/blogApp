import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import About from "./routes/About";
import Navbar from "./components/Navbar";
import Register from "./routes/Register";
import UserProfile from "./routes/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./routes/Logout";
import Login from "./routes/Login";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
