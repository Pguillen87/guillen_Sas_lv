# Plano de Estruturação - GuillenIA SaaS

**Data:** 2025-11-02  
**Versão:** 1.0  
**Status:** Aguardando Aprovação

## Objetivo
Reestruturar o projeto atual para seguir o PRD, mantendo Vite+React no frontend e adicionando backend via Supabase Edge Functions, organizando o código em camadas bem definidas.

## Arquitetura Escolhida
- **Frontend:** Vite + React (mantido)
- **Backend:** Supabase Edge Functions (Deno)
- **Database:** Supabase PostgreSQL
- **Hospedagem:** Vercel (frontend) + Supabase (backend/functions)

---

## Estrutura de Diretórios Proposta

### 1. Frontend (src/)

```
src/
├── app/                    # Configurações e providers da aplicação
│   ├── providers.tsx       # React Query, Auth, Theme providers
│   └── router.tsx          # Configuração centralizada de rotas
├── pages/                  # Páginas da aplicação (mantido)
├── components/
│   ├── ui/                 # Componentes shadcn/ui (mantido)
│   ├── features/           # Componentes específicos de features
│   │   ├── agents/
│   │   ├── conversations/
│   │   ├── appointments/
│   │   └── reports/
│   └── layout/             # Layout, Sidebar, Header
├── hooks/                  # Custom hooks
│   ├── auth/
│   ├── agents/
│   ├── conversations/
│   └── shared/
├── services/               # Camada de serviços/API calls
│   ├── api/
│   │   ├── agents.ts
│   │   ├── conversations.ts
│   │   ├── appointments.ts
│   │   └── reports.ts
│   └── supabase/           # Queries Supabase organizadas
│       ├── agents.ts
│       ├── conversations.ts
│       └── organizations.ts
├── lib/                    # Utilitários e helpers
│   ├── utils.ts            # Utilitários gerais (mantido)
│   ├── validations.ts      # Schemas Zod
│   ├── encryption.ts       # Funções de criptografia AES-256-GCM
│   └── constants.ts        # Constantes da aplicação
├── types/                  # TypeScript types/interfaces
│   ├── agent.ts
│   ├── conversation.ts
│   ├── appointment.ts
│   └── index.ts
└── integrations/           # Integrações externas
    ├── supabase/           # Cliente Supabase (mantido)
    ├── openai/             # Cliente OpenAI
    └── evolution-api/      # Helpers Evolution API
```

### 2. Backend (supabase/functions/)

```
supabase/
├── functions/              # Supabase Edge Functions
│   ├── webhooks/
│   │   └── evolution/      # Webhook Evolution API
│   ├── jobs/
│   │   ├── daily-reports/  # Geração relatórios diários
│   │   ├── calendar-sync/  # Sincronização Google Calendar
│   │   └── email-sender/   # Envio de emails
│   ├── agents/
│   │   └── create-openai/  # Criação de agente na OpenAI
│   └── shared/             # Código compartilhado
│       ├── supabase.ts     # Cliente Supabase server-side
│       ├── encryption.ts   # Funções de criptografia
│       └── types.ts        # Types compartilhados
├── migrations/             # Migrations do banco
└── config.toml             # Configuração Supabase (mantido)
```

---

## Implementação por Módulos

### Fase 1: Reestruturação Base

**1.1 Criar estrutura de diretórios**
- Criar pastas: `src/services`, `src/types`, `src/lib/validations.ts`
- Criar `src/components/features/` para componentes de features
- Organizar hooks em subpastas por domínio

**1.2 Migrar lógica de negócio para services**
- Extrair queries Supabase das páginas para `src/services/supabase/`
- Criar camada de abstração em `src/services/api/`
- Implementar error handling consistente

**1.3 Criar tipos TypeScript centralizados**
- Definir interfaces em `src/types/` baseadas no schema do Supabase
- Exportar tipos compartilhados

**1.4 Implementar validações Zod**
- Schemas de validação em `src/lib/validations.ts`
- Integrar com React Hook Form

### Fase 2: Backend - Edge Functions

**2.1 Setup inicial Edge Functions**
- Configurar `supabase/functions/`
- Criar estrutura de shared code
- Setup de cliente Supabase server-side

**2.2 Webhook Evolution API**
- `supabase/functions/webhooks/evolution/index.ts`
- Processamento de mensagens WhatsApp
- Integração com OpenAI Agent
- Resposta automática

**2.3 Jobs em Background**
- `supabase/functions/jobs/daily-reports/` - Relatórios diários
- Configurar cron jobs no Supabase Dashboard
- Sistema de retry e logging

**2.4 Criação de Agentes OpenAI**
- `supabase/functions/agents/create-openai/`
- Integração com OpenAI Agent Builder API
- Armazenamento de agent_id da OpenAI

### Fase 3: Funcionalidades Avançadas

**3.1 Sistema de Criptografia**
- `src/lib/encryption.ts` e `supabase/functions/shared/encryption.ts`
- AES-256-GCM para credenciais WhatsApp
- Armazenamento seguro no banco

