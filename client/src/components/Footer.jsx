import React from "react";
import Logo from "../assets/logo v2 nobg.png";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              width={170}
              height={230}
              src={Logo}
              alt="EncryptShare Logo"
            />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-blue-500 sm:mb-0 dark:text-gray-400">
            <li>
              <NavLink to="/" className={(isActiveObj) =>isActiveObj.isActive ? "hover:underline me-4 md:me-6 text-xl max-sm:text-base text-blue-800 font-bold" : "hover:underline me-4 md:me-6 text-xl max-sm:text-base"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/app" className={(isActiveObj) =>isActiveObj.isActive ? "hover:underline me-4 md:me-6 text-xl max-sm:text-base text-blue-800 font-bold" : "hover:underline me-4 md:me-6 text-xl max-sm:text-base"}>
                Send File
              </NavLink>
            </li>
            <li>
              <NavLink to="/download" className={(isActiveObj) =>isActiveObj.isActive ? "hover:underline me-4 md:me-6 text-xl max-sm:text-base text-blue-800 font-bold" : "hover:underline me-4 md:me-6 text-xl max-sm:text-base"}>
                File Download
              </NavLink>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-blue-700 lg:my-8" />
        <span className="block text-lg text-blue-500 sm:text-center dark:text-gray-400 font-semibold max-sm:text-sm">
          © 2024{" "}
          <Link to="/" className="hover:underline">
            EncryptShare™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
