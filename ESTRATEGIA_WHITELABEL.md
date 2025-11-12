# 🔐 ESTRATÉGIA WHITE-LABEL PROTEGIDA - QUEST NÓS

**Projeto:** Transformação MVP → White-label Protegido  
**Data:** 12 de Novembro de 2025  
**Objetivo:** Deploy seguro sem exposição de código fonte

---

## 📋 SITUAÇÃO ATUAL

### **Problemas Identificados:**
1. **Código Fonte Exposto** - Cliente teria acesso completo ao código React/TypeScript
2. **Hardcodes Presentes** - Branding "NÓS" fixo em vários componentes
3. **Documentação Sensível** - Arquivos .md com informações técnicas detalhadas
4. **Sem Controle de Licença** - Nenhuma validação de uso ou expiração
5. **Políticas Genéricas** - Termos e privacidade precisam ser personalizados

### **Arquivos com Hardcode Identificados:**
- `src/pages/About.tsx` - Nome "NÓS" e informações da empresa
- `src/components/layout/Header.tsx` - Logo e branding
- `src/components/layout/Footer.tsx` - Informações de contato
- `public/politica-de-privacidade.md` - Dados específicos da Quest Nós
- `public/termos-de-uso.md` - Informações da empresa
- `public/como-funciona.md` - Processo específico da NÓS

### **Documentação Sensível a Proteger:**
- `DOCUMENTACAO_PROJETO.md` - Detalhes técnicos completos
- `DATABASE_SETUP_COMPLETO.md` - Estrutura do banco e configurações
- `QUESTOES_COMPLETAS.md` - Todas as 281 questões mapeadas
- `CHANGELOG.md` - Histórico de mudanças e melhorias
- `AI_RULES.md` - Regras de desenvolvimento
- `APRESENTACAO_PESSOAL.md` - Especificações técnicas
- `Como Funciona.txt` - Processo interno da NÓS
- `Sobre.txt` - Informações da empresa
- Todos os arquivos `.sql` - Scripts de banco

---

## 🎯 ESTRATÉGIA COMPLETA

### **ARQUITETURA FINAL:**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   VERCEL        │    │  SUPABASE CLOUD  │    │  SERVIDOR DE    │
│   (Frontend)    │───▶│  (Database)      │◄───│  LICENÇAS       │
│                 │    │                  │    │  (Seu controle) │
│ • Build protegido│    │ • Projeto do     │    │                 │
│ • Obfuscado     │    │   cliente        │    │ • Validação     │
│ • Sem docs      │    │ • RLS ativado    │    │ • Renovação     │
│ • Licença check │    │ • Dados isolados │    │ • Monitoramento │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **VANTAGENS DESTA ARQUITETURA:**

#### **Para Você (Fornecedor):**
✅ **Controle total** do código fonte  
✅ **Servidor de licenças** sob seu domínio  
✅ **Monitoramento** de uso por cliente  
✅ **Renovações automáticas** de licença  
✅ **Escalabilidade** para múltiplos clientes  
✅ **Receita recorrente** garantida

#### **Para o Cliente:**
✅ **Infraestrutura própria** (Vercel + Supabase)  
✅ **Dados isolados** (segurança total)  
✅ **Performance otimizada** (CDN global)  
✅ **Custos previsíveis** (paga apenas o que usa)  
✅ **Compliance** (dados no próprio ambiente)  

---

## 🚀 IMPLEMENTAÇÃO POR FASES

### **FASE 1: PROTEÇÃO IMEDIATA (2-3 dias)**

#### **1.1 Build Protegido**
- ✅ Obfuscação avançada do JavaScript
- ✅ Minificação extrema dos assets
- ✅ Remoção completa de source maps
- ✅ Exclusão de documentação do build
- ✅ Dead code elimination

**Ferramentas:**
```bash
npm install --save-dev javascript-obfuscator
npm install --save-dev terser-webpack-plugin
npm install --save-dev webpack-bundle-analyzer
```

#### **1.2 Sistema de Licenciamento**
- ✅ Validação de domínio permitido
- ✅ Controle de expiração temporal
- ✅ Hardware fingerprint
- ✅ Servidor de licenças remoto
- ✅ Bloqueio automático em caso de violação

