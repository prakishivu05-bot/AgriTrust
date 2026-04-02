import React, { useState } from 'react';
import { useFarmConnect } from '../contexts/FarmConnectContext';
import { useNavigate } from 'react-router-dom';
import { Users, Phone, Star, Sprout, Handshake, Check, X, ShieldCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FarmConnect = () => {
  const { 
    currentUser, 
    getFarmersByVillage, 
    getConnectionStatus, 
    sendConnectRequest, 
    getIncomingRequests,
    respondRequest,
    inviteToPool 
  } = useFarmConnect();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'network'
  
  const villageFarmers = getFarmersByVillage(currentUser.village);
  const incomingRequests = getIncomingRequests();

  const handleConnect = (farmerId) => {
    sendConnectRequest(farmerId);
  };

  const handleInviteToPool = (farmerId) => {
    const poolId = inviteToPool(farmerId);
    navigate(`/farmer/cluster/${poolId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
             <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="text-emerald-500" />
                FarmConnect
             </h1>
             <p className="text-gray-500 dark:text-gray-400 font-medium">Discover and pool with farmers in {currentUser.village}</p>
           </div>
           
           <div className="flex bg-white dark:bg-gray-800 p-1.5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setActiveTab('discover')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'discover' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              >
                Discover Network
              </button>
              <button 
                onClick={() => setActiveTab('network')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'network' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              >
                My Network {incomingRequests.length > 0 && <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{incomingRequests.length}</span>}
              </button>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'network' && (
             <motion.div key="network" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {incomingRequests.length > 0 ? (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Connection Requests</h2>
                    {incomingRequests.map(req => {
                      const sender = getFarmersByVillage(currentUser.village).find(f => f.id === req.senderId); // mock search
                      if(!sender) return null;
                      return (
                        <div key={req.senderId} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold text-gray-500">
                                 {sender.name.charAt(0)}
                               </div>
                               <div>
                                 <span className="font-bold text-gray-900 dark:text-white block">{sender.name}</span>
                                 <span className="text-xs text-gray-500 dark:text-gray-400">wants to connect with you</span>
                               </div>
                            </div>
                            <div className="flex gap-2">
                               <button onClick={() => respondRequest(sender.id, true)} className="p-2 bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-900/40 rounded-lg transition-colors">
                                  <Check size={18} />
                               </button>
                               <button onClick={() => respondRequest(sender.id, false)} className="p-2 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40 rounded-lg transition-colors">
                                  <X size={18} />
                               </button>
                            </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10">
                     <p className="text-gray-500 dark:text-gray-400 font-medium">No new connection requests.</p>
                  </div>
                )}

                {/* You'd also map through actually accepted connections here */}
                {/* For MVP, let's keep it simple to Discover tab heavily */}
             </motion.div>
          )}

          {activeTab === 'discover' && (
            <motion.div key="discover" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {villageFarmers.length === 0 && (
                 <div className="col-span-full text-center py-12">
                   <p className="text-gray-500 font-bold">No other farmers found in {currentUser.village} right now.</p>
                 </div>
               )}
               {villageFarmers.map((farmer) => {
                  const status = getConnectionStatus(farmer.id);
                  const isConnected = status === 'accepted';
                  const isPending = status === 'pending';

                  return (
                    <motion.div key={farmer.id} layout className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-750 flex flex-col justify-between">
                       <div>
                         <div className="flex justify-between items-start mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl flex items-center justify-center border-2 border-emerald-50 dark:border-emerald-800 shrink-0">
                               <Users className="text-emerald-600 dark:text-emerald-400" size={24} />
                            </div>
                            <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2.5 py-1 rounded-full text-sm font-bold">
                               <Star size={14} className="fill-current" /> {farmer.rating}
                            </div>
                         </div>
                         <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1">{farmer.name}</h2>
                         <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
                            <MapPin size={12} /> {farmer.village}
                         </div>

                         <div className="space-y-2 mb-6">
                            <div className="flex items-center justify-between text-sm">
                               <span className="text-gray-500">Crops</span>
                               <span className="font-bold text-gray-900 dark:text-gray-200">{farmer.crops}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                               <span className="text-gray-500">Land</span>
                               <span className="font-bold text-gray-900 dark:text-gray-200">{farmer.land}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                               <span className="text-gray-500">Experience</span>
                               <span className="font-bold text-gray-900 dark:text-gray-200">{farmer.experience} Years</span>
                            </div>
                            
                            {/* Privacy Layer Reveal */}
                            <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100 dark:border-gray-700">
                               <div className="flex items-center gap-1.5 text-gray-500">
                                 <ShieldCheck size={14} className={isConnected ? "text-blue-500" : ""} /> Contact
                               </div>
                               <span className={`font-bold font-mono ${isConnected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 blur-[3px] select-none'}`}>
                                  {isConnected ? farmer.phone : "+91 9XXXX XXXX"}
                               </span>
                            </div>
                         </div>
                       </div>
                       
                       <div className="flex gap-2">
                          <button 
                            onClick={() => handleConnect(farmer.id)}
                            disabled={isPending || isConnected}
                            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border-2 border-transparent ${
                              isConnected ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400' : 
                              isPending ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500' : 
                              'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800'
                            }`}
                          >
                             {isConnected ? <Check size={16} /> : isPending ? 'Pending' : 'Connect'}
                          </button>

                          <button 
                            onClick={() => handleInviteToPool(farmer.id)}
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                          >
                            <Handshake size={16} /> Pool
                          </button>
                       </div>
                    </motion.div>
                  );
               })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FarmConnect;
