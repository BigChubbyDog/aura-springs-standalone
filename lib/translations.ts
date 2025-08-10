export const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.booking': 'Book Now',
    'nav.about': 'About',
    'nav.team': 'Our Team',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Aura Spring Cleaning',
    'hero.subtitle': 'Transform your space into a sanctuary of cleanliness. Serving Austin\'s finest homes since 2018.',
    'hero.cta.quote': 'Get Instant Quote',
    'hero.cta.call': 'Call',
    
    // Services
    'services.house': 'House Cleaning',
    'services.deep': 'Deep Cleaning',
    'services.move': 'Move In/Out',
    'services.airbnb': 'Airbnb Cleaning',
    'services.commercial': 'Commercial',
    'services.construction': 'Post Construction',
    
    // Booking
    'booking.title': 'Book Your Cleaning Service',
    'booking.online': 'Online Booking',
    'booking.call': 'Call Now',
    'booking.quote': 'Get Quote First',
    
    // Footer
    'footer.about': 'About Us',
    'footer.services': 'Our Services',
    'footer.contact': 'Contact Info',
    'footer.hours': 'Business Hours',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.accessibility': 'Accessibility',
    
    // Common
    'common.from': 'From',
    'common.learnMore': 'Learn More',
    'common.bookNow': 'Book Now',
    'common.contactUs': 'Contact Us',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.success': 'Success!',
  },
  
  es: {
    // Header
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.booking': 'Reservar',
    'nav.about': 'Nosotros',
    'nav.team': 'Nuestro Equipo',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.title': 'Aura Spring Cleaning',
    'hero.subtitle': 'Transformamos tu espacio en un santuario de limpieza. Sirviendo a los mejores hogares de Austin desde 2018.',
    'hero.cta.quote': 'Cotización Instantánea',
    'hero.cta.call': 'Llamar',
    
    // Services
    'services.house': 'Limpieza de Casa',
    'services.deep': 'Limpieza Profunda',
    'services.move': 'Mudanza',
    'services.airbnb': 'Limpieza Airbnb',
    'services.commercial': 'Comercial',
    'services.construction': 'Post Construcción',
    
    // Booking
    'booking.title': 'Reserve Su Servicio de Limpieza',
    'booking.online': 'Reserva en Línea',
    'booking.call': 'Llamar Ahora',
    'booking.quote': 'Obtener Cotización',
    
    // Footer
    'footer.about': 'Acerca de Nosotros',
    'footer.services': 'Nuestros Servicios',
    'footer.contact': 'Información de Contacto',
    'footer.hours': 'Horario',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.accessibility': 'Accesibilidad',
    
    // Common
    'common.from': 'Desde',
    'common.learnMore': 'Más Información',
    'common.bookNow': 'Reservar Ahora',
    'common.contactUs': 'Contáctanos',
    'common.loading': 'Cargando...',
    'common.error': 'Algo salió mal',
    'common.success': '¡Éxito!',
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;