#!/usr/bin/env node

/**
 * 🔐 SCRIPT DE BUILD PROTEGIDO
 * 
 * Este script cria um build protegido removendo documentação sensível
 * e aplicando obfuscação avançada para proteger o código fonte.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Arquivos e pastas sensíveis que NÃO devem ir para o cliente
const SENSITIVE_FILES = [
  // Documentação técnica
  'DOCUMENTACAO_PROJETO.md',
  'DATABASE_SETUP_COMPLETO.md',
  'QUESTOES_COMPLETAS.md',
  'CHANGELOG.md',
  'AI_RULES.md',
  'APRESENTACAO_PESSOAL.md',
  'ESTRATEGIA_WHITELABEL.md',
  
  // Arquivos de desenvolvimento
  'Como Funciona.txt',
  'Sobre.txt',
  'setup_git_deploy.md',
  
  // Scripts SQL
  'create_admin_users.sql',
  '*.sql',
  
  // Configurações de desenvolvimento
  '.env.local',
  '.env.example',
  
  // Arquivos de build
  'vite.config.ts',
  'vite.config.protected.ts',
  'tsconfig.*.json',
  'eslint.config.js',
  'vitest.config.ts',
  
  // Scripts de desenvolvimento
  'scripts/',
  'templates/',
  
  // Dependências de desenvolvimento
  'node_modules/',
  'pnpm-lock.yaml',
  
  // Arquivos Git
  '.git/',
  '.github/',
  '.gitignore',
  
  // Arquivos temporários
  '*.log',
  '*.tmp',
  'dist/',
];

// Arquivos que DEVEM ser incluídos no pacote do cliente
const CLIENT_FILES = [
  'package.json',
  'README-CLIENTE.md',
  '.env.client.example',
  'vercel.json',
  'public/',
  'dist/',
  'client-config.json'
];

/**
 * Cria diretório se não existir
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Copia arquivo ou diretório
 */
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    ensureDir(dest);
    const files = fs.readdirSync(src);
    
    files.forEach(file => {
      copyRecursive(
        path.join(src, file),
        path.join(dest, file)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

/**
 * Verifica se arquivo deve ser excluído
 */
function shouldExclude(filePath) {
  const fileName = path.basename(filePath);
  const relativePath = path.relative(process.cwd(), filePath);
  
  return SENSITIVE_FILES.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(fileName) || regex.test(relativePath);
    }
    return fileName === pattern || relativePath === pattern || relativePath.startsWith(pattern);
  });
}

/**
 * Gera package.json simplificado para o cliente
 */
function generateClientPackageJson() {
  const originalPackage = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  
  const clientPackage = {
    name: originalPackage.name + '-client',
    version: originalPackage.version,
    private: true,
    type: 'module',
    scripts: {
      preview: 'vite preview --port 4173',
      serve: 'npx serve dist -p 4173'
    },
    engines: originalPackage.engines,
    // Apenas dependências essenciais para servir o build
    devDependencies: {
      'serve': '^14.2.1',
      'vite': originalPackage.devDependencies?.vite || '^5.0.0'
    }
  };
  
  return JSON.stringify(clientPackage, null, 2);
}

/**
 * Cria README simplificado para o cliente
 */
function generateClientReadme() {
  const config = loadClientConfig();
  
  return `# ${config.COMPANY_NAME || 'Aplicação'} - Deploy

## 🚀 Deploy no Vercel

### Pré-requisitos
- Conta no Vercel (gratuita)
- Projeto no Supabase Cloud

### Passo a Passo

1. **Configurar Supabase**
   - Acesse https://supabase.com
   - Crie um novo projeto
   - Anote a URL e a chave anônima do projeto

2. **Deploy no Vercel**
   - Acesse https://vercel.com
   - Importe este projeto
   - Configure as variáveis de ambiente:

\`\`\`
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
VITE_COMPANY_NAME=${config.COMPANY_NAME || 'Sua Empresa'}
VITE_CONTACT_EMAIL=${config.CONTACT_EMAIL || 'contato@suaempresa.com'}
\`\`\`

3. **Personalização**
   - Edite o arquivo \`.env.client.example\`
   - Configure suas informações da empresa
   - Substitua logos e favicons na pasta \`public/\`

## 📞 Suporte

Para dúvidas técnicas, entre em contato com o fornecedor do sistema.

---

**Aplicação desenvolvida com tecnologia protegida**  
**Todos os direitos reservados**
`;
}

