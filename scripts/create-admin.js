/**
 * 🔧 SCRIPT DE CRIAÇÃO AUTOMÁTICA DE ADMIN
 * 
 * Este script verifica se existe um usuário admin no sistema.
 * Se não existir, cria automaticamente um perfil admin padrão.
 * 
 * Execução: node scripts/create-admin.js
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Carregar variáveis de ambiente
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Chave de service role (não anon)

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Erro: Variáveis de ambiente VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórias');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Configuração do admin padrão
 */
const DEFAULT_ADMIN = {
  email: 'admin@vluma.com.br',
  password: 'VlumaAdmin2024!',
  full_name: 'Administrador VLUMA',
  role: 'admin',
  permissions: {
    branding: true,
    questionnaire: true,
    users: true,
    reports: true,
    settings: true
  }
};

/**
 * Verifica se já existe um usuário admin
 */
async function checkAdminExists() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('role', 'admin')
      .limit(1);

    if (error) {
      console.error('❌ Erro ao verificar admin existente:', error.message);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('❌ Erro na verificação:', error.message);
    return false;
  }
}

/**
 * Cria um novo usuário admin
 */
async function createAdmin() {
  try {
    console.log('🔄 Criando usuário admin...');

    // 1. Criar usuário na auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: DEFAULT_ADMIN.email,
      password: DEFAULT_ADMIN.password,
      email_confirm: true,
      user_metadata: {
        full_name: DEFAULT_ADMIN.full_name,
        role: DEFAULT_ADMIN.role
      }
    });

    if (authError) {
      console.error('❌ Erro ao criar usuário na auth:', authError.message);
      return false;
    }

    console.log('✅ Usuário criado na auth:', authData.user.id);

    // 2. Criar perfil na tabela profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: DEFAULT_ADMIN.email,
        full_name: DEFAULT_ADMIN.full_name,
        role: DEFAULT_ADMIN.role,
        permissions: DEFAULT_ADMIN.permissions,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('❌ Erro ao criar perfil:', profileError.message);
      
      // Tentar deletar o usuário da auth se o perfil falhou
      await supabase.auth.admin.deleteUser(authData.user.id);
      return false;
    }

    console.log('✅ Perfil admin criado com sucesso!');
    return true;

  } catch (error) {
    console.error('❌ Erro geral na criação do admin:', error.message);
    return false;
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🚀 Iniciando verificação de admin...\n');

  try {
    // Verificar se já existe admin
    const adminExists = await checkAdminExists();

    if (adminExists) {
      console.log('✅ Admin já existe no sistema. Nenhuma ação necessária.');
      return;
    }

    console.log('⚠️  Nenhum admin encontrado. Criando admin padrão...\n');

    // Criar admin padrão
    const success = await createAdmin();

    if (success) {
      console.log('\n🎉 Admin criado com sucesso!');
      console.log('📧 Email:', DEFAULT_ADMIN.email);
      console.log('🔑 Senha:', DEFAULT_ADMIN.password);
      console.log('\n⚠️  IMPORTANTE: Altere a senha após o primeiro login!');
    } else {
      console.log('\n❌ Falha ao criar admin. Verifique os logs acima.');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Erro fatal:', error.message);
    process.exit(1);
  }
}

// Executar script
main();
