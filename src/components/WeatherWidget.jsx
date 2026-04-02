import React from 'react';
import { CloudRain, Sun, Cloud, Thermometer, Wind, AlertTriangle, X, CloudLightning } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../contexts/WeatherContext';

const WeatherWidget = () => {
  const { scenario, cycleScenario, isPopupDismissed, setIsPopupDismissed } = useWeather();

  const getConditionIcon = () => {
    switch (scenario.condition) {
      case "Sunny": return <Sun size={28} className="text-amber-500" />;
      case "Cloudy": return <Cloud size={28} className="text-gray-400" />;
      case "Heavy Rain": return <CloudLightning size={28} className="text-blue-500" />;
      case "Extreme Heat": return <Sun size={28} className="text-red-500 animate-pulse" />;
      default: return <Sun size={28} />;
    }
  };

  return (
    <>
      {/* 1. The Always-Visible Dashboard Widget */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden"
      >
        <div className="absolute top-2 right-2 flex gap-2">
            <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-md ${
                scenario.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-700' :
                scenario.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700 animate-pulse'
            }`}>
              {scenario.riskLevel} Risk
            </span>
            {/* Hackathon Debug Toggle */}
            <button onClick={cycleScenario} className="text-[10px] bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-500 px-2 py-0.5 rounded-md transition-colors" title="Debug: Cycle Scenario">
              🔄
            </button>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
             {getConditionIcon()}
          </div>
          <div>
             <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-start gap-1">
               {scenario.temperature}°<span className="text-lg text-gray-400 font-medium mt-1">C</span>
             </h3>
             <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{scenario.condition}</p>
          </div>
          
          <div className="ml-auto flex flex-col gap-1 border-l border-gray-100 dark:border-gray-700 pl-4 w-32 shrink-0">
             <div className="flex items-center gap-1.5 text-xs font-bold text-blue-500 mb-1">
               <CloudRain size={14} /> {scenario.rainProbability} Rain
             </div>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">💡 Suggestion</p>
             <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-tight">
               {scenario.suggestion}
             </p>
          </div>
        </div>
      </motion.div>

      {/* 2. Medium Priority: Smart Notification */}
      <AnimatePresence>
        {scenario.alertType === 'notification' && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }} 
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }} 
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-3 flex items-center gap-3 overflow-hidden shadow-sm mt-3"
          >
            <div className="bg-blue-500 p-2 rounded-full shrink-0">
               <CloudRain size={16} className="text-white" />
            </div>
            <p className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
               {scenario.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. High Priority: Weather Alert Popup Modal - DEMANDS ATTENTION */}
      <AnimatePresence>
        {scenario.alertType === 'popup' && !isPopupDismissed && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-red-100 dark:border-red-900 overflow-hidden relative"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
               
               <div className="flex items-start gap-4">
                 <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-2xl shrink-0">
                    <AlertTriangle size={32} className="text-red-600 dark:text-red-400" />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                       {scenario.alertTitle}
                    </h2>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mt-2">
                       {scenario.alertBody}
                    </p>
                 </div>
               </div>

               <div className="mt-5 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-800/30">
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest mb-1 block">Suggested Action</span>
                  <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                    {scenario.alertAction}
                  </p>
               </div>
               
               <button 
                 onClick={() => setIsPopupDismissed(true)}
                 className="w-full mt-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-95 transition-all shadow-sm"
               >
                 Got it
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeatherWidget;
