# Como Criar Usuário Admin de Teste

## 📋 Informações do Usuário de Teste

- **Email:** `admin@test.com`
- **Senha:** `12346`
- **Role:** `super_admin`

## 🚀 Passos para Criar

### Opção 1: Via Supabase Dashboard (Recomendado)

1. **Acesse o Supabase Dashboard:**
   - Vá para: https://supabase.com/dashboard
   - Selecione seu projeto

2. **Criar o usuário na autenticação:**
   - Vá em **Authentication** → **Users**
   - Clique em **"Add user"** → **"Create new user"**
   - Preencha:
     - **Email:** `admin@test.com`
     - **Password:** `12346`
     - Clique em **"Create user"**

3. **Definir role como super_admin:**
   - Ainda em **Authentication** → **Users**
   - Clique no usuário `admin@test.com` que acabou de criar
   - Vá na aba **"User Metadata"**
   - Clique em **"Add key"** e adicione:
     - **Key:** `role`
     - **Value:** `super_admin`
   - Clique em **"Save"**

4. **Garantir registro na tabela users:**
   - Vá em **SQL Editor**
   - Execute o seguinte SQL:

```sql
-- Obter o ID do usuário criado
DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Pegar o ID do usuário do auth
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'admin@test.com';

  -- Criar/atualizar registro na tabela users
  INSERT INTO public.users (id, email, role, created_at, updated_at)
  VALUES (v_user_id, 'admin@test.com', 'super_admin', NOW(), NOW())
  ON CONFLICT (id) 
  DO UPDATE SET 
    role = 'super_admin',
    updated_at = NOW();

  RAISE NOTICE 'Admin user criado/atualizado com sucesso. ID: %', v_user_id;
END $$;
```

### Opção 2: Script SQL Completo (Uma vez que o usuário auth existe)

Se você já criou o usuário no auth via Dashboard, execute este SQL no **SQL Editor**:

```sql
-- Script completo para criar/atualizar admin de teste
DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Obter ID do usuário
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'admin@test.com';

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuário admin@test.com não encontrado em auth.users. Crie primeiro via Dashboard!';
  END IF;

  -- Criar/atualizar na tabela users
  INSERT INTO public.users (id, email, role, created_at, updated_at)
  VALUES (v_user_id, 'admin@test.com', 'super_admin', NOW(), NOW())
  ON CONFLICT (id) 
  DO UPDATE SET 
    role = 'super_admin',
    email = 'admin@test.com',
    updated_at = NOW();

  -- Atualizar user_metadata no auth
  UPDATE auth.users
  SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "super_admin"}'::jsonb
  WHERE id = v_user_id;

  RAISE NOTICE '✅ Admin de teste configurado com sucesso!';
  RAISE NOTICE '   Email: admin@test.com';
  RAISE NOTICE '   Senha: 12346';
  RAISE NOTICE '   Role: super_admin';
END $$;
```

### Opção 3: Via API/CLI (Avançado)

Se você tem acesso ao Management API ou CLI:

```bash
# Criar usuário via Supabase CLI (se configurado)
supabase auth users create admin@test.com --password 12346

# Depois, executar o SQL acima para definir o role
```

## ✅ Verificação

Após criar o usuário, verifique:

```sql
-- Verificar se o usuário foi criado corretamente
SELECT 
  u.id,
  u.email,
  u.role,
  au.raw_user_meta_data->>'role' as metadata_role
FROM public.users u
JOIN auth.users au ON au.id = u.id
WHERE u.email = 'admin@test.com';
```

O resultado deve mostrar:
- `role = 'super_admin'`
- `metadata_role = 'super_admin'`

## 🔐 Testar Login

1. Inicie a aplicação:
   ```bash
   npm run dev
   ```

2. Acesse: `http://localhost:8080/login`

3. Faça login com:
   - **Email:** `admin@test.com`
   - **Senha:** `12346`

4. Você deve ser redirecionado para `/admin` automaticamente.

## 🛠️ Troubleshooting

### Usuário não tem acesso admin
- Verifique se o `role` está definido como `'super_admin'` na tabela `users`
- Verifique se o `user_metadata.role` está definido no `auth.users`

### Erro ao criar usuário
- Certifique-se de que a migration `20250202000000_add_admin_role_support.sql` foi executada
- Verifique se a tabela `users` existe e tem a coluna `role`

### Senha não funciona
- No Supabase Dashboard: Authentication → Users → Selecione o usuário → "Reset password"

