import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Wallet, ShieldCheck, ArrowDownToLine, ArrowUpRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const VendorPayments = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const transactions = [
    { id: '1', txHash: '0x8f...3a2', type: 'Escrow Lock', entity: 'Ramesh Farm', amount: -4800, date: 'Today, 10:35 AM', status: 'Pending Delivery' },
    { id: '2', txHash: '0x2b...91c', type: 'Payment Sent', entity: 'Sunny Dairy', amount: -25000, date: 'Yesterday', status: 'Confirmed' },
    { id: '3', txHash: '0x9a...77f', type: 'Deposit', entity: 'Bank Transfer', amount: 50000, date: '3 days ago', status: 'Confirmed' },
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
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <Wallet className="text-blue-500" /> Vendor Ledger
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Manage your blockchain wallet and escrow funds.</p>
          </div>
        </div>

        {/* Balance Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white border-none p-8 flex flex-col justify-between shadow-xl shadow-blue-900/20 lg:col-span-2">
            <div>
              <p className="text-blue-200 font-bold mb-2 flex items-center gap-2">
                Available Liquidity <ShieldCheck size={16} />
              </p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter">₹150,000</h2>
            </div>
            <div className="flex gap-4 mt-8">
              <button className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors flex-1 justify-center">
                <ArrowDownToLine size={20} /> Deposit Fiat
              </button>
            </div>
          </Card>
          
          <Card className="p-8 border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-center bg-white dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400 font-bold mb-2">Locked in Escrow</p>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white">₹46,800</h3>
            
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/50">
              <p className="text-gray-500 dark:text-gray-400 font-bold mb-2">Monthly Spend</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">₹312,400</h3>
            </div>
          </Card>
        </div>

        {/* Transaction History */}
        <div className="pt-6">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white">Blockchain Transactions</h3>
             <Button variant="outline" className="text-sm border-gray-200 dark:border-gray-700">Export CSV</Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      tx.amount > 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-gray-100 text-gray-600 dark:bg-gray-900/50'
                    }`}>
                      {tx.amount > 0 ? <ArrowDownToLine size={24} /> : <ArrowUpRight size={24} />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-lg">{tx.entity}</p>
                      <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-0.5">
                        {tx.type} • {tx.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/2">
                    <div className="hidden lg:block bg-gray-50 dark:bg-gray-900/50 px-3 py-1 rounded-lg text-xs font-mono text-gray-400">
                      Tx: {tx.txHash}
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      tx.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                    }`}>
                      {tx.status}
                    </div>
                    <div className="text-right w-28">
                      <p className={`text-xl font-black ${
                        tx.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount)}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VendorPayments;