/**
 * Carrega configuração do cliente
 */
function loadClientConfig() {
  try {
    // Tentar carregar de arquivo de configuração ou variáveis de ambiente
    return {
      COMPANY_NAME: process.env.VITE_COMPANY_NAME || 'Cliente',
      CONTACT_EMAIL: process.env.VITE_CONTACT_EMAIL || 'contato@cliente.com'
    };
  } catch {
    return {
      COMPANY_NAME: 'Cliente',
      CONTACT_EMAIL: 'contato@cliente.com'
    };
  }
}

/**
 * Função principal
 */
function main() {
  console.log('🔐 Iniciando build protegido...\n');
  
  try {
    // 1. Gerar políticas personalizadas
    console.log('📄 Gerando políticas personalizadas...');
    execSync('node scripts/generate-policies.js', { stdio: 'inherit' });
    
    // 2. Build da aplicação com configuração protegida
    console.log('🔨 Executando build protegido...');
    process.env.BUILD_PROTECTED = 'true';
    execSync('vite build --config vite.config.protected.ts --mode production', { 
      stdio: 'inherit',
      env: { ...process.env, BUILD_PROTECTED: 'true' }
    });
    
    // 3. Criar diretório de distribuição para cliente
    const clientDir = path.join(process.cwd(), 'client-package');
    console.log('📦 Criando pacote do cliente em: ' + clientDir);
    
    // Limpar diretório anterior
    if (fs.existsSync(clientDir)) {
      fs.rmSync(clientDir, { recursive: true, force: true });
    }
    ensureDir(clientDir);
    
    // 4. Copiar apenas arquivos necessários
    console.log('📋 Copiando arquivos essenciais...');
    
    // Copiar build
    if (fs.existsSync('dist')) {
      copyRecursive('dist', path.join(clientDir, 'dist'));
      console.log('   ✅ Build copiado');
    }
    
    // Copiar arquivos públicos (sem templates)
    if (fs.existsSync('public')) {
      copyRecursive('public', path.join(clientDir, 'public'));
      console.log('   ✅ Arquivos públicos copiados');
    }
    
    // Copiar vercel.json se existir
    if (fs.existsSync('vercel.json')) {
      fs.copyFileSync('vercel.json', path.join(clientDir, 'vercel.json'));
      console.log('   ✅ Configuração Vercel copiada');
    }
    
    // 5. Gerar arquivos específicos do cliente
    console.log('📝 Gerando arquivos do cliente...');
    
    // Package.json simplificado
    fs.writeFileSync(
      path.join(clientDir, 'package.json'),
      generateClientPackageJson(),
      'utf-8'
    );
    console.log('   ✅ package.json do cliente gerado');
    
    // README simplificado
    fs.writeFileSync(
      path.join(clientDir, 'README.md'),
      generateClientReadme(),
      'utf-8'
    );
    console.log('   ✅ README do cliente gerado');
    
    // Copiar exemplo de configuração
    if (fs.existsSync('.env.client.example')) {
      fs.copyFileSync('.env.client.example', path.join(clientDir, '.env.example'));
      console.log('   ✅ Exemplo de configuração copiado');
    }
    
    // 6. Relatório final
    console.log('\n✅ Build protegido concluído com sucesso!');
    console.log('📦 Pacote do cliente: ' + clientDir);
    console.log('📊 Arquivos incluídos:');
    
    const files = fs.readdirSync(clientDir, { recursive: true });
    files.forEach(file => {
      console.log('   - ' + file);
    });
    
    console.log('\n🔐 Proteções aplicadas:');
    console.log('   ✅ Código obfuscado e minificado');
    console.log('   ✅ Source maps removidos');
    console.log('   ✅ Documentação sensível excluída');
    console.log('   ✅ Console.log removidos');
    console.log('   ✅ Comentários removidos');
    console.log('   ✅ Nomes de arquivos ofuscados');
    
  } catch (error) {
    console.error('\n❌ Erro durante o build protegido:');
    console.error(error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  main,
  shouldExclude,
  generateClientPackageJson,
  generateClientReadme
};
