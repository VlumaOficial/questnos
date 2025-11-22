# 🔐 CONFIGURAÇÕES E CREDENCIAIS - VLUMA RH

**⚠️ DOCUMENTO CONFIDENCIAL ⚠️**  
**Data:** 21/11/2025  
**Projeto:** Sistema White-Label VLUMA RH

---

## 🏢 INFORMAÇÕES DA EMPRESA

### **VLUMA RH**
- **Nome oficial:** VLUMA Tecnologia Ltda
- **Email principal:** contato@vluma.com.br
- **Website:** vluma.com.br
- **Telefone:** (11) 0000-0000
- **Endereço:** São Paulo, SP
- **CNPJ:** 00.000.000/0001-00

### **Branding:**
- **Tagline:** "Onde a tecnologia encontra o humano no RH"
- **Proposta:** Transformar negócios através de IA e automação
- **Foco:** RH com Inteligência Artificial

---

## 🎨 IDENTIDADE VISUAL

### **Logo:**
- **Arquivo:** `public/vluma-logo.png`
- **Formato:** PNG com transparência
- **Uso:** Cabeçalho, login, documentos

### **Paleta de Cores Oficial:**
```css
/* Cores extraídas da logo oficial */
--primary: #FF6B35;    /* Laranja principal */
--secondary: #1B365D;  /* Azul escuro */
--accent: #FF7A4D;     /* Laranja claro */
```

