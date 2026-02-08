import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';


const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function ContactUsPage() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen py-10 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex h-8 items-center gap-3 px-6 py-2.5 bg-[#06b5cc]/10 border border-[#06b5cc]/20 rounded-full mb-8 mx-auto mt-4 hover:bg-[#06b5cc]/15 transition-colors duration-300">
              <Mail className="w-6 h-6 text-[#06b5cc]" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#06b5cc]">Get In Touch</span>
            </div>
            <h1 className="mb-4 text-gradient-cyan">Contact Us</h1>
            {settings.support?.description ? (
              <p className="text-gray-800 text-lg max-w-2xl mx-auto">
                {settings.support.description}
              </p>
            ) : (
              <p className="text-gray-800 text-lg max-w-2xl mx-auto italic">
                Contact page description is not configured. Please add this content from the admin dashboard.
              </p>
            )}
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Address Card */}
            <div className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#06b5cc]/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#06b5cc]/10 border border-[#06b5cc]/30 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#06b5cc]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Location</h3>
                  {settings.contact?.address ? (
                    <p className="text-[#94A3B8] leading-relaxed text-sm">
                      {settings.contact.address}
                    </p>
                  ) : (
                    <p className="text-[#94A3B8] leading-relaxed italic text-sm">
                      Address is not configured.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#06b5cc]/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#06b5cc]/10 border border-[#06b5cc]/30 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#06b5cc]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Support Email</h3>
                  {settings.contact?.supportEmail ? (
                    <a
                      href={`mailto:${settings.contact.supportEmail}`}
                      className="text-[#94A3B8] hover:text-[#06b5cc] transition-colors text-sm break-all"
                    >
                      {settings.contact.supportEmail}
                    </a>
                  ) : (
                    <p className="text-[#94A3B8] italic text-sm">Email is not configured.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#06b5cc]/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#06b5cc]/10 border border-[#06b5cc]/30 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#06b5cc]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phone Number</h3>
                  {settings.contact?.phone ? (
                    <a
                      href={`tel:${settings.contact.phone.replace(/\s/g, '')}`}
                      className="text-[#94A3B8] hover:text-[#06b5cc] transition-colors text-sm"
                    >
                      {settings.contact.phone}
                    </a>
                  ) : (
                    <p className="text-[#94A3B8] italic text-sm">Phone is not configured.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="bg-gradient-to-br from-[#11282b]/30 to-[#0a1f22]/30 border border-[#06b5cc]/30 rounded-2xl p-6 md:p-8 mb-6 shadow-xl shadow-[#06b5cc]/5">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Get in Touch</h2>
            <p className="text-gray-800 text-center leading-relaxed max-w-2xl mx-auto">
              Whether you have questions about our courses, need technical support,
              or are interested in partnering with us, we're here to help.
              Our team is committed to providing you with the best educational experience possible.
            </p>
          </div>
          {/* Business Hours */}
          <div className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Support Hours</h3>
            <div className="space-y-3 text-center">
              {settings.contact?.businessHours?.weekdays ? (
                <p className="text-[#94A3B8]">
                  <span className="text-[#EADADA] font-semibold">Weekdays:</span> {settings.contact.businessHours.weekdays}
                </p>
              ) : (
                <p className="text-[#94A3B8] italic">Business hours (weekdays) are not configured.</p>
              )}
              {settings.contact?.businessHours?.weekends ? (
                <p className="text-[#94A3B8]">
                  <span className="text-[#EADADA] font-semibold">Weekends:</span> {settings.contact.businessHours.weekends}
                </p>
              ) : (
                <p className="text-[#94A3B8] italic">Business hours (weekends) are not configured.</p>
              )}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="bg-gradient-to-br from-[#111113] to-[#111113]/50 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Follow Us</h3>
            <div className="flex justify-center gap-6">
              {settings.contact?.socialLinks?.instagram && (
                <a
                  href={settings.contact.socialLinks.instagram.startsWith('http') ? settings.contact.socialLinks.instagram : `https://instagram.com/${settings.contact.socialLinks.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#94A3B8] group-hover:text-[#06b5cc] group-hover:border-[#06b5cc]/30 group-hover:shadow-[0_0_20px_rgba(6,181,204,0.1)] transition-all duration-300">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <span className="text-sm text-[#94A3B8] group-hover:text-white transition-colors">Instagram</span>
                </a>
              )}
              {settings.contact?.socialLinks?.facebook && (
                <a
                  href={settings.contact.socialLinks.facebook.startsWith('http') ? settings.contact.socialLinks.facebook : `https://facebook.com/${settings.contact.socialLinks.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#94A3B8] group-hover:text-[#06b5cc] group-hover:border-[#06b5cc]/30 group-hover:shadow-[0_0_20px_rgba(6,181,204,0.1)] transition-all duration-300">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <span className="text-sm text-[#94A3B8] group-hover:text-white transition-colors">Facebook</span>
                </a>
              )}
              {settings.contact?.socialLinks?.whatsapp && (
                <a
                  href={settings.contact.socialLinks.whatsapp.startsWith('http') ? settings.contact.socialLinks.whatsapp : `https://wa.me/${settings.contact.socialLinks.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#94A3B8] group-hover:text-[#06b5cc] group-hover:border-[#06b5cc]/30 group-hover:shadow-[0_0_20px_rgba(6,181,204,0.1)] transition-all duration-300">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <span className="text-sm text-[#94A3B8] group-hover:text-white transition-colors">WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

