import React from 'react';
import { History as HistoryIcon, ArrowDownRight, Wallet } from 'lucide-react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { transactions } from '../data/dummyData';

const History = () => {
  const totalIncome = transactions
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-md mx-auto space-y-6 pb-24">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
           Transaction History <HistoryIcon size={24} className="text-gray-400" />
        </h1>
        <p className="text-gray-500 font-medium">Track your on-chain deals and income.</p>
      </header>

      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-transparent p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
           <Wallet size={120} />
        </div>
        <p className="text-gray-300 font-bold uppercase tracking-widest text-xs mb-2">Total Verified Income</p>
        <h2 className="text-4xl font-black text-white">₹{totalIncome.toLocaleString()}</h2>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-green-400 bg-gray-800/50 w-max px-3 py-1 rounded-full border border-gray-700">
          <ArrowDownRight size={16} /> +₹{(totalIncome * 0.1).toFixed(0)} this month
        </div>
      </Card>

      <div className="space-y-4">
         <h3 className="font-bold text-gray-900 flex items-center gap-2 mt-2">
            Past Deals
         </h3>
         {transactions.map((txn) => (
            <Card key={txn.id} className="p-4 flex flex-col gap-3 group hover:border-blue-200">
               <div className="flex justify-between items-start">
                 <div>
                   <p className="text-xs text-gray-500 font-bold mb-1">{txn.date}</p>
                   <h3 className="font-bold text-gray-900 text-lg">{txn.type} ({txn.quantity} units)</h3>
                 </div>
                 <div className="text-right">
                   <p className="font-extrabold text-gray-900">₹{txn.amount}</p>
                 </div>
               </div>
               <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                 <p className="text-xs font-mono text-gray-400 flex items-center gap-1">
                    TXN: {txn.id}
                 </p>
                 <StatusBadge status={txn.status} />
               </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default History;
