import React, { useState, useEffect } from "react";
import { useMediaQuery } from "../customhooks/useMediaQuery";
import Hamburger from "hamburger-react";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/#home", icon: "🏠" },
  { name: "Send", href: "/#send", icon: "📤" },
  { name: "Receive", href: "/#receive", icon: "🗂️" },
  { name: "About", href: "/about", icon: "📜" },
];

const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isOpen, setOpen] = useState(false);

  // Lock scroll when menu is open on mobile
  useEffect(() => {
    document.body.style.overflow = isOpen && !isDesktop ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isDesktop]);

  const handleLinkClick = () => {
    if (!isDesktop) setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 shadow-md z-50 px-6 h-20 flex justify-between items-center backdrop-blur-md bg-white/70">
      <div className="text-3xl text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-blue-500 to-blue-800 tracking-wide">
        SendFiles
      </div>

      {isDesktop ? (
        <div className="flex space-x-10 mr-5 text-lg text-gray-700 font-medium">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <HashLink
                to={link.href}
                smooth
                onClick={handleLinkClick}
                className="hover:text-blue-600 transition-colors duration-200 font-sans"
              >
                {link.name}
              </HashLink>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-blue-600 rounded-md">
          <Hamburger toggled={isOpen} toggle={setOpen} rounded direction="right" size={24} />
        </div>
      )}

      <AnimatePresence>
        {!isDesktop && isOpen && (
          <motion.div
            initial={{ translateX: "100%" }}
            animate={{ translateX: 0 }}
            exit={{ translateX: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-20 right-0 z-40 w-full will-change-transform
                       flex flex-col items-start px-6 py-6 bg-white/80 backdrop-blur-lg
                       text-lg font-semibold shadow-md"
          >
            <div className="space-y-4 py-6 px-6 rounded-2xl border-4 border-blue-600 w-full bg-white/90 shadow-lg">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-row gap-2"
                >
                  <div>{link.icon}</div>
                  <HashLink
                    to={link.href}
                    smooth
                    onClick={handleLinkClick}
                    className="block text-gray-800 hover:text-blue-600 transition-colors duration-200 text-lg font-medium"
                  >
                    {link.name}
                  </HashLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
