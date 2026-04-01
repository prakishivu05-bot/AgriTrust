import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FarmerOrders = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const orders = [
    { id: 1, type: 'Milk', qty: '50L', status: 'Pending', price: '₹2,500', date: 'Today' },
    { id: 2, type: 'Wheat', qty: '200kg', status: 'Completed', price: '₹5,000', date: 'Yesterday' },
    { id: 3, type: 'Milk', qty: '40L', status: 'Completed', price: '₹1,950', date: '2 days ago' },
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
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            {t('farmerOrders.title', 'My Orders')}
          </h1>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-[2rem] shadow-sm border ${
                order.status === 'Pending' 
                  ? 'bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/50' 
                  : 'bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">{order.qty} {order.type}</h3>
                  <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mt-1">{order.date}</p>
                </div>
                <div className={`p-3 rounded-2xl ${
                  order.status === 'Pending' 
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400' 
                    : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400'
                }`}>
                  {order.status === 'Pending' ? <Clock size={32} /> : <CheckCircle size={32} />}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
                <span className="text-3xl font-black text-gray-900 dark:text-white">{order.price}</span>
                <span className={`text-lg font-bold ${
                  order.status === 'Pending' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FarmerOrders;
