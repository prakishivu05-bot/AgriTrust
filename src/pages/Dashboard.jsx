import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ListTodo, Wallet, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-4 sm:p-6 lg:p-8 max-w-md mx-auto space-y-6 pb-24 h-screen flex flex-col justify-center">
      
      <motion.header variants={item} className="text-center mb-8">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t('farmerHub.title', 'Farmer Hub 👋')}</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium mt-2">{t('farmerHub.subtitle', 'What do you want to do?')}</p>
      </motion.header>

      <motion.div variants={item} className="space-y-4">
        
        <button 
          onClick={() => navigate('/farmer/add-milk')}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all text-white p-6 rounded-[2rem] shadow-xl shadow-emerald-500/30 flex items-center gap-6"
        >
          <div className="bg-white/20 p-4 rounded-3xl">
            <Plus size={40} className="text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-black">{t('farmerHub.addMilk', 'Add Milk')}</h2>
            <p className="text-emerald-100 font-medium text-lg">{t('farmerHub.logYield', 'Log today\'s yield')}</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/farmer/orders')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-emerald-100 dark:border-gray-700 hover:border-emerald-500 active:scale-95 transition-all p-6 rounded-[2rem] shadow-sm flex items-center gap-6 group"
        >
          <div className="bg-emerald-50 dark:bg-gray-700 p-4 rounded-3xl group-hover:bg-emerald-100 dark:group-hover:bg-gray-600 transition-colors">
            <ListTodo size={40} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t('farmerHub.orders', 'Orders')}</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">{t('farmerHub.trackSales', 'Track your sales')}</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/farmer/payments')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-purple-100 dark:border-gray-700 hover:border-purple-500 active:scale-95 transition-all p-6 rounded-[2rem] shadow-sm flex items-center gap-6 group"
        >
          <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-3xl group-hover:bg-purple-100 dark:group-hover:bg-gray-600 transition-colors">
            <Wallet size={40} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t('farmerHub.payments', 'Payments')}</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">{t('farmerHub.wallet', 'Check your wallet')}</p>
          </div>
        </button>
        
        <button 
          onClick={() => navigate('/smart-routing')}
          className="w-full mt-8 bg-transparent active:scale-95 transition-all p-4 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <Cpu size={20} />
          <span className="font-bold">{t('farmerHub.routerBtn', 'AI Crop Router')}</span>
        </button>

      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
