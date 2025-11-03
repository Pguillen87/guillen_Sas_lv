# Configuração do Cron Job para Relatórios Diários

Este documento descreve como configurar o cron job que executa a geração automática de relatórios diários.

## Edge Function

A Edge Function está localizada em:
```
supabase/functions/jobs/daily-reports/index.ts
```

## Configuração no Supabase Dashboard

### 1. Configurar o Secret do Cron

1. Acesse o Supabase Dashboard
2. Vá em **Project Settings** → **Edge Functions** → **Secrets**
3. Adicique um novo secret:
   - **Name**: `CRON_SECRET`
   - **Value**: Gere uma string aleatória segura (ex: use `openssl rand -hex 32`)

### 2. Deploy da Edge Function

Execute o deploy da função:

```bash
supabase functions deploy daily-reports
```

### 3. Configurar o Cron Job via SQL

No SQL Editor do Supabase, execute o seguinte SQL para criar o cron job:

```sql
-- Criar extensão pg_cron se ainda não existir
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Criar função para chamar a Edge Function
CREATE OR REPLACE FUNCTION call_daily_reports_function()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  cron_secret text;
  response jsonb;
BEGIN
  -- Obter o secret do cron (substitua pelo seu secret real)
  cron_secret := current_setting('app.settings.cron_secret', true);
  
  -- Se não estiver configurado, use uma variável de ambiente ou valor padrão
  -- NOTA: Em produção, configure isso via Supabase Secrets
  IF cron_secret IS NULL THEN
    -- Você precisará configurar isso no Supabase Dashboard
    RAISE EXCEPTION 'CRON_SECRET not configured. Please set it in Supabase Dashboard → Settings → Edge Functions → Secrets';
  END IF;

  -- Chamar a Edge Function via HTTP
  SELECT content INTO response
  FROM http((
    'POST',
    current_setting('app.settings.supabase_url', true) || '/functions/v1/jobs/daily-reports',
    ARRAY[
      http_header('Authorization', 'Bearer ' || cron_secret),
      http_header('Content-Type', 'application/json')
    ],
    'application/json',
    '{}'
  )::http_request);

  -- Log do resultado
  RAISE NOTICE 'Daily reports function called: %', response;
END;
$$;

-- Configurar o cron job para executar diariamente às 00:00 UTC (21:00 BRT)
SELECT cron.schedule(
  'daily-reports-generation',
  '0 0 * * *', -- Executa todo dia à meia-noite UTC
  $$
  SELECT call_daily_reports_function();
  $$
);
```

### 4. Configuração Alternativa (Recomendada): Supabase Cron

Se você estiver usando Supabase Pro/Enterprise, pode configurar o cron diretamente no Dashboard:

1. Acesse **Database** → **Cron Jobs** (ou **Extensions** → **pg_cron**)
2. Clique em **Add Cron Job**
3. Configure:
   - **Name**: `daily-reports-generation`
   - **Schedule**: `0 0 * * *` (todos os dias à meia-noite UTC)
   - **Command**: SQL para chamar a função HTTP

**NOTA**: Para usar `http()` no Supabase, você precisa:
- Habilitar a extensão `http` (se disponível no seu plano)
- Ou usar um approach diferente, como chamar via webhook externo

### 5. Configuração via Webhook Externo (Alternativa Simples)

Se o pg_cron não estiver disponível, você pode usar um serviço externo:

1. **GitHub Actions** (gratuito):
   - Crie um workflow em `.github/workflows/daily-reports.yml`
   - Configure para executar diariamente
   - Faça uma requisição HTTP para a Edge Function

2. **Vercel Cron** (se o frontend estiver no Vercel):
   - Configure em `vercel.json`:
   ```json
   {
     "crons": [{
       "path": "/api/cron/daily-reports",
       "schedule": "0 0 * * *"
     }]
   }
   ```

3. **Serviços de Cron Externos**:
   - **Cron-job.org** (gratuito)
   - **EasyCron** (gratuito com limitações)
   - **Zapier** (com planos pagos)

## Exemplo de Webhook HTTP

Se usar um serviço externo, configure uma requisição HTTP POST:

```bash
curl -X POST \
  https://YOUR_PROJECT_REF.supabase.co/functions/v1/jobs/daily-reports \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json"
```

Substitua:
- `YOUR_PROJECT_REF` pelo ID do seu projeto Supabase
- `YOUR_CRON_SECRET` pelo secret configurado

## Verificação

Para testar manualmente:

```bash
curl -X POST \
  https://YOUR_PROJECT_REF.supabase.co/functions/v1/jobs/daily-reports \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json"
```

A resposta deve ser:
```json
{
  "success": true,
  "reportsGenerated": 1,
  "reports": [
    {
      "organizationId": "...",
      "date": "2024-01-01",
      "success": true
    }
  ]
}
```

## Troubleshooting

1. **Erro 401 (Unauthorized)**:
   - Verifique se o `CRON_SECRET` está configurado corretamente
   - Confirme que o header `Authorization` está sendo enviado

2. **Relatórios não sendo gerados**:
   - Verifique os logs da Edge Function no Supabase Dashboard
   - Confirme que há organizações no banco de dados
   - Verifique se há agentes nas organizações

3. **Cron não executando**:
   - Verifique se a extensão `pg_cron` está habilitada
   - Confirme que o schedule está correto
   - Verifique os logs do pg_cron no Supabase

