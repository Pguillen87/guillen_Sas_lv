# PRD - GuillenIA SaaS
## Portal de Gestão de Agentes de Inteligência Artificial

**Versão:** 1.0  
**Data:** Janeiro 2024  
**Status:** Em Produção (95% completo)

---

## 📋 Sumário Executivo

### Visão do Produto
GuillenIA SaaS é uma plataforma completa para criação, gestão e monitoramento de agentes de IA conversacionais integrados ao WhatsApp, com recursos de agendamento, relatórios e gestão multi-organizacional.

### Proposta de Valor
Permitir que empresas de todos os tamanhos implementem atendimento automatizado inteligente via WhatsApp em minutos, sem necessidade de conhecimento técnico avançado, utilizando IA de ponta (OpenAI) com interface intuitiva e métricas em tempo real.

### Objetivos de Negócio
1. **Curto Prazo (3 meses):**
   - 100 organizações cadastradas
   - 300 agentes ativos
   - Taxa de conversão de trial para pagamento: 15%
a
2. **Médio Prazo (6 meses):**
   - 500 organizações ativas
   - 1.500 agentes em produção
   - MRR (Monthly Recurring Revenue) de R$ 50.000

3. **Longo Prazo (12 meses):**
   - 2.000 organizações
   - 5.000 agentes ativos
   - Expansão para outros canais (Telegram, Instagram, SMS)

---

## 🎯 Problema e Oportunidade

### Problema Identificado
- **Atendimento ao cliente ineficiente:** Empresas perdem clientes por falta de resposta rápida
- **Custos elevados:** Contratar equipes 24/7 é caro e inviável para pequenas empresas
- **Complexidade técnica:** Implementar chatbots requer conhecimentos avançados de programação
- **Falta de personalização:** Soluções existentes são genéricas e não se adaptam ao negócio
- **Ausência de métricas:** Difícil mensurar eficácia do atendimento automatizado

### Oportunidade de Mercado
- **Mercado brasileiro de chatbots:** R$ 500 milhões/ano, crescendo 30% ao ano
- **WhatsApp Business:** 150 milhões de usuários ativos no Brasil
- **Adoção de IA:** 68% das empresas planejam usar IA no atendimento até 2025
- **SaaS B2B:** Mercado em crescimento acelerado, especialmente para pequenas empresas

---

## 👥 Personas e Casos de Uso

### Persona 1: Dono de Clínica Veterinária
**Nome:** Maria, 42 anos  
**Perfil:** Gerencia uma clínica com 5 funcionários, precisa atender clientes fora do horário comercial.

**Casos de Uso:**
- Receber perguntas sobre horários e serviços após o expediente
- Agendar consultas automaticamente
- Enviar lembretes de vacinação
- Responder dúvidas frequentes sobre cuidados com animais

**Benefícios esperados:**
- Redução de 40% no tempo de resposta
- Aumento de 25% em agendamentos
- Disponibilidade 24/7 sem custos adicionais

### Persona 2: Empresário de E-commerce
**Nome:** João, 35 anos  
**Perfil:** Loja online com 100 produtos, recebe muitas perguntas sobre disponibilidade e entrega.

**Casos de Uso:**
- Responder perguntas sobre produtos
- Informar status de pedidos
- Fornecer informações de frete e prazo
- Sugerir produtos complementares

**Benefícios esperados:**
- Resposta instantânea a 80% das perguntas
- Aumento de 15% em conversão de vendas
- Redução de carga no atendimento humano

### Persona 3: Gerente de Marketing Digital
**Nome:** Ana, 29 anos  
**Perfil:** Gerencia múltiplos clientes, precisa de métricas e relatórios para demonstrar ROI.

**Casos de Uso:**
- Criar agentes personalizados para cada cliente
- Gerar relatórios de performance
- Monitorar satisfação do cliente
- Gerenciar múltiplas organizações

**Benefícios esperados:**
- Escalabilidade para múltiplos clientes
- Relatórios automáticos para apresentação
- Dashboard centralizado

---

## 🚀 Funcionalidades Principais

### 1. Sistema de Autenticação e Organizações

#### 1.1 Autenticação
- **Cadastro de usuários** com email e senha
- **Login seguro** via Supabase Auth
- **Recuperação de senha** via email
- **Sessões persistentes** com tokens JWT
- **Suporte futuro:** OAuth (Google, GitHub)

**Prioridade:** Alta  
**Status:** ✅ 90% completo (pendente OAuth)

