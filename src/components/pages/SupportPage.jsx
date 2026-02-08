import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function SupportPage() {
  const { settings } = useSettings();
  const categories = settings.support?.categories || [];
  const validCategories = categories.filter(c => c.title);

  return (
    <div className="min-h-screen py-8 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header - Only render if Title or Description exists */}
          {(settings.support?.title || settings.support?.description) && (
            <div className="text-center mb-12">
              <div className="inline-flex h-8 items-center gap-3 px-6 py-2.5 bg-[#06b5cc]/10 border border-[#06b5cc]/20 rounded-full mb-8 mx-auto mt-4 hover:bg-[#06b5cc]/15 transition-colors duration-300">
                <HelpCircle className="w-6 h-6 text-[#06b5cc]" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#06b5cc]">Support Center</span>
              </div>
              {settings.support?.title && (
                <h1 className="text-4xl font-bold text-white mb-4">{settings.support.title}</h1>
              )}
              {settings.support?.description && (
                <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">{settings.support.description}</p>
              )}
            </div>
          )}
          <div className="max-w-none p-0 md:p-6 space-y-4">

            {/* Contact Categories - Only render if configured with titles */}
            {validCategories.length > 0 && (
              <section className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-6 text-[#EADADA]">CONTACT INFORMATION</h2>
                <div className="space-y-4 text-[#94A3B8]">
                  {validCategories.map((category, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-[#06b5cc] mt-1">•</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                        {category.description && (
                          <p className="text-[#94A3B8] text-sm mt-1">{category.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </motion.div>
      </div>
    </div>
  );
}