**Estrutura da Licença:**
```json
{
  "clientId": "cliente-001",
  "allowedDomains": ["cliente.com.br", "app-cliente.vercel.app"],
  "issuedAt": "2025-11-12T00:00:00Z",
  "expiresAt": "2025-12-31T23:59:59Z",
  "features": {
    "questionnaire": true,
    "admin": true,
    "reports": true,
    "personalPresentation": true
  },
  "limits": {
    "maxCandidates": 1000,
    "maxAdmins": 5
  },
  "fingerprint": "server_hash_unique"
}
```

#### **1.3 Remoção de Documentação Sensível**
Arquivos que **NÃO** irão para o cliente:
- `DOCUMENTACAO_PROJETO.md`
- `DATABASE_SETUP_COMPLETO.md`
- `QUESTOES_COMPLETAS.md`
- `CHANGELOG.md`
- `AI_RULES.md`
- `APRESENTACAO_PESSOAL.md`
- `Como Funciona.txt`
- `Sobre.txt`
- `create_admin_users.sql`
- `setup_git_deploy.md`
- Todos os arquivos `.sql`

### **FASE 2: SISTEMA WHITE-LABEL (3-4 dias)**

#### **2.1 Configuração Dinâmica**
```typescript
// src/config/client.ts
interface ClientConfig {
  company: {
    name: string;
    logo: string;
    favicon: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    contact: {
      email: string;
      phone: string;
      address: string;
      website: string;
    };
  };
  legal: {
    termsUrl: string;
    privacyUrl: string;
    companyDocument: string;
    companyName: string;
  };
  features: {
    questionnaire: boolean;
    admin: boolean;
    reports: boolean;
    personalPresentation: boolean;
  };
}

export const CLIENT_CONFIG: ClientConfig = {
  company: {
    name: process.env.VITE_COMPANY_NAME || 'Quest Nós',
    logo: process.env.VITE_COMPANY_LOGO || '/logo.png',
    favicon: process.env.VITE_COMPANY_FAVICON || '/favicon.svg',
    colors: {
      primary: process.env.VITE_PRIMARY_COLOR || '#8B5CF6',
      secondary: process.env.VITE_SECONDARY_COLOR || '#3B82F6',
      accent: process.env.VITE_ACCENT_COLOR || '#10B981'
    },
    contact: {
      email: process.env.VITE_CONTACT_EMAIL || 'contato@questnos.com',
      phone: process.env.VITE_CONTACT_PHONE || '(11) 0000-0000',
      address: process.env.VITE_COMPANY_ADDRESS || 'São Paulo, SP',
      website: process.env.VITE_COMPANY_WEBSITE || 'questnos.com'
    }
  },
  legal: {
    termsUrl: process.env.VITE_TERMS_URL || '/termos-de-uso.md',
    privacyUrl: process.env.VITE_PRIVACY_URL || '/politica-de-privacidade.md',
    companyDocument: process.env.VITE_COMPANY_CNPJ || '00.000.000/0001-00',
    companyName: process.env.VITE_LEGAL_COMPANY_NAME || 'Quest Nós Ltda'
  },
  features: {
    questionnaire: process.env.VITE_FEATURE_QUESTIONNAIRE !== 'false',
    admin: process.env.VITE_FEATURE_ADMIN !== 'false',
    reports: process.env.VITE_FEATURE_REPORTS !== 'false',
    personalPresentation: process.env.VITE_FEATURE_PRESENTATION !== 'false'
  }
};
```

#### **2.2 Branding Dinâmico**
- Sistema de temas CSS customizáveis
- Logos e favicons intercambiáveis
- Cores da marca via CSS variables
- Textos personalizáveis via configuração

**CSS Variables Dinâmicas:**
```css
:root {
  --color-primary: var(--client-primary, #8B5CF6);
  --color-secondary: var(--client-secondary, #3B82F6);
  --color-accent: var(--client-accent, #10B981);
}
```

#### **2.3 Políticas Personalizáveis**

**Template de Termos de Uso:**
```markdown
# Termos de Uso - {{COMPANY_NAME}}

**Última atualização:** {{LAST_UPDATE}}

## 1. Aceitação dos Termos

Ao acessar e utilizar a plataforma {{COMPANY_NAME}} ("Plataforma"), você concorda em cumprir e estar vinculado a estes Termos de Uso.

## 11. Contato

Para dúvidas sobre estes termos:

**E-mail:** {{CONTACT_EMAIL}}  
**Telefone:** {{CONTACT_PHONE}}  
**CNPJ:** {{COMPANY_DOCUMENT}}

---

**{{LEGAL_COMPANY_NAME}}**
```

