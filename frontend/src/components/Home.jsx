import React from 'react';
import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';

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
    <div id='home' className=" scroll-mt-24 flex flex-col items-center justify-center h-auto  px-4 sm:px-6 md:px-8 pt-20 py-25  bg-gradient-to-l from-white to-blue-200  mt-20">

      <div className="w-full max-w-3xl text-center space-y-10">
     
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent leading-tight"
        >
          Share Files With Each Other
        </motion.h1>

      
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl font-mono text-gray-700"
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
            className="w-full sm:w-auto text-center px-6 py-3.5 text-white text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition duration-300 shadow-lg hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.6)]"
          >
            🚀 Start Sharing Now
          </HashLink>
          <HashLink
            to="#receive"
            smooth
            className="w-full sm:w-auto text-center px-6 py-3 text-lg font-semibold bg-white border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl transition duration-300 shadow-md hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.4)]"
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
              className="w-full max-w-xs flex flex-col items-center bg-white p-6 rounded-xl shadow-lg text-center transition duration-300 hover:shadow-xl"
            >
              <div className="text-4xl mb-2">{feature.icon}</div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{feature.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
