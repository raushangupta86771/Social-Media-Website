import "./App.css"
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";
import { Navigate, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux";
import FollowersCard from "./components/followers Card/FollowersCard";
import ProfileCard from "./components/profileCard/ProfileCard";
import ProfileCard_Mobile from "./components/profileCard/ProfileCard_Mobile";

function App() {
  const user = useSelector((state) => state.authReducer.authData)
  return (
    <div className="App">
      {/* <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div> */}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />

        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />

        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />

        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}>
        </Route>

        <Route
          path="/followes"
          element={user ? <FollowersCard /> : <Navigate to="../auth" />}>
        </Route>


        <Route
          path="/view-profile"
          element={user ? < ProfileCard_Mobile location={"HomePage"} /> : <Navigate to="../auth" />}>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
