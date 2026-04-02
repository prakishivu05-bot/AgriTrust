import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download, FileSpreadsheet, TrendingUp, TrendingDown } from 'lucide-react';

const FarmerPayments = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const transactions = [
    { id: 'REC-112', type: 'received', amount: '₹14,500', from: 'SuperFresh Dairy', date: 'Today, 2:30 PM' },
    { id: 'WDL-845', type: 'withdrawal', amount: '₹5,000', from: 'Bank Transfer', date: 'Yesterday, 9:00 AM' },
    { id: 'REC-111', type: 'received', amount: '₹22,000', from: 'Quality Foods Inc', date: 'Oct 14, 2024' },
    { id: 'REC-110', type: 'received', amount: '₹8,400', from: 'Local Mart', date: 'Oct 12, 2024' },
    { id: 'WDL-844', type: 'withdrawal', amount: '₹10,000', from: 'Bank Transfer', date: 'Oct 10, 2024' },
  ];

  const exportCSV = () => {
    // Generate simple mock CSV for Hackathon presentation
    const headers = "TransactionID,Type,Amount,Entity,Date\n";
    const csvContent = "data:text/csv;charset=utf-8," + headers + transactions.map(t => 
      `${t.id},${t.type},"${t.amount.replace('₹', '')}","${t.from}","${t.date}"`
    ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "agritrust_financial_ledger.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-6 lg:p-8 pb-24">
      <div className="max-w-4xl mx-auto space-y-6 pt-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
             <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
               Financial Reports
             </h1>
             <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Export your blockchain payments to CSV.</p>
          </div>
          <button 
            onClick={exportCSV}
            className="hidden md:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-colors"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Action Bar (Mobile Export) */}
        <button 
          onClick={exportCSV}
          className="w-full md:hidden flex items-center justify-center gap-2 bg-purple-600 active:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-sm active:scale-95 transition-all mb-4"
        >
          <Download size={20} /> Download CSV Report
        </button>

        {/* Transaction History Lists */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FileSpreadsheet size={18} /> Master Ledger
            </h3>
          </div>
          
          <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {transactions.map((txn, i) => (
              <div key={i} className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 ${
                    txn.type === 'received' 
                      ? 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' 
                      : 'bg-red-100/50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {txn.type === 'received' ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white capitalize">
                      {txn.type === 'received' ? `Received from ${txn.from}` : `Withdrawal to ${txn.from}`}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-0.5">
                      {txn.date} • {txn.id}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-xl font-black ${
                    txn.type === 'received' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {txn.type === 'received' ? '+' : '-'}{txn.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerPayments;
