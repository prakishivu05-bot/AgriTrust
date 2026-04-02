import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tractor, Store, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState('farmer'); 
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (selectedRole === 'farmer') {
        navigate('/farmer/profile-setup');
      } else {
        navigate('/vendor/profile-setup');
      }
    }, 600);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } };

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center p-4 transition-colors duration-500 overflow-hidden relative">
      
      {/* Dynamic Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        // I've updated the placeholder to a very authentic sunset farmer image!
        // To use YOUR specific uploaded image instead:
        // Save the image to your "public" folder as "sunset.jpg" and change this string to url('/sunset.jpg')
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2000&auto=format&fit=crop')` }}
      >
        {/* Deep overlay to make white text and login box readable against the complex farming picture */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-amber-900/40 backdrop-blur-sm" />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-sm z-10">
        
        {/* App Logo / Header */}
        <motion.div variants={item} className="text-center mb-8">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/20 transform rotate-3 border-2 border-white/20">
             <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">AgriTrust</h1>
          <p className="text-emerald-50 font-semibold tracking-wide mt-1 drop-shadow-md">Decentralized Supply Chain</p>
        </motion.div>

        {/* Central Login Box */}
        <motion.div variants={item} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Welcome Back</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Please verify your identity to continue.</p>
              </div>
              <div className="flex bg-gray-100 dark:bg-gray-900/50 p-1.5 rounded-2xl mb-8 relative">
                 <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.4rem)] bg-white dark:bg-gray-700 rounded-xl shadow-sm transition-all duration-300 ease-out ${selectedRole === 'vendor' ? 'left-[calc(50%+0.2rem)]' : 'left-1.5'}`} />
                 <button onClick={() => setSelectedRole('farmer')} className={`relative flex-1 py-3 text-sm font-bold flex justify-center items-center gap-2 transition-colors z-10 ${selectedRole === 'farmer' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}>
                   <Tractor size={18} className={selectedRole === 'farmer' ? 'text-emerald-500' : ''} /> Farmer
                 </button>
                 <button onClick={() => setSelectedRole('vendor')} className={`relative flex-1 py-3 text-sm font-bold flex justify-center items-center gap-2 transition-colors z-10 ${selectedRole === 'vendor' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}>
                   <Store size={18} className={selectedRole === 'vendor' ? 'text-blue-500' : ''} /> Vendor
                 </button>
              </div>
              <button 
                onClick={handleLogin}
                className={`w-full py-4 rounded-2xl font-black text-white flex justify-center items-center gap-2 shadow-lg transition-all ${selectedRole === 'farmer' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'} ${isProcessing ? 'opacity-80 scale-95' : 'active:scale-[0.98]'}`}
                disabled={isProcessing}
              >
                {isProcessing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Continue securely <ArrowRight size={18} /></>}
              </button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            <ShieldCheck size={14} /> End-to-End Encrypted
          </div>

        </motion.div>

      </motion.div>
    </div>
  );
};

export default Landing;
