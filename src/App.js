import React, { Suspense, lazy, useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import PrivateRoute from "./components/Routes/PrivateRoutes"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "./featured/actions/userActions"
import Header from "./components/Navbar/Header"
import SpinLoader from "./components/Layouts/SpinLoader"

const Home = lazy(() => import('./components/Home/Home'));
const SignUp = lazy(() => import('./components/User/SignUp'));
const Login = lazy(() => import('./components/User/Login'));
const Profile = lazy(() => import('./components/User/Profile'));
const ForgotPassword = lazy(() => import('./components/User/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/User/ResetPassword'));
const Update = lazy(() => import('./components/User/Update/UpdateProfile'));
const UpdateProfile = lazy(() => import('./components/User/Update/Update'));
const UpdatePassword = lazy(() => import('./components/User/Update/UpdatePassword'));
const Inbox = lazy(() => import('./components/Chats/Inbox'));
const NotFound = lazy(() => import('./components/Errors/NotFound'));

// eslint-disable-next-line
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

  return (
    <>
      {isAuthenticated && <Header />}
      <Suspense fallback={<SpinLoader />} >
        <Routes>
          <Route exact path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
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
          <Route path="/accounts/password/change" element={
            <PrivateRoute>
              <Update activeTab={1}>
                <UpdatePassword />
              </Update>
            </PrivateRoute>
          }
          />
          <Route path="/direct/inbox" element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          } />
          <Route path="/direct/t/:chatId/:userId" element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          } />
          {/* When no route is matched */}
          <Route path="*" element={<NotFound />} />
        </ Routes>
      </Suspense>
    </>
  )
}

export default App;
