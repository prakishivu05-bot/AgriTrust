import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFarmConnect } from '../contexts/FarmConnectContext';
import { Users, Send, ShieldCheck, Tractor, TrendingUp, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FarmCluster = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentUser, getPoolInfo, getPoolMembersInfo, 
    getPoolTotalGrades, getMessages, sendMessage 
  } = useFarmConnect();

  const [activeTab, setActiveTab] = useState('overview'); // overview, ai, chat
  const [msgInput, setMsgInput] = useState('');
  
  const pool = getPoolInfo(id);
  const members = getPoolMembersInfo(id);
  const totals = getPoolTotalGrades(id);
  const messages = getMessages(id);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'chat' && chatEndRef.current) {
       chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  if (!pool) {
    return <div className="p-8 text-center text-gray-500">Cluster not found...</div>;
  }

  const handleSend = (e) => {
    e.preventDefault();
    if(msgInput.trim()) {
      sendMessage(id, msgInput.trim());
      setMsgInput('');
    }
  };

  // Profit mock data Calculation
  const myIndProfit = 12000; 
  const pooledProfitPercent = 35; // 35% higher in pool due to logistics savings
  const myPoolProfit = myIndProfit * (1 + (pooledProfitPercent/100));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-6 px-4">
      <div className="max-w-4xl mx-auto">
        
        <button onClick={() => navigate('/farmer/connect')} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors">
          <ChevronLeft size={16} /> Back to Network
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-6 text-white mb-6 shadow-xl shadow-blue-500/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <Tractor size={120} />
           </div>
           <div className="relative z-10">
              <div className="flex items-center gap-2 bg-white/20 w-max px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
                 Active Pool 🟢
              </div>
              <h1 className="text-3xl font-black mb-1">{pool.name}</h1>
              <p className="text-blue-100 font-medium opacity-90">{members.length} Members contributing {totals.total} kg of produce.</p>
           </div>

           <div className="flex gap-2 mt-6 overflow-x-auto pb-1 hide-scrollbar relative z-10">
              {['overview', 'ai', 'chat'].map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-blue-700 shadow-md' : 'bg-blue-800/40 text-blue-100 hover:bg-blue-800/60'}`}
                 >
                   {tab === 'overview' ? 'Members & Grades' : tab === 'ai' ? 'AI Optimization' : 'Group Chat'}
                 </button>
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
               
               {/* Aggregated Totals */}
               <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Total Aggregated Produce</h3>
                  <div className="grid grid-cols-3 gap-4">
                     <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block uppercase tracking-widest mb-1">Grade A</span>
                        <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{totals.A}<span className="text-sm">kg</span></span>
                     </div>
                     <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800 text-center">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-widest mb-1">Grade B</span>
                        <span className="text-2xl font-black text-blue-700 dark:text-blue-300">{totals.B}<span className="text-sm">kg</span></span>
                     </div>
                     <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl border border-orange-100 dark:border-orange-800 text-center">
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block uppercase tracking-widest mb-1">Grade C</span>
                        <span className="text-2xl font-black text-orange-700 dark:text-orange-300">{totals.C}<span className="text-sm">kg</span></span>
                     </div>
                  </div>
               </div>

               {/* Members List + Blockchain */}
               <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-6">
                     <ShieldCheck className="text-indigo-500" />
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white">Smart Contract Register</h3>
                  </div>
                  
                  <div className="space-y-3">
                     {members.map(m => (
                       <div key={m.farmerId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-750">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold text-sm">
                                {m.name.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                  {m.name} {m.farmerId === currentUser.id && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-sm uppercase tracking-widest">You</span>}
                                </span>
                                <span className="text-xs text-gray-500 font-mono mt-0.5 block">0x{Math.random().toString(16).slice(2,10).toUpperCase()}...</span>
                              </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3 text-center bg-white dark:bg-gray-800 py-2 px-4 rounded-xl border border-gray-100 dark:border-gray-700">
                             <div>
                               <span className="block text-[10px] text-gray-400 font-bold uppercase mb-0.5">A</span>
                               <span className="font-bold text-gray-900 dark:text-white text-sm">{m.contribution.A}</span>
                             </div>
                             <div>
                               <span className="block text-[10px] text-gray-400 font-bold uppercase mb-0.5">B</span>
                               <span className="font-bold text-gray-900 dark:text-white text-sm">{m.contribution.B}</span>
                             </div>
                             <div>
                               <span className="block text-[10px] text-gray-400 font-bold uppercase mb-0.5">C</span>
                               <span className="font-bold text-gray-900 dark:text-white text-sm">{m.contribution.C}</span>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
                     <p className="text-xs text-center text-gray-400 font-medium">Payment handles automatically split by % contribution per grade.</p>
                  </div>
               </div>

            </motion.div>
          )}

          {/* AI OPTIMIZATION TAB */}
          {activeTab === 'ai' && (
             <motion.div key="ai" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-8 text-white flex flex-col items-center justify-center text-center shadow-lg shadow-emerald-500/20">
                   <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md mb-4 border border-white/20">
                      <TrendingUp size={32} className="text-emerald-50" />
                   </div>
                   <h2 className="text-2xl font-black mb-2">AI Logistics Plan Generated!</h2>
                   <p className="text-emerald-100 font-medium max-w-sm mb-6">By pooling our volume, we unlocked direct-to-supermarket tier pricing, bypassing intermediaries.</p>
                   
                   <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-full max-w-md rounded-2xl p-6 shadow-inner">
                      <div className="space-y-4">
                         <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
                            <span className="font-bold text-gray-500">Individual Selling</span>
                            <span className="text-xl font-black opacity-80">₹{myIndProfit.toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-500 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"/> Pooled Selling</span>
                            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">₹{myPoolProfit.toLocaleString()}</span>
                         </div>
                      </div>
                      
                      <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 py-2 rounded-xl text-center font-black text-sm tracking-widest uppercase">
                         +{pooledProfitPercent}% Profit Jump
                      </div>
                   </div>
                </div>
             </motion.div>
          )}

          {/* CHAT TAB */}
          {activeTab === 'chat' && (
             <motion.div key="chat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col h-[500px] bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-900/20">
                   {messages.length === 0 && (
                      <div className="h-full flex items-center justify-center text-center">
                         <p className="text-gray-400 font-bold pb-10">Start planning logistics with your pool here!</p>
                      </div>
                   )}
                   {messages.map(msg => {
                      const isMe = msg.senderId === currentUser.id;
                      const senderTitle = isMe ? "You" : members.find(m => m.farmerId === msg.senderId)?.name || 'Farmer';
                      
                      return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                           <span className="text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase">{senderTitle}</span>
                           <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-650 text-gray-900 dark:text-gray-100 rounded-bl-sm'}`}>
                             {msg.text}
                           </div>
                        </div>
                      )
                   })}
                   <div ref={chatEndRef} />
                </div>
                
                <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                   <form onSubmit={handleSend} className="flex gap-2">
                     <input 
                       type="text"
                       value={msgInput}
                       onChange={(e) => setMsgInput(e.target.value)}
                       placeholder="Message pool..."
                       className="flex-1 bg-gray-100 dark:bg-gray-900/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white"
                     />
                     <button type="submit" disabled={!msgInput.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-xl transition-colors shrink-0 flex items-center justify-center shadow-md">
                        <Send size={18} />
                     </button>
                   </form>
                </div>
             </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default FarmCluster;
