import React from "react";
import { ImCheckboxChecked } from "react-icons/im";

const SinglePricingElement = ({ planName, price, features }) => {
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-4 text-2xl font-bold text-blue-500 dark:text-gray-400">
        {planName} plan
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /month
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        <li className="flex items-center">
          <ImCheckboxChecked className="text-blue-500" />
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            {features[0]} Files Monthly
          </span>
        </li>

        <li className="flex items-center">
          <ImCheckboxChecked className="text-blue-500" />
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            Max {features[1]}
          </span>
        </li>

        <li className="flex items-center">
          <ImCheckboxChecked className="text-blue-500" />
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            Max Speed {features[2]}
          </span>
        </li>
      </ul>
      <button
        type="button"
        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Choose plan
      </button>
    </div>
  );
};

export default SinglePricingElement;
