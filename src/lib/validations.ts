import { z } from "zod";

// Agent validations
export const createAgentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  description: z.string().max(500, "Descrição muito longa").optional(),
  customPrompt: z.string().max(2000, "Prompt muito longo").optional(),
  temperature: z.number().min(0).max(1),
  maxTokens: z.number().min(100).max(4000),
  templateId: z.string().uuid().optional(),
});

export const updateAgentSchema = createAgentSchema.partial();

// Conversation validations
export const createConversationSchema = z.object({
  agentId: z.string().uuid("ID do agente inválido"),
  participantPhone: z.string().min(10, "Telefone inválido"),
  participantName: z.string().min(1, "Nome é obrigatório").optional(),
});

// Appointment validations
const appointmentSchemaBase = z.object({
  title: z.string().min(1, "Título é obrigatório").max(200, "Título muito longo"),
  description: z.string().max(1000, "Descrição muito longa").optional(),
  attendeeName: z.string().min(1, "Nome do participante é obrigatório"),
  attendeePhone: z.string().min(10, "Telefone inválido"),
  attendeeEmail: z.string().email("Email inválido").optional(),
  startTime: z.date(),
  endTime: z.date(),
  agentId: z.string().uuid("ID do agente inválido"),
  conversationId: z.string().uuid().optional(),
});

export const createAppointmentSchema = appointmentSchemaBase.refine(
  (data) => data.endTime > data.startTime,
  {
    message: "A data de término deve ser posterior à data de início",
    path: ["endTime"],
  }
);

export const updateAppointmentSchema = appointmentSchemaBase.partial().refine(
  (data) => {
    // Só valida se ambas as datas estiverem presentes
    if (data.startTime && data.endTime) {
      return data.endTime > data.startTime;
    }
    return true;
  },
  {
    message: "A data de término deve ser posterior à data de início",
    path: ["endTime"],
  }
);

// Organization validations
export const createOrganizationSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  slug: z.string()
    .min(1, "Slug é obrigatório")
    .max(50, "Slug muito longo")
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
});

// Authentication validations
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirmação de senha inválida"),
  fullName: z.string().min(1, "Nome completo é obrigatório").max(100),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// WhatsApp connection validations
export const whatsappConnectionSchema = z.object({
  url: z.string().url("URL inválida"),
  apiKey: z.string().min(1, "API Key é obrigatória"),
  instanceName: z.string().min(1, "Nome da instância é obrigatório").optional(),
});