#### 1.2 Gestão de Organizações
- **Criar organização** com nome e slug único
- **Múltiplas organizações** por usuário
- **Gestão de membros** com roles (owner, admin, member)
- **Convidar membros** por email
- **Perfil da organização** editável
- **Row Level Security (RLS)** para isolamento de dados

**Prioridade:** Alta  
**Status:** ✅ 100% completo

### 2. Gestão de Agentes de IA

#### 2.1 Criação de Agentes
- **Criação via OpenAI Agent Builder**
  - Integração completa com API OpenAI
  - Criação automática de agentes na plataforma OpenAI
- **Configuração de prompts personalizados**
  - Editor de texto com preview
  - Sugestões de prompts por categoria
- **Parâmetros de IA ajustáveis**
  - Temperature (criatividade)
  - Max tokens (tamanho de resposta)
- **Templates pré-configurados**
  - 6 templates iniciais (Veterinário, Clínica, Beleza, Restaurante, Varejo, Educação)
  - Criar template a partir de agente existente
  - Biblioteca de templates públicos/privados
  - Filtros por categoria

**Prioridade:** Crítica  
**Status:** ✅ 100% completo

#### 2.2 Configuração de Conexões
- **Conexão WhatsApp (Evolution API)**
  - Configuração de URL e API Key
  - Criptografia AES-256-GCM de credenciais
  - Teste de conexão em tempo real
  - Vinculação com instância WhatsApp
- **Conexão Google Calendar**
  - OAuth 2.0 completo
  - Sincronização automática de eventos
  - Refresh tokens automático
- **Conexão OpenAI**
  - Validação de API Key
  - Configuração por agente

**Prioridade:** Crítica  
**Status:** ✅ 90% completo

#### 2.3 Gestão de Agentes
- **Lista de agentes** com cards visuais
- **Ativar/desativar** agentes
- **Editar configurações** em tempo real
- **Visualizar conexões** ativas
- **Estatísticas por agente** (mensagens, conversas, satisfação)
- **Deletar agentes** com confirmação

**Prioridade:** Alta  
**Status:** ✅ 100% completo

### 3. Sistema de Conversas e Mensagens

#### 3.1 Processamento Automático de Mensagens
- **Webhook do Evolution API**
  - Recebe mensagens do WhatsApp em tempo real
  - Identificação automática do agente responsável
  - Processamento via OpenAI Agent
  - Resposta automática via WhatsApp
  - Suporte a múltiplos formatos (texto, áudio, imagem)

**Prioridade:** Crítica  
**Status:** ✅ 100% completo

#### 3.2 Interface de Conversas
- **Lista de conversas ativas**
  - Cards com preview da última mensagem
  - Timestamp relativo (há X minutos)
  - Status visual (ativo, fechado, arquivado)
  - Busca por número, nome ou mensagem
- **Visualização de conversa**
  - Interface de chat estilo WhatsApp
  - Histórico completo de mensagens
  - Diferença visual inbound/outbound
  - Scroll automático para última mensagem
  - Input para resposta manual
- **Gestão de conversas**
  - Arquivar/fechar conversas
  - Filtros por status, agente, data
  - Busca em tempo real

**Prioridade:** Alta  
**Status:** ✅ 90% completo

### 4. Sistema de Agendamentos

#### 4.1 Criação e Gestão
- **Criar agendamentos manualmente**
  - Formulário completo com validação
  - Seleção de agente relacionado
  - Vinculação com conversa
  - Data, hora e descrição
- **Calendário visual**
  - Visualização mensal
  - Navegação entre meses
  - Múltiplos agendamentos por dia
  - Cores por status (agendado, confirmado, cancelado)
- **Lista de agendamentos**
  - Busca por título, contato ou agente
  - Filtros por status e data
  - Indicadores visuais (hoje, passados não confirmados)
  - Ações rápidas (confirmar/cancelar)

**Prioridade:** Média  
**Status:** ✅ 85% completo

#### 4.2 Integração com Google Calendar
- **Sincronização bidirecional**
  - Eventos criados no GuillenIA aparecem no Google Calendar
  - Eventos do Google Calendar podem ser importados
  - Sincronização incremental com syncToken
- **Criação automática de eventos**
  - Quando agente identifica intenção de agendamento
  - Confirmação automática com cliente
- **Notificações**
  - Lembrete para cliente antes do agendamento
  - Notificação para organização

**Prioridade:** Média  
**Status:** ✅ 85% completo (estrutura criada, sincronização real pendente)

### 5. Sistema de Relatórios

