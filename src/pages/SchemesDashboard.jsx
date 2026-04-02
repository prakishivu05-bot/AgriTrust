import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2, TrendingUp, ShieldCheck, Cpu, ArrowRight, Zap, ArrowLeft, Users, CloudRain, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import schemesData from '../data/schemesData.json';
import { useWeather } from '../contexts/WeatherContext';

const SchemesDashboard = () => {
  const navigate = useNavigate();
  const { scenario } = useWeather();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const rawData = localStorage.getItem('farmer_profile');
    if (rawData) setProfile(JSON.parse(rawData));
    
    // Load existing applications to track status and unlocked benefits
    const apps = JSON.parse(localStorage.getItem('scheme_applications') || '[]');
    setApplications(apps);
  }, []);

  // Calculate Unlocked Benefits based on approved applications
  const unlockedAmount = applications
    .filter(a => a.status === 'Approved')
    .reduce((acc, curr) => acc + (curr.expectedBenefit || 0), 0);

  // AI Matching Logic (mocked intelligently based on farmer profile)
  const getAISuggestions = () => {
    if (!profile) return schemesData;
    
    const userCrops = profile.cropsGrown.map(c => c.toLowerCase());
    
    return schemesData.filter(scheme => {
      // Direct crop match
      const cropMatch = scheme.targetCrops.includes('all') || 
                       scheme.targetCrops.some(sc => userCrops.includes(sc));
      
      // If land is small (< 5 acres), PMKSY is highly relevant
      const theLand = parseFloat(profile.landOwned || '0');
      const landMatch = (theLand <= 5) ? true : !!cropMatch;

      // Weather override logic
      const isExtremeHeat = scenario.condition === 'Extreme Heat' && scheme.id === 'pmksy-irrigation';
      const isStorm = scenario.riskLevel === 'High' && scheme.id === 'pmfby-insurance';

      return cropMatch && landMatch || isExtremeHeat || isStorm;
    }).map(scheme => {
      // Append dynamic text based on why
      let dynamicReason = scheme.whyRecommended;
      if (scheme.id === 'midh-horticulture' && userCrops.includes('mango')) {
        dynamicReason = "Highly beneficial since you are cultivating Mangoes.";
      }
      if (scheme.id === 'pmksy-irrigation' && parseFloat(profile.landOwned) <= 5) {
        dynamicReason = `As a small farmer (${profile.landOwned} Acres), you get priority subsidies.`;
      }

      // Weather Context Dynamic Text overriding defaults
      if (scenario.condition === 'Extreme Heat' && scheme.id === 'pmksy-irrigation') {
        dynamicReason = `🚨 WEATHER CRITICAL: Extreme Heat (${scenario.temperature}°C) detected. Artificial Intelligence urgently recommends prioritizing Irrigation subsidies to prevent wilting.`;
      }
      if (scenario.riskLevel === 'High' && scheme.id === 'pmfby-insurance') {
        dynamicReason = `🚨 STORM WARNING: Immediate coverage highly recommended due to upcoming Severe Weather events.`;
      }

      return { ...scheme, dynamicReason };
    });
  };

  const suggestions = getAISuggestions();
  
  // Pending applications count
  const pendingCount = applications.filter(a => a.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-32 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 pt-6">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shrink-0"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              Government Schemes 🇮🇳
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">
              Personalized subsidies based on your verified blockchain profile.
            </p>
          </div>
        </div>

        {/* Top Analytics Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-600 dark:bg-emerald-700 rounded-3xl p-6 shadow-xl shadow-emerald-600/20 text-white relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <TrendingUp size={100} />
            </div>
            <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs mb-2">Unlocked Benefits</p>
            <h2 className="text-4xl font-black">₹{unlockedAmount.toLocaleString('en-IN')}</h2>
            <div className="mt-4 flex items-center gap-2 text-emerald-100 text-sm font-medium">
               <CheckCircle2 size={16} /> Verified via Direct Benefit Transfer
            </div>
          </div>
          
          <div 
            onClick={() => navigate('/farmer/schemes/status')}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Application Status</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                 {pendingCount} <span className="text-lg text-gray-400 font-medium">Pending ⏳</span>
              </h2>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-sm font-bold group-hover:translate-x-1 transition-transform w-max">
               Track Applications <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Cpu className="text-purple-500" strokeWidth={2.5} /> Smart Suggestions
            </h3>
            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-purple-200 dark:border-purple-800/50">
               <Zap size={12} fill="currentColor" /> AI MATCHED
            </span>
          </div>

          <div className="space-y-4">
            {suggestions.map((scheme) => (
              <motion.div 
                whileHover={{ y: -2 }}
                key={scheme.id}
                className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-1 overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                {/* AI Reason Banner */}
                <div className="bg-purple-50 dark:bg-purple-900/10 px-5 py-3 rounded-t-2xl flex items-start gap-3 border-b border-purple-100 dark:border-gray-700/50">
                   <div className="bg-purple-200 dark:bg-purple-800 p-1.5 rounded-full shrink-0 mt-0.5">
                     <Cpu size={14} className="text-purple-700 dark:text-purple-200" />
                   </div>
                   <p className="text-sm font-semibold text-purple-900 dark:text-purple-300 leading-snug">
                     {scheme.dynamicReason}
                   </p>
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                        {scheme.shortName}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">{scheme.name}</p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-800/50 text-right shrink-0">
                      <span className="block text-emerald-600 dark:text-emerald-400 font-black text-lg">{scheme.benefit}</span>
                    </div>
                  </div>

                  {/* Community Insight */}
                  <div className="my-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-100 dark:border-gray-750 flex items-center gap-3">
                     <Users className="text-blue-500 shrink-0" size={18} />
                     <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                       {scheme.communityInsight}
                     </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                       <ShieldCheck size={14} /> Blockchain Verified Target
                    </div>
                    <button 
                      onClick={() => navigate(`/farmer/schemes/${scheme.id}`)}
                      className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm"
                    >
                      View Details <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SchemesDashboard;
