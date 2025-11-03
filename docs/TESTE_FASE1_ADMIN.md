# Guia de Teste - Fase 1: Sistema de Autenticação Admin

## ✅ Status: Implementação Concluída

A Fase 1 foi implementada com sucesso. Este documento explica como testar o sistema.

---

## 📋 Arquivos Criados

1. **`src/lib/admin.ts`** - Funções utilitárias de verificação admin
2. **`src/hooks/admin/useAdminAuth.ts`** - Hooks React para verificação de admin
3. **`src/components/admin/AdminRoute.tsx`** - Componente de proteção de rotas
4. **`supabase/migrations/20250202000000_add_admin_role_support.sql`** - Migration do banco
5. **`src/pages/admin/TestAdmin.tsx`** - Página de teste (temporária)

---

## 🚀 Passos para Testar

### Passo 1: Executar a Migration

A migration precisa ser executada no Supabase para adicionar suporte ao role `super_admin`.

**Opção A: Via Supabase Dashboard**
1. Acesse o Supabase Dashboard
2. Vá em "SQL Editor"
3. Copie o conteúdo do arquivo `supabase/migrations/20250202000000_add_admin_role_support.sql`
4. Execute o SQL

**Opção B: Via CLI (se configurado)**
```bash
supabase db push
```

### Passo 2: Marcar um Usuário como Super Admin

Você precisa marcar seu usuário (ou um usuário de teste) como `super_admin` no banco de dados.

**SQL para executar no Supabase Dashboard:**
```sql
-- Substitua 'seu-email@exemplo.com' pelo email do usuário
UPDATE users 
SET role = 'super_admin' 
WHERE email = 'seu-email@exemplo.com';

-- Verificar se foi atualizado
SELECT id, email, role 
FROM users 
WHERE email = 'seu-email@exemplo.com';
```

**Alternativa: Via Supabase Auth User Metadata**
Se preferir usar `user_metadata`, você pode atualizar via API ou Dashboard:
- No Dashboard do Supabase: Authentication → Users → Selecione o usuário → Editar Metadata → Adicionar `role: "super_admin"`

### Passo 3: Testar no Navegador

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

2. **Faça login** com o usuário que você marcou como `super_admin`

3. **Acesse a página de teste:**
   ```
   http://localhost:5173/admin/test
   ```

### Passo 4: Verificar Funcionalidades

Na página `/admin/test`, você deve ver:

✅ **Se você É admin:**
- Badge verde mostrando "Sim" para "É Super Admin?"
- Badge mostrando sua role: "super_admin"
- Mensagem verde: "Você tem acesso de administrador! A Fase 1 está funcionando."

❌ **Se você NÃO É admin:**
- Badge vermelho mostrando "Não"
- Mensagem de erro: "Acesso negado. Apenas administradores podem acessar esta página."
- Redirecionamento automático para `/dashboard`

---

## 🧪 Testes Manuais

### Teste 1: Proteção de Rota (AdminRoute)
1. **Sem ser admin:** Acesse `/admin/test` → Deve redirecionar para `/dashboard` com toast de erro
2. **Sendo admin:** Acesse `/admin/test` → Deve mostrar a página de teste

### Teste 2: Hook useIsAdmin
1. Na página de teste, verifique se o badge mostra corretamente seu status
2. Faça logout e login novamente → Deve persistir o status admin

### Teste 3: Hook useUserRole
1. Verifique se sua role é exibida corretamente na página de teste
2. Mude sua role no banco → Recarregue a página → Deve atualizar

### Teste 4: Verificação via user_metadata
1. Atualize o `user_metadata` do usuário no Supabase Auth
2. Faça logout e login novamente
3. Verifique se a verificação funciona via `user_metadata`

---

## 🔍 Verificações Técnicas

### Console do Navegador
Abra o DevTools (F12) e verifique:
- ❌ Não deve haver erros relacionados a `admin` ou `AdminRoute`
- ✅ Deve haver queries do React Query sendo executadas

### Network Tab
Verifique as requisições:
- Query para verificar role do usuário (`users` table)
- Sem erros 401/403 nas requisições

### React Query DevTools (se instalado)
- Deve ver a query `["admin", "isAdmin"]` sendo executada
- Deve ver o estado da query (loading, success, data)

---

## 🐛 Troubleshooting

### Problema: "Acesso negado" mesmo sendo admin

**Soluções:**
1. Verifique se executou a migration corretamente
2. Confirme que o usuário tem `role = 'super_admin'` na tabela `users`
3. Faça logout e login novamente para atualizar a sessão
4. Verifique no console se há erros na query
5. Verifique se o email usado para marcar como admin é o mesmo do login

### Problema: Migration não executa

**Soluções:**
1. Verifique se você tem permissões no Supabase
2. Execute o SQL manualmente linha por linha se necessário
3. Verifique se a coluna `role` já existe (pode dar erro se já existir, mas é seguro ignorar)

### Problema: Página não carrega

**Soluções:**
1. Verifique se o servidor de desenvolvimento está rodando
2. Verifique se a rota `/admin/test` está no `App.tsx`
3. Verifique erros no console do navegador
4. Tente fazer um rebuild: `npm run build`

---

## 📊 Resultados Esperados

Após seguir todos os passos:

✅ Migration executada com sucesso  
✅ Usuário marcado como `super_admin`  
✅ Página `/admin/test` acessível apenas para admins  
✅ Hooks `useIsAdmin` e `useUserRole` funcionando  
✅ Componente `AdminRoute` protegendo rotas corretamente  
✅ Redirecionamento funcionando para não-admins  

---

## 📝 Próximos Passos

Após confirmar que a Fase 1 está funcionando:

1. ✅ Marcar Fase 1 como concluída no plano
2. 🎯 Começar Fase 2: Layout Administrativo
3. 🔄 Remover página de teste (`TestAdmin.tsx`) quando não for mais necessária

---

## 🔗 Links Úteis

- **Página de Teste:** `/admin/test`
- **Migration:** `supabase/migrations/20250202000000_add_admin_role_support.sql`
- **Documentação do Plano:** `docs/PLANO_ESTRUTURACAO.md`

---

**Última atualização:** 02/11/2025  
**Status:** ✅ Pronto para testes

