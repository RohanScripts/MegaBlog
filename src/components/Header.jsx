import React from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header>
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo></Logo>
            </Link>
          </div>
          <ul className="flex m1-auto">
            {navItems.map((eachItem) =>
              eachItem.active ? (
                <li key={eachItem.name}>
                  <button
                    onClick={() => navigate(eachItem.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {eachItem.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn></LogoutBtn>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
