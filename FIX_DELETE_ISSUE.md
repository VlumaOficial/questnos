# 🔧 CORREÇÃO: Problema com Exclusão de Candidatos

## 🐛 PROBLEMA IDENTIFICADO

A exclusão de candidatos não está funcionando devido às **políticas RLS (Row Level Security)** do Supabase.

### Causa Raiz:
As políticas RLS estão configuradas para **SELECT**, mas não há políticas explícitas para **DELETE**.

## ✅ SOLUÇÃO

Execute o arquivo SQL `fix_delete_policies.sql` no Supabase para adicionar as políticas necessárias.

### Passos para Corrigir:

1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard
   - Selecione seu projeto

2. **Abra o SQL Editor**
   - Menu lateral: `SQL Editor`
   - Clique em `New query`

3. **Execute o Script**
   - Copie todo o conteúdo de `fix_delete_policies.sql`
   - Cole no editor SQL
   - Clique em `Run` ou pressione `Ctrl+Enter`

4. **Verifique as Políticas**
   - O script inclui uma query de verificação no final
   - Você deve ver políticas para SELECT, INSERT, UPDATE e DELETE

## 📋 POLÍTICAS CRIADAS

### Para `candidates`:
- ✅ `Admins can view all candidates` (SELECT)
- ✅ `Admins can delete candidates` (DELETE)
- ✅ `Admins can insert candidates` (INSERT)
- ✅ `Admins can update candidates` (UPDATE)

### Para `assessments`:
- ✅ `Admins can delete assessments` (DELETE)
- ✅ `Admins can insert assessments` (INSERT)
- ✅ `Admins can update assessments` (UPDATE)

### Para `assessment_answers`:
- ✅ `Admins can delete answers` (DELETE)
- ✅ `Admins can insert answers` (INSERT)

## 🔒 SEGURANÇA

As políticas usam `USING (true)` para permitir acesso total aos administradores.

**IMPORTANTE:** Em produção, você pode querer adicionar verificação de autenticação:

```sql
USING (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE email = auth.jwt() ->> 'email' 
        AND is_active = true
    )
)
```

## 🧪 TESTAR

Após executar o script:

1. Volte ao dashboard
2. Selecione um candidato
3. Clique em "Excluir Candidato"
4. Confirme a exclusão
5. Verifique se o candidato foi removido

## ⚠️ NOTA

O `ON DELETE CASCADE` nas foreign keys garante que ao deletar um candidato:
- Todos os assessments dele são deletados
- Todas as respostas dos assessments são deletadas

Isso funciona em conjunto com as políticas RLS.
