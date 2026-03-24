// src/shared/components/Footer/Footer.tsx
import { useTranslation } from '@/i18n';
import { images, svgs } from '@/mediaRoutes';

const Footer = () => {
  const { t } = useTranslation('footer');   // ← cambiamos de 'common' a 'footer'
  const year = new Date().getFullYear();

  const NAV_ITEMS = [
    { href: "#home", label: t('home') },
    { href: "#about-us", label: t('about_us') },
    { href: "#products", label: t('products') },
    { href: "#stores", label: t('stores') },
    { href: "#premium-select", label: t('premium_select') },
    { href: "#home-service", label: t('home_service') },
  ];
  
  const SOCIALS = [
    { href: "https://facebook.com/myfriend", icon: svgs.fbIcon, label: "Facebook", color: "from-blue-600 to-blue-700" },
    { href: "https://tiktok.com/@myfriend", icon: svgs.tiktokIcon, label: "TikTok", color: "from-black to-gray-800" },
    { href: "https://instagram.com/myfriend", icon: svgs.igIcon, label: "Instagram", color: "from-pink-500 via-purple-500 to-orange-500" },
  ];

  const LUXE_BRANDS = [
    { href: "https://www.myfriend.mx/luxe-island", image: images.li_boutique, alt: "Luxe Island Boutique", label: "Boutique" },
    { href: "https://luxeisland.mx/", image: images.li_jewelry, alt: "Luxe Island Jewelry", label: "Jewelry" },
  ];

  const CONTACT = {
    email: "hola@myfriend.com",
    phone: "+52 (984) 123-4567",
  };

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <img src={images.mfLogo} alt="MyFriend" className="h-12 w-auto" />
            <p className="text-sm text-neutral-300 leading-relaxed max-w-xs">
              {t('footer_description')}
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-color">
              {t('navigation')}
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {NAV_ITEMS.map(item => (
                <a key={item.href} href={item.href} className="text-sm text-neutral-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto y redes */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-color">
              {t('contact')}
            </h4>
            <div className="space-y-2 mb-6">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors group">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{CONTACT.email}</span>
              </a>
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors group">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{CONTACT.phone}</span>
              </a>
            </div>

            <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-primary-color">
              {t('follow_us')}
            </h4>
            <div className="flex gap-3 mb-6">
              {SOCIALS.map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg`}
                  aria-label={social.label}>
                  <img src={social.icon} alt="" className="w-5 h-5 filter brightness-0 invert" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/20">
              <h4 className="text-xs font-medium uppercase tracking-wider text-primary-color mb-3">
                {t('our_brands')}
              </h4>
              <div className="flex items-center gap-4">
                {LUXE_BRANDS.map(brand => (
                  <a key={brand.alt} href={brand.href} target="_blank" rel="noopener noreferrer" className="group relative" aria-label={brand.alt}>
                    <img src={brand.image} alt={brand.alt} className="h-10 w-auto opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105" />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-primary-color opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {brand.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/70">
          <p>© {year} MyFriend. {t('all_rights_reserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;