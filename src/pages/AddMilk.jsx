import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Minus, ArrowLeft, CheckCircle2 } from 'lucide-react';

const AddMilk = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(10);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleIncrement = () => setQuantity(prev => prev + 5);
  const handleDecrement = () => setQuantity(prev => (prev > 5 ? prev - 5 : prev));

  const handleSubmit = () => {
    // Fake submit
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/farmer');
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center">
          <CheckCircle2 size={120} className="text-emerald-500 mb-6" />
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">{t('addMilk.success', 'Success!')}</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">{t('addMilk.logged', 'Milk Added')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-6 pb-24">
      <div className="max-w-md mx-auto h-full flex flex-col justify-between pt-4">
        
        {/* Header */}
        <div>
          <button 
            onClick={() => navigate('/farmer')}
            className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center text-gray-800 dark:text-gray-200 mb-8 border border-gray-100 dark:border-gray-700 active:scale-95 transition-transform"
          >
            <ArrowLeft size={32} />
          </button>
          
          <h1 className="text-4xl font-black text-gray-900 dark:text-white leading-tight mb-2">
            {t('addMilk.title', 'Add Milk')}
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium font-sans">
            {t('addMilk.subtitle', 'How much today?')}
          </p>
        </div>

        {/* Big Counter */}
        <div className="flex-1 flex flex-col justify-center items-center py-10">
          <div className="text-[120px] font-black text-gray-900 dark:text-white leading-none tracking-tighter shadow-sm flex items-baseline">
            {quantity}<span className="text-5xl text-gray-400 dark:text-gray-500 ml-2">L</span>
          </div>
          
          <div className="flex gap-8 mt-12 w-full max-w-[300px]">
            <button 
              onClick={handleDecrement}
              className="flex-1 aspect-square rounded-[3rem] bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center text-6xl shadow-inner active:scale-95 transition-transform"
            >
              <Minus size={48} strokeWidth={3} />
            </button>
            <button 
              onClick={handleIncrement}
              className="flex-1 aspect-square rounded-[3rem] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-6xl shadow-inner active:scale-95 transition-transform"
            >
              <Plus size={48} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Submit */}
        <button 
          onClick={handleSubmit}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-[2rem] h-24 text-2xl font-black shadow-xl shadow-emerald-500/30 active:scale-[0.98] transition-all"
        >
          {t('addMilk.confirm', 'CONFIRM')}
        </button>
      </div>
    </div>
  );
};

export default AddMilk;
