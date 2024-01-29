import React from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const AdvancedPasswordInput = ({seePassword, setSeePassword, filePassword, setFilePassword, idValue, placeValue}) => {
  return (
    <div className="flex flex-col items-start">
      <label
        htmlFor={idValue}
        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
      >
        Set File Password
      </label>
      <div className="relative w-full">
        {seePassword ? (
          <FaRegEyeSlash
            className="text-2xl absolute right-5 top-4 cursor-pointer"
            onClick={() => setSeePassword(!seePassword)}
          />
        ) : (
          <FaRegEye
            className="text-2xl absolute right-5 top-4 cursor-pointer"
            onClick={() => setSeePassword(!seePassword)}
          />
        )}

        <input
          required={true}
          type={seePassword ? "text" : "password"}
          placeholder={placeValue}
          value={filePassword}
          onChange={(e) => setFilePassword(e.target.value)}
          id={idValue}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default AdvancedPasswordInput;
