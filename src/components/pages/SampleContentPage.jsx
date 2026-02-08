import { motion } from 'motion/react';
import { FileText, Calculator, TrendingUp, CheckCircle } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function SampleContentPage() {
  const { settings } = useSettings();
  const samples = settings.sampleContent?.samples || [];

  return (
    <div className="min-h-screen py-8 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex h-8 items-center gap-3 px-6 py-2.5 bg-[#06b5cc]/10 border border-[#06b5cc]/20 rounded-full mb-8 mx-auto mt-4 hover:bg-[#06b5cc]/15 transition-colors duration-300">
              <FileText className="w-6 h-6 text-[#06b5cc]" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#06b5cc]">Sample Content</span>
            </div>
            {settings.sampleContent?.title && <h1 className="text-4xl font-bold text-gradient-cyan mb-4">{settings.sampleContent.title}</h1>}
            {settings.sampleContent?.description && <p className="text-[#94A3B8]">{settings.sampleContent.description}</p>}
          </div>

          {/* Content */}
          <div className="max-w-none p-0 md:p-6 space-y-4 md:space-y-6">
            {/* Sample Questions */}
            <section className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-6 mb-6">
                <Calculator className="w-6 h-6 text-[#06b5cc]" />
                <h2 className="text-2xl font-semibold text-[#EADADA]">Sample Questions</h2>
              </div>

              <div className="space-y-6">
                {samples.length > 0 ? (
                  samples.map((sample, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {sample.topic ? `Question ${index + 1}: ${sample.topic}` : `Question ${index + 1}`}
                      </h3>
                      {sample.question && (
                        <div
                          className="text-[#94A3B8] mb-4"
                          dangerouslySetInnerHTML={{ __html: sample.question }}
                        />
                      )}
                      {sample.solution && (
                        <div className="bg-[#06b5cc]/10 border border-[#06b5cc]/30 rounded-lg p-4">
                          <p className="text-[#94A3B8] text-sm mb-2">Solution:</p>
                          <div
                            className="text-[#94A3B8]"
                            dangerouslySetInnerHTML={{ __html: sample.solution }}
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-[#94A3B8] py-12">
                    No sample content available. Please configure in admin settings.
                  </div>
                )}
              </div>
            </section>


            {/* Call to Action */}
            <section className="bg-gradient-to-br from-[#06b5cc]/10 to-[#EADADA]/10 border border-[#06b5cc]/30 rounded-2xl p-6 md:p-8 text-center shadow-xl shadow-[#06b5cc]/5">
              <h2 className="text-2xl font-semibold mb-4">Want to Access More Content?</h2>
              <p className="text-[#94A3B8] mb-6">
                Sign up today and get 6 free questions per topic, plus unlimited access with premium!
              </p>
              <a
                href="/signup"
                className="inline-block px-8 py-3 bg-primary-gradient rounded-xl transition-all duration-300"
                style={{
                  borderRadius: '30px',
                  fontWeight: '500',
                }}
              >
                Get Started
              </a>
            </section>
          </div>
        </motion.div>
      </div >
    </div >
  );
}

