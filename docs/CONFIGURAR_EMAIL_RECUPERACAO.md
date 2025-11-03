# Configuração de Email para Recuperação de Senha

## 📧 Configuração no Supabase

Para que a funcionalidade de recuperação de senha funcione, é necessário configurar o email no Supabase:

### 1. Acessar Configurações de Email

1. Acesse o **Supabase Dashboard**
2. Vá em **Authentication** → **URL Configuration**
3. Configure os **Redirect URLs**

### 2. Configurar Redirect URL

Adicione a URL de redirect para produção e desenvolvimento:

**Para desenvolvimento local:**
```
http://localhost:8080/reset-password
```

**Para produção:**
```
https://seu-dominio.com/reset-password
```

### 3. Configurar Template de Email (Opcional)

1. Vá em **Authentication** → **Email Templates**
2. Selecione **Reset Password**
3. Personalize o template se desejar

### 4. Configurar SMTP (Recomendado para Produção)

Para produção, configure um SMTP customizado:

1. Vá em **Project Settings** → **Auth**
2. Em **SMTP Settings**, configure:
   - **SMTP Host**: (ex: smtp.gmail.com)
   - **SMTP Port**: (ex: 587)
   - **SMTP User**: seu email
   - **SMTP Password**: senha do email
   - **Sender Email**: email que enviará os emails
   - **Sender Name**: Nome que aparecerá (ex: "GuillenIA")

**Exemplo para Gmail:**
- Host: `smtp.gmail.com`
- Port: `587`
- Usar TLS: Sim

## ✅ Testar

1. Acesse: `http://localhost:8080/forgot-password`
2. Digite um email cadastrado
3. Verifique o email recebido
4. Clique no link no email
5. Redefina a senha

## 🛠️ Troubleshooting

### Email não chega
- Verifique a pasta de spam
- Confirme que o email está cadastrado no sistema
- Verifique as configurações de SMTP no Supabase

### Link expirado
- Links de recuperação expiram em 1 hora (configurável no Supabase)
- Solicite um novo link

### Erro ao redefinir senha
- Verifique se o link não foi usado antes
- Certifique-se de que o link é válido e não expirou
- Tente solicitar um novo link

