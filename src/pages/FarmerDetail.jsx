import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, Star, History, LineChart, Package, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';

const FarmerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data fetching based on ID
  const farmer = { 
    id: id || 'f1', 
    name: "Ramesh Farm", 
    location: "North District (3km)", 
    quantity: 200, 
    unit: 'L', 
    price: 48, 
    rating: 4.9, 
    reliability: 98, 
    type: 'Dairy Milk',
    joinedDate: 'Jan 2024',
    escrowCompleted: 145
  };

  const handleOrder = () => {
    navigate('/transaction', { 
      state: { buyer: { name: 'You (Vendor)', price: farmer.price }, type: farmer.type, quantity: farmer.quantity } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 pb-24">
      <div className="max-w-4xl mx-auto space-y-6 pt-4">
        
        {/* Header Navigation */}
        <button 
          onClick={() => navigate('/vendor')}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold mb-2 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Directory
        </button>

        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl font-black">
                {farmer.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                  {farmer.name} <ShieldCheck className="text-blue-500" size={24} title="Verified Producer" />
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1.5 mt-1">
                  <MapPin size={16} /> {farmer.location} • Joined {farmer.joinedDate}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Star size={14} className="fill-blue-500 text-blue-500" /> {farmer.rating} User Rating
              </span>
              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Check size={14} /> {farmer.reliability}% Escrow Success
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl w-full md:w-auto border border-gray-100 dark:border-gray-700/50 space-y-4">
            <div>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Current Asking Price</p>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">₹{farmer.price}<span className="text-xl text-gray-400 font-medium">/{farmer.unit}</span></h2>
            </div>
            <Button onClick={handleOrder} className="w-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 pt-3 pb-3">
              Initiate Smart Contract
            </Button>
          </div>
        </div>

        {/* Detailed Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400 font-bold">
              <Package size={20} /> Active Inventory
            </div>
            <div>
              <p className="text-4xl font-black text-gray-900 dark:text-white">{farmer.quantity} <span className="text-xl text-gray-500 font-medium">{farmer.unit}</span></p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-2">Ready for immediate pickup</p>
            </div>
          </Card>
          
          <Card className="p-6 border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400 font-bold">
              <History size={20} /> Blockchain History
            </div>
            <div>
              <p className="text-4xl font-black text-gray-900 dark:text-white">{farmer.escrowCompleted}</p>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-2">Successful Escrow Contracts</p>
            </div>
          </Card>
          
          <Card className="p-6 border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400 font-bold">
              <LineChart size={20} /> Price Trend
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white mb-2 flex items-baseline gap-2">
                Stable <span className="text-sm font-bold text-gray-400 uppercase">30 Days</span>
              </p>
              <div className="h-12 w-full flex items-end gap-1 opacity-70">
                {[48,47,48,48,49,48,48].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-200 dark:bg-blue-900/50 rounded-t-sm" style={{ height: `${(h/50)*100}%` }}></div>
                ))}
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default FarmerDetail;