#### 5.1 Relatórios Diários Automáticos
- **Geração automática** (cron job diário às 23:59)
- **Métricas incluídas:**
  - Total de mensagens enviadas/recebidas
  - Total de conversas iniciadas/finalizadas
  - Agendamentos criados/confirmados/cancelados
  - Taxa de satisfação (se implementada)
  - Mensagens por agente
- **Armazenamento** no banco de dados
- **Download em CSV**

**Prioridade:** Média  
**Status:** ✅ 100% completo

#### 5.2 Relatórios Customizados
- **Geração sob demanda**
  - Seleção de período (data inicial e final)
  - Filtro por agentes específicos
  - Métricas selecionáveis
- **Visualização imediata**
  - Cards com métricas principais
  - Download em CSV
- **Agendamento de envio por email**
  - Configuração de destinatários
  - Frequência personalizável (diário, semanal, mensal)
  - Formato: CSV anexado

**Prioridade:** Média  
**Status:** ✅ 80% completo (interface de destinatários pendente)

### 6. Dashboard e Métricas

#### 6.1 Dashboard Principal
- **Estatísticas em tempo real:**
  - Agentes ativos
  - Mensagens hoje
  - Conversas ativas
  - Taxa de satisfação
- **Cards de acesso rápido** para principais funcionalidades
- **Gráficos e visualizações** (a implementar)
  - Evolução de mensagens ao longo do tempo
  - Distribuição de conversas por agente
  - Taxa de satisfação por período

**Prioridade:** Alta  
**Status:** ✅ 80% completo (gráficos pendentes)

### 7. Sistema de Planos e Assinaturas

#### 7.1 Planos Disponíveis

**Free (R$ 0/mês):**
- 1 agente
- 100 mensagens/mês
- Suporte por email

**Starter (R$ 97/mês ou R$ 970/ano):**
- 3 agentes
- 1.000 mensagens/mês
- Suporte prioritário
- Relatórios diários

**Business (R$ 297/mês ou R$ 2.970/ano):**
- 10 agentes
- 5.000 mensagens/mês
- Suporte 24/7
- Relatórios avançados
- Agente supervisor

**Enterprise (R$ 997/mês ou R$ 9.970/ano):**
- Agentes ilimitados
- Mensagens ilimitadas
- Suporte dedicado
- Customizações
- API access

**Prioridade:** Alta  
**Status:** ✅ 100% completo (integração de pagamento pendente)

#### 7.2 Limites e Controle
- **Verificação de limites** ao criar agentes
- **Contador de mensagens** por mês
- **Avisos** quando próximo do limite
- **Bloqueio automático** ao exceder limite

**Prioridade:** Alta  
**Status:** ✅ Estrutura criada (validações pendentes)

### 8. Serviços Adicionais (Site e App)

#### 8.1 Catálogo de Serviços
- **8 tipos de serviços disponíveis:**
  - Site Institucional Básico (R$ 2.500)
  - Site Empresarial Completo (R$ 6.000)
  - Loja Virtual E-commerce (R$ 12.000)
  - Landing Page Premium (R$ 3.500)
  - App Mobile Básico (R$ 15.000)
  - App Mobile Completo (R$ 35.000)
  - App Mobile Enterprise (R$ 80.000)
  - PWA (R$ 8.000)

#### 8.2 Gestão de Serviços
- **Solicitar serviços** (a implementar)
- **Acompanhar milestones** (a implementar)
- **Upload de documentos** (a implementar)
- **Histórico e status** (a implementar)

**Prioridade:** Baixa  
**Status:** ⏳ 0% completo (schema criado)

### 9. Sistema de Jobs em Background

#### 9.1 Processamento Assíncrono
- **Sistema de fila** para jobs pesados
- **Retry automático** com limite de tentativas
- **Status tracking** (pending, processing, completed, failed)
- **Logs detalhados** de execução

#### 9.2 Tipos de Jobs
- **Geração de relatórios diários** ✅ Implementado
- **Sincronização de calendário** ⏳ Estrutura criada
- **Limpeza de dados antigos** ⏳ Estrutura criada
- **Envio de emails** ⏳ Estrutura criada (envio real pendente)

**Prioridade:** Média  
**Status:** ✅ 85% completo

---

## 🏗️ Arquitetura Técnica

### Stack Tecnológica

#### Frontend
- **Next.js 14+** (App Router)
- **React 18+** com TypeScript
- **TailwindCSS** para estilização
- **shadcn/ui** para componentes base
- **React Query** para gerenciamento de estado servidor
- **Zustand** para estado global cliente
- **Framer Motion** para animações