**Template de Política de Privacidade:**
```markdown
# Política de Privacidade - {{COMPANY_NAME}}

**Última atualização:** {{LAST_UPDATE}}

## 1. Introdução

A {{COMPANY_NAME}} ("nós", "nosso" ou "nossa") respeita sua privacidade e está comprometida em proteger seus dados pessoais.

## 11. Contato

Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:

**E-mail:** {{CONTACT_EMAIL}}  
**Encarregado de Dados (DPO):** dpo@{{COMPANY_DOMAIN}}  
**Telefone:** {{CONTACT_PHONE}}

---

**{{LEGAL_COMPANY_NAME}} - CNPJ: {{COMPANY_DOCUMENT}}**
```

**Sistema de Substituição:**
```typescript
const generateLegalDocument = (template: string, clientData: ClientConfig) => {
  return template
    .replace(/{{COMPANY_NAME}}/g, clientData.company.name)
    .replace(/{{LEGAL_COMPANY_NAME}}/g, clientData.legal.companyName)
    .replace(/{{CONTACT_EMAIL}}/g, clientData.company.contact.email)
    .replace(/{{CONTACT_PHONE}}/g, clientData.company.contact.phone)
    .replace(/{{COMPANY_DOCUMENT}}/g, clientData.legal.companyDocument)
    .replace(/{{COMPANY_DOMAIN}}/g, clientData.company.contact.website)
    .replace(/{{LAST_UPDATE}}/g, new Date().toLocaleDateString('pt-BR'));
};
```

### **FASE 3: DEPLOY E DOCUMENTAÇÃO (1-2 dias)**

#### **3.1 Pacote de Deploy**
```
cliente-questnos/
├── .env.example              # Variáveis necessárias
├── vercel.json              # Configuração Vercel
├── client-config.json       # Configuração do cliente
├── dist/                    # Build protegido
│   ├── assets/             # Assets obfuscados
│   └── index.html          # HTML minificado
├── legal-templates/         # Templates de políticas
│   ├── termos-template.md
│   └── privacidade-template.md
├── assets/                  # Assets personalizáveis
│   ├── logo-placeholder.png
│   └── favicon-placeholder.svg
├── supabase/               # Scripts SQL mínimos
│   └── setup-basic.sql     # Setup básico do banco
└── README-DEPLOY.md        # Instruções simples
```

#### **3.2 Documentação para Cliente**

**Incluída (Simplificada):**
- ✅ Como fazer deploy no Vercel
- ✅ Como configurar Supabase Cloud
- ✅ Variáveis de ambiente necessárias
- ✅ Como personalizar branding
- ✅ Como configurar políticas legais
- ✅ Troubleshooting básico

**Excluída (Protegida):**
- ❌ Detalhes técnicos da implementação
- ❌ Documentação de desenvolvimento
- ❌ Estrutura completa do banco de dados
- ❌ Lógica de negócio interna
- ❌ Histórico de mudanças
- ❌ Regras de desenvolvimento

---

## 🔧 SOLUÇÃO PARA HARDCODES

### **ESTRATÉGIA: PRESERVAR + DINAMIZAR**

#### **1. Componentes a Modificar:**

**src/pages/About.tsx:**
```typescript
import { CLIENT_CONFIG } from '@/config/client';

// Substituir hardcodes:
// "Sobre a NÓS" → `Sobre a ${CLIENT_CONFIG.company.name}`
// "privacidade@questnos.com" → CLIENT_CONFIG.company.contact.email
```

**src/components/layout/Header.tsx:**
```typescript
import { CLIENT_CONFIG } from '@/config/client';

// Substituir hardcodes:
// Logo fixo → <img src={CLIENT_CONFIG.company.logo} />
// Nome da empresa → CLIENT_CONFIG.company.name
```

**src/components/layout/Footer.tsx:**
```typescript
import { CLIENT_CONFIG } from '@/config/client';

// Substituir hardcodes:
// Informações de contato → CLIENT_CONFIG.company.contact
// Links legais → CLIENT_CONFIG.legal
```

#### **2. Políticas Legais Dinâmicas:**

**public/politica-de-privacidade.md → Template:**
- Substituir "Quest Nós" por {{COMPANY_NAME}}
- Substituir "privacidade@questnos.com" por {{CONTACT_EMAIL}}
- Substituir "(11) 0000-0000" por {{CONTACT_PHONE}}

