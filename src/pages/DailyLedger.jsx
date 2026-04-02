import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle2, Database } from 'lucide-react';

const DailyLedger = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Traceability form state mapped to expected Blockchain payload
  const [formData, setFormData] = useState({
    farmName: '',
    cowType: '',
    farmEnvironment: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    // Simulate smart contract state write delay
    setTimeout(() => {
      navigate('/farmer');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center">
          <CheckCircle2 size={120} className="text-emerald-500 mb-6" />
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Stored Securely!</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">Daily Ledger sent to Blockchain.</p>
        </motion.div>
      </div>
    );
  }

  const InputField = ({ label, name, type = "text", placeholder }) => (
    <div className="mb-4">
      <label className="block text-gray-600 dark:text-gray-400 font-bold mb-1 text-sm uppercase tracking-wide">{label}</label>
      <input 
        required
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-3 text-lg font-bold text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6 pt-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 active:scale-95 transition-transform shrink-0"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Database className="text-emerald-500" /> Daily Ledger
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
              Blockchain Traceability Input
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-transparent space-y-4">
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700">
             <InputField label="Farm Registration / ID" name="farmName" placeholder="e.g. Ramesh Farm" />
             <InputField label="Type of Cow / Breed" name="cowType" placeholder="e.g. Holstein Friesian, Jersey" />
             <InputField label="Farm Environment" name="farmEnvironment" placeholder="e.g. Open Pasture, Indoor Barn" />
             
             <InputField label="Ledger Date" name="date" type="date" />
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl p-4 text-xl font-black shadow-lg shadow-emerald-500/30 active:scale-[0.98] transition-all"
          >
            WRITE TO BLOCKCHAIN
          </button>
        </form>

      </div>
    </div>
  );
};

export default DailyLedger;
