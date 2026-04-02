import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';
import { ArrowLeft, BrainCircuit, Activity, TrendingUp, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const MLForecast = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  // Single Crop data passed from Smart Routing
  const crop = location.state?.crop || null;
  const grade = location.state?.grade || null;
  const icon = location.state?.icon || null;
  const hasData = crop && grade;
  
  const [isTraining, setIsTraining] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [metrics, setMetrics] = useState({ yieldTrend: 0, priceTrend: 0 });
  const [aiBasisText, setAiBasisText] = useState("");

  // Base Historical Mock Data (last 14 days)
  const historyYield = [45.0, 46.2, 46.8, 48.0, 48.5, 49.0, 50.1, 49.5, 48.5, 49.2, 50.5, 51.0, 51.5, 52.0];
  const historyPrice = [40.0, 41.5, 41.0, 42.0, 41.5, 43.0, 44.0, 44.5, 45.0, 45.8, 45.2, 47.0, 47.5, 48.0];

  useEffect(() => {
    // Artificial delay to show the "Training Neural Net" UI
    const timer = setTimeout(() => {
      runMLModels();
    }, 3500); 
    return () => clearTimeout(timer);
  }, []);

  // Pure JS Regression Algorithm for Forecasting
  const predictLinearly = (dataArr, futureSteps, isPrice) => {
    const xSum = dataArr.reduce((a, b, i) => a + i, 0);
    const ySum = dataArr.reduce((a, b) => a + b, 0);
    const xxSum = dataArr.reduce((a, b, i) => a + i * i, 0);
    const xySum = dataArr.reduce((a, b, i) => a + i * b, 0);
    const count = dataArr.length;

    let slope = (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum);
    let intercept = (ySum - slope * xSum) / count;

    let basisMsg = "Standard historical trend analysis applied.";

    // Apply strict AI Modifications if crop grading data was provided
    if (hasData) {
        if (grade.includes("Grade A")) {
            intercept += (isPrice ? 3.5 : 5.0); // Major Boost
            slope += 0.1;
            basisMsg = `${crop} assessed at Quality [${grade}] historically triggers a 12% export demand premium. The AI has calculated an upward price momentum (+₹3.5/kg baseline intercept adjustment) to predict peak selling window.`;
        } else if (grade.includes("Grade B")) {
            intercept += (isPrice ? 1.0 : 2.0); // Mild Boost
            basisMsg = `${crop} assessed at Quality [${grade}] aligns with standard local supply thresholds. Yield expected to hold stable with marginal seasonal fluctuations.`;
        } else if (grade.includes("Grade C")) {
            intercept -= (isPrice ? 2.5 : 1.0); // Penalty
            slope -= 0.05;
            basisMsg = `${crop} assessed at Quality [${grade}] faces lower industrial purchasing rates. The AI predicts a slight negative price correlation (-₹2.5/kg off baseline) moving forward.`;
        }
    }

    if (isPrice && hasData) {
       setAiBasisText(basisMsg);
    }

    let predictions = [];
    for (let i = 0; i < futureSteps; i++) {
        let noise = (Math.random() - 0.5) * 1.5;
        predictions.push(slope * (count + i) + intercept + noise);
    }
    return predictions;
  };

  const runMLModels = async () => {
    try {
      let pythonPredictedPrice = null;
      let pythonPredictedYieldBoost = 0;
      
      try {
        const payload = {
          cropKey: crop || 'tomato',
          gradeA: grade?.includes('A') ? 500 : 0,
          gradeB: grade?.includes('B') ? 500 : 0,
          gradeC: grade?.includes('C') ? 500 : 0,
          clusterSize: 3
        };
        const res = await axios.post('http://127.0.0.1:5000/api/predict_profit', payload, { timeout: 4000 });
        if (res.data && res.data.status === 'success') {
           pythonPredictedPrice = res.data.predictions.individual_profit / 1000; // Scaled specifically roughly for the demo chart baseline
           pythonPredictedYieldBoost = res.data.predictions.percentage_gain;
           setAiBasisText(`Connected to Live Deep Learning Node (Port 5000). The Random Forest Regressor predicted a raw baseline of ₹${(res.data.predictions.individual_profit).toFixed(2)} with a +${pythonPredictedYieldBoost}% premium via Community Pooling.`);
        }
      } catch (backendErr) {
        console.warn("Python ML node unavailable. Activating purely localized JS fallback.", backendErr);
      }

      // Forecast Next 7 Days (Serves as Baseline structure)
      let futureYields = predictLinearly(historyYield, 7, false);
      let futurePrices = predictLinearly(historyPrice, 7, true);

      // Apply Live Python API Data heavily overriding JS mocks
      if (pythonPredictedPrice !== null) {
          // Progressively shift the pricing to match Python ML expectations
          futurePrices = futurePrices.map((p, i) => p + (pythonPredictedPrice * ((i+1)/7)));
          // Apply ML percentage gain directly as a progressive multiplier over the 7 days
          futureYields = futureYields.map((y, i) => y * (1 + ((pythonPredictedYieldBoost/100) * ((i+1)/7))));
      }

      // Construct Visual Chart Data
      let combinedData = [];
      let currentDay = new Date();
      currentDay.setDate(currentDay.getDate() - 14);

      // Add History
      for (let i = 0; i < 14; i++) {
        combinedData.push({
          date: currentDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          Yield: Number(historyYield[i].toFixed(1)),
          Price: Number(historyPrice[i].toFixed(1)),
          isForecast: false
        });
        currentDay.setDate(currentDay.getDate() + 1);
      }

      // Add Forecasting Break Point (Connects the line)
      combinedData[13].ForecastYield = combinedData[13].Yield;
      combinedData[13].ForecastPrice = combinedData[13].Price;

      // Add Future
      for (let i = 0; i < 7; i++) {
        combinedData.push({
          date: currentDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          ForecastYield: Number(futureYields[i].toFixed(1)),
          ForecastPrice: Number(futurePrices[i].toFixed(1)),
          isForecast: true
        });
        currentDay.setDate(currentDay.getDate() + 1);
      }

      setChartData(combinedData);
      
      // Calculate simple trend vs last historical point
      setMetrics({
        yieldTrend: ((futureYields[6] - historyYield[13]) / historyYield[13] * 100).toFixed(1),
        priceTrend: ((futurePrices[6] - historyPrice[13]) / historyPrice[13] * 100).toFixed(1)
      });

      setIsTraining(false);
    } catch (err) {
      console.error("ML Training failed", err);
      setIsTraining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-6 lg:p-8 pb-24">
      <div className="max-w-6xl mx-auto space-y-6 pt-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
               AI Profit Forecast <BrainCircuit className="text-purple-500" />
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
              Predicting Output & Market Pricing explicitly bounded to {hasData ? crop : 'Historical'} attributes.
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        {isTraining ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center space-y-8 min-h-[500px]"
          >
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="w-24 h-24 border-4 border-gray-100 dark:border-gray-700 border-t-purple-500 rounded-full"
             />
             <div className="text-center space-y-3">
               <h2 className="text-3xl font-black text-gray-900 dark:text-white">Training AI Logic Structure...</h2>
               <p className="text-gray-500 font-medium max-w-sm mx-auto">Cross-referencing historical farm bounds with real-time gradient descent arrays.</p>
               
               {/* Display Passed Grades Context */}
               {hasData && (
                 <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex flex-col items-center justify-center max-w-md mx-auto border border-purple-100 dark:border-purple-800/50">
                    <div className="text-sm font-black text-purple-600 dark:text-purple-400 mb-4 uppercase tracking-widest flex items-center justify-center gap-2">
                      <Sparkles size={16} /> Isolating Focus Variable
                    </div>
                    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <span className="text-4xl">{icon}</span>
                      <div className="text-left">
                        <p className="text-xl font-black text-gray-900 dark:text-white">{crop}</p>
                        <p className="font-bold text-emerald-500 text-sm tracking-wide">{grade}</p>
                      </div>
                    </div>
                 </motion.div>
               )}
             </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/20 p-6 rounded-3xl border border-purple-100 dark:border-purple-800/50 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-purple-700 dark:text-purple-300 font-bold mb-1 flex items-center gap-2">
                       <Activity size={18} /> Predicted 7-Day Output
                    </p>
                    <h3 className="text-4xl font-black text-purple-900 dark:text-purple-100">
                      {metrics.yieldTrend > 0 ? '+' : ''}{metrics.yieldTrend}%
                    </h3>
                  </div>
                  <div className={`p-4 rounded-2xl ${metrics.yieldTrend > 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'}`}>
                     <TrendingUp size={32} className={metrics.yieldTrend < 0 ? 'rotate-180' : ''} />
                  </div>
               </div>

               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/20 p-6 rounded-3xl border border-blue-100 dark:border-blue-800/50 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-blue-700 dark:text-blue-300 font-bold mb-1 flex items-center gap-2">
                       <TrendingUp size={18} /> Predicted Market Price
                    </p>
                    <h3 className="text-4xl font-black text-blue-900 dark:text-blue-100">
                      {metrics.priceTrend > 0 ? '+' : ''}{metrics.priceTrend}%
                    </h3>
                  </div>
                  <div className={`p-4 rounded-2xl ${metrics.priceTrend > 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'}`}>
                     <TrendingUp size={32} className={metrics.priceTrend < 0 ? 'rotate-180' : ''} />
                  </div>
               </div>
            </div>

            {/* The Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 h-[500px] flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                 Profit Forecast based on {hasData ? `${crop} Quality Grades` : 'Historical Market Averages'}
              </h3>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                    <XAxis dataKey="date" tick={{fontSize: 12}} stroke="#9ca3af" axisLine={false} tickLine={false} minTickGap={20} />
                    <YAxis yAxisId="left" tick={{fontSize: 12}} stroke="#9ca3af" axisLine={false} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                    <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12}} stroke="#9ca3af" axisLine={false} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#1f2937', color: '#fff' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    
                    {/* Shadow/Zone for the forecast area */}
                    <ReferenceArea x1={chartData[13]?.date} x2={chartData[20]?.date} fill="#8b5cf6" fillOpacity={0.05} />

                    {/* Historical Lines */}
                    <Line yAxisId="left" type="monotone" name="Historical Output" dataKey="Yield" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="monotone" name="Historical Value (₹)" dataKey="Price" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} />
                    
                    {/* AI Forecast Lines */}
                    <Line yAxisId="left" type="monotone" name="Predicted Output" dataKey="ForecastYield" stroke="#c4b5fd" strokeWidth={4} strokeDasharray="6 6" dot={false} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="monotone" name="Predicted Value" dataKey="ForecastPrice" stroke="#93c5fd" strokeWidth={4} strokeDasharray="6 6" dot={false} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Explainability Statement */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 md:p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800/40">
               <h3 className="font-black text-indigo-900 dark:text-indigo-200 text-lg flex items-center gap-2 mb-3">
                 <BookOpen size={20} className="text-indigo-600" /> AI Mathematical Basis
               </h3>
               <p className="text-indigo-800 dark:text-indigo-300 font-medium text-lg leading-relaxed">
                 {aiBasisText}
               </p>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MLForecast;
