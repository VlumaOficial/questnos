# 🔐 Sistema de Autenticação Admin - Quest Nós

## 📋 Visão Geral

Sistema de autenticação com dois perfis de acesso para o painel administrativo:
- **Admin**: Acesso completo, incluindo exclusão de candidatos
- **Consulta**: Acesso somente leitura, sem permissão para excluir

---

## 🚀 Instalação e Configuração

### 1. **Executar Script SQL no Supabase**

1. Acesse o Supabase Dashboard
2. Vá em **SQL Editor**
3. Abra o arquivo `create_admin_users.sql`
4. Execute o script completo

**⚠️ IMPORTANTE:** O script cria dois usuários padrão:
- **Admin:** `admin@questnos.com` / Senha: `Admin@2025`
- **Consulta:** `consulta@questnos.com` / Senha: `Consulta@2025`

**🔒 ALTERE ESSAS SENHAS IMEDIATAMENTE!**

---

## 📁 Arquivos Criados

### **Backend (SQL)**
- `create_admin_users.sql` - Script de criação de tabelas e funções

### **Frontend (React/TypeScript)**
- `src/pages/AdminLogin.tsx` - Página de login
- `src/hooks/useAdminAuth.ts` - Hook de autenticação
- `src/components/ProtectedRoute.tsx` - Componente de proteção de rotas

### **Atualizados**
- `src/App.tsx` - Rotas de login e dashboard protegido
- `src/pages/AdminDashboard.tsx` - Controle de permissões e UI de usuário

---

## 🔑 Estrutura do Banco de Dados

### Tabela: `admin_users`

```sql
id                UUID PRIMARY KEY
email             TEXT UNIQUE NOT NULL
password_hash     TEXT NOT NULL
full_name         TEXT NOT NULL
role              TEXT ('admin' | 'consulta')
created_at        TIMESTAMP
updated_at        TIMESTAMP
last_login        TIMESTAMP
is_active         BOOLEAN
```

### Funções SQL

#### `verify_admin_login(email, password)`
Verifica credenciais e retorna dados do usuário

#### `create_admin_user(email, password, full_name, role)`
Cria novo usuário com senha hasheada (bcrypt)

---

## 🌐 Rotas

| Rota | Descrição | Proteção |
|------|-----------|----------|
| `/admin/login` | Página de login | Pública |
| `/admin/dashboard` | Dashboard administrativo | Protegida |
| `/admin` | Redireciona para login | Pública |

---

## 👥 Perfis de Acesso

### **Admin** 🔓
- ✅ Visualizar todos os candidatos
- ✅ Ver detalhes e avaliações
- ✅ Analisar desempenho
- ✅ **Excluir candidatos**
- ✅ Exportar dados

### **Consulta** 👁️
- ✅ Visualizar todos os candidatos
- ✅ Ver detalhes e avaliações
- ✅ Analisar desempenho
- ❌ **NÃO pode excluir candidatos**
- ✅ Exportar dados

---

## 🎯 Como Usar

### **1. Acessar o Sistema**
```
https://seusite.com/admin
```

### **2. Fazer Login**
- Digite email e senha
- Sistema valida credenciais
- Redireciona para dashboard

### **3. Dashboard**
- **Header mostra:**
  - Nome do usuário
  - Perfil (Admin/Consulta)
  - Botão de logout
  
- **Botão "Excluir Candidato":**
  - Visível apenas para perfil **Admin**
  - Aparece ao selecionar um candidato na aba "Performance"

### **4. Logout**
- Clique no botão "Sair" no header
- Sistema limpa sessão
- Redireciona para login

---

## 🔧 Gerenciamento de Usuários

### **Criar Novo Usuário**

```sql
SELECT create_admin_user(
  'email@exemplo.com',
  'senha_segura_123',
  'Nome Completo',
  'admin'  -- ou 'consulta'
);
```

### **Alterar Senha**

