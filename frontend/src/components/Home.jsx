import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import ThemeContext from '../context/ThemeContext';

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const features = [
    {
      icon: '🔒',
      title: 'Secure',
      subtitle: 'End-to-end encryption',
    },
    {
      icon: '⚡️',
      title: 'Fast',
      subtitle: 'Lightning-Fast Uploads',
    },
    {
      icon: '🌐',
      title: 'Global',
      subtitle: 'World-wide Access',
    },
  ];

  return (
    <div
      id="home"
      className={`flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 md:px-8 pt-24 pb-15 transition-all duration-500 ${
        theme === 'light'
          ? 'bg-gradient-to-l from-white to-blue-200'
          : 'bg-gradient-to-l from-[#0f0f0f] to-[#1f1f1f]'
      }`}
    >
      <div className="w-full max-w-3xl text-center space-y-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight ${
            theme === 'light'
              ? 'text-blue-800'
              : 'bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent'
          }`}
        >
          Share Files With Each Other
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`text-base sm:text-lg md:text-xl font-mono ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}
        >
          Upload, share, and manage your files with our secure, fast, and user-friendly platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
        <HashLink
  to="#send"
  smooth
  className={`w-full sm:w-auto text-center flex items-center justify-center gap-2 px-6 py-3.5 text-lg font-semibold rounded-xl transition duration-300 shadow-md
    ${
      theme === "light"
        ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/30 hover:shadow-blue-500/50"
        : "text-white bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 shadow-pink-500/30 hover:shadow-pink-500/50"
    }
  `}
>
  🚀 Start Sharing Now
</HashLink>

          <HashLink
            to="#receive"
            smooth
            className={`w-full sm:w-auto text-center px-6 py-3 text-lg font-semibold rounded-xl transition duration-300 border-2 ${
              theme === 'light'
                ? 'bg-white border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white'
                : 'bg-[#1f1f1f] border-red-400 text-red-300 hover:bg-red-500 hover:text-white'
            } shadow-md hover:shadow-[0_0_20px_5px_rgba(239,68,68,0.3)]`}
          >
            🗂️ Receive Files
          </HashLink>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={featureVariants}
              whileHover={{ scale: 1.05 }}
              className={`w-full max-w-xs flex flex-col items-center p-6 rounded-xl shadow-lg text-center transition duration-300 hover:shadow-xl ${
                theme === 'light'
                  ? 'bg-white'
                  : 'bg-[#1f1f1f] border border-gray-700 text-white'
              }`}
            >
              <div className="text-4xl mb-2">{feature.icon}</div>
              <h3
                className={`text-xl font-bold ${
                  theme === 'light'
                    ? 'text-blue-600'
                    : 'bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent'
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-sm mt-1 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {feature.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
