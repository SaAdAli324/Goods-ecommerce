import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-primary text-secondary mt-36  h-fit">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">


        <div className="space-y-3">
           <div className="text-4xl w-fit font-medium overflow-hidden flex  items-center justify-center h-25 mt-0 ">
                        <Link to={"/"}>
                        GoOds
                        </Link>
                      </div>
          <p className="text-sm text-gray-400">
            Quality products, honest prices.  
            Built with care for everyday use.
          </p>
        </div>

       
        <div className="space-y-3">
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-accent cursor-pointer"><Link to="/">home</Link></li>
            <li className="hover:text-accent cursor-pointer"><Link to="/cart">Cart</Link></li>
            <li className="hover:text-accent cursor-pointer"><Link to="/orders">Orders</Link></li>
          </ul>
        </div>

      
        <div className="space-y-3">
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-2xl hover:text-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              className="text-2xl hover:text-green-500 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

    
      <div className="border-t border-neutral text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} GoOds. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
