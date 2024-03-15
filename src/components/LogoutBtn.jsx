import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/Auth";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authservice.logOut().then(() => {
      dispatch(logOut());
    });
  };
  return (
    <button
      onClick={logoutHandler}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