#### Backend
- **Next.js API Routes** (RESTful)
- **Supabase** (PostgreSQL + Auth)
- **Row Level Security (RLS)** para segurança de dados
- **Server Components** quando possível

#### Integrações
- **OpenAI SDK** (Agent Builder API)
- **Evolution API** (WhatsApp)
- **Google Calendar API** (OAuth 2.0)
- **Supabase Auth** (Autenticação)

#### Infraestrutura
- **Vercel** para deploy (com cron jobs)
- **Docker** para containerização
- **Supabase** para banco de dados e autenticação

### Segurança

#### Autenticação e Autorização
- **Supabase Auth** com JWT
- **Tokens HTTP-only cookies**
- **Row Level Security (RLS)** em todas as tabelas
- **Middleware de autenticação** em todas as rotas protegidas
- **Verificação de membros** da organização em todas as APIs

#### Proteção de Dados
- **Criptografia AES-256-GCM** para credenciais sensíveis
- **HTTPS obrigatório** em produção
- **Validação de inputs** com Zod
- **Sanitização de dados** antes de salvar
- **Rate limiting** nas APIs (a implementar)

### Performance

#### Otimizações Frontend
- **Code splitting automático** (Next.js)
- **Lazy loading** de componentes pesados
- **Image optimization** nativa
- **Server Components** para reduzir bundle
- **Cache estratégico** com React Query

#### Otimizações Backend
- **Índices no banco** para queries frequentes
- **Connection pooling** (Supabase)
- **Query optimization** (SELECT apenas campos necessários)
- **Cache** (futuro: Redis)

### Escalabilidade

#### Horizontal Scaling
- **Stateless APIs** permitem múltiplas instâncias
- **Load balancer** distribui requisições
- **Workers separados** para jobs pesados (futuro)

#### Vertical Scaling
- **Supabase** escala automaticamente
- **Vercel** escala automaticamente com tráfego

---

## 📊 Métricas de Sucesso (KPIs)

### Métricas de Produto

#### Engajamento
- **DAU (Daily Active Users):** Meta: 30% dos usuários
- **Sessões por usuário/mês:** Meta: 20 sessões
- **Tempo médio na plataforma:** Meta: 15 minutos/sessão

#### Funcionalidades
- **Taxa de criação de agentes:** Meta: 80% dos usuários criam pelo menos 1 agente
- **Taxa de ativação de agentes:** Meta: 60% dos agentes criados são ativados
- **Taxa de uso de templates:** Meta: 50% dos agentes criados via template

#### Performance
- **Uptime:** Meta: 99.9%
- **Tempo de resposta API:** Meta: < 200ms (p95)
- **Tempo de carregamento de página:** Meta: < 2s

### Métricas de Negócio

#### Aquisição
- **Número de cadastros/mês:** Meta: 100 novos usuários
- **Taxa de conversão trial → pagamento:** Meta: 15%
- **CAC (Custo de Aquisição):** Meta: < R$ 200

#### Retenção
- **Churn rate mensal:** Meta: < 5%
- **Retenção no mês 3:** Meta: 60%
- **Net Promoter Score (NPS):** Meta: > 50

#### Receita
- **MRR (Monthly Recurring Revenue):** Meta: R$ 50.000 (mês 6)
- **ARR (Annual Recurring Revenue):** Meta: R$ 600.000 (ano 1)
- **LTV (Lifetime Value):** Meta: > R$ 2.000

---

## 🗺️ Roadmap

### Fase 1: MVP (Concluída ✅)
- [x] Sistema de autenticação
- [x] Gestão de organizações
- [x] Criação e gestão de agentes
- [x] Integração OpenAI
- [x] Integração WhatsApp (Evolution API)
- [x] Sistema de conversas
- [x] Dashboard básico
- [x] Relatórios diários

### Fase 2: Aprimoramentos (Em progresso - 95%)
- [x] Templates de agentes
- [x] Integração Google Calendar
- [x] Sistema de agendamentos
- [x] Relatórios customizados
- [ ] OAuth (Google, GitHub)
- [ ] Gráficos e visualizações avançadas
- [ ] Sistema de pagamentos (Stripe/Mercado Pago)

### Fase 3: Recursos Avançados (Planejado)
- [ ] Agente supervisor (monitoramento automático)
- [ ] Exportação de relatórios em PDF
- [ ] API pública para integrações
- [ ] Webhooks customizados
- [ ] Multi-idioma
- [ ] App mobile (React Native)

