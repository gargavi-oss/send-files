import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Lock, Link2, Mail, MessageCircle, Share2 } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-t from-white to-blue-100 min-h-screen py-14 px-6 text-gray-800 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-14">
       
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700"
        >
          About SendFiles
        </motion.h1>

        <div className="border border-gray-200 rounded-xl p-6 text-center shadow-md bg-white max-w-3xl mx-auto">
          <p className="text-lg text-gray-600">
            The simplest way to share files securely with anyone, anywhere. Fast, reliable, and completely free.
          </p>
        </div>

     
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-700"
        >
          How SendFiles Works
        </motion.h2>

        <div className="grid gap-10">
         
          <div className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <Upload className="w-10 h-10 text-blue-500 mb-4 md:mb-0 md:mr-6" />
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-1">1. Upload Your Files</h3>
              <p className="text-gray-600">
                Drag and drop or browse to upload. We support all file types and sizes up to 15MB. Your files are encrypted immediately for maximum security.
              </p>
              <div className="flex gap-2 mt-3 text-sm">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">PDF</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">JPG</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">DOC</span>
                <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded">ZIP</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-xl shadow-md p-6">
            
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-1">2. Get Unique Code</h3>
              <p className="text-gray-600">
                Your files get a secure, unique code. No sign-ups — just share the code with anyone who needs access.
              </p>
              <div className="mt-3 font-mono bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-md w-fit text-sm">
                ABC1245EF
                <div className="text-xs text-gray-400">Example Code</div>
              </div>
            </div>
            <Lock className="w-10 h-10 text-blue-500 mb-4 md:mb-0 md:mr-6" />
          </div>

         
          <div className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <Share2 className="w-10 h-10 text-blue-500 mb-4 md:mb-0 md:mr-6" />
            <div>
              <h3 className="text-xl font-bold text-purple-600 mb-1">3. Share the Link</h3>
              <p className="text-gray-600">
                Send the code or link via email, text, or chat. No installations or accounts required.
              </p>
              <div className="flex gap-4 mt-3 text-sm text-blue-600">
                <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> Email</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> Text</span>
                <span className="flex items-center gap-1"><Link2 className="w-4 h-4" /> Link</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/#send")}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            <Upload className="inline w-5 h-5 mr-2" /> Start Sharing Now
          </button>
        </div>

        <div className="text-center text-sm text-gray-400 pt-10 border-t border-gray-200">
          <div className="font-semibold text-blue-600">SendNow</div>
          <div>Simple. Secure. Free.</div>
          <div>Designed by Avi Garg</div>
        </div>
      </div>

    
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20 -top-10 -left-10"></div>
        <div className="absolute w-28 h-28 bg-gradient-to-br from-pink-100 to-blue-200 rounded-full blur-2xl opacity-30 bottom-10 -right-10"></div>
      </div>
    </div>
  );
};

export default About;
