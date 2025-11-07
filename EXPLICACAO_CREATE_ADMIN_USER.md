# 📋 Explicação da Função `create_admin_user`

**Projeto:** Quest Nós - Sistema de Autenticação Admin  
**Data:** 06/11/2025

---

## 🎯 O QUE É A FUNÇÃO?

`create_admin_user` é uma função SQL que cria novos usuários administradores no sistema.

---

## 📝 SINTAXE COMPLETA

```sql
SELECT create_admin_user(
  'admin@questnos.com',    -- 1º parâmetro: p_email
  'Admin@2025',            -- 2º parâmetro: p_password
  'Administrador',         -- 3º parâmetro: p_full_name
  'admin'                  -- 4º parâmetro: p_role
);
```

---

## 🔍 DETALHAMENTO DE CADA CAMPO

### **1º Campo: `p_email`** 📧

```sql
'admin@questnos.com'
```

**Tipo:** TEXT  
**O que é:** Email do usuário admin  
**Usado para:** Login no sistema  
**Validação:** Deve ser único (não pode ter 2 usuários com mesmo email)  
**Obrigatório:** ✅ Sim  

**Exemplos válidos:**
- `'joao.silva@empresa.com'`
- `'maria@questnos.com'`
- `'admin@meusite.com.br'`

**Exemplos inválidos:**
- `'email sem arroba'` ❌
- `''` (vazio) ❌
- `NULL` ❌

---

### **2º Campo: `p_password`** 🔒

```sql
'Admin@2025'
```

**Tipo:** TEXT  
**O que é:** Senha do usuário (em texto plano)  
**O que acontece:** A função converte automaticamente para hash bcrypt  
**Armazenamento:** Nunca é salva em texto plano, apenas o hash  
**Obrigatório:** ✅ Sim  