### Fase 4: Expansão (Futuro)
- [ ] Integração com Telegram
- [ ] Integração com Instagram
- [ ] Integração com SMS
- [ ] Marketplace de templates
- [ ] White-label para revendedores

---

## 🎨 Design e Experiência do Usuário

### Princípios de Design
1. **Misticismo Digital:** Tema visual único com paleta roxa/índigo, animações suaves e elementos místicos
2. **Simplicidade:** Interface intuitiva, sem necessidade de tutoriais
3. **Feedback Visual:** Estados de loading, sucesso e erro sempre visíveis
4. **Responsividade:** Funciona perfeitamente em desktop, tablet e mobile
5. **Acessibilidade:** Contraste adequado, navegação por teclado, labels apropriados

### Componentes Visuais
- **Glass morphism:** Cards com efeito de vidro
- **Animações sutis:** Float, glow, sparkle, cosmic-drift
- **Badges temáticos:** Identificação visual de status e categorias
- **Loading screens:** Mensagens místicas durante carregamento

---

## 🔄 Fluxos Principais

### Fluxo 1: Onboarding de Novo Usuário
1. Usuário acessa landing page
2. Clica em "Cadastrar"
3. Preenche email e senha
4. Recebe email de confirmação
5. Faz login
6. É solicitado a criar organização
7. Escolhe plano (inicia no Free)
8. É redirecionado para dashboard
9. Tutorial rápido (tooltips) sobre principais funcionalidades

### Fluxo 2: Criar e Ativar Agente
1. Usuário clica em "Criar Agente"
2. Opção: Usar template ou criar do zero
3. Se template: Seleciona template → Campos pré-preenchidos
4. Se do zero: Preenche nome, descrição, prompt
5. Ajusta parâmetros (temperature, max_tokens)
6. Salva agente (cria na OpenAI automaticamente)
7. Vai para página de configuração de conexões
8. Configura WhatsApp (Evolution API)
9. Testa conexão
10. Ativa agente
11. Agente pronto para receber mensagens

### Fluxo 3: Processamento de Mensagem WhatsApp
1. Cliente envia mensagem via WhatsApp
2. Evolution API recebe mensagem
3. Evolution API dispara webhook → `/api/webhooks/evolution`
4. Sistema identifica instância e agente responsável
5. Busca contexto da conversa (mensagens anteriores)
6. Envia para OpenAI Agent com contexto
7. OpenAI gera resposta
8. (Opcional) Agente supervisor valida resposta
9. Resposta é enviada via Evolution API → WhatsApp
10. Mensagem salva no banco
11. Métricas atualizadas em tempo real

---

## ⚠️ Riscos e Mitigações

### Riscos Técnicos

#### Risco 1: Dependência de APIs Externas
- **Problema:** OpenAI, Evolution API ou Google Calendar podem ficar indisponíveis
- **Mitigação:** 
  - Implementar retry com backoff exponencial
  - Queue de mensagens para processar depois
  - Monitoramento de saúde das APIs
  - Avisos ao usuário quando serviço está indisponível

#### Risco 2: Escalabilidade do Banco de Dados
- **Problema:** Muitas mensagens podem sobrecarregar o banco
- **Mitigação:**
  - Índices otimizados
  - Arquitetura de dados para escalar (particionamento futuro)
  - Limpeza automática de dados antigos (job em background)

#### Risco 3: Custos de API (OpenAI)
- **Problema:** Uso excessivo pode gerar custos altos
- **Mitigação:**
  - Limites por plano
  - Monitoramento de uso
  - Alertas quando próximo do limite
  - Cache de respostas similares (futuro)

### Riscos de Negócio

#### Risco 1: Baixa Adoção
- **Problema:** Usuários não criam agentes ou não ativam
- **Mitigação:**
  - Onboarding melhorado
  - Templates prontos para uso
  - Tutorial interativo
  - Email marketing com dicas

#### Risco 2: Churn Alto
- **Problema:** Usuários cancelam após alguns meses
- **Mitigação:**
  - Melhorar valor entregue continuamente
  - Suporte proativo
  - Novos recursos baseados em feedback
  - Programa de fidelidade

#### Risco 3: Concorrência
- **Problema:** Grandes players entram no mercado
- **Mitigação:**
  - Foco em nicho específico (pequenas empresas)
  - Diferenciação por experiência do usuário
  - Preço competitivo
  - Recursos únicos (templates, integrações)

---

## 📝 Requisitos Não Funcionais

