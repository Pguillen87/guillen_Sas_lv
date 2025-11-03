import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { diagnosticsService } from "./services/diagnostics";

// Inicializar serviço de diagnóstico
console.log("🚀 Iniciando aplicação...");

// Debug: Verificar se o elemento root existe
const rootElement = document.getElementById("root");
if (!rootElement) {
  const errorMsg = "Elemento #root não encontrado no DOM!";
  console.error("❌ ERRO CRÍTICO:", errorMsg);
  
  diagnosticsService.log({
    type: "error",
    category: "render",
    message: errorMsg,
    metadata: {
      hasBody: !!document.body,
      bodyChildren: document.body?.children.length || 0,
    },
  });
  
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: monospace; background: #1a1a1a; min-height: 100vh; color: #ff4444;">
      <h1>Erro Crítico</h1>
      <p>Elemento #root não encontrado no DOM.</p>
      <p>Verifique se index.html contém: &lt;div id="root"&gt;&lt;/div&gt;</p>
      <p style="margin-top: 20px; color: #888;">Verifique o console do navegador (F12) para mais detalhes.</p>
    </div>
  `;
} else {
  console.log("✅ Elemento #root encontrado");
  
  try {
    console.log("🔄 Iniciando renderização do App...");
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("✅ App renderizado com sucesso");
    
    diagnosticsService.log({
      type: "info",
      category: "render",
      message: "Aplicação inicializada com sucesso",
    });
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    console.error("❌ ERRO ao renderizar App:", errorObj);
    
    diagnosticsService.log({
      type: "error",
      category: "render",
      message: `Erro ao renderizar App: ${errorObj.message}`,
      stack: errorObj.stack,
    });
    
    rootElement.innerHTML = `
      <div style="padding: 20px; color: #ff4444; font-family: monospace; background: #1a1a1a; min-height: 100vh;">
        <h1 style="color: #ff4444;">Erro ao Renderizar</h1>
        <p style="margin-bottom: 15px;">Ocorreu um erro durante a inicialização da aplicação.</p>
        <pre style="background: #2a2a2a; padding: 15px; border-radius: 5px; overflow: auto; color: #fff; margin-bottom: 15px;">
${errorObj.stack || errorObj.message}
        </pre>
        <p style="color: #888;">Verifique o console do navegador (F12) para mais detalhes.</p>
        <p style="color: #888; margin-top: 10px;">Pressione Ctrl+Shift+D (ou Cmd+Shift+D no Mac) para ver o painel de diagnóstico.</p>
      </div>
    `;
  }
}
