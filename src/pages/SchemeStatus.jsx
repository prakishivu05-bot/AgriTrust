import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Filter, ExternalLink, CalendarDays, TrendingUp, Search } from 'lucide-react';

const SchemeStatus = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // In a real application, this would fetch from a database or smart contract
    // For MVP, we use localStorage
    const apps = JSON.parse(localStorage.getItem('scheme_applications') || '[]');
    setApplications(apps.reverse()); // Show newest first
  }, []);

  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'Approved':
        return <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">✅ Approved</span>;
      case 'Rejected':
        return <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-red-200 dark:border-red-800">❌ Rejected</span>;
      default:
        return <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1.5 w-fit"><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-32 transition-colors">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6 sticky top-0 z-10 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
             <ChevronRight className="rotate-180" size={28} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              Application Tracker 
            </h1>
          </div>
        </div>
        <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
           <Filter size={18} />
        </button>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 mt-8 space-y-4">

        <div className="bg-white dark:bg-gray-800 rounded-2xl flex items-center border border-gray-200 dark:border-gray-700 p-3 shadow-sm mb-6 relative">
          <Search className="text-gray-400 absolute left-5" size={20} />
          <input 
            type="text" 
            placeholder="Search by APP ID or Scheme" 
            className="w-full pl-10 bg-transparent border-none outline-none font-semibold text-gray-900 dark:text-white placeholder:text-gray-400"
          />
        </div>

        {applications.length === 0 ? (
           <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-gray-50 dark:border-gray-900 text-4xl shadow-sm">
                📄
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Applications Yet</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-6">Explore the recommended government subsidies and apply easily via the dashboard.</p>
              <button onClick={() => navigate('/farmer/schemes')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors">
                 Find Schemes
              </button>
           </div>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="bg-white dark:bg-gray-800 rounded-3xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
               
               {/* Timeline Accent */}
               <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                 app.status === 'Approved' ? 'bg-emerald-500' :
                 app.status === 'Rejected' ? 'bg-red-500' : 'bg-amber-400'
               }`} />

               <div className="pl-3 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex flex-col gap-1">
                       <StatusBadge status={app.status} />
                       <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono font-bold uppercase tracking-wider mt-1">{app.id}</span>
                     </div>
                     <button className="text-blue-500 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl border border-blue-100 dark:border-blue-800/50">
                        <ExternalLink size={16} />
                     </button>
                  </div>

                  <div className="mb-4">
                     <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">{app.schemeName}</h3>
                     <div className="flex items-center gap-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1.5">
                           <CalendarDays size={14} /> 
                           {new Date(app.appliedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                        </span>
                     </div>
                  </div>

                  {/* Status Expansion */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-750 flex items-center justify-between">
                     <div>
                       <span className="block text-[10px] uppercase tracking-widest font-black text-gray-400 mb-0.5">Expected Timeline</span>
                       <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                         {app.status === 'Pending' ? 'Est. 14 Days' : 'Completed'}
                       </span>
                     </div>
                     <div className="text-right">
                       <span className="block text-[10px] uppercase tracking-widest font-black text-gray-400 mb-0.5 flex items-center justify-end gap-1">
                          {app.benefitType === 'subsidy' ? 'Expected Value' : 'Payout Amount'}
                       </span>
                       <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                         {app.expectedBenefit ? `₹${app.expectedBenefit.toLocaleString('en-IN')}` : 'TBD by Committee'}
                       </span>
                     </div>
                  </div>
               </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default SchemeStatus;