**Segurança:**
- Use senhas fortes (mínimo 8 caracteres)
- Combine letras maiúsculas e minúsculas
- Inclua números
- Inclua símbolos especiais (@, #, $, !, etc.)

**Exemplos de senhas fortes:**
- `'Senh@Forte123!'`
- `'P@ssw0rd2025'`
- `'Minha$enh@456'`

**Exemplos de senhas fracas (evitar):**
- `'123456'` ❌
- `'senha'` ❌
- `'admin'` ❌

**Como a senha é processada:**
```sql
-- Você passa:
'Admin@2025'

-- A função converte para:
crypt('Admin@2025', gen_salt('bf'))

-- Resultado salvo no banco:
'$2a$06$rounds...hash_bcrypt_aqui'
```

---

### **3º Campo: `p_full_name`** 👤

```sql
'Administrador'
```

**Tipo:** TEXT  
**O que é:** Nome completo do usuário  
**Usado para:** Exibir no dashboard (header)  
**Aparece:** No canto superior direito após login  
**Obrigatório:** ✅ Sim  

**Exemplos:**
- `'João Silva'`
- `'Maria Santos'`
- `'Pedro Oliveira'`
- `'Administrador do Sistema'`
- `'Gerente de RH'`

**Onde aparece no sistema:**
```
┌─────────────────────────────────────┐
│ Dashboard Administrativo            │
│                                     │
│ [Shield] João Silva                 │ ← AQUI
│          Administrador              │
│                                     │
│ [Sair]                              │
└─────────────────────────────────────┘
```

---

### **4º Campo: `p_role`** 🎭

```sql
'admin'
```

**Tipo:** TEXT  
**O que é:** Perfil/função do usuário  
**Obrigatório:** ✅ Sim  

**Valores aceitos:**

#### **`'admin'`** - Administrador 🔓
- ✅ Visualizar todos os candidatos
- ✅ Ver detalhes e avaliações
- ✅ Analisar desempenho
- ✅ **EXCLUIR candidatos** (botão visível)
- ✅ Exportar dados

#### **`'consulta'`** - Consulta 👁️
- ✅ Visualizar todos os candidatos
- ✅ Ver detalhes e avaliações
- ✅ Analisar desempenho
- ❌ **NÃO pode excluir candidatos** (botão oculto)
- ✅ Exportar dados

**Validação:**
```sql
-- Se passar outro valor, dá erro:
IF p_role NOT IN ('admin', 'consulta') THEN
  RAISE EXCEPTION 'Role inválido. Use "admin" ou "consulta"';
END IF;
```

**Exemplos válidos:**
- `'admin'` ✅
- `'consulta'` ✅

**Exemplos inválidos:**
- `'administrador'` ❌
- `'user'` ❌
- `'manager'` ❌
- `'Admin'` ❌ (case-sensitive, deve ser minúsculo)

---

## 🎯 EXEMPLOS PRÁTICOS

### **Exemplo 1: Criar Administrador**

```sql
SELECT create_admin_user(
  'joao@empresa.com',      -- Email de login
  'Senha@123',             -- Senha (será hasheada)
  'João Silva',            -- Nome que aparece no sistema
  'admin'                  -- Perfil: pode excluir
);
```

**Resultado:** Retorna UUID do usuário criado
```
create_admin_user
-----------------------------------------
a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

---

### **Exemplo 2: Criar Usuário de Consulta**

```sql
SELECT create_admin_user(
  'maria@empresa.com',     -- Email de login
  'Senha@456',             -- Senha (será hasheada)
  'Maria Santos',          -- Nome que aparece no sistema
  'consulta'               -- Perfil: só visualização
);
```

**Resultado:** Retorna UUID do usuário criado
```
create_admin_user
-----------------------------------------
b2c3d4e5-f6a7-8901-bcde-f12345678901
```

---

### **Exemplo 3: Criar Gerente de RH**

```sql
SELECT create_admin_user(
  'rh@questnos.com',
  'RH@Seguro2025',
  'Gerente de RH',
  'consulta'               -- Apenas visualização
);
```

---

### **Exemplo 4: Criar Super Admin**

```sql
SELECT create_admin_user(
  'superadmin@questnos.com',
  'SuperS3nh@2025!',
  'Super Administrador',
  'admin'                  -- Acesso completo
);
```

---

## 🔄 O QUE A FUNÇÃO FAZ INTERNAMENTE

### **Código Completo da Função:**

```sql
CREATE OR REPLACE FUNCTION create_admin_user(
  p_email TEXT,        -- ← Recebe o email
  p_password TEXT,     -- ← Recebe a senha em texto
  p_full_name TEXT,    -- ← Recebe o nome
  p_role TEXT          -- ← Recebe o perfil
)
RETURNS UUID AS $$    -- ← Retorna o ID do usuário criado
DECLARE
  v_user_id UUID;
BEGIN
  -- PASSO 1: Validar role
  IF p_role NOT IN ('admin', 'consulta') THEN
    RAISE EXCEPTION 'Role inválido. Use "admin" ou "consulta"';
  END IF;
  
  -- PASSO 2: Inserir na tabela admin_users
  INSERT INTO admin_users (email, password_hash, full_name, role)
  VALUES (
    p_email,                              -- Email
    crypt(p_password, gen_salt('bf')),    -- Senha HASHEADA com bcrypt
    p_full_name,                          -- Nome
    p_role                                -- Perfil
  )
  RETURNING id INTO v_user_id;  -- Pega o ID gerado
  
  -- PASSO 3: Retornar o ID do usuário criado
  RETURN v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### **Fluxo de Execução:**

```
1. Recebe os 4 parâmetros
   ↓
2. Valida se role é 'admin' ou 'consulta'
   ↓
3. Se inválido → ERRO e para
   ↓
4. Se válido → Continua
   ↓
5. Gera hash bcrypt da senha
   ↓
6. Insere registro na tabela admin_users
   ↓
7. Pega o UUID gerado automaticamente
   ↓
8. Retorna o UUID
```

---

## 💾 O QUE É SALVO NO BANCO DE DADOS

### **Quando você executa:**

```sql
SELECT create_admin_user(
  'admin@questnos.com',
  'Admin@2025',
  'Administrador',
  'admin'
);
```

### **É salvo na tabela `admin_users`:**

| Coluna | Valor | Como foi gerado |
|--------|-------|-----------------|
| `id` | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` | Gerado automaticamente (UUID) |
| `email` | `admin@questnos.com` | O que você passou no 1º parâmetro |
| `password_hash` | `$2a$06$rounds...hash_bcrypt_aqui` | Senha hasheada (NÃO é "Admin@2025") |
| `full_name` | `Administrador` | O que você passou no 3º parâmetro |
| `role` | `admin` | O que você passou no 4º parâmetro |
| `created_at` | `2025-11-06 22:14:00` | Gerado automaticamente (NOW()) |
| `updated_at` | `2025-11-06 22:14:00` | Gerado automaticamente (NOW()) |
| `last_login` | `NULL` | Ainda não fez login |
| `is_active` | `true` | Ativo por padrão |

---

## ✅ RESUMO RÁPIDO

| Campo | O que é | Exemplo | Obrigatório |
|-------|---------|---------|-------------|
| **1º - Email** | Email de login | `'joao@empresa.com'` | ✅ Sim |
| **2º - Senha** | Senha (texto plano) | `'Senha@123'` | ✅ Sim |
| **3º - Nome** | Nome completo | `'João Silva'` | ✅ Sim |
| **4º - Role** | Perfil (admin/consulta) | `'admin'` | ✅ Sim |

**Retorna:** UUID do usuário criado

---

## 🔒 SEGURANÇA

### **Senha:**
- ✅ Nunca armazenada em texto plano
- ✅ Sempre hasheada com bcrypt
- ✅ Hash usa salt aleatório (gen_salt('bf'))
- ✅ Impossível reverter hash para senha original

### **Validação:**
- ✅ Email deve ser único
- ✅ Role deve ser 'admin' ou 'consulta'
- ✅ Todos os campos são obrigatórios

### **Permissões:**
- ✅ Função usa SECURITY DEFINER
- ✅ Executa com privilégios do criador
- ✅ Usuários comuns podem executar

---

## 🆘 ERROS COMUNS

### **Erro 1: Email duplicado**

```
ERROR: duplicate key value violates unique constraint "admin_users_email_key"
```

**Causa:** Já existe um usuário com esse email  
**Solução:** Use outro email ou delete o existente:
```sql
DELETE FROM admin_users WHERE email = 'admin@questnos.com';
```

---

### **Erro 2: Role inválido**

```
ERROR: Role inválido. Use "admin" ou "consulta"
```

**Causa:** Passou um valor diferente de 'admin' ou 'consulta'  
**Solução:** Use apenas 'admin' ou 'consulta' (minúsculo)

---

### **Erro 3: Função não existe**

```
ERROR: function create_admin_user does not exist
```

**Causa:** Função ainda não foi criada  
**Solução:** Execute o PASSO 9 do guia STEP_BY_STEP

---

### **Erro 4: Extensão pgcrypto não existe**

```
ERROR: function crypt does not exist
```

**Causa:** Extensão pgcrypto não foi habilitada  
**Solução:** Execute o PASSO 1 do guia STEP_BY_STEP:
```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

---

## 📝 COMANDOS ÚTEIS RELACIONADOS

### **Listar todos os usuários criados:**

```sql
SELECT id, email, full_name, role, is_active, created_at 
FROM admin_users 
ORDER BY created_at DESC;
```

---

### **Verificar se usuário foi criado:**

```sql
SELECT * FROM admin_users WHERE email = 'admin@questnos.com';
```

---

### **Contar usuários por perfil:**

```sql
SELECT role, COUNT(*) as total
FROM admin_users
WHERE is_active = true
GROUP BY role;
```

**Resultado esperado:**
```
role      | total
----------|------
admin     | 2
consulta  | 3
```

---

### **Deletar um usuário:**

```sql
DELETE FROM admin_users WHERE email = 'usuario@exemplo.com';
```

---

### **Alterar senha de um usuário:**

```sql
UPDATE admin_users 
SET password_hash = crypt('NovaSenha@123', gen_salt('bf')),
    updated_at = NOW()
WHERE email = 'admin@questnos.com';
```

---

### **Alterar role de um usuário:**

```sql
UPDATE admin_users 
SET role = 'admin',  -- ou 'consulta'
    updated_at = NOW()
WHERE email = 'usuario@exemplo.com';
```

---

### **Desativar um usuário:**

```sql
UPDATE admin_users 
SET is_active = false,
    updated_at = NOW()
WHERE email = 'usuario@exemplo.com';
```

---

## 📚 REFERÊNCIAS

- **Guia Completo:** `ADMIN_AUTH_SETUP.md`
- **Guia Passo a Passo:** `create_admin_users_STEP_BY_STEP.md`
- **Histórico da Sessão:** `CHANGELOG_SESSION.md`
- **Script SQL Completo:** `create_admin_users.sql`

---

## 💡 DICAS

1. **Sempre use senhas fortes** em produção
2. **Altere as senhas padrão** imediatamente
3. **Use perfil 'consulta'** para usuários que só precisam visualizar
4. **Use perfil 'admin'** apenas para quem realmente precisa excluir
5. **Guarde as senhas** em local seguro (gerenciador de senhas)
6. **Não compartilhe** credenciais de admin

---

**Criado em:** 06/11/2025  
**Versão:** 1.0  
**Projeto:** Quest Nós - Sistema de Autenticação Admin