**3.2 Integração Google Calendar**
- Edge Function para sync bidirecional
- OAuth 2.0 flow
- Refresh tokens automático

**3.3 Sistema de Relatórios**
- Melhorar geração de relatórios customizados
- Download CSV
- Agendamento de emails (usando Edge Function)

**3.4 Melhorias de UX**
- Loading states consistentes
- Error boundaries
- Toast notifications padronizados

### Fase 4: Otimizações e Polimento

**4.1 Performance**
- React Query cache strategies
- Lazy loading de componentes
- Code splitting

**4.2 Segurança**
- Rate limiting nas Edge Functions
- Validação de inputs em todas as APIs
- Audit logs para ações críticas

**4.3 Testes**
- Estrutura de testes
- Testes unitários para services
- Testes de integração para Edge Functions

---

## Arquivos Principais a Criar/Modificar

### Novos Arquivos Frontend

1. `src/services/api/agents.ts` - API calls para agentes
2. `src/services/supabase/agents.ts` - Queries Supabase agentes
3. `src/lib/validations.ts` - Schemas Zod
4. `src/lib/encryption.ts` - Utilitários de criptografia
5. `src/types/agent.ts` - Types de agentes
6. `src/components/features/agents/` - Componentes de agentes
7. `src/hooks/agents/useAgents.ts` - Hook customizado

### Novos Arquivos Backend

1. `supabase/functions/webhooks/evolution/index.ts` - Webhook principal
2. `supabase/functions/jobs/daily-reports/index.ts` - Job relatórios
3. `supabase/functions/shared/supabase.ts` - Cliente Supabase
4. `supabase/functions/shared/encryption.ts` - Criptografia server-side

### Arquivos a Modificar

1. `src/pages/*.tsx` - Refatorar para usar services
2. `package.json` - Adicionar scripts para Supabase CLI
3. `src/App.tsx` - Melhorar estrutura de providers

---

## Dependências Adicionais

### Frontend
- `zustand` - Estado global (se necessário)
- Não adicionar mais dependências pesadas

### Backend (Edge Functions)
- `@supabase/supabase-js` - Cliente Supabase
- `openai` - SDK OpenAI
- `crypto` - Para criptografia (nativo Deno)

---

## Configurações Necessárias

1. **Supabase Dashboard**
   - Configurar cron jobs para relatórios diários
   - Configurar secrets para API keys
   - Configurar RLS policies corretamente

2. **Vercel**
   - Configurar variáveis de ambiente
   - Setup de deploy automático

3. **Environment Variables**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - Secrets no Supabase para Edge Functions

---

## Ordem de Implementação Recomendada

1. Fase 1 completa (estrutura base)
2. Edge Function webhook Evolution API (crítico)
3. Sistema de criptografia (segurança)
4. Jobs em background (funcionalidades)
5. Otimizações finais

---

## Métricas de Sucesso

- Código organizado em camadas claras
- Backend funcional com Edge Functions
- Todas as funcionalidades do PRD implementadas
- Performance adequada (< 2s load time)
- Segurança implementada (criptografia, validações)

---

## TODOs de Implementação

### Estrutura Base
- [ ] structure-1: Criar estrutura de diretórios: src/services/, src/types/, src/components/features/
- [ ] structure-2: Migrar queries Supabase para src/services/supabase/ organizadas por domínio
- [ ] structure-3: Criar camada de API abstraction em src/services/api/
- [ ] structure-4: Definir tipos TypeScript centralizados em src/types/
- [ ] structure-5: Implementar validações Zod em src/lib/validations.ts

### Backend
- [ ] backend-1: Setup inicial Supabase Edge Functions e estrutura de shared code
- [ ] backend-2: Implementar webhook Evolution API em supabase/functions/webhooks/evolution/
- [ ] backend-3: Criar Edge Function para geração de relatórios diários
- [ ] backend-4: Implementar Edge Function para criação de agentes OpenAI

### Criptografia
- [ ] encryption-1: Implementar sistema de criptografia AES-256-GCM em src/lib/encryption.ts
- [ ] encryption-2: Implementar criptografia server-side em supabase/functions/shared/encryption.ts

### Refatoração
- [ ] refactor-1: Refatorar páginas para usar services ao invés de queries diretas
- [ ] refactor-2: Criar custom hooks em src/hooks/ para lógica reutilizável
- [ ] refactor-3: Extrair componentes de features para src/components/features/

---

## Notas e Considerações

- O plano mantém a estrutura atual do frontend (Vite + React)
- Backend será implementado via Supabase Edge Functions (Deno runtime)
- Todas as mudanças serão incrementais para não quebrar funcionalidades existentes
- Prioridade será dada às funcionalidades críticas do PRD
- Stack escolhida (Vercel + Supabase) oferece tier gratuito generoso

---

**Última atualização:** 2025-11-02  
**Próxima revisão:** Após esclarecimento de dúvidas

