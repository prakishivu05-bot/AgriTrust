import React, { useState } from 'react';
import { ArrowRight, Leaf, Cpu, TrendingUp, Sparkles, MapPin, Factory, Sprout, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import Button from '../components/Button';
import produceMap from '../data/produceMapping.json';
import industryMap from '../data/industryMapping.json';

const SmartRouting = () => {
  const { t } = useTranslation();
  const [product, setProduct] = useState('coconut');
  const [grades, setGrades] = useState({ A: 0, B: 0, C: 0 });
  const [isCalculated, setIsCalculated] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);

  const calculateUtilPlan = (e) => {
    e.preventDefault();
    if(grades.A > 0 || grades.B > 0 || grades.C > 0) setIsCalculated(true);
  };

  const getIndustry = (itemName) => {
    const key = itemName.toLowerCase();
    return industryMap[key] || "General Market";
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-4 sm:p-6 lg:p-8 max-w-md md:max-w-3xl mx-auto space-y-6 pb-24">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
           {t('router.title', 'Smart Routing Engine')} <Cpu className="text-emerald-500" />
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">{t('router.subtitle', 'Distribute crop byproducts for maximum profit.')}</p>
      </header>
      
      {!isCalculated ? (
        <motion.form variants={item} onSubmit={calculateUtilPlan} className="space-y-5">
          <Card className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('router.selectCrop', 'Select Crop')}</label>
              <select 
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 font-medium capitalize outline-none"
              >
                {Object.keys(produceMap).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>

            <div className="pt-2">
               <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('router.quantities', 'Quantities (kg)')}</label>
               <div className="space-y-3">
                 {['A', 'B', 'C'].map((grade) => (
                   <div key={grade} className="flex items-center gap-3">
                     <span className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold bg-gray-100 dark:bg-gray-800 ${grade==='A'?'text-emerald-600 dark:text-emerald-400':grade==='B'?'text-amber-600 dark:text-amber-400':'text-red-500 dark:text-red-400'}`}>
                       Gr {grade}
                     </span>
                     <input 
                       type="number" min="0" 
                       value={grades[grade]}
                       onChange={e => setGrades({...grades, [grade]: Number(e.target.value)})}
                       className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none font-medium" 
                       placeholder={`Grade ${grade} kg`}
                     />
                   </div>
                 ))}
               </div>
            </div>
            
            <Button type="submit" className="w-full mt-4">
              {t('router.generate', 'Generate AI Plan')} <Sparkles size={18} />
            </Button>
          </Card>
        </motion.form>
      ) : (
        <motion.div variants={container} className="space-y-5">
           <motion.div variants={item}>
             <Card highlight className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/20 border-none relative overflow-hidden">
               <div className="flex justify-between items-start mb-6 relative z-10">
                 <div>
                    <h2 className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-300">{t('router.planTitle', 'Smart Utilization Plan')}</h2>
                    <p className="text-3xl font-black text-gray-900 dark:text-gray-100 mt-1 capitalize flex items-center gap-2">{product} <Leaf size={24} className="text-emerald-500" /></p>
                 </div>
                 <button onClick={() => setIsCalculated(false)} className="bg-white dark:bg-gray-800 px-3 py-1 rounded shadow-sm text-xs font-bold text-gray-600 dark:text-gray-300 absolute right-0">X</button>
               </div>
               
               <div className="space-y-4 relative z-10">
                  {['A', 'B', 'C'].map((grade, idx) => {
                    if (grades[grade] === 0) return null;
                    const suggestions = produceMap[product].grades[grade];
                    return (
                      <motion.div key={grade} initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay: 0.2 + (idx*0.1)}} className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                          <span className="font-bold text-gray-700 dark:text-gray-200">Grade {grade} Produce</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full text-xs">{grades[grade]} kg</span>
                        </div>
                        <div className="space-y-2">
                          {suggestions.map((suggestion, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2 pl-1">
                               <ArrowRight size={16} className="text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0" />
                               <div>
                                 <p className="font-bold text-gray-900 dark:text-gray-100">{suggestion}</p>
                                 <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                   <Factory size={12} /> {getIndustry(suggestion)}
                                 </p>
                               </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )
                  })}
               </div>
             </Card>
           </motion.div>

           {/* AI Next-Season Planner Feature */}
           <motion.div variants={item}>
              <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/10 cursor-pointer shadow-md"
                    onClick={() => setShowPlanner(!showPlanner)}>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Sprout className="text-purple-600 dark:text-purple-400" size={24} />
                       <h3 className="font-bold text-purple-900 dark:text-purple-200 text-lg">AI Next-Season Planner</h3>
                    </div>
                    <Button variant="outline" className="text-xs py-1.5 px-3 border-purple-500 text-purple-700 dark:text-purple-300 pointer-events-none">
                       {showPlanner ? 'Hide' : 'Reveal Strategy'}
                    </Button>
                 </div>
                 
                 <AnimatePresence>
                   {showPlanner && (
                     <motion.div 
                       initial={{ opacity: 0, height: 0, marginTop: 0 }}
                       animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                       exit={{ opacity: 0, height: 0, marginTop: 0 }}
                       className="overflow-hidden border-t border-purple-200 dark:border-purple-800/50 pt-4"
                     >
                        <div className="bg-white/80 dark:bg-gray-900/60 p-4 rounded-xl space-y-3 shadow-inner">
                           <div className="flex items-center gap-2 mb-1">
                             <Target size={16} className="text-purple-600 dark:text-purple-400"/>
                             <p className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-xs">Next Year Strategy</p>
                           </div>
                           <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                             To increase Grade A from <span className="text-purple-700 dark:text-purple-400 font-bold">{grades.A || 50} kg</span> → <span className="text-emerald-600 dark:text-emerald-400 font-bold">{(grades.A || 50) + 25} kg</span>:
                           </p>
                           <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400 font-medium ml-1">
                              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Plant 10 days earlier based on climate shift</li>
                              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Use drip irrigation during flowering stage</li>
                              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Add potassium fertilizer analyzing recent soil data</li>
                              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Avoid peak heat stage to prevent nutrient loss</li>
                           </ul>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </Card>
           </motion.div>

           {/* Profit Insight */}
           {grades.C > 0 && (
             <motion.div variants={item} className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl flex items-start gap-3 shadow-md">
               <TrendingUp className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
               <div>
                 <p className="font-bold text-blue-900 dark:text-blue-200">{t('router.profitTitle', 'Profit Insight')}</p>
                 <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                    {t('router.profitDesc', 'Processing your Grade C produce gives roughly ')} 
                    <strong className="font-black text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-900/50 px-1 rounded">30% higher value</strong> than raw marketplace selling.
                 </p>
               </div>
             </motion.div>
           )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SmartRouting;
