import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ROUTES } from "./constants";

import Layout from "./components/Layout";
import Home from "./pages/Home";
// import PostDetail from "./pages/Post/PostDetail";
import LoginForm from "./pages/Auth/LoginForm";
import RegistrationFrom from "./pages/Auth/RegistrationForm";
import ConfirmEmailForm from "./pages/Auth/ConfirmEmailForm";
import RecoveryForm from "./pages/Auth/RecoveryForm";
import Profile from "./pages/Profile/Profile";
import SearchResult from "./pages/SearchResult";
import Portfolio from "./pages/Portfolio";
import LogoutForm from "./pages/Auth/LogoutForm";
import ChangeEmailForm from "./pages/Auth/ChangeEmailForm";
import ChangePwdForm from "./pages/Auth/ChangePwdForm";

import { changeEmailAction, changePwdAction, confirmAction, loginAction, logoutAction, registrationAction } from "./actions/authActions";
import { profileLoader } from "./loaders/profileLoaders";
import PostEditor from "./pages/Post/PostEditor";
import PostDetail from "./pages/Post/PostDetail"
import { allPostsLoader, postLoader } from "./loaders/postsLoaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: allPostsLoader
      },
      {
        path: ROUTES.POSTS.DETAIL,
        element: <PostDetail />,
        loader: postLoader
      },
      { path: ROUTES.POSTS.EDITOR, element: <PostEditor/> },
      { 
        path: 'profiles/profileId',//ROUTES.PROFILES.EDITOR,
        element: <Profile />,
        loader: profileLoader
      },
      { path: "login", element: <Navigate to="/auth/login" /> },
      { 
        path: "auth/login",
        element: <LoginForm />,
        action: loginAction
      },
      { 
        path: "auth/logout",
        element: <LogoutForm />,
        action: logoutAction
      },
      { path: "registration", element: <Navigate to="/auth/registration" /> },
      { 
        path: "auth/registration",
        element: <RegistrationFrom /> ,
        action: registrationAction
      },
      { 
        path: "auth/confirm-email",
        element: <ConfirmEmailForm />,
        action: confirmAction
      },
      { 
        path: "auth/email",
        element: <ChangeEmailForm />,
        action: changeEmailAction
      },
      { 
        path: "auth/password",
        element: <ChangePwdForm />,
        action: changePwdAction
      },
      { path: "recovery", element: <Navigate to="/auth/recovery" /> },
      { path: "auth/recovery", element: <RecoveryForm /> },

      { path: "search/", element: <SearchResult /> },
      { path: "profile/:userId/portfolio/", element: <Portfolio /> },
    //   { path: "category/:categoryId", element: <Category /> },
    //   { path: "product/:productId", element: <ProductDetails /> },
    //   { path: "*", element: <NotFound /> },
      // { path: "*", element: <Navigate to="/" /> },
    ],
  },
  // { path: "add-new-post", element: <PostEditor/> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
