"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, PhoneOutlined, AppstoreOutlined, TeamOutlined } from "@ant-design/icons";
import { Dropdown, Avatar } from "antd";
import { useGetUserQuery } from "../redux/api/userApi";
import Cookies from "universal-cookie";

const items = [
  {
    key: "1",
    label: <Link to={"/report"}>Report Trash</Link>,
  },
  {
    key: "2",
    label: <Link to={"/mobile"}>Mobile App</Link>,
  },
  {
    key: "3",
    label: <Link to={"/blog"}>Blog & Event</Link>,
  },
  {
    key: "4",
    label: <Link to={"/exchange"}>Exchange Points</Link>,
  },
];

export default function NavbarComponent() {
  const { data: userData, isSuccess: userSuccess } = useGetUserQuery();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();
  const cookies = new Cookies();

  const [state, setState] = useState({
    ACCESS_TOKEN: cookies.get("access_token"),
    REFRESH_TOKEN: cookies.get("refresh_token"),
    USER_ROLE: cookies.get("user_role"),
  });

  const isLoggedIn = state.ACCESS_TOKEN && state.REFRESH_TOKEN;

  const logOut = () => {
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    cookies.remove("user_role");

    setState((prevState) => ({
      ...prevState,
      ACCESS_TOKEN: null,
      REFRESH_TOKEN: null,
      USER_ROLE: null,
    }));

    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const checkMobileView = () => {
    setIsMobileView(window.innerWidth < 768);
  };

  const itemsProfile = [
    {
      key: "1",
      label: <p className="font-bold text-textColor">Hello {userData && userData.user ? userData.user.name || "User" : "User"}!</p>,
    },
    {
      key: "2",
      label: (
        <Link to={"/user/profile"}>
          <p>My Profile</p>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to={"/"} onClick={logOut}>
          <p>Logout</p>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    checkMobileView();
    console.log(userSuccess);

    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, [userSuccess]);

  return (
    <nav className={`fixed w-full z-20 top-0 left-0 border-b border-gray-300 bg-white ${isMobileView ? "md:hidden" : ""}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4 justify-between">
        <Link to={"/"}>
          <img src="/logo.png" className="flex items-start h-8 mr-3" alt="Smart Recycling Logo" />
        </Link>
        <div className="flex md:order-2">
          {isLoggedIn ? (
            <>
              <Dropdown menu={{ items: itemsProfile }} placement="bottom" arrow>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              </Dropdown>
            </>
          ) : (
            <>
              <Link to={"/signup"}>
                <button type="button" className="py-2 px-4 mr-2 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border hover:bg-gray-200 hover:text-green-700 focus:ring-4 focus:ring-gray-200">
                  Sign Up
                </button>
              </Link>
              <Link to={"/signin"}>
                <button type="button" className="py-2 px-4 mr-2 text-sm font-medium text-white focus:outline-none bg-primary rounded-lg border border-primary hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-gray-200">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
        <div className={`w-full md:block md:w-auto ${isDropdownOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white items-center">
            <li>
              <Link to={"/"}>
                <p className={`block py-2 pl-3 pr-4 text-gray-900 hover:text-primary rounded md:p-0 ${location.pathname === "/" ? "text-primary" : ""}`} aria-current="page">
                  Home
                </p>
              </Link>
            </li>
            <li>
              <button
                onClick={toggleDropdown}
                data-dropdown-toggle="dropdownNavbar"
                className={`flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:text-primary md:p-0 md:w-auto 
                ${location.pathname === "/report" || location.pathname === "/mobile" || location.pathname === "/blog" || location.pathname === "/exchange" ? "text-primary" : ""}`}
              >
                Services{" "}
                <svg className={`w-2.5 h-2.5 ml-2.5 ${isDropdownOpen ? "rotate-0" : "rotate-180"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div id="dropdownNavbar" className={`absolute z-10 ${isDropdownOpen ? "block" : "hidden"} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow mt-2`}>
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownNavbarLink">
                  <li>
                    <Link to={"/report"}>
                      <p className={`block px-4 py-2 hover:bg-gray-100 text-gray-900 hover:text-primary ${location.pathname === "/report" ? "text-primary" : ""}`}>Report Trash</p>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/mobile"}>
                      <p className={`block px-4 py-2 hover:bg-gray-100 text-gray-900 hover:text-primary ${location.pathname === "/mobile" ? "text-primary" : ""}`}>Mobile App</p>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/blog"}>
                      <p className={`block px-4 py-2 hover:bg-gray-100 text-gray-900 hover:text-primary ${location.pathname === "/blog" ? "text-primary" : ""}`}>Blog & Event</p>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/exchange"}>
                      <p className={`block px-4 py-2 hover:bg-gray-100 text-gray-900 hover:text-primary ${location.pathname === "/exchange" ? "text-primary" : ""}`}>Exchange Points</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link to={"/contact"}>
                <p className={`block py-2 pl-3 pr-4 text-gray-900 hover:text-primary rounded md:p-0 ${location.pathname === "/contact" ? "text-primary" : ""}`}>Contact</p>
              </Link>
            </li>
            <li>
              <Link to={"/about"}>
                <p className={`block py-2 pl-3 pr-4 text-gray-900 hover:text-primary rounded md:p-0 ${location.pathname === "/about" ? "text-primary" : ""}`}>About</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {isMobileView && (
        <div className="fixed bottom-0 left-0 w-full flex justify-between pt-2 pb-2 pl-6 pr-6 bg-white border-t border-gray-300">
          <Link to={"/"} className={`block py-2 pl-3 pr-4 text-gray-900 hover:text-primary rounded md:p-0 ${location.pathname === "/" ? "text-primary" : ""}`}>
            <HomeOutlined style={{ fontSize: "24px", color: "#00AF5C" }} />
          </Link>
          <div className={`block py-2 pl-3 pr-4 text-gray-900 hover:text-primary rounded md:p-0 ${location.pathname === "/" ? "text-primary" : ""}`}>
            <Dropdown
              menu={{
                items,
              }}
              placement="top"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <AppstoreOutlined style={{ fontSize: "24px", color: "#00AF5C" }} />
            </Dropdown>
          </div>
          <Link to={"/contact"} className={`block py-2 pl-3 pr-4 text-gray-900 hover:text-primary rounded md:p-0 ${location.pathname === "/" ? "text-primary" : ""}`}>
            <PhoneOutlined style={{ fontSize: "24px", color: "#00AF5C" }} />
          </Link>
          <Link to={"/about"} className={`block py-2 pl-3 pr-4 text-gray-900 hover:text-primary rounded md:p-0 ${location.pathname === "/" ? "text-primary" : ""}`}>
            <TeamOutlined style={{ fontSize: "24px", color: "#00AF5C" }} />
          </Link>
        </div>
      )}
    </nav>
  );
}
