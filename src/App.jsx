import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { LOCATIONS, ROUTES } from "./constants";

import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
// import PostDetail from "./pages/Post/PostDetail";
import LoginForm from "./features/auth/components/Login/Login";
import RegistrationFrom from "./features/auth/components/Registration/RegistrationPermanentUser";
import ConfirmEmail from "./features/auth/components/ConfirmEmail";
import RecoveryForm from "./features/auth/components/RecoveryForm";
import Profile from "./pages/Profile/Profile";
import SearchResult from "./archive/SearchResult";
import Portfolio from "./archive/Portfolio";
import LogoutForm from "./features/auth/components/LogoutForm";
import ChangeEmailForm from "./features/auth/components/ChangeEmailForm";
import ChangePwdForm from "./features/auth/components/ChangePwdForm";

import { changeEmailAction, changePwdAction, logoutAction } from "./archive/actions/authActions";
import { combinedProfileLoader } from "./pages/Profile/Profile.loader";
import PostEditor from "./pages/Post/PostEditor";
import PostDetail from "./pages/Post/PostDetail"
import { allPostsLoader, postLoader } from "./pages/Post/PostDetail.loader";
import UserDetail from "./pages/User/UserDetail";
import Resume from "./pages/Resume/Resume";
import ResumeLayout from "./pages/Resume/ResumeLayout";
import { resumeLoader } from "./archive/resumeLoaders/loaders";
import Auth from "./pages/Auth/Auth";
import { loginAction } from "./features/auth/components/Login/Login.action";
import UserList from "./pages/User/UserList";
import Privacy from "./pages/Policies/Privacy";
import { permanentUserRegAction } from "./features/auth/components/Registration/RegistrationUser.action";
import Feedback from "./pages/Feedback/Feedback";
import { confirmAction } from "./features/auth/components/ConfirmEmail.action";
import Workflow from "./pages/Workflow/Workflow";
import TaskEditableView from "./views/TaskEditableView";
import { createTaskAction } from "./views/TaskEditableView.action";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: allPostsLoader
      },
      { 
        path: ROUTES.PROFILES.EDITOR,
        element: <Profile />,
        loader: combinedProfileLoader
      },
      { 
        path: ROUTES.WORKFLOWS.USER.LIST,
        element: <Workflow /> },
      {
        path: ROUTES.WORKFLOWS.USER.CREATE_TASK,
        element: <TaskEditableView />,
        action: createTaskAction
      },
      { path: 'feedback', element: <Feedback />},
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
        path: ROUTES.USERS.LIST,
        element: <UserList />,
        // loader: useUserList
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
        path: "/auth/login",
        element: <Auth />,
        action: loginAction
      },
      // { 
      //   path: "/auth/login?guest=true",
      //   element: <Auth />,
      //   action: guestLoginAction
      // },
      { 
        path: ROUTES.AUTH.LOGOUT,
        element: <Auth />,
        action: logoutAction
      },
      { path: "registration", element: <Navigate to="/auth/registration" /> },
      { 
        path: ROUTES.AUTH.REGISTRATION,
        element: <Auth />,
        action: permanentUserRegAction
      },
      { 
        path: "auth/confirm-email",
        element: <Auth />,
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
      { path: 'privacy/', element: <Privacy />}
    ],
  },
  // { path: "add-new-post", element: <PostEditor/> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
