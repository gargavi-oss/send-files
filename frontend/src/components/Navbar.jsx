import React, { useState } from "react";
import { useMediaQuery } from "../customhooks/useMediaQuery";
import Hamburger from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Send", href: "#send" },
  { name: "Receive", href: "#receive" },
  { name: "About", href: "#about" },
];

const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isOpen, setOpen] = useState(false);

  const handleLinkClick = () => {
    if (!isDesktop) setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0  bg-white/40 shadow-md z-50 px-6 h-20 flex justify-between items-center backdrop-blur-md">
      <div className="text-3xl text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-blue-500 to-blue-800 tracking-wide">
        SendFiles
      </div>

      {isDesktop ? (
        <div className="flex space-x-10 mr-5 text-lg text-gray-700 font-medium">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.05, paddingLeft: 10 }}
              transition={{ duration: 0.2 }}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="border-2 border-blue-600 rounded-md p-0">
          <Hamburger toggled={isOpen} toggle={setOpen} direction="right" size={24} />
        </div>
      )}

      <AnimatePresence>
        {!isDesktop && isOpen && (
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-20 left-0 right-0 z-40 w-full h-screen flex flex-col items-start gap-6 px-6 py-6 bg-white/40 backdrop-blur-md text-lg font-semibold"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                whileHover={{ scale: 1.05, paddingLeft: 10 }}
                transition={{ duration: 0.2 }}
                className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
