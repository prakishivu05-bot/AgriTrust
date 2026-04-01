import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tractor, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 pb-24">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-md w-full space-y-8">
        
        <motion.div variants={item} className="text-center">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/20">
            <Tractor size={40} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">{t('landing.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">{t('landing.subtitle')}</p>
        </motion.div>

        <motion.div variants={container} className="space-y-4 pt-8">
          <motion.div variants={item}>
            <Card onClick={() => navigate('/farmer')}>
              <div className="flex items-center gap-4 group">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-full text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500 transition-colors">
                  <Tractor size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('landing.farmerCard.title')}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{t('landing.farmerCard.desc')}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card onClick={() => navigate('/vendor')}>
              <div className="flex items-center gap-4 group">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full text-blue-700 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Store size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('landing.vendorCard.title')}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{t('landing.vendorCard.desc')}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Landing;
