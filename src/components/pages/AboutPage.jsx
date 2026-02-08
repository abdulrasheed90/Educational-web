import { motion } from 'motion/react';
import { BookOpen, Target, Award, Users } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import * as LucideIcons from 'lucide-react';

export default function AboutPage() {
  const { settings } = useSettings();

  // Get feature cards from settings - NO FALLBACKS
  const featureCards = (settings.about?.featureCards || []).map(card => {
    const IconComponent = LucideIcons[card.icon] || BookOpen;
    return { ...card, IconComponent };
  }).filter(card => card.title || card.description); // Only show cards with content

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
              <BookOpen className="w-6 h-6 text-[#06b5cc]" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#06b5cc]">Know Our Story</span>
            </div>
            {settings.about?.title ? (
              <h1 className="mb-4 text-gradient-cyan">{settings.about.title}</h1>
            ) : (
              <div className="mb-4 bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-[#94A3B8]">About page title is not configured. Please add this content from the admin dashboard.</p>
              </div>
            )}
            {settings.about?.subtitle ? (
              <p className="text-[#94A3B8]">{settings.about.subtitle}</p>
            ) : (
              <p className="text-[#94A3B8] italic">About page subtitle is not configured. Please add this content from the admin dashboard.</p>
            )}
          </div>

          {/* Content */}
          <div className="max-w-none p-0 md:p-6 space-y-4 md:space-y-6">
            {settings.about?.whoWeAre ? (
              <section className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#EADADA]">Who We Are</h2>
                <p className="text-[#94A3B8] leading-relaxed whitespace-pre-line">
                  {settings.about.whoWeAre}
                </p>
              </section>
            ) : (
              <section className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#EADADA]">Who We Are</h2>
                <p className="text-[#94A3B8] leading-relaxed italic">
                  "Who We Are" content is not configured. Please add this content from the admin dashboard.
                </p>
              </section>
            )}

            {settings.about?.whatWeOffer ? (
              <section className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#EADADA]">What We Offer</h2>
                <p className="text-[#94A3B8] leading-relaxed whitespace-pre-line">
                  {settings.about.whatWeOffer}
                </p>
              </section>
            ) : (
              <section className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#EADADA]">What We Offer</h2>
                <p className="text-[#94A3B8] leading-relaxed italic">
                  "What We Offer" content is not configured. Please add this content from the admin dashboard.
                </p>
              </section>
            )}

            {settings.about?.commitment ? (
              <section className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#EADADA]">Our Commitment</h2>
                <p className="text-[#94A3B8] leading-relaxed whitespace-pre-line">
                  {settings.about.commitment}
                </p>
              </section>
            ) : (
              <section className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#EADADA]">Our Commitment</h2>
                <p className="text-[#94A3B8] leading-relaxed italic">
                  "Our Commitment" content is not configured. Please add this content from the admin dashboard.
                </p>
              </section>
            )}

            {/* Features Grid */}
            {featureCards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {featureCards.map((card, index) => {
                  const Icon = card.IconComponent || BookOpen;
                  return (
                    <div key={index} className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6">
                      <div className="w-12 h-12 bg-[#06b5cc]/20 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#06b5cc]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                      <p className="text-[#94A3B8] text-sm">
                        {card.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8 text-center mt-8">
                <p className="text-[#94A3B8] text-lg mb-2">No feature cards available.</p>
                <p className="text-[#94A3B8] text-sm">Please add feature cards from the admin dashboard.</p>
              </div>
            )}

            {/* Call to Action */}
            <section className="bg-gradient-to-br from-[#11282b]/20 to-[#0a1f22]/20 border border-[#06b5cc]/30 rounded-2xl p-6 md:p-8 text-center mt-8 shadow-xl shadow-[#06b5cc]/5">
              <h2 className="text-2xl font-semibold mb-4">Ready to Excel in Mathematics?</h2>
              {settings.branding?.platformName ? (
                <p className="text-[#94A3B8] mb-6">
                  Join thousands of students who are achieving their academic goals with {settings.branding.platformName}
                </p>
              ) : (
                <p className="text-[#94A3B8] mb-6 italic">
                  Platform name is not configured. Please add platform name from the admin dashboard.
                </p>
              )}
              <a
                href="/signup"
                className="inline-block px-8 py-3 bg-primary-gradient rounded-xl transition-all duration-300 shadow-lg shadow-[#06b5cc]/10"
                style={{
                  borderRadius: '9999px',
                  fontWeight: '600',
                }}
              >
                Get Started
              </a>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

