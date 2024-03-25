import { useSelector } from "react-redux";
import "./App.css";
// import Header from "./components/header/Header.jsx";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
// import Home from "./pages/Home.jsx";
// import { login, logout } from "./store/authSlice.js";
import LoginHome from "./pages/LoginHome.jsx";

function App() {
  const authStatus = useSelector((state) => state.auth.status);

  // const dispatch = useDispatch();

  useEffect(() => {
    // api.getCurrentUser().then((userData) => {
    //   if (userData) {
    //     dispatch(login(userData.data.data.user));
    //   } else {
    //     dispatch(logout());
    //   }
    // });
  }, []);

  return authStatus ? (
    <>
      {/* <Home /> */}
      <Outlet />
    </>
  ) : (
    <LoginHome />
  );
}

export default App;
