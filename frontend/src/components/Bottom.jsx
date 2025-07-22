import React from "react";
import { HashLink } from "react-router-hash-link";
import { Mail, Info, Send, Home } from "lucide-react";

const Bottom = () => {
  return (
    <footer className="bg-gradient-to-bl  from-blue-50 flex flex-col md:pl-30 justify-center items-center  to-white text-gray-800 shadow-inner ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
       
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-blue-700">
            🌐 SendFiles
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            The most secure and fastest way to share your files online — easy, encrypted, and reliable.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4 text-blue-900">Product</h3>
          <nav className="flex flex-col gap-3 text-sm">
            <HashLink
              to="/#home"
              smooth
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              <Home className="w-4 h-4" /> Home
            </HashLink>
            <HashLink
              to="/#send"
              smooth
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              <Send className="w-4 h-4" /> Send
            </HashLink>
            <HashLink
              to="/#receive"
              smooth
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              📥 Receive
            </HashLink>
          </nav>
        </div>

      
        <div>
          <h3 className="text-md font-semibold mb-4 text-blue-900">Company</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="hover:text-blue-600 transition cursor-pointer flex items-center gap-2">
              <Info className="w-4 h-4" /> About Us
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4 text-blue-900">Support</h3>
          <ul className="flex flex-col gap-3 text-sm">
          <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=avigarg245@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-blue-600 transition cursor-pointer flex items-center gap-2"
>
  <Mail className="w-4 h-4" /> Contact Us
</a>

          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-4 py-5 text-center text-xs text-gray-500">
        © 2025 <span className="font-semibold text-blue-700">SendFiles</span>. All rights reserved. Built with ❤️ for seamless transfer.
      </div>
    </footer>
  );
};

export default Bottom;