**public/termos-de-uso.md → Template:**
- Substituir informações específicas por variáveis
- Manter estrutura legal válida
- Personalizar dados de contato

#### **3. Sistema de Temas CSS:**
```css
/* Cores dinâmicas */
:root {
  --color-primary: var(--client-primary, #8B5CF6);
  --color-secondary: var(--client-secondary, #3B82F6);
  --color-accent: var(--client-accent, #10B981);
}

/* Aplicação nos componentes */
.btn-primary {
  background-color: var(--color-primary);
}

.text-brand {
  color: var(--color-primary);
}
```

---

## 🛡️ SISTEMA DE LICENCIAMENTO

### **Validação Multi-Camada:**

#### **1. Licença de Domínio**
```typescript
const validateDomain = () => {
  const currentDomain = window.location.hostname;
  const allowedDomains = license.allowedDomains;
  
  if (!allowedDomains.includes(currentDomain)) {
    throw new Error('Domínio não autorizado');
  }
};
```

#### **2. Licença Temporal**
```typescript
const validateExpiration = () => {
  const now = new Date();
  const expiresAt = new Date(license.expiresAt);
  
  if (now > expiresAt) {
    throw new Error('Licença expirada');
  }
};
```

#### **3. Hardware Fingerprint**
```typescript
const generateFingerprint = () => {
  const factors = [
    navigator.userAgent,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    navigator.language,
    navigator.platform
  ];
  return btoa(factors.join('|'));
};
```

#### **4. Servidor de Licenças (Seu Controle)**
```typescript
// API endpoint sob seu controle
const validateLicense = async (clientId: string, fingerprint: string) => {
  const response = await fetch('https://seu-servidor.com/api/validate-license', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId, fingerprint })
  });
  
  if (!response.ok) {
    throw new Error('Licença inválida');
  }
  
  return response.json();
};
```

---

## 📦 FERRAMENTAS E TECNOLOGIAS

### **Proteção de Código:**
- `javascript-obfuscator` - Ofuscação avançada
- `terser-webpack-plugin` - Minificação extrema
- `webpack-bundle-analyzer` - Otimização de bundle
- Custom build scripts - Remoção de documentação

### **Licenciamento:**
- `node-rsa` - Criptografia de licenças
- `jsonwebtoken` - Tokens seguros
- `crypto-js` - Hash e validação
- API própria - Servidor de licenças

### **White-label:**
- CSS Variables - Temas dinâmicos
- Environment Variables - Configuração
- Template Engine - Políticas personalizadas
- Asset Management - Logos e favicons

---

## 🚀 PROGRESSO DA IMPLEMENTAÇÃO

### **✅ ETAPAS CONCLUÍDAS:**

#### **Etapa 1: Sistema de Configuração Centralizada**
- ✅ **src/config/client.ts** - Configuração dinâmica com fallbacks
- ✅ **.env.client.example** - Template de variáveis de ambiente
- ✅ **src/env.d.ts** - Tipos TypeScript completos
- ✅ **src/main.tsx** - Aplicação automática de tema
- ✅ **src/globals.css** - Variáveis CSS dinâmicas

#### **Etapa 2: Remoção de Hardcodes**
- ✅ **Header.tsx** - Logo, nome e tagline dinâmicos
- ✅ **Footer.tsx** - Branding e contato personalizáveis
- ✅ **About.tsx** - Título e descrição dinâmicos
- ✅ **Classes CSS** - .text-gradient-brand, .bg-gradient-brand

#### **Etapa 3: Templates de Políticas Personalizáveis**
- ✅ **templates/termos-de-uso-template.md** - Template completo com variáveis
- ✅ **templates/politica-de-privacidade-template.md** - Template LGPD compliant
- ✅ **src/utils/policyGenerator.ts** - Sistema de geração automática
- ✅ **scripts/generate-policies.js** - Script de build integrado
- ✅ **src/components/PolicyViewer.tsx** - Componente de visualização
- ✅ **package.json** - Scripts atualizados para build

#### **Etapa 4: Build Protegido com Obfuscação**
- ✅ **vite.config.protected.ts** - Configuração Vite para build protegido
- ✅ **scripts/build-protected.js** - Script completo de build protegido
- ✅ **Obfuscação avançada** - Terser com configurações extremas
- ✅ **Remoção de documentação** - Exclusão automática de arquivos sensíveis
- ✅ **Pacote do cliente** - Geração automática de pacote limpo
- ✅ **package.json** - Script build:protected integrado

