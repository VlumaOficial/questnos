/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Supabase (obrigatórias)
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  
  // Configurações da empresa (opcionais)
  readonly VITE_COMPANY_NAME?: string;
  readonly VITE_COMPANY_LOGO?: string;
  readonly VITE_COMPANY_FAVICON?: string;
  
  // Cores da marca (opcionais)
  readonly VITE_PRIMARY_COLOR?: string;
  readonly VITE_SECONDARY_COLOR?: string;
  readonly VITE_ACCENT_COLOR?: string;
  
  // Contato (opcionais)
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_COMPANY_ADDRESS?: string;
  readonly VITE_COMPANY_WEBSITE?: string;
  
  // Informações legais (opcionais)
  readonly VITE_COMPANY_CNPJ?: string;
  readonly VITE_LEGAL_COMPANY_NAME?: string;
  readonly VITE_TERMS_URL?: string;
  readonly VITE_PRIVACY_URL?: string;
  
  // Features (opcionais)
  readonly VITE_FEATURE_QUESTIONNAIRE?: string;
  readonly VITE_FEATURE_ADMIN?: string;
  readonly VITE_FEATURE_REPORTS?: string;
  readonly VITE_FEATURE_PRESENTATION?: string;
  readonly VITE_FEATURE_ABOUT?: string;
  
  // Textos personalizáveis (opcionais)
  readonly VITE_HERO_TITLE?: string;
  readonly VITE_HERO_SUBTITLE?: string;
  readonly VITE_TAGLINE?: string;
  readonly VITE_DESCRIPTION?: string;
  
  // Licenciamento (opcionais)
  readonly VITE_CLIENT_ID?: string;
  readonly VITE_ALLOWED_DOMAINS?: string;
  readonly VITE_LICENSE_SERVER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