### **Aplicação das Cores:**
- **Primary (#FF6B35):** Botões principais, elementos de destaque
- **Secondary (#1B365D):** Textos, backgrounds, elementos secundários
- **Accent (#FF7A4D):** Hover states, highlights, acentos

---

## 🔑 CREDENCIAIS DO SISTEMA

### **Admin Padrão:**
- **Email:** `admin@vluma.com.br`
- **Senha:** `VlumaAdmin2024!`
- **Permissões:** Completas (todos os módulos)
- **Criação:** Automática via script

### **Script de Criação:**
```bash
# Comando para criar admin automaticamente
npm run create-admin

# Arquivo do script
scripts/create-admin.js
```

### **Permissões do Admin:**
```json
{
  "branding": true,
  "questionnaire": true,
  "users": true,
  "reports": true,
  "settings": true
}
```

---

## 🌐 CONFIGURAÇÕES DE DEPLOY

### **Vercel:**
- **URL:** https://questnos-j9ot.vercel.app/
- **Repositório:** https://github.com/VlumaOficial/whitelabelquestRH
- **Branch:** main
- **Auto-deploy:** Ativado

### **Variáveis de Ambiente (.env.local):**
```env
# Supabase
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role

# Branding
VITE_COMPANY_NAME=VLUMA RH
VITE_COMPANY_LOGO=/vluma-logo.png
VITE_PRIMARY_COLOR=#FF6B35
VITE_SECONDARY_COLOR=#1B365D
VITE_ACCENT_COLOR=#FF7A4D

# Contato
VITE_CONTACT_EMAIL=contato@vluma.com.br
VITE_CONTACT_PHONE=(11) 0000-0000
VITE_COMPANY_ADDRESS=São Paulo, SP
VITE_COMPANY_WEBSITE=vluma.com.br

# Legal
VITE_COMPANY_CNPJ=00.000.000/0001-00
VITE_LEGAL_COMPANY_NAME=VLUMA Tecnologia Ltda

# Branding Texts
VITE_HERO_TITLE=Transforme sua gestão de pessoas com IA
VITE_HERO_SUBTITLE=Automação inteligente e processos humanizados para revolucionar o RH da sua empresa.
VITE_TAGLINE=Onde a tecnologia encontra o humano no RH
VITE_DESCRIPTION=Plataforma de RH com Inteligência Artificial da VLUMA. Automatize processos, humanize relacionamentos e transforme a gestão de pessoas da sua empresa.
```

---

## 🗄️ CONFIGURAÇÕES DO BANCO DE DADOS

### **Supabase - Estrutura Principal:**

#### **Tabela: profiles**
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);
```

#### **Tabela: branding_config**
```sql
CREATE TABLE branding_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT,
  tagline TEXT,
  description TEXT,
  logo_url TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  accent_color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🚀 COMANDOS IMPORTANTES

### **Desenvolvimento:**
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Criar admin automaticamente
npm run create-admin

# Build para produção
npm run build

# Preview da build
npm run preview
```

### **Deploy:**
```bash
# Build e deploy automático (via Vercel)
git push origin main

# Build manual
npm run build:client
```

### **Manutenção:**
```bash
# Gerar políticas do Supabase
npm run generate-policies

# Executar testes
npm run test

# Lint do código
npm run lint
```

---

## 📁 ESTRUTURA DE ARQUIVOS IMPORTANTES

### **Configurações:**
- `src/config/client.ts` - Configurações centralizadas
- `src/services/brandingService.ts` - Serviços de branding
- `src/types/database.ts` - Tipos do banco de dados

### **Páginas Principais:**
- `src/pages/Index.tsx` - Página inicial
- `src/pages/Login.tsx` - Tela de login
- `src/pages/AdminDashboard.tsx` - Dashboard admin
- `src/pages/AdminBranding.tsx` - Configurações de branding

### **Componentes:**
- `src/components/layout/Header.tsx` - Cabeçalho
- `src/components/layout/Hero.tsx` - Seção principal
- `src/components/layout/Footer.tsx` - Rodapé

### **Scripts:**
- `scripts/create-admin.js` - Criação automática de admin
- `scripts/generate-policies.js` - Geração de políticas

---

## 🔒 SEGURANÇA

### **Autenticação:**
- **Supabase Auth** integrado
- **JWT tokens** para sessões
- **Row Level Security** (RLS) ativado
- **Políticas** de acesso por perfil

### **Permissões por Módulo:**
```javascript
const PERMISSIONS = {
  admin: {
    branding: true,
    questionnaire: true,
    users: true,
    reports: true,
    settings: true
  },
  manager: {
    branding: false,
    questionnaire: true,
    users: false,
    reports: true,
    settings: false
  },
  user: {
    branding: false,
    questionnaire: false,
    users: false,
    reports: false,
    settings: false
  }
};
```

---

## 📊 MONITORAMENTO

### **Métricas Importantes:**
- **Usuários ativos** por mês
- **Tempo de resposta** da aplicação
- **Taxa de erro** nas requisições
- **Uso por módulo** (licenciamento)

### **Logs:**
- **Supabase Dashboard** - Logs do banco
- **Vercel Analytics** - Métricas de performance
- **Console do navegador** - Erros frontend

---

## 🔄 BACKUP E RECUPERAÇÃO

### **Backup Automático:**
- **Código:** Git + GitHub (diário)
- **Banco de dados:** Supabase (automático)
- **Assets:** Vercel (automático)

### **Recuperação:**
- **Código:** `git clone` do repositório
- **Banco:** Export/Import via Supabase
- **Deploy:** Reconexão automática Vercel

---

## 📞 SUPORTE E CONTATOS

### **Técnico:**
- **Desenvolvedor:** Equipe Vluma
- **Suporte Supabase:** https://supabase.com/support
- **Suporte Vercel:** https://vercel.com/support

### **Comercial:**
- **Email:** contato@vluma.com.br
- **Vendas:** Equipe comercial Vluma
- **Parcerias:** Programa de parceiros

---

## ⚠️ NOTAS IMPORTANTES

### **Segurança:**
- **NUNCA** compartilhar credenciais em repositórios públicos
- **Sempre** usar variáveis de ambiente para dados sensíveis
- **Alterar** senha padrão do admin após primeiro acesso

### **Manutenção:**
- **Atualizar** dependências mensalmente
- **Monitorar** logs de erro regularmente
- **Fazer backup** antes de grandes mudanças

### **Comercial:**
- **Documentar** todas as customizações por cliente
- **Manter** versionamento para diferentes implementações
- **Validar** licenças por módulo

---

**⚠️ Este documento contém informações confidenciais. Mantenha seguro e acessível apenas para a equipe autorizada.**

*Última atualização: 21/11/2025 - 22:09 UTC-03:00*
