import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tractor, History, LayoutDashboard, Cpu, Moon, Sun, Languages } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  
  const navLink = (path, icon, label) => {
    const isActive = location.pathname === path;
    return (
      <Link 
        to={path} 
        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
          isActive ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-emerald-500'
        }`}
      >
        {icon}
        <span className="text-xs font-semibold">{t(label)}</span>
      </Link>
    );
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] dark:shadow-sm dark:shadow-gray-800 border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
        <div className="max-w-md md:max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-xl text-white shadow-sm">
              <Tractor size={20} />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white leading-tight">AgriTrust</h1>
            </div>
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-6">
               <Link to="/" className={`font-medium text-sm ${location.pathname==='/'?'text-emerald-600 dark:text-emerald-400':'text-gray-600 dark:text-gray-300 hover:text-emerald-600'}`}>{t('nav.roles', 'Roles')}</Link>
               <Link to="/farmer" className={`font-medium text-sm ${location.pathname==='/farmer'?'text-emerald-600 dark:text-emerald-400':'text-gray-600 dark:text-gray-300 hover:text-emerald-600'}`}>{t('nav.farmer', 'Farmer')}</Link>
               <Link to="/vendor" className={`font-medium text-sm ${location.pathname==='/vendor'?'text-blue-600 dark:text-blue-400':'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}>{t('nav.vendor', 'Vendor')}</Link>
            </div>
            
            {/* Toggles */}
            <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-3">
              <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 shadow-inner cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors">
                 <Languages size={16} className="text-gray-700 dark:text-gray-300 mr-1" />
                 <select 
                   value={i18n.language.split("-")[0]} 
                   onChange={changeLanguage}
                   className="bg-transparent text-xs font-bold text-gray-700 dark:text-gray-300 outline-none appearance-none cursor-pointer uppercase"
                 >
                   <option value="en" className="text-gray-900">EN</option>
                   <option value="hi" className="text-gray-900">HI</option>
                   <option value="kn" className="text-gray-900">KN</option>
                   <option value="ta" className="text-gray-900">TA</option>
                   <option value="te" className="text-gray-900">TE</option>
                 </select>
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-inner">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 sm:hidden transition-colors duration-500">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          {navLink('/farmer', <LayoutDashboard size={22} />, 'nav.dashboard')}
          {navLink('/smart-routing', <Cpu size={22} />, 'nav.mlRouter')}
          {navLink('/history', <History size={22} />, 'nav.history')}
        </div>
      </div>
    </>
  );
};

export default Navbar;
