import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/Auth";
import { login, logout } from "./store/authSlice";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  });

  if (!loading) {
    return (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header></Header>
          <main>
            <Outlet></Outlet>
          </main>
          <Footer></Footer>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
}

export default App;
