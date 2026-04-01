import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Wallet, TrendingUp, History } from 'lucide-react';
import { motion } from 'framer-motion';

const FarmerPayments = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const history = [
    { id: 1, action: 'Received (Sunny Dairy)', amount: '+ ₹2,500', type: 'in' },
    { id: 2, action: 'Withdrawal', amount: '- ₹5,000', type: 'out' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6 pt-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 active:scale-95 transition-transform"
          >
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <Wallet /> {t('farmerPayments.title', 'Wallet')}
          </h1>
        </div>

        {/* Big Balance Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-500/20"
        >
          <p className="text-emerald-100 font-medium text-xl mb-2">{t('farmerPayments.balance', 'Available Balance')}</p>
          <h2 className="text-6xl font-black tracking-tighter mb-8">₹ 14,250</h2>
          
          <button className="w-full bg-white text-emerald-600 rounded-[1.5rem] h-20 text-2xl font-black shadow-lg shadow-black/10 active:scale-95 transition-transform">
            {t('farmerPayments.withdraw', 'WITHDRAW')}
          </button>
        </motion.div>

        {/* Minimal History */}
        <div className="pt-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <History size={24} className="text-gray-400" />
            {t('farmerPayments.history', 'Recent')}
          </h3>
          
          <div className="space-y-3">
            {history.map((item, i) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-5 rounded-3xl flex justify-between items-center shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.action}</p>
                <p className={`text-xl font-black ${item.type === 'in' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-gray-100'}`}>
                  {item.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerPayments;