### Performance
- **Tempo de carregamento inicial:** < 2 segundos
- **Tempo de resposta API:** < 200ms (p95)
- **Tempo de resposta de mensagem:** < 3 segundos (incluindo OpenAI)

### Segurança
- **Criptografia:** HTTPS obrigatório, AES-256-GCM para credenciais
- **Autenticação:** JWT com expiração de 1 hora, refresh tokens
- **Autorização:** RLS em todas as tabelas, verificação em todas as APIs
- **Auditoria:** Logs de ações críticas (criar/editar/deletar agentes)

### Disponibilidade
- **Uptime:** 99.9% (menos de 8 horas de downtime/ano)
- **Backup:** Automático diário do banco de dados
- **Disaster Recovery:** Plano de recuperação documentado

### Escalabilidade
- **Usuários simultâneos:** Suportar até 10.000 usuários simultâneos
- **Mensagens/segundo:** Suportar até 100 mensagens/segundo
- **Banco de dados:** Escalar horizontalmente quando necessário

### Usabilidade
- **Curva de aprendizado:** Usuário deve criar primeiro agente em < 10 minutos
- **Acessibilidade:** WCAG 2.1 AA
- **Multi-dispositivo:** Funcional em desktop, tablet e mobile

---

## 📚 Documentação

### Para Usuários
- ✅ **Tutorial Completo** (`docs/TUTORIAL.md`)
- ✅ **Tutorial Rápido** (`docs/TUTORIAL_RAPIDO.md`)

### Para Desenvolvedores
- ✅ **Arquitetura** (`docs/architecture.md`)
- ✅ **Documentação da API** (`docs/api.md`)
- ✅ **Guia de Deployment** (`docs/deployment.md`)
- ✅ **Guias de Integração** (`docs/integrations.md`)

### Para Stakeholders
- ✅ **PRD** (este documento)
- ✅ **Plano de Desenvolvimento** (`saas-guillenia-agentes-ia.plan.md`)

---

## ✅ Critérios de Aceitação

### Funcionalidades Críticas

#### Criação de Agente
- [x] Usuário pode criar agente do zero
- [x] Usuário pode usar template pré-configurado
- [x] Agente é criado na OpenAI automaticamente
- [x] Validação de campos obrigatórios
- [x] Mensagens de erro claras

#### Ativação de Agente
- [x] Usuário pode configurar conexão WhatsApp
- [x] Sistema testa conexão antes de salvar
- [x] Credenciais são criptografadas
- [x] Usuário pode ativar/desativar agente
- [x] Webhook é configurado automaticamente

#### Processamento de Mensagens
- [x] Sistema recebe mensagens do WhatsApp
- [x] Resposta é gerada pela OpenAI
- [x] Resposta é enviada de volta ao WhatsApp
- [x] Mensagem é salva no banco
- [x] Conversa é criada/atualizada

### Funcionalidades Importantes

#### Dashboard
- [x] Métricas são exibidas corretamente
- [x] Dados são atualizados em tempo real
- [x] Loading states apropriados
- [ ] Gráficos funcionam corretamente

#### Relatórios
- [x] Relatório diário é gerado automaticamente
- [x] Usuário pode gerar relatório customizado
- [x] Download em CSV funciona
- [ ] Envio por email funciona

---

## 🎯 Próximos Passos

### Curto Prazo (1-2 semanas)
1. Finalizar OAuth (Google, GitHub)
2. Implementar gráficos no dashboard
3. Finalizar interface de destinatários de email
4. Implementar envio real de emails (SendGrid/Resend)
5. Testes de carga e otimizações

### Médio Prazo (1 mês)
1. Sistema de pagamentos (Stripe/Mercado Pago)
2. Agente supervisor
3. Exportação de relatórios em PDF
4. Melhorias de UX baseadas em feedback

### Longo Prazo (3 meses)
1. API pública
2. Integração com outros canais (Telegram, Instagram)
3. App mobile
4. Marketplace de templates

---

## 📞 Contatos e Suporte

### Equipe de Desenvolvimento
- **Product Owner:** [A definir]
- **Tech Lead:** [A definir]
- **Desenvolvedores:** [A definir]

### Canais de Suporte
- **Email:** suporte@guillenia.com.br
- **Documentação:** `/docs`
- **GitHub Issues:** [Se aplicável]

---

**Última atualização:** Janeiro 2024  
**Próxima revisão:** Fevereiro 2024

---

*Desenvolvido com ✨ e misticismo digital 🎩*

