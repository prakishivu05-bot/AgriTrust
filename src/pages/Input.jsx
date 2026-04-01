import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Egg, Milk } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Input = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('Poultry');
  const [quantity, setQuantity] = useState('');
  const [grade, setGrade] = useState('A');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity) return;
    navigate('/suggestion', { state: { type, quantity, grade } });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-md mx-auto space-y-6 pb-24">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">New Entry</h1>
        <p className="text-gray-500 font-medium">Enter details to get the best price suggestions.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card className="space-y-4 shadow-md bg-white border-transparent">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Select Category</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${
                  type === 'Poultry' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => setType('Poultry')}
              >
                <div className={`p-2 rounded-full ${type === 'Poultry' ? 'bg-green-100' : 'bg-gray-200'}`}>
                  <Egg size={24} className={type === 'Poultry' ? 'text-green-600' : 'text-gray-400'} />
                </div>
                <span className="font-semibold text-sm">Poultry</span>
              </button>
              <button
                type="button"
                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${
                  type === 'Dairy' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => setType('Dairy')}
              >
                <div className={`p-2 rounded-full ${type === 'Dairy' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  <Milk size={24} className={type === 'Dairy' ? 'text-blue-600' : 'text-gray-400'} />
                </div>
                <span className="font-semibold text-sm">Dairy</span>
              </button>
            </div>
          </div>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Quantity ({type === 'Poultry' ? 'kg' : 'Liters'})</label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-medium"
                placeholder="e.g. 100"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Quality Grade (Optional)</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-medium appearance-none"
              >
                <option value="A">Grade A (Premium)</option>
                <option value="B">Grade B (Standard)</option>
                <option value="C">Grade C (Low)</option>
              </select>
            </div>
          </div>
        </Card>

        <Button type="submit" className="shadow-green-600/30">
          <span>Get Price Suggestions</span>
          <ArrowRight size={20} />
        </Button>
      </form>
    </div>
  );
};

export default Input;
