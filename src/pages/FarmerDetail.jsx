import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, MapPin, Star, Check, ArrowLeft, QrCode, ScanFace, FileSignature, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';

const FarmerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Read farmer passed from VendorDashboard or fallback to a standard mock
  const fallbackFarmer = { 
    id: id || 'f1', 
    name: "Unknown Farm", 
    location: "Unverified Location", 
    quantity: 0, 
    unit: 'Kg', 
    price: 0, 
    rating: 0, 
    reliability: 0, 
    type: 'Commodity',
    joinedDate: 'Jan 2024',
    escrowCompleted: 0
  };

  const farmer = location.state?.farmer || fallbackFarmer;
  
  const [showQRStatus, setShowQRStatus] = useState(false);
  const [dairyData, setDairyData] = useState(null);

  const handleOrder = () => {
    navigate('/transaction', { 
      state: { buyer: { name: 'You (Vendor)', price: farmer.price }, type: farmer.type, quantity: farmer.quantity } 
    });
  };

  const handleScanQR = () => {
    if (farmer.type === 'Dairy Milk') {
      const stored = localStorage.getItem('dairy_ledger');
      if (stored) {
        setDairyData(JSON.parse(stored));
      } else {
        setDairyData({ cowType: 'Holstein Friesian', farmEnvironment: 'Open Pasture', feedType: 'Organic Grass & Grains' });
      }
    }
    setShowQRStatus(true);
    setTimeout(() => setShowQRStatus(false), 12000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 pb-32">
      <div className="max-w-4xl mx-auto space-y-6 pt-4">
        
        {/* Header Navigation */}
        <button 
          onClick={() => navigate('/vendor')}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold mb-2 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Directory
        </button>

        {/* Hero Details Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center relative overflow-hidden">
          
          <div className="absolute top-0 right-0 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-widest text-[10px] px-6 py-1.5 rounded-bl-3xl border-l border-b border-emerald-100 dark:border-emerald-800 shadow-sm flex items-center gap-1.5">
            <Sprout size={12} /> {farmer.type} Trace
          </div>

          <div className="space-y-4 w-full md:w-auto mt-4 md:mt-0">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl font-black shrink-0">
                {farmer.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
                  {farmer.name} <ShieldCheck className="text-blue-500 shrink-0" size={24} title="Verified Producer" />
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1.5 mt-1">
                  <MapPin size={16} /> {farmer.location}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 border border-blue-100 dark:border-blue-800/50">
                <Star size={14} className="fill-blue-500 text-blue-500" /> {farmer.rating} Grade Quality
              </span>
              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 border border-emerald-100 dark:border-emerald-800/50">
                <Check size={14} /> {farmer.reliability}% Escrow Success
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl w-full md:w-auto border border-gray-100 dark:border-gray-700/50 space-y-4 shrink-0">
            <div>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Contract Ask Price</p>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">₹{farmer.price}<span className="text-xl text-gray-400 font-medium">/{farmer.unit}</span></h2>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2">Available: {farmer.quantity} {farmer.unit}</p>
            </div>
            <Button onClick={handleOrder} className="w-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 pt-3 pb-3">
              Initiate Smart Contract
            </Button>
          </div>
        </div>

        {/* Actionable QR Code Section Requirement */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
           <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* QR Code Graphic Base */}
              <div 
                onClick={handleScanQR}
                className="w-48 h-48 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors group relative overflow-hidden shrink-0"
              >
                 <QrCode size={64} className="text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400 transition-colors mb-2" />
                 <span className="font-bold text-gray-500 group-hover:text-blue-500 transition-colors">Tap to Scan Trace</span>
                 
                 {/* Scanner Sweep Animation */}
                 {showQRStatus && (
                    <motion.div 
                      initial={{ top: 0 }}
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10" 
                    />
                 )}
              </div>

              {/* Dynamic Information Display post-scan */}
              <div className="flex-1 w-full flex flex-col justify-center min-h-[192px]">
                 <AnimatePresence mode="wait">
                   {!showQRStatus ? (
                      <motion.div 
                        key="prompt"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="text-center md:text-left"
                      >
                         <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Immutable Crop Provenance</h3>
                         <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-md">
                           Before initiating a contract, scan the origin QR code to cryptographically verify if this {farmer.type} is purely organic and tracks its entire growth history.
                         </p>
                      </motion.div>
                   ) : (
                      <motion.div 
                        key="results"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                         <div className="flex items-center gap-2 mb-2">
                           <ScanFace className="text-emerald-500" size={24} />
                           <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400">Provenance Verified successfully</h3>
                         </div>
                         
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            {farmer.type === 'Dairy Milk' && dairyData ? (
                              <>
                                 <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Cow Breed</p>
                                    <p className="text-lg font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                                      <Check size={18} /> {dairyData.cowType}
                                    </p>
                                 </div>
                                 <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Cattle Feed</p>
                                    <p className="text-lg font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                                      <Check size={18} /> {dairyData.feedType}
                                    </p>
                                 </div>
                                 <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 sm:col-span-2">
                                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Farm Environment</p>
                                    <p className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                                      {dairyData.farmEnvironment}
                                    </p>
                                 </div>
                              </>
                            ) : (
                              <>
                                 <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Organic Status</p>
                                    <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                      <Check size={18} /> 100% Certified Organic
                                    </p>
                                 </div>
                                 <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Pesticide Detection</p>
                                    <p className="text-lg font-black text-blue-600 dark:text-blue-400">0.00% (Trace Free)</p>
                                 </div>
                              </>
                            )}

                             <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50 sm:col-span-2 flex items-center justify-between">
                                <div>
                                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Farm Origin Signature</p>
                                  <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">{farmer.id.toUpperCase()}-{dairyData?.blockchainId || '0x8F9E2A1B'}</p>
                                </div>
                                <FileSignature className="text-blue-500 opacity-50" size={24} />
                             </div>
                         </div>
                      </motion.div>
                   )}
                 </AnimatePresence>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerDetail;
