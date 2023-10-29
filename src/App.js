import React, { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import SignUp from "./components/User/SignUp"
import ForgotPassword from "./components/User/ForgotPassword"
import ResetPassword from "./components/User/ResetPassword"
import PrivateRoute from "./components/Routes/PrivateRoutes"
import Home from "./components/Home/Home"
import Login from "./components/User/Login"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "./featured/actions/userActions"
import Profile from "./components/User/Profile"
import UpdateProfile from "./components/User/Update/UpdateProfile"
import Update from "./components/User/Update/Update"
import Header from "./components/Navbar/Header"
import NotFound from "./components/Errors/NotFound"

function App() {

  const { isAuthenticated } = useSelector(state => state.user)

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  // disable right click
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // window.addEventListener("keydown", (e) => {
  //   if (e.keyCode == 123) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  // });

  return (
    <>
      {isAuthenticated && <Header />}
      <Routes>
        <Route exact path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route exact path="/:username" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/accounts/edit" element={
          <PrivateRoute>
            <Update activeTab={0}>
              <UpdateProfile />
            </Update>
          </PrivateRoute>
        }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        {/* When no route is matched */}
        <Route path="*" element={<NotFound />} />
      </ Routes>
    </>
  )
}

export default App;
