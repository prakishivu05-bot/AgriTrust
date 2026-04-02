import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Bookmark, BookmarkCheck, ArrowLeft, ArrowRight, FileText, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import schemesData from '../data/schemesData.json';

const SchemeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  
  const scheme = schemesData.find(s => s.id === id);

  useEffect(() => {
    // Check if applied
    const apps = JSON.parse(localStorage.getItem('scheme_applications') || '[]');
    if (apps.some(a => a.schemeId === id)) {
      setHasApplied(true);
    }
  }, [id]);

  if (!scheme) {
    return <div className="p-8 text-center text-gray-500">Scheme not found.</div>;
  }

  const handleApply = () => {
    navigate(`/farmer/schemes/${id}/apply`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-32 transition-colors">
      
      {/* Dynamic Header matching benefit type */}
      <div className={`h-40 w-full relative ${
        scheme.benefitType === 'cash' ? 'bg-emerald-600 dark:bg-emerald-800' :
        scheme.benefitType === 'insurance' ? 'bg-purple-600 dark:bg-purple-800' :
        'bg-blue-600 dark:bg-blue-800'
      }`}>
         <button 
           onClick={() => navigate(-1)}
           className="absolute top-6 left-6 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white backdrop-blur-sm transition-colors shadow-sm"
         >
           <ArrowLeft size={24} />
         </button>
         <div className="absolute top-6 right-6">
           <button 
             onClick={() => setIsSaved(!isSaved)}
             className={`w-12 h-12 flex items-center justify-center rounded-xl backdrop-blur-sm transition-colors border shadow-sm ${
               isSaved ? 'bg-amber-400 text-amber-900 border-amber-300' : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
             }`}
           >
             {isSaved ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
           </button>
         </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative -mt-16 space-y-6">
        
        {/* Title Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
             <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
               {scheme.category}
             </span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight mb-2">
            {scheme.name}
          </h1>
          <p className="text-xl font-bold text-gray-500 dark:text-gray-400 mb-6">
            Benefit: <span className="text-emerald-600 dark:text-emerald-400 font-black">{scheme.benefit}</span>
          </p>

          <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
            {scheme.description}
          </p>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
             <CheckCircle2 className="text-emerald-500" /> Eligibility Criteria
          </h3>
          <ul className="space-y-3">
            {scheme.eligibility.map((crit, idx) => (
              <li key={idx} className="flex gap-3 text-gray-700 dark:text-gray-300 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>{crit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Required Documents */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
             <FileText className="text-blue-500" /> Required Documents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scheme.documentsRequired.map((doc, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700/50 p-3 rounded-xl flex items-center gap-3">
                 <div className="bg-white dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                   <Info size={16} className="text-blue-500" />
                 </div>
                 <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-tight">{doc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 pb-8 sm:pb-6 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
         <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck size={12} /> Verified Data Ready
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">Auto-fill from Identity</span>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApply}
              disabled={hasApplied}
              className={`flex-1 sm:flex-none py-4 px-8 rounded-2xl flex items-center justify-center gap-2 font-black text-lg transition-all shadow-lg ${
                hasApplied 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border-2 border-transparent shadow-none'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/30 active:scale-95'
              }`}
            >
              {hasApplied ? <><CheckCircle2 size={24} /> ALREADY APPLIED</> : <>APPLY NOW <ArrowRight size={24} /></>}
            </motion.button>
         </div>
      </div>
    </div>
  );
};

export default SchemeDetail;