#### **Etapa 5: Services de Integração**
- ✅ **src/services/brandingService.ts** - Gerenciamento de personalização
- ✅ **src/services/questionnaireService.ts** - CRUD de questionários dinâmicos
- ✅ **src/services/licenseService.ts** - Controle de licenciamento
- ✅ **DATABASE_WHITELABEL_SETUP.sql** - Script executado com sucesso
- ✅ **Estrutura completa** - Tabelas, funções e políticas criadas

### **🎯 ESTRATÉGIA APROVADA:**
**"Concluir e validar tudo que foi mapeado antes de partir para evolução de funcionalidades"**

### **📋 PLANO DE FINALIZAÇÃO (3 dias):**
- **Fase 1:** Integração final dos services (1-2 dias)
- **Fase 2:** Validação e documentação (1 dia)
- **Fase 3:** Evolução futura (após validação completa)

### **🔄 EM ANDAMENTO:**
- **Integração Final** - Conectar interfaces com services

### **⏳ PRÓXIMAS ETAPAS:**
- Sistema de licenciamento ativo
- Testes completos
- Documentação do cliente

---

## 📊 CRONOGRAMA DETALHADO

| Dia | Atividade | Entregável | Status |
|-----|-----------|------------|--------|
| **Dia 1** | Sistema de configuração + Remoção hardcodes | Branding dinâmico | ✅ |
| **Dia 2** | Templates de políticas + Build protegido | Políticas personalizáveis | ✅ |
| **Dia 3** | Sistema de licenciamento | Validação funcionando | ⏳ |
| **Dia 4** | Obfuscação + Remoção documentação | Código protegido | ⏳ |
| **Dia 5** | Testes + Documentação cliente | Pacote completo | ⏳ |
| **Dia 6** | Deploy teste + Validação | Sistema funcionando | ⏳ |

---

## ✅ RESULTADO FINAL

### **Para o Cliente:**
- ✅ Aplicação funcionando em sua infraestrutura (Vercel + Supabase)
- ✅ Branding completamente personalizado
- ✅ Políticas legais adequadas à sua empresa
- ✅ Dados isolados em seu Supabase Cloud
- ✅ Deploy simples e documentado
- ❌ **SEM acesso ao código fonte**
- ❌ **SEM documentação técnica sensível**

### **Para Você (Fornecedor):**
- ✅ Código fonte 100% protegido
- ✅ Controle total via licenciamento
- ✅ Monitoramento de uso remoto
- ✅ Renovações automáticas
- ✅ Escalabilidade para novos clientes
- ✅ Receita recorrente garantida

---

## 🚨 PRÓXIMOS PASSOS IMEDIATOS

### **PRIORIDADE ALTA:**
1. **Implementar sistema de configuração** (`src/config/client.ts`)
2. **Remover hardcodes** dos componentes principais
3. **Criar templates de políticas** personalizáveis
4. **Configurar build protegido** com obfuscação

### **PRIORIDADE MÉDIA:**
5. **Implementar licenciamento** básico
6. **Criar documentação** simplificada para cliente
7. **Testar deploy completo** no ambiente de teste

### **VALIDAÇÃO FINAL:**
8. **Verificar proteção** do código fonte
9. **Testar personalização** completa do branding
10. **Validar funcionamento** do sistema de licenças

---

## 📝 CONSIDERAÇÕES IMPORTANTES

### **Compatibilidade com Vercel:**
- ✅ Build estático funciona perfeitamente
- ✅ Variáveis de ambiente suportadas
- ✅ Deploy automático via Git
- ✅ CDN global incluído

### **Integração com Supabase Cloud:**
- ✅ Cada cliente tem projeto isolado
- ✅ RLS (Row Level Security) ativado
- ✅ Backup automático incluído
- ✅ Escalabilidade automática

### **Memória Relevante:**
Baseado na memória sobre o problema do Vercel com Supabase, já temos a solução implementada:
- ✅ `.env.production` commitado
- ✅ `vite.config.ts` configurado com `loadEnv`
- ✅ Validação em `src/lib/supabase.ts`

---

**Status:** 📋 Completamente Documentado  
**Próxima Ação:** Aguardando aprovação para iniciar implementação  
**Estimativa Total:** 6 dias úteis  
**Complexidade:** Média-Alta (devido às proteções de segurança)
