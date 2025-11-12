/**
 * 📄 GERADOR DE POLÍTICAS PERSONALIZADAS
 * 
 * Este utilitário gera documentos legais personalizados baseados
 * na configuração do cliente, substituindo variáveis nos templates.
 */

import { CLIENT_CONFIG, getLegalInfo, getContactInfo } from '@/config/client';

// Tipos para os templates de políticas
export type PolicyType = 'terms' | 'privacy';

// Interface para dados de substituição
interface PolicyData {
  COMPANY_NAME: string;
  LEGAL_COMPANY_NAME: string;
  CONTACT_EMAIL: string;
  CONTACT_PHONE: string;
  COMPANY_ADDRESS: string;
  COMPANY_DOCUMENT: string;
  COMPANY_DOMAIN: string;
  LAST_UPDATE: string;
}

/**
 * Gera dados para substituição nos templates
 */
export const generatePolicyData = (): PolicyData => {
  const legalInfo = getLegalInfo();
  const contactInfo = getContactInfo();
  
  return {
    COMPANY_NAME: CLIENT_CONFIG.company.name,
    LEGAL_COMPANY_NAME: legalInfo.companyName,
    CONTACT_EMAIL: contactInfo.email,
    CONTACT_PHONE: contactInfo.phone,
    COMPANY_ADDRESS: contactInfo.address,
    COMPANY_DOCUMENT: legalInfo.document,
    COMPANY_DOMAIN: contactInfo.website.replace(/^https?:\/\//, ''),
    LAST_UPDATE: legalInfo.lastUpdate
  };
};

/**
 * Substitui variáveis no template com os dados do cliente
 */
export const replaceTemplateVariables = (template: string, data: PolicyData): string => {
  let result = template;
  
  // Substituir todas as variáveis {{VARIABLE_NAME}}
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  });
  
  return result;
};

/**
 * Carrega template de política do servidor
 */
export const loadPolicyTemplate = async (type: PolicyType): Promise<string> => {
  try {
    const templatePath = type === 'terms' 
      ? '/templates/termos-de-uso-template.md'
      : '/templates/politica-de-privacidade-template.md';
    
    const response = await fetch(templatePath);
    
    if (!response.ok) {
      throw new Error(`Erro ao carregar template: ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error(`Erro ao carregar template ${type}:`, error);
    
    // Fallback para template básico
    return generateFallbackTemplate(type);
  }
};

/**
 * Gera template básico como fallback
 */
const generateFallbackTemplate = (type: PolicyType): string => {
  const data = generatePolicyData();
  
  if (type === 'terms') {
    return `# Termos de Uso - ${data.COMPANY_NAME}

**Última atualização:** ${data.LAST_UPDATE}

## 1. Aceitação dos Termos

Ao utilizar os serviços da ${data.COMPANY_NAME}, você concorda com estes termos.

## 2. Contato

Para dúvidas: ${data.CONTACT_EMAIL}

---

**${data.LEGAL_COMPANY_NAME}**  
**CNPJ:** ${data.COMPANY_DOCUMENT}`;
  } else {
    return `# Política de Privacidade - ${data.COMPANY_NAME}

**Última atualização:** ${data.LAST_UPDATE}

## 1. Introdução

A ${data.COMPANY_NAME} respeita sua privacidade e protege seus dados pessoais.

## 2. Contato

Para questões sobre privacidade: ${data.CONTACT_EMAIL}

---

**${data.LEGAL_COMPANY_NAME}**  
**CNPJ:** ${data.COMPANY_DOCUMENT}`;
  }
};

/**
 * Gera política personalizada completa
 */
export const generateCustomPolicy = async (type: PolicyType): Promise<string> => {
  try {
    // Carregar template
    const template = await loadPolicyTemplate(type);
    
    // Gerar dados de substituição
    const data = generatePolicyData();
    
    // Substituir variáveis
    const customPolicy = replaceTemplateVariables(template, data);
    
    return customPolicy;
  } catch (error) {
    console.error(`Erro ao gerar política ${type}:`, error);
    
    // Retornar fallback em caso de erro
    return generateFallbackTemplate(type);
  }
};

/**
 * Salva política personalizada no sistema de arquivos
 * (Para uso durante o build ou em ambiente de desenvolvimento)
 */
export const savePolicyToFile = async (type: PolicyType, content: string): Promise<void> => {
  try {
    const filename = type === 'terms' ? 'termos-de-uso.md' : 'politica-de-privacidade.md';
    
    // No browser, apenas log para debug
    console.log(`📄 Política ${type} gerada:`, content.substring(0, 200) + '...');
    
    // Em produção, as políticas serão geradas durante o build
    // e incluídas no pacote final do cliente
  } catch (error) {
    console.error(`Erro ao processar política ${type}:`, error);
  }
};

/**
 * Gera todas as políticas personalizadas
 */
export const generateAllPolicies = async (): Promise<{terms: string, privacy: string}> => {
  const [terms, privacy] = await Promise.all([
    generateCustomPolicy('terms'),
    generateCustomPolicy('privacy')
  ]);
  
  return { terms, privacy };
};

/**
 * Carrega conteúdo de política personalizada
 * (Versão simplificada sem hooks React)
 */
export const loadPolicyContent = async (type: PolicyType): Promise<{content: string, error: string | null}> => {
  try {
    const content = await generateCustomPolicy(type);
    return { content, error: null };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Erro desconhecido';
    const fallbackContent = generateFallbackTemplate(type);
    return { content: fallbackContent, error };
  }
};

/**
 * Valida se todas as variáveis necessárias estão configuradas
 */
export const validatePolicyConfiguration = (): {isValid: boolean, missingFields: string[]} => {
  const data = generatePolicyData();
  const requiredFields = [
    'COMPANY_NAME',
    'LEGAL_COMPANY_NAME', 
    'CONTACT_EMAIL',
    'CONTACT_PHONE',
    'COMPANY_DOCUMENT'
  ];
  
  const missingFields = requiredFields.filter(field => {
    const value = data[field as keyof PolicyData];
    return !value || value.trim() === '';
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Função para debug - mostra dados de configuração
 */
export const debugPolicyData = () => {
  const data = generatePolicyData();
  const validation = validatePolicyConfiguration();
  
  console.group('📄 Policy Generator Debug');
  console.log('Dados:', data);
  console.log('Validação:', validation);
  console.groupEnd();
};
