import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';

const VendorOrders = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const orders = [
    { id: 'TXN-8812A', farmer: 'Ramesh Farm', type: 'Dairy Milk', qty: '100L', status: 'In Escrow', value: '₹4,800', date: 'Today, 10:30 AM' },
    { id: 'TXN-99B11', farmer: 'Sunny Dairy', type: 'Dairy Milk', qty: '500L', status: 'Completed', value: '₹25,000', date: 'Yesterday' },
    { id: 'TXN-71C02', farmer: 'Green Valley', type: 'Poultry', qty: '200kg', status: 'Disputed', value: '₹42,000', date: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-6 lg:p-8 pb-24">
      <div className="max-w-5xl mx-auto space-y-6 pt-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/vendor')}
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
             <h1 className="text-3xl font-black text-gray-900 dark:text-white">Active Contracts & Orders</h1>
             <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Track your blockchain escrows and past purchases.</p>
          </div>
        </div>

        {/* Data List */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700 dark:text-gray-300">Transaction Ledger</h3>
          </div>
          
          <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    order.status === 'Completed' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                    order.status === 'In Escrow' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                     {order.status === 'Completed' ? <CheckCircle2 size={28} /> : 
                      order.status === 'In Escrow' ? <ShieldCheck size={28} /> : 
                      <XCircle size={28} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                       {order.farmer}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 uppercase tracking-wider text-xs font-bold">
                       {order.id} • {order.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 justify-between md:justify-end border-t md:border-0 border-gray-100 dark:border-gray-700/50 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-lg font-black text-gray-900 dark:text-white">{order.qty} {order.type}</p>
                    <p className="text-gray-500 dark:text-gray-400 font-bold text-sm">Volume</p>
                  </div>
                  <div className="text-right w-24">
                    <p className="text-xl font-black text-gray-900 dark:text-white">{order.value}</p>
                    <p className={`text-sm font-bold ${
                      order.status === 'Completed' ? 'text-emerald-600 dark:text-emerald-400' : 
                      order.status === 'In Escrow' ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'
                    }`}>{order.status}</p>
                  </div>
                  <ChevronRight size={24} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors hidden md:block" />
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VendorOrders;
