import React from "react";
import SinglePricingElement from "./SinglePricingElement";

const pricingFeatures = {
  easy: [10, "10MB", "100KB"],
  standard: [100, "1GB", "10MB"],
  professional: ["Unlimited", "100GB", "100MB"]
}

const PricingTable = () => {
  return (
    <div className="text-center">
      <h2 className='text-5xl font-bold mb-4 max-sm:text-3xl'>Choose the plan for <span className="text-blue-500">you</span></h2>
      <p className='text-xl font-bold text-gray-600 max-sm:text-lg'>Pricing model made for you so you can enjoy all the benefits!</p>
      <div className="grid grid-cols-3 max-w-7xl mx-auto pt-5 max-md:grid-cols-1 max-md:justify-items-center">
        <SinglePricingElement planName="Free" price="0" features={pricingFeatures.easy} />
        <SinglePricingElement planName="Standard" price="20" features={pricingFeatures.standard} />
        <SinglePricingElement planName="Professional" price="100" features={pricingFeatures.professional} />
      </div>
    </div>
  );
};

export default PricingTable;
