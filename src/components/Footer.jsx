import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { Instagram, Facebook } from 'lucide-react';
import Logo from './Logo';


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

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useSettings();

  const scrollWithOffset = sectionId => {
    if (typeof window === 'undefined') return;
    const target = document.getElementById(sectionId);
    if (target) {
      const offset = 96;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: y >= 0 ? y : 0,
        behavior: 'smooth',
      });
      return true;
    }
    return false;
  };

  const handleNavClick = (event, link) => {
    event.preventDefault();

    if (location.pathname === link.path) {
      if (link.sectionId) {
        const scrolled = scrollWithOffset(link.sectionId);
        if (!scrolled && link.fallbackTop) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (link.fallbackTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(
        link.path,
        link.sectionId ? { state: { targetSection: link.sectionId } } : undefined,
      );
    }
  };

  return (
    <>
      <style>{`
        .footer-main-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .footer-links-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        
        @media (min-width: 768px) {
          .footer-main-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
          
          .footer-links-container {
            display: contents;
          }
        }
      `}</style>
      <footer className="relative bg-gradient-to-b from-[#111113] to-[#0B0B0D] border-t border-white/15 mt-20 text-white/90">
        {/* Subtle math background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,20 50,50 T100,50" stroke="currentColor" fill="none" strokeWidth="0.5" />
            <circle cx="20" cy="30" r="5" stroke="currentColor" fill="none" strokeWidth="0.5" />
            <circle cx="80" cy="70" r="5" stroke="currentColor" fill="none" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="footer-main-container mb-8 text-center">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Logo className="w-22 h-20 mb-4" />
              {settings.footer?.tagline || settings.branding?.tagline ? (
                <p className="text-[#94A3B8] text-sm">
                  {settings.footer?.tagline || settings.branding?.tagline}
                </p>
              ) : (
                <p className="text-[#94A3B8] text-sm italic">Footer tagline is not configured. Please add this from the admin dashboard.</p>
              )}
            </div>

            {/* Quick Links and Legal Container */}
            <div className="footer-links-container">
              {/* Quick Links */}
              <div className="flex flex-col items-center">
                <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                <div className="space-y-2">
                  {settings.footer?.quickLinks?.length > 0 ? (
                    settings.footer.quickLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.path}
                        onClick={() => window.scrollTo(0, 0)}
                        className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center"
                      >
                        {link.label}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link to="/subjects" onClick={() => window.scrollTo(0, 0)} className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center">Subjects</Link>
                      <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center">About</Link>
                      <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center">Contact</Link>
                      <Link to="/pricing" onClick={() => window.scrollTo(0, 0)} className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center">Pricing</Link>
                      <Link to="/sample-content" onClick={() => window.scrollTo(0, 0)} className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center">Sample Content</Link>
                    </>
                  )}
                </div>
              </div>

              {/* Legal */}
              <div className="flex flex-col items-center">
                <h3 className="mb-4 text-lg font-semibold">Legal</h3>
                <div className="space-y-2">
                  {settings.footer?.legalLinks?.length > 0 ? (
                    settings.footer.legalLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.path}
                        onClick={() => window.scrollTo(0, 0)}
                        className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center"
                      >
                        {link.label}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center">Privacy Policy</Link>
                      <Link to="/refund-policy" onClick={() => window.scrollTo(0, 0)} className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center">Refund Policy</Link>
                      <Link to="/terms-of-service" onClick={() => window.scrollTo(0, 0)} className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center">Terms of Service</Link>
                      <Link to="/support" onClick={() => window.scrollTo(0, 0)} className="block text-[#94A3B8] hover:text-white text-base transition-colors text-center">Support</Link>
                    </>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col items-center">
                <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
                <div className="flex gap-4">
                  {settings.contact?.socialLinks?.instagram && (
                    <a
                      href={settings.contact.socialLinks.instagram.startsWith('http') ? settings.contact.socialLinks.instagram : `https://instagram.com/${settings.contact.socialLinks.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#94A3B8] hover:text-[#06b5cc] hover:border-[#06b5cc]/30 transition-all duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {settings.contact?.socialLinks?.facebook && (
                    <a
                      href={settings.contact.socialLinks.facebook.startsWith('http') ? settings.contact.socialLinks.facebook : `https://facebook.com/${settings.contact.socialLinks.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#94A3B8] hover:text-[#06b5cc] hover:border-[#06b5cc]/30 transition-all duration-300"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {settings.contact?.socialLinks?.whatsapp && (
                    <a
                      href={settings.contact.socialLinks.whatsapp.startsWith('http') ? settings.contact.socialLinks.whatsapp : `https://wa.me/${settings.contact.socialLinks.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#94A3B8] hover:text-[#06b5cc] hover:border-[#06b5cc]/30 transition-all duration-300"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                    </a>
                  )}
                  {(!settings.contact?.socialLinks?.instagram && !settings.contact?.socialLinks?.facebook && !settings.contact?.socialLinks?.whatsapp) && (
                    <p className="text-[#94A3B8] text-sm italic">No social links configured.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center text-[#94A3B8] text-base">
              {settings.footer?.copyrightText || settings.branding?.platformName ? (
                <p>&copy; {new Date().getFullYear()} {settings.footer?.copyrightText || settings.branding?.platformName}</p>
              ) : (
                <p className="italic">Copyright text is not configured. Please add this from the admin dashboard.</p>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}