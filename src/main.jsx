import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/Pages/HomePage.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import LoginPage from "./components/Pages/LoginPage.jsx";
import SignUpPage from "./components/Pages/SignUpPage.jsx";
import AllPostsPage from "./components/Pages/AllPostsPage.jsx";
import AddPost from "./components/Pages/AddPost.jsx";
import EditPost from "./components/Pages/EditPost.jsx";
import Post from "./components/Pages/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage></LoginPage>
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUpPage></SignUpPage>
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPostsPage></AllPostsPage>
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {""}
            <AddPost></AddPost>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost></EditPost>
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post></Post>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