```sql
UPDATE admin_users 
SET password_hash = crypt('nova_senha', gen_salt('bf')),
    updated_at = NOW()
WHERE email = 'email@exemplo.com';
```

### **Desativar Usuário**

```sql
UPDATE admin_users 
SET is_active = false,
    updated_at = NOW()
WHERE email = 'email@exemplo.com';
```

### **Reativar Usuário**

```sql
UPDATE admin_users 
SET is_active = true,
    updated_at = NOW()
WHERE email = 'email@exemplo.com';
```

### **Listar Todos os Usuários**

```sql
SELECT 
  id, 
  email, 
  full_name, 
  role, 
  is_active, 
  last_login,
  created_at 
FROM admin_users 
ORDER BY created_at DESC;
```

### **Alterar Perfil de Usuário**

```sql
UPDATE admin_users 
SET role = 'admin',  -- ou 'consulta'
    updated_at = NOW()
WHERE email = 'email@exemplo.com';
```

---

## 🔒 Segurança

### **Senhas**
- ✅ Hasheadas com bcrypt (gen_salt('bf'))
- ✅ Nunca armazenadas em texto plano
- ✅ Validação server-side

### **Sessão**
- ✅ Armazenada em localStorage
- ✅ Token único por usuário
- ✅ Verificação em cada requisição

### **Rotas**
- ✅ Proteção com ProtectedRoute
- ✅ Redirecionamento automático
- ✅ Verificação de autenticação

### **Permissões**
- ✅ Controle baseado em role
- ✅ UI condicional (botões)
- ✅ Validação no frontend e backend

---

## 🎨 Interface

### **Página de Login**
- Card centralizado
- Campos de email e senha
- Mensagens de erro claras
- Loading state

### **Dashboard Header**
- Badge com nome e perfil do usuário
- Ícone de escudo (Shield)
- Status do sistema
- Botão de logout

### **Botão Excluir**
- Aparece apenas para Admin
- Confirmação com diálogo
- Loading state durante exclusão
- Feedback visual

---

## 🐛 Troubleshooting

### **Erro: "Email ou senha incorretos"**
- Verifique as credenciais
- Confirme que o usuário está ativo
- Execute: `SELECT * FROM admin_users WHERE email = 'seu@email.com';`

### **Erro: "Usuário inativo"**
- Reative o usuário no banco
- Execute: `UPDATE admin_users SET is_active = true WHERE email = 'seu@email.com';`

### **Botão "Excluir" não aparece**
- Verifique se está logado como Admin
- Confirme o role no banco: `SELECT role FROM admin_users WHERE email = 'seu@email.com';`

### **Redirecionamento para login após autenticado**
- Limpe localStorage: `localStorage.clear()`
- Faça login novamente
- Verifique console do navegador

---

## 📝 Logs e Auditoria

### **Último Login**
```sql
SELECT email, full_name, last_login 
FROM admin_users 
ORDER BY last_login DESC;
```

### **Usuários Ativos**
```sql
SELECT COUNT(*) as total_ativos
FROM admin_users 
WHERE is_active = true;
```

### **Usuários por Perfil**
```sql
SELECT role, COUNT(*) as total
FROM admin_users 
WHERE is_active = true
GROUP BY role;
```

---

## 🚀 Próximos Passos Recomendados

1. **Alterar senhas padrão** ⚠️
2. **Criar usuários reais**
3. **Testar ambos os perfis**
4. **Configurar backup do banco**
5. **Implementar log de ações** (opcional)
6. **Adicionar recuperação de senha** (opcional)
7. **Implementar 2FA** (opcional)

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este documento
2. Consulte os logs do navegador (F12)
3. Verifique os logs do Supabase
4. Entre em contato com o desenvolvedor

---

**Quest Nós - Sistema de Autenticação Admin v1.0**

*Desenvolvido com segurança e usabilidade em mente* 🔐
