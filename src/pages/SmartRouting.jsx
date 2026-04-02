import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Cpu, Sparkles, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../contexts/WeatherContext';

const SmartRouting = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { scenario } = useWeather();
  
  const crops = [
    { key: 'coconut', name: 'Coconut', icon: '🥥' },
    { key: 'banana', name: 'Banana', icon: '🍌' },
    { key: 'tomato', name: 'Tomato', icon: '🍅' },
    { key: 'mango', name: 'Mango', icon: '🥭' },
    { key: 'sugarcane', name: 'Sugarcane', icon: '🎋' }
  ];

  const [selectedCrop, setSelectedCrop] = useState(crops[0]);
  const [quantities, setQuantities] = useState({
    gradeA: 0,
    gradeB: 0,
    gradeC: 0
  });

  const handleQuantityChange = (grade, value) => {
    setQuantities(prev => ({
      ...prev,
      [grade]: parseInt(value) || 0
    }));
  };

  const generateAIPlan = () => {
    navigate('/farmer/pooling', { 
      state: { 
        crop: selectedCrop.name,
        icon: selectedCrop.icon,
        cropKey: selectedCrop.key,
        quantities
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-6 lg:p-8 pb-32 transition-colors">
      <div className="max-w-2xl mx-auto space-y-6 pt-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              Smart Routing Engine <Cpu className="text-emerald-500" size={24} />
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">
              Distribute crop byproducts for maximum profit.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
          
          {/* Crop Selector */}
          <div className="space-y-2">
            <label className="block font-bold text-gray-900 dark:text-white text-sm">Select Crop / Produce</label>
            <select 
              value={selectedCrop.key}
              onChange={(e) => {
                const crop = crops.find(c => c.key === e.target.value);
                setSelectedCrop(crop);
              }}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium text-base p-3.5 rounded-xl focus:outline-none focus:border-emerald-500 shadow-sm transition-colors appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.8rem auto' }}
            >
              {crops.map((crop) => (
                <option key={crop.key} value={crop.key}>{crop.name}</option>
              ))}
            </select>
          </div>

          {/* Quantities */}
          <div className="space-y-3 pt-2">
            <label className="block font-bold text-gray-900 dark:text-white text-sm">Quantities (kg)</label>
            
            <div className="flex items-center gap-4">
              <span className="w-12 font-black text-emerald-500">Gr A</span>
              <input 
                type="number"
                min="0"
                value={quantities.gradeA || ''}
                onChange={(e) => handleQuantityChange('gradeA', e.target.value)}
                placeholder="0"
                className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium text-base p-3.5 rounded-xl focus:outline-none focus:border-emerald-500 shadow-sm transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <span className="w-12 font-black text-amber-500">Gr B</span>
              <input 
                type="number"
                min="0"
                value={quantities.gradeB || ''}
                onChange={(e) => handleQuantityChange('gradeB', e.target.value)}
                placeholder="0"
                className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium text-base p-3.5 rounded-xl focus:outline-none focus:border-amber-500 shadow-sm transition-colors"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-12 font-black text-red-500 dark:text-red-400">Gr C</span>
              <input 
                type="number"
                min="0"
                value={quantities.gradeC || ''}
                onChange={(e) => handleQuantityChange('gradeC', e.target.value)}
                placeholder="0"
                className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium text-base p-3.5 rounded-xl focus:outline-none focus:border-red-500 dark:focus:border-red-400 shadow-sm transition-colors"
              />
            </div>
          </div>

          {/* Contextual Weather AI Injection */}
          <AnimatePresence>
            {scenario.riskLevel !== 'Low' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4 overflow-hidden"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-amber-900 dark:text-amber-300 text-sm flex items-center gap-2">
                       AI Weather Context <Sparkles size={14} className="text-amber-500" />
                    </h4>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200/80 mt-1">
                      {scenario.condition === 'Heavy Rain' 
                        ? 'Severe weather detected. Our engine automatically prioritizes same-day rapid routing to avoid transit spoilage.' 
                        : 'Abnormal weather detected. Market analysis highly recommends expediting your harvest and bypassing standard holding periods.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateAIPlan}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 font-bold transition-colors"
            >
              Analyze Market Options 🤝
            </motion.button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SmartRouting;
