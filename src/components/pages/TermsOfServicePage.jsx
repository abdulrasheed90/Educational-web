import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function TermsOfServicePage() {
  const { settings } = useSettings();
  const termsContent = settings.policies?.termsOfService?.content;
  const lastUpdated = settings.policies?.termsOfService?.lastUpdated || 'January 2025';

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex h-8 items-center gap-3 px-6 py-2.5 bg-[#06b5cc]/10 border border-[#06b5cc]/20 rounded-full mb-8 mx-auto mt-4 hover:bg-[#06b5cc]/15 transition-colors duration-300">
              <FileText className="w-6 h-6 text-[#06b5cc]" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#06b5cc]">Terms Of Service</span>
            </div>
            <h1 className="mb-4">Terms and Conditions</h1>
            <p className="text-[#94A3B8]">Last Updated: {lastUpdated}</p>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto p-6 space-y-4">
            {termsContent ? (
              <section className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-8">
                <div
                  className="text-[#94A3B8] leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: termsContent }}
                />
              </section>
            ) : (
              <section className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
                  <FileText className="w-8 h-8 text-[#94A3B8]" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">No Content Available</h2>
                <p className="text-[#94A3B8]">
                  The terms of service content has not been added yet. Please configure it from the admin dashboard.
                </p>
              </section>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
