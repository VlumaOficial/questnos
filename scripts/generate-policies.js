#!/usr/bin/env node

/**
 * 🔧 SCRIPT DE GERAÇÃO DE POLÍTICAS PERSONALIZADAS
 * 
 * Este script gera os documentos legais personalizados baseados
 * na configuração do cliente durante o processo de build.
 */

const fs = require('fs');
const path = require('path');

// Configuração padrão (será substituída pelas variáveis de ambiente)
const DEFAULT_CONFIG = {
  COMPANY_NAME: 'Quest Nós',
  LEGAL_COMPANY_NAME: 'Quest Nós Ltda',
  CONTACT_EMAIL: 'contato@questnos.com',
  CONTACT_PHONE: '(11) 0000-0000',
  COMPANY_ADDRESS: 'São Paulo, SP',
  COMPANY_DOCUMENT: '00.000.000/0001-00',
  COMPANY_DOMAIN: 'questnos.com',
  LAST_UPDATE: new Date().toLocaleDateString('pt-BR')
};

/**
 * Carrega configuração das variáveis de ambiente
 */
function loadConfiguration() {
  const config = { ...DEFAULT_CONFIG };
  
  // Sobrescrever com variáveis de ambiente se disponíveis
  if (process.env.VITE_COMPANY_NAME) config.COMPANY_NAME = process.env.VITE_COMPANY_NAME;
  if (process.env.VITE_LEGAL_COMPANY_NAME) config.LEGAL_COMPANY_NAME = process.env.VITE_LEGAL_COMPANY_NAME;
  if (process.env.VITE_CONTACT_EMAIL) config.CONTACT_EMAIL = process.env.VITE_CONTACT_EMAIL;
  if (process.env.VITE_CONTACT_PHONE) config.CONTACT_PHONE = process.env.VITE_CONTACT_PHONE;
  if (process.env.VITE_COMPANY_ADDRESS) config.COMPANY_ADDRESS = process.env.VITE_COMPANY_ADDRESS;
  if (process.env.VITE_COMPANY_CNPJ) config.COMPANY_DOCUMENT = process.env.VITE_COMPANY_CNPJ;
  if (process.env.VITE_COMPANY_WEBSITE) {
    config.COMPANY_DOMAIN = process.env.VITE_COMPANY_WEBSITE.replace(/^https?:\/\//, '');
  }
  
  return config;
}

/**
 * Substitui variáveis no template
 */
function replaceVariables(template, config) {
  let result = template;
  
  Object.entries(config).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  });
  
  return result;
}

/**
 * Carrega template de arquivo
 */
function loadTemplate(templatePath) {
  try {
    return fs.readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error(`❌ Erro ao carregar template: ${templatePath}`);
    throw error;
  }
}

/**
 * Salva arquivo gerado
 */
function saveFile(filePath, content) {
  try {
    // Criar diretório se não existir
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Arquivo gerado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Erro ao salvar arquivo: ${filePath}`);
    throw error;
  }
}

/**
 * Gera política personalizada
 */
function generatePolicy(templatePath, outputPath, config) {
  console.log(`🔄 Gerando: ${path.basename(outputPath)}`);
  
  const template = loadTemplate(templatePath);
  const customPolicy = replaceVariables(template, config);
  saveFile(outputPath, customPolicy);
}

/**
 * Função principal
 */
function main() {
  console.log('🚀 Iniciando geração de políticas personalizadas...\n');
  
  try {
    // Carregar configuração
    const config = loadConfiguration();
    
    console.log('📋 Configuração carregada:');
    console.log(`   Empresa: ${config.COMPANY_NAME}`);
    console.log(`   Email: ${config.CONTACT_EMAIL}`);
    console.log(`   Documento: ${config.COMPANY_DOCUMENT}\n`);
    
    // Caminhos dos arquivos
    const templatesDir = path.join(__dirname, '..', 'templates');
    const publicDir = path.join(__dirname, '..', 'public');
    
    const templates = [
      {
        template: path.join(templatesDir, 'termos-de-uso-template.md'),
        output: path.join(publicDir, 'termos-de-uso.md')
      },
      {
        template: path.join(templatesDir, 'politica-de-privacidade-template.md'),
        output: path.join(publicDir, 'politica-de-privacidade.md')
      }
    ];
    
    // Gerar cada política
    templates.forEach(({ template, output }) => {
      if (fs.existsSync(template)) {
        generatePolicy(template, output, config);
      } else {
        console.warn(`⚠️  Template não encontrado: ${template}`);
      }
    });
    
    console.log('\n✅ Geração de políticas concluída com sucesso!');
    
  } catch (error) {
    console.error('\n❌ Erro durante a geração de políticas:');
    console.error(error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  loadConfiguration,
  replaceVariables,
  generatePolicy,
  main
};
