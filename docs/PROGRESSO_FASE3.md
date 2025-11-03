# Progresso - Fase 3: Services e API Admin

## ✅ Implementado

### 1. Admin Service (`src/services/supabase/admin.ts`)
Service principal para queries administrativas **sem filtro de organização**:

#### Funcionalidades:
- **Organizações:**
  - `getAllOrganizations()` - Busca todas as organizações
  - `getOrganizationWithDetails(orgId)` - Busca organização com estatísticas e informações do owner
  - `getOrganizationStats(orgId)` - Calcula estatísticas detalhadas de uma organização
  - `updateOrganizationStatus(orgId, status)` - Atualiza status da organização

- **Agentes:**
  - `getAllAgents(filters?)` - Busca todos os agentes de todas as organizações
  - Filtros opcionais: `organizationId`, `isActive`, `searchTerm`
  - Inclui informações da organização e estatísticas (contagem de mensagens, última atividade)

- **Estatísticas Globais:**
  - `getGlobalStats()` - Retorna métricas globais do sistema:
    - Total de organizações (ativas e total)
    - Total de agentes (ativos e total)
    - Total de mensagens (hoje, este mês, total)
    - Conversas ativas
    - Total de usuários
    - Total de agendamentos (hoje e total)

- **Usuários:**
  - `getAllUsers(filters?)` - Busca todos os usuários
  - `updateUserRole(userId, role)` - Atualiza role de usuário
  - Filtros opcionais: `role`, `searchTerm`

- **Auditoria:**
  - `getAuditLogs(filters?)` - Busca logs de auditoria
  - Filtros: `action`, `userId`, `organizationId`, `resourceType`, `startDate`, `endDate`, `limit`

### 2. Admin API (`src/services/api/admin.ts`)
Camada de abstração que **verifica permissões admin** antes de executar operações:

- Todas as funções verificam se o usuário é super_admin
- Lança erro se acesso negado
- Proteção adicional: previne remover último super_admin
- Wrapper das funções do `adminService` com verificação de segurança

### 3. Hooks Admin (`src/hooks/admin/`)

#### `useOrganizations.ts`:
- `useAllOrganizations()` - Hook para buscar todas as organizações
- `useOrganizationDetails(orgId)` - Hook para detalhes de uma organização
- `useUpdateOrganizationStatus()` - Mutation para atualizar status

#### `useAllAgents.ts`:
- `useAllAgents(filters?)` - Hook para buscar todos os agentes com filtros opcionais

#### `useGlobalStats.ts`:
- `useGlobalStats()` - Hook para estatísticas globais

### 4. Integração no Dashboard Admin
- `AdminDashboard.tsx` atualizado para usar os novos hooks
- Substituiu queries diretas por hooks tipados
- Melhor cache e invalidação de dados

---

## 📁 Arquivos Criados

1. `src/services/supabase/admin.ts` - Service com queries administrativas
2. `src/services/api/admin.ts` - API layer com verificação de permissões
3. `src/hooks/admin/useOrganizations.ts` - Hooks para organizações
4. `src/hooks/admin/useAllAgents.ts` - Hook para agentes
5. `src/hooks/admin/useGlobalStats.ts` - Hook para estatísticas globais

---

## 🔐 Segurança

### Verificações Implementadas:
1. **Verificação de autenticação**: Todas as funções do `adminApi` verificam se há usuário autenticado
2. **Verificação de permissão**: Todas as funções verificam se o usuário é `super_admin`
3. **Proteção especial**: Não permite remover o último `super_admin` do sistema
4. **Error handling**: Erros claros quando acesso é negado

### Exemplo de Fluxo:
```typescript
// 1. Admin chama hook
const { data } = useAllOrganizations();

// 2. Hook chama API
adminApi.getAllOrganizations()

// 3. API verifica permissões
checkAdminAccess(user.id)

// 4. Se autorizado, executa service
adminService.getAllOrganizations()
```

---

## 📊 Tipos TypeScript

### Interfaces Criadas:
- `OrganizationWithStats` - Organização com estatísticas e informações adicionais
- `AgentWithOrganization` - Agente com informações da organização
- `GlobalStats` - Estatísticas globais do sistema
- `OrganizationStats` - Estatísticas de uma organização específica

---

## 🎯 Funcionalidades Principais

### 1. Busca sem Filtro de Organização
Todas as queries no `adminService` **não filtram por organização**, permitindo visibilidade global.

### 2. Estatísticas Detalhadas
- Contagens por organização
- Métricas temporais (hoje, este mês)
- Última atividade
- Informações de assinatura

### 3. Filtros Flexíveis
- Busca por termo
- Filtro por status (ativo/inativo)
- Filtro por organização (para ver agentes de uma org específica)
- Paginação e limites

### 4. Cache e Performance
- React Query com `staleTime` configurado
- Invalidação automática em mutações
- Queries otimizadas com `count` e `head: true`

---

## ⚠️ Correções Aplicadas

### Problema com Subqueries
**Problema:** Supabase não permite subqueries aninhadas diretamente em `.in()`.

**Solução:** Buscar agent IDs primeiro, depois usar `.in()` com array:
```typescript
// Antes (não funciona):
.in("agent_id", supabase.from("agents").select("id").eq("organization_id", orgId))

// Depois (funciona):
const { data: agents } = await supabase
  .from("agents")
  .select("id")
  .eq("organization_id", organizationId);
const agentIds = agents?.map((a) => a.id) || [];
// ... depois usar .in("agent_id", agentIds)
```

---

## 🚀 Próximos Passos (Fase 4)

Agora que os services e hooks estão prontos, podemos implementar:

1. **Página de Organizações** (`/admin/organizations`)
   - Lista todas as organizações
   - Filtros e busca
   - Ações: ver detalhes, atualizar status

2. **Página de Todos os Agentes** (`/admin/agents`)
   - Lista todos os agentes
   - Filtro por organização
   - Busca e ordenação

3. **Página de Estatísticas Globais** (`/admin/stats`)
   - Gráficos e métricas
   - Comparações entre organizações
   - Relatórios exportáveis

---

## 📊 Status

- ✅ Service admin criado
- ✅ API layer com verificação de permissões
- ✅ Hooks para organizações
- ✅ Hooks para agentes
- ✅ Hook para estatísticas globais
- ✅ Dashboard admin atualizado para usar hooks
- ✅ Tipos TypeScript definidos
- ✅ Correção de subqueries Supabase
- ⏳ Páginas administrativas (próxima fase)

---

**Última atualização:** 02/11/2025

