import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { LOCATIONS, ROUTES } from "./constants";

import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
// import PostDetail from "./pages/Post/PostDetail";
import LoginForm from "./pages/Auth/LoginForm";
import RegistrationFrom from "./pages/Auth/RegistrationForm";
import ConfirmEmailForm from "./pages/Auth/ConfirmEmailForm";
import RecoveryForm from "./pages/Auth/RecoveryForm";
import Profile from "./pages/Profile/Profile";
import SearchResult from "./archive/SearchResult";
import Portfolio from "./archive/Portfolio";
import LogoutForm from "./pages/Auth/LogoutForm";
import ChangeEmailForm from "./pages/Auth/ChangeEmailForm";
import ChangePwdForm from "./pages/Auth/ChangePwdForm";

import { changeEmailAction, changePwdAction, confirmAction, loginAction, logoutAction, registrationAction } from "./archive/actions/authActions";
import { combinedProfileLoader } from "./pages/Profile/Profile.loader";
import PostEditor from "./pages/Post/PostEditor";
import PostDetail from "./pages/Post/PostDetail"
import { allPostsLoader, postLoader } from "./pages/Post/PostDetail.loader";
import UserDetail from "./pages/User/UserDetail";
import UserList from "./features/users/UserList";
import Resume from "./pages/Resume/Resume";
import ResumeLayout from "./pages/Resume/ResumeLayout";
import { resumeLoader } from "./archive/resumeLoaders/loaders";

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
        path: ROUTES.PROFILES.EDITOR,
        element: <Profile />,
        loader: combinedProfileLoader
      },
      { 
        path: 'resume',
        element: <ResumeLayout />,
        children: [
          {
            index: true,
            element: <Resume />,
            loader: resumeLoader
            // loader: combinedResumeLoaders
          },
        ]
        // loader: combinedProfileLoader
      },
      { 
        path: ROUTES.SUBSCRIBES.LIST,
        element: <UserList />,
      },
      {
        path: ROUTES.USERS.DETAIL,
        element: <UserDetail />,
        // loader: profileLoader
      },
      {
        path: ROUTES.POSTS.DETAIL,
        element: <PostDetail />,
        loader: postLoader
      },
      { path: ROUTES.POSTS.EDITOR, element: <PostEditor/> },
      { path: "login", element: <Navigate to="/auth/login" /> },
      { 
        path: "auth/login",
        element: <LoginForm />,
        action: loginAction
      },
      { 
        path: LOCATIONS.AUTH.LOGOUT,
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
