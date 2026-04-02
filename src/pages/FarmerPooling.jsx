import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Users, TrendingUp, Handshake, ArrowRight, ShieldCheck, User, Boxes, Workflow } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FarmerPooling = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safe extraction of routing data
  const payload = location.state || {
    crop: 'Tomato', icon: '🍅', cropKey: 'tomato', quantities: { gradeA: 50, gradeB: 30, gradeC: 20 }
  };

  const myA = payload.quantities.gradeA || 0;
  const myB = payload.quantities.gradeB || 0;
  const myC = payload.quantities.gradeC || 0;
  const myTotal = myA + myB + myC;

  // Mock nearby farmers based on pure randomness for MVP feeling
  const [nearbyFarmers] = useState([
    { id: 'n1', name: "Suresh R.", distance: "South Zone (2.4 km)", grades: { A: Math.round(myA*1.2), B: Math.round(myB*0.8), C: Math.round(myC*1.1) } },
    { id: 'n2', name: "Local Co-op", distance: "East Hub (4.1 km)", grades: { A: Math.round(myA*0.9), B: Math.round(myB*1.5), C: Math.round(myC*0.7) } },
  ]);

  const poolA = myA + nearbyFarmers.reduce((acc, f) => acc + f.grades.A, 0);
  const poolB = myB + nearbyFarmers.reduce((acc, f) => acc + f.grades.B, 0);
  const poolC = myC + nearbyFarmers.reduce((acc, f) => acc + f.grades.C, 0);
  const poolTotal = poolA + poolB + poolC;

  const [profitData, setProfitData] = useState({ ind: 0, pool: 0, percentGain: 0 });
  const [isMLConfiguring, setIsMLConfiguring] = useState(true);

  useEffect(() => {
    // Send data to Python Machine Learning Model
    fetch('http://127.0.0.1:5000/api/predict_profit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cropKey: payload.cropKey,
        gradeA: myA,
        gradeB: myB,
        gradeC: myC,
        clusterSize: nearbyFarmers.length + 1
      })
    })
    .then(res => res.json())
    .then(data => {
      setProfitData({
        ind: data.predictions.individual_profit,
        pool: data.predictions.pooled_profit,
        percentGain: data.predictions.percentage_gain
      });
      setIsMLConfiguring(false);
    })
    .catch(err => {
      console.error("Python ML Backend not running. Using fallback algorithm.", err);
      // Fallback Math if Python server is offline
      const base = (myA * 40) + (myB * 25) + (myC * 10);
      setProfitData({
        ind: base,
        pool: Math.round(base * 1.35),
        percentGain: 35.0
      });
      setIsMLConfiguring(false);
    });
  }, [payload.cropKey, myA, myB, myC]);

  const [isPooling, setIsPooling] = useState(false);

  // Navigation Logic
  const handleProceed = (usePool) => {
    if (usePool) {
      setIsPooling(true);
      setTimeout(() => {
        navigate('/farmer/smart-utilization', {
          state: {
            ...payload,
            isPooled: true,
            clusterSize: nearbyFarmers.length + 1,
            quantities: {
              gradeA: poolA,
              gradeB: poolB,
              gradeC: poolC
            }
          }
        });
      }, 3000); // Simulate Smart Contract deployment
    } else {
       navigate('/farmer/smart-utilization', {
          state: { ...payload, isPooled: false }
       });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-6 lg:p-8 pb-32">
      <div className="max-w-2xl mx-auto space-y-6 pt-4">

        <div className="text-center mb-8">
           <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-gray-800 shadow-sm">
             <Users className="text-blue-600 dark:text-blue-400" size={32} />
           </div>
           <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Community Pooling</h1>
           <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
             Combine your {payload.crop} with local farmers for bulk enterprise rates.
           </p>
        </div>

        {isPooling ? (
           <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 md:p-14 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
              <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                 className="absolute -top-32 -right-32 w-64 h-64 border-[40px] border-emerald-50 dark:border-emerald-900/20 rounded-full opacity-50 pointer-events-none"
              />
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 border-4 border-blue-200 dark:border-blue-800 rounded-full flex items-center justify-center relative">
                 <ShieldCheck className="text-blue-600 dark:text-blue-400 absolute" size={40} />
                 <motion.svg className="w-full h-full text-blue-500" viewBox="0 0 100 100">
                   <motion.circle cx="50" cy="50" r="46" fill="transparent" strokeWidth="8" stroke="currentColor" strokeDasharray="290" initial={{ strokeDashoffset: 290 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 2.5, ease: "easeInOut" }} />
                 </motion.svg>
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Forming Regional Cluster...</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Writing auto-split Smart Contract to the Blockchain</p>
              </div>
           </div>
        ) : (
          <>
            {/* The A/B Comparison Wrapper */}
            <div className="flex flex-col md:flex-row gap-4">
              
              {/* Individual Yield */}
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                 <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 font-bold text-[10px] uppercase tracking-widest rounded-full mb-3 inline-block">Individual Sale</span>
                 <div className="mt-2 space-y-3">
                   <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Your Produce</span>
                      <span className="text-xl font-black text-gray-900 dark:text-white">{myTotal} kg</span>
                   </div>
                   <div className="h-px w-full bg-gray-100 dark:bg-gray-700/50" />
                   <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-gray-500 dark:text-gray-400">ML Profit Prediction</span>
                      {isMLConfiguring ? (
                         <span className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></span>
                      ) : (
                         <span className="text-2xl font-black text-gray-900 dark:text-white">₹{profitData.ind.toLocaleString()}</span>
                      )}
                   </div>
                 </div>
                 
                 <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button onClick={() => handleProceed(false)} disabled={isMLConfiguring} className="w-full py-3 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-2 border-transparent disabled:opacity-50">
                      Sell Individually
                    </button>
                 </div>
              </div>

              {/* Pooled Yield */}
              <div className="flex-1 bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-emerald-700 dark:to-emerald-900 rounded-3xl p-1 shadow-xl shadow-emerald-500/20 relative overflow-hidden transform md:scale-105 z-10">
                 {/* Internal Card Background */}
                 <div className="bg-white dark:bg-gray-800 w-full h-full rounded-[20px] p-6 flex flex-col justify-between">
                    <div className="absolute top-0 right-0 py-1.5 px-4 bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-bl-2xl">
                       {isMLConfiguring ? '...' : `+${profitData.percentGain}% Profit`}
                    </div>
                    
                    <div>
                      <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-3 py-1 font-bold text-[10px] uppercase tracking-widest rounded-full mb-3 inline-block">
                        Community Pool 🤝
                      </span>
                      <div className="mt-2 space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Cluster Size</span>
                            <span className="text-xl font-black text-gray-900 dark:text-white">3 Farmers</span>
                        </div>
                        <div className="h-px w-full bg-gray-100 dark:bg-gray-700/50" />
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400">ML Prorated Share</span>
                            {isMLConfiguring ? (
                               <span className="h-9 w-32 bg-emerald-100 dark:bg-emerald-800 animate-pulse rounded"></span>
                            ) : (
                               <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">₹{profitData.pool.toLocaleString()}</span>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4">
                        <button onClick={() => handleProceed(true)} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black shadow-lg shadow-emerald-500/30 flex justify-center items-center gap-2 active:scale-95 transition-all">
                          Join Pool <ArrowRight size={18} />
                        </button>
                    </div>
                 </div>
              </div>
            </div>

            {/* Smart Contract Blockchain Visualizer */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mt-6 relative">
              <div className="flex items-center gap-2 mb-4">
                 <ShieldCheck className="text-blue-500" size={20} />
                 <h3 className="font-black text-gray-900 dark:text-white">Smart Contract Breakdown</h3>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                Payments are automatically escrowed and mathematically split based on your exact Grade input percentages. Zero disputes.
              </p>
              
              <div className="space-y-3">
                 <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-750 p-4 rounded-xl flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                       <User className="text-emerald-500" size={20} />
                       <span className="font-bold text-gray-900 dark:text-white">You</span>
                    </div>
                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{myTotal} kg</span>
                 </div>
                 {nearbyFarmers.map(f => (
                   <div key={f.id} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-750 p-4 rounded-xl flex justify-between items-center opacity-70 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-3">
                         <User className="text-blue-400" size={20} />
                         <div>
                           <span className="font-bold text-gray-900 dark:text-gray-300 block leading-tight">{f.name}</span>
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{f.distance}</span>
                         </div>
                      </div>
                      <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{f.grades.A + f.grades.B + f.grades.C} kg</span>
                   </div>
                 ))}
                 
                 {/* Total Aggregator */}
                 <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-center px-4">
                    <span className="font-black text-gray-900 dark:text-white flex items-center gap-2"><Boxes size={18} /> Bulk Volume</span>
                    <span className="font-black text-blue-600 dark:text-blue-400 text-xl">{poolTotal} kg</span>
                 </div>
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default FarmerPooling;
