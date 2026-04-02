import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, ListTodo, FileSpreadsheet, Cpu, Landmark, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import WeatherWidget from '../components/WeatherWidget';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [profileComplete, setProfileComplete] = React.useState(false);

  React.useEffect(() => {
    if(localStorage.getItem('farmer_profile')) {
       setProfileComplete(true);
    }
  }, []);

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
      
      <motion.header variants={item} className="text-center mb-6 mt-4 relative">
        {profileComplete && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 right-0 w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm bg-gray-100">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${localStorage.getItem('farmer_profile') || 'agri'}`} alt="avatar" />
          </motion.div>
        )}
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t('farmerHub.title', 'Farmer Hub 👋')}</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mt-1">{t('farmerHub.subtitle', 'What do you want to do?')}</p>
      </motion.header>

      <div className="mb-2">
         <WeatherWidget />
      </div>

      <AnimatePresence>
        {profileComplete && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 flex items-start gap-4 shadow-sm"
          >
            <div className="bg-blue-500 p-2 rounded-full shrink-0 mt-1 shadow-lg shadow-blue-500/40 relative">
              <span className="w-2.5 h-2.5 bg-red-400 rounded-full absolute -top-1 -right-1 border-2 border-white dark:border-gray-900 animate-pulse"></span>
              <Bell size={18} className="text-white" />
            </div>
            <div>
              <h4 className="text-blue-900 dark:text-blue-100 font-black leading-tight">Smart Subsidy Alert</h4>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mt-0.5">
                Based on your crop data and yield grading, you are eligible for the <span className="font-black bg-blue-100 dark:bg-blue-800 px-1 rounded">PM-KISAN</span> and <span className="font-black bg-blue-100 dark:bg-blue-800 px-1 rounded">PMKSY</span> subsidies.
              </p>
              <button onClick={() => navigate('/farmer/schemes')} className="mt-3 text-sm font-black text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition-colors shadow-lg shadow-blue-500/30">
                 Claim Benefits
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={item} className="space-y-3">
        
        {/* Dairy Ledger */}
        <button 
          onClick={() => navigate('/farmer/dairy-ledger')}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all text-white p-4 rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center gap-4"
        >
          <div className="bg-white/20 p-3 rounded-xl">
            <Database size={24} className="text-white" />
          </div>
          <div className="text-left flex-1">
            <h2 className="text-xl font-bold">Dairy Ledger</h2>
            <p className="text-emerald-100 font-medium text-sm">Add Farm & Blockchain details</p>
          </div>
        </button>

        {/* Orders */}
        <button 
          onClick={() => navigate('/farmer/orders')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-emerald-50 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 active:scale-95 transition-all p-4 rounded-2xl shadow-sm flex items-center gap-4 group"
        >
          <div className="bg-emerald-50 dark:bg-gray-700 p-3 rounded-xl group-hover:bg-emerald-100 dark:group-hover:bg-gray-600 transition-colors">
            <ListTodo size={24} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-left flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('farmerHub.orders', 'Orders')}</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">{t('farmerHub.trackSales', 'Track your sales')}</p>
          </div>
        </button>

        {/* Financial Reports (CSV) */}
        <button 
          onClick={() => navigate('/farmer/payments')}
          className="w-full bg-white dark:bg-gray-800 border-2 border-purple-50 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 active:scale-95 transition-all p-4 rounded-2xl shadow-sm flex items-center gap-4 group"
        >
          <div className="bg-purple-50 dark:bg-gray-700 p-3 rounded-xl group-hover:bg-purple-100 dark:group-hover:bg-gray-600 transition-colors">
            <FileSpreadsheet size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-left flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Financial CSV Reports</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">View Received & Withdrawal</p>
          </div>
        </button>
        
        {/* ML & Smart Routing - Pushed to /smart-routing for grading first */}
        <button 
          onClick={() => navigate('/smart-routing')}
          className="w-full mt-6 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 border-2 border-purple-200 dark:border-purple-800 active:scale-95 transition-all p-4 rounded-2xl flex items-center justify-center gap-3 text-purple-700 dark:text-purple-300 shadow-sm"
        >
          <Cpu className="text-purple-500 animate-pulse" size={24} />
          <span className="font-bold text-lg text-purple-800 dark:text-purple-200">Smart Routing Engine & AI</span>
        </button>

        {/* Govt Schemes Button */}
        <button 
          onClick={() => navigate('/farmer/schemes')}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white active:scale-95 transition-all p-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30"
        >
          <Landmark size={24} />
          <span className="font-black text-lg">Govt Schemes & Aids</span>
        </button>

        {/* Farmer Profile Setup (Removed as requested) */}

      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
