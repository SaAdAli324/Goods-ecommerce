import React from 'react';
// Run this in terminal: npm install react-icons
import { FaShippingFast, FaUndo, FaLock, FaHeadset } from 'react-icons/fa'; 

const TrustStrip = () => {
  return (
    // This gray background breaks up the white space
    <div className="py-8 mt- bg-gray-50 border-b border-gray-100"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          {/* Item 1 */}
          <div className="flex flex-col items-center justify-center p-4 hover:shadow-md transition-shadow rounded-lg bg-white">
            <FaShippingFast className="text-3xl text-orange-500 mb-2" />
            <h3 className="font-heading font-bold text-gray-800 text-sm">Free Shipping</h3>
            <p className="font-body text-xs text-gray-500">On all orders over $50</p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center justify-center p-4 hover:shadow-md transition-shadow rounded-lg bg-white">
            <FaUndo className="text-3xl text-orange-500 mb-2" />
            <h3 className="font-heading font-bold text-gray-800 text-sm">Easy Returns</h3>
            <p className="font-body text-xs text-gray-500">30-day money back</p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center justify-center p-4 hover:shadow-md transition-shadow rounded-lg bg-white">
            <FaLock className="text-3xl text-orange-500 mb-2" />
            <h3 className="font-heading font-bold text-gray-800 text-sm">Secure Payment</h3>
            <p className="font-body text-xs text-gray-500">100% protected</p>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-center justify-center p-4 hover:shadow-md transition-shadow rounded-lg bg-white">
            <FaHeadset className="text-3xl text-orange-500 mb-2" />
            <h3 className="font-heading font-bold text-gray-800 text-sm">24/7 Support</h3>
            <p className="font-body text-xs text-gray-500">Dedicated support</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrustStrip;