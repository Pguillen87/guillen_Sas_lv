
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** guillen_Sas_lv
- **Date:** 2025-11-02
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001
- **Test Name:** User Registration with Valid Email and Password
- **Test Code:** [TC001_User_Registration_with_Valid_Email_and_Password.py](./TC001_User_Registration_with_Valid_Email_and_Password.py)
- **Test Error:** The user successfully registered and logged in with valid credentials. However, after navigating to the plan selection page and clicking 'Começar Agora' on the Starter plan, the page did not proceed to the organization creation step as expected. This indicates a bug or missing implementation in the onboarding flow. The task to verify successful registration and redirection to organization creation and plan selection is incomplete due to this issue.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/date-fns.js?v=17157415:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Pricing.tsx:0:0)
[ERROR] WebSocket connection to 'ws://localhost:8080/?token=hWaU5JRTDtPp' failed: Error in connection establishment: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@vite/client:535:0)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-27&sent_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&is_active=eq.true:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-27&created_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-28&sent_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&status=eq.active:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-28&created_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/appointments?select=*&start_time=gte.2025-11-02&status=eq.scheduled:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-29&sent_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-29&created_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-30&sent_at=lt.2025-10-31:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-30&created_at=lt.2025-10-31:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-31&sent_at=lt.2025-11-01:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-31&created_at=lt.2025-11-01:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-01&sent_at=lt.2025-11-02:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/00a89177-de51-457b-bb60-c674b7707b91
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002
- **Test Name:** User Registration with Invalid Email Format
- **Test Code:** [TC002_User_Registration_with_Invalid_Email_Format.py](./TC002_User_Registration_with_Invalid_Email_Format.py)
- **Test Error:** 
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Agents.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/next-themes.js?v=6fb071e7:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/e81a88e5-f7e6-47e4-b991-423f2faa27ad
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003
- **Test Name:** User Login with Correct Credentials
- **Test Code:** [TC003_User_Login_with_Correct_Credentials.py](./TC003_User_Login_with_Correct_Credentials.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/c2b5d37d-825a-47f3-b0f4-d816d763ecf4
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004
- **Test Name:** User Login with Incorrect Credentials
- **Test Code:** [TC004_User_Login_with_Incorrect_Credentials.py](./TC004_User_Login_with_Incorrect_Credentials.py)
- **Test Error:** Tested login with incorrect credentials. The system incorrectly allowed login and redirected to the dashboard. No error message was shown. Reporting this critical issue and stopping further testing as the authentication mechanism is broken.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-toast.js?v=f83a1496:0:0)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&is_active=eq.true:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-27&sent_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-27&created_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&status=eq.active:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-28&sent_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/appointments?select=*&start_time=gte.2025-11-02&status=eq.scheduled:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-28&created_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-29&sent_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-29&created_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-30&sent_at=lt.2025-10-31:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-30&created_at=lt.2025-10-31:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-31&sent_at=lt.2025-11-01:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-31&created_at=lt.2025-11-01:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-01&sent_at=lt.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-11-01&created_at=lt.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02&sent_at=lt.2025-11-03:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/7c66c1fa-4199-40ac-8390-0b66a6b16fcd
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005
- **Test Name:** Agent Creation from Template with All Mandatory Fields Validated
- **Test Code:** [TC005_Agent_Creation_from_Template_with_All_Mandatory_Fields_Validated.py](./TC005_Agent_Creation_from_Template_with_All_Mandatory_Fields_Validated.py)
- **Test Error:** Agent creation form submission failed despite filling all mandatory fields. Validation errors for empty fields were confirmed earlier, but the final submission does not create the agent or navigate away. This indicates a critical issue with the agent creation functionality that needs developer attention. Stopping further testing.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/index.css:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/App.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/tooltip.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/@tanstack_react-query.js?v=f9ac2802:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/sonner.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Index.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Agents.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/AgentTemplates.tsx:0:0)
[ERROR] WebSocket connection to 'ws://localhost:8080/?token=hWaU5JRTDtPp' failed: Error in connection establishment: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@vite/client:535:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/chunk-HWMC2YUY.js?v=26e10300:0:0)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&is_active=eq.true:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-27&sent_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-27&created_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&status=eq.active:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-28&sent_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/appointments?select=*&start_time=gte.2025-11-02&status=eq.scheduled:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/cc81f357-b8ab-4feb-8649-c9946c41f961
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006
- **Test Name:** Agent Creation from Scratch with OpenAI API Integration
- **Test Code:** [TC006_Agent_Creation_from_Scratch_with_OpenAI_API_Integration.py](./TC006_Agent_Creation_from_Scratch_with_OpenAI_API_Integration.py)
- **Test Error:** Agent creation form submission failed silently. The form remains on the same page with all fields filled and no success message or navigation after clicking 'Criar Agente'. This prevents verifying the creation of a new AI agent with OpenAI API integration and configurable AI parameters. Please investigate the backend or frontend form handling for issues.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Login.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/NotFound.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/chunk-CRNJR6QK.js?v=26e10300:0:0)
[ERROR] WebSocket connection to 'ws://localhost:8080/?token=hWaU5JRTDtPp' failed: Error in connection establishment: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@vite/client:535:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/button.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/input.tsx:0:0)
[ERROR] 404 Error: User attempted to access non-existent route: /create-agent (at http://localhost:8080/src/pages/NotFound.tsx:27:16)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-27&sent_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&is_active=eq.true:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-27&created_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&status=eq.active:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-28&sent_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/appointments?select=*&start_time=gte.2025-11-02&status=eq.scheduled:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-28&created_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-29&sent_at=lt.2025-10-30:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/550ac6c0-d22f-4d88-9749-53fcdd8386cf
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007
- **Test Name:** WhatsApp Connection Test and Agent Activation
- **Test Code:** [TC007_WhatsApp_Connection_Test_and_Agent_Activation.py](./TC007_WhatsApp_Connection_Test_and_Agent_Activation.py)
- **Test Error:** Agent creation failed due to silent form submission failure on the 'Criar Novo Agente' page. Unable to proceed with WhatsApp integration configuration and testing. Please fix the issue to continue.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/main.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/@tanstack_react-query.js?v=f9ac2802:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Index.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Register.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Dashboard.tsx:0:0)
[ERROR] WebSocket connection to 'ws://localhost:8080/?token=hWaU5JRTDtPp' failed: Error in connection establishment: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@vite/client:535:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Index.tsx:0:0)
[ERROR] WebSocket connection to 'ws://localhost:8080/?token=hWaU5JRTDtPp' failed: Error in connection establishment: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@vite/client:535:0)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&is_active=eq.true:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-27&sent_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-27&created_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&status=eq.active:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-28&sent_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/appointments?select=*&start_time=gte.2025-11-02&status=eq.scheduled:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-28&created_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-29&sent_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-29&created_at=lt.2025-10-30:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/56f9acb8-6813-4ab1-ac65-578d09ea3e2d
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008
- **Test Name:** Incoming WhatsApp Message Processing and Auto-Response
- **Test Code:** [TC008_Incoming_WhatsApp_Message_Processing_and_Auto_Response.py](./TC008_Incoming_WhatsApp_Message_Processing_and_Auto_Response.py)
- **Test Error:** 
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/input.tsx:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/c7fa91a9-5a56-4153-9e39-0ff8512d0aa7
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009
- **Test Name:** Conversation Interface Message History and Search Functionality
- **Test Code:** [TC009_Conversation_Interface_Message_History_and_Search_Functionality.py](./TC009_Conversation_Interface_Message_History_and_Search_Functionality.py)
- **Test Error:** Testing stopped due to navigation issue: 'Conversas' button leads to 'Agendamentos' page instead of conversations page. Cannot verify message history, search, or filter functionality.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Dashboard.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=6f387b9a:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Login.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@react-refresh:0:0)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-27&sent_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&is_active=eq.true:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-27&created_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-28&sent_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&status=eq.active:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-28&created_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/appointments?select=*&start_time=gte.2025-11-02&status=eq.scheduled:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-29&sent_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-29&created_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-30&sent_at=lt.2025-10-31:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-30&created_at=lt.2025-10-31:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-31&sent_at=lt.2025-11-01:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-31&created_at=lt.2025-11-01:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/5c400dad-0a65-4058-ae11-2ba13c0314bd
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010
- **Test Name:** Manual Appointment Creation with Validation
- **Test Code:** [null](./null)
- **Test Error:** Test execution timed out after 15 minutes
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/b4050abc-79fe-42ee-aef4-06e567ccf39a
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011
- **Test Name:** Automatic Appointment Sync with Google Calendar
- **Test Code:** [TC011_Automatic_Appointment_Sync_with_Google_Calendar.py](./TC011_Automatic_Appointment_Sync_with_Google_Calendar.py)
- **Test Error:** The settings page required to configure Google Calendar connection is missing and returns a 404 error. Due to this critical issue, the task to verify bi-directional synchronization of appointments with Google Calendar cannot be completed. Please fix the settings page issue and retry.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/index.css:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/App.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=6f387b9a:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/NewAgent.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/toast.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/chunk-W6L2VRDA.js?v=26e10300:0:0)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&is_active=eq.true:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-27&sent_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&status=eq.active:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-27&created_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/appointments?select=*&start_time=gte.2025-11-02&status=eq.scheduled:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-28&sent_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-28&created_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-29&sent_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-29&created_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-30&sent_at=lt.2025-10-31:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-30&created_at=lt.2025-10-31:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/5bf294fe-6a29-4a95-a5a5-692d426d02df
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012
- **Test Name:** Automated Daily Report Generation and CSV Export
- **Test Code:** [TC012_Automated_Daily_Report_Generation_and_CSV_Export.py](./TC012_Automated_Daily_Report_Generation_and_CSV_Export.py)
- **Test Error:** The system does not generate daily reports automatically as all report metrics show zero. The 'Exportar CSV' button does not trigger any CSV download or confirmation. This indicates the daily cron job is not running or the export functionality is broken. Task is stopped due to failure to verify automatic report generation and export.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/index.css:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/App.tsx:0:0)
[ERROR] WebSocket connection to 'ws://localhost:8080/?token=hWaU5JRTDtPp' failed: Error in connection establishment: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@vite/client:535:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/sonner.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/tooltip.tsx:0:0)
[ERROR] WebSocket connection to 'ws://localhost:8080/?token=hWaU5JRTDtPp' failed: Error in connection establishment: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@vite/client:535:0)
[ERROR] [vite] failed to connect to websocket.
your current setup:
  (browser) localhost:8080/ <--[HTTP]--> localhost:8080/ (server)
  (browser) localhost:8080/ <--[WebSocket (failing)]--> localhost:8080/ (server)
Check out your Vite / network configuration and https://vite.dev/config/server-options.html#server-hmr . (at http://localhost:8080/@vite/client:511:16)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/@tanstack_react-query.js?v=f9ac2802:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Index.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/@tanstack_react-query.js?v=f9ac2802:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:0:0)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&is_active=eq.true:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-27&sent_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-27&created_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&status=eq.active:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-28&sent_at=lt.2025-10-29:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/d56939a9-a280-4b96-94a8-1db4105c267b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013
- **Test Name:** Custom Report Generation with Filters and Email Scheduling
- **Test Code:** [TC013_Custom_Report_Generation_with_Filters_and_Email_Scheduling.py](./TC013_Custom_Report_Generation_with_Filters_and_Email_Scheduling.py)
- **Test Error:** The reports page does not provide filter controls for date and agent filters, nor options to schedule email delivery of reports. Therefore, the task to verify custom report generation with filters, CSV download, and email scheduling cannot be completed.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Dashboard.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=6f387b9a:0:0)
[ERROR] WebSocket connection to 'ws://localhost:8080/?token=hWaU5JRTDtPp' failed: Error in connection establishment: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@vite/client:535:0)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&is_active=eq.true:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-27&sent_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-27&created_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&status=eq.active:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-28&sent_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/appointments?select=*&start_time=gte.2025-11-02&status=eq.scheduled:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-28&created_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-29&sent_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-29&created_at=lt.2025-10-30:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-30&sent_at=lt.2025-10-31:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-30&created_at=lt.2025-10-31:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-31&sent_at=lt.2025-11-01:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-31&created_at=lt.2025-11-01:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-01&sent_at=lt.2025-11-02:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/64d42bd7-246f-476f-bc50-9adb5eadcc8e
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014
- **Test Name:** Role-Based Access Control and Session Persistence
- **Test Code:** [TC014_Role_Based_Access_Control_and_Session_Persistence.py](./TC014_Role_Based_Access_Control_and_Session_Persistence.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/4c235775-9994-47ef-8bd0-94191253c03e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015
- **Test Name:** Subscription Plan Enforcement on Agent Creation Limits
- **Test Code:** [TC015_Subscription_Plan_Enforcement_on_Agent_Creation_Limits.py](./TC015_Subscription_Plan_Enforcement_on_Agent_Creation_Limits.py)
- **Test Error:** The system pages including main, login, dashboard, and subscription pages are all rendering empty with no interactive elements visible. This prevents any interaction such as logging in, identifying subscription plans, or creating agents. Due to this, it is impossible to verify subscription plan limits or agent creation limits as required by the task. Please ensure the system UI is properly loaded and accessible before retrying the test.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/tooltip.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/sonner.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/main.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/main.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@react-refresh:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@react-refresh:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/cc3e8c2e-d291-488f-a5c4-7e99e55384e1
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016
- **Test Name:** Background Job Queue Processing with Retry and Logging
- **Test Code:** [TC016_Background_Job_Queue_Processing_with_Retry_and_Logging.py](./TC016_Background_Job_Queue_Processing_with_Retry_and_Logging.py)
- **Test Error:** 
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-label.js?v=4387be2e:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/4b97f12c-298b-48d9-89f1-a12046869a1f
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017
- **Test Name:** Real-Time Dashboard Metrics Accuracy and Loading States
- **Test Code:** [TC017_Real_Time_Dashboard_Metrics_Accuracy_and_Loading_States.py](./TC017_Real_Time_Dashboard_Metrics_Accuracy_and_Loading_States.py)
- **Test Error:** The dashboard page at http://localhost:8080/dashboard does not display any real-time statistics on active agents, messages, conversations, or user satisfaction. There are no loading spinners or placeholders visible while data is loading. Additionally, when simulating a failure in fetching dashboard data, no error message or graceful fallback UI is displayed. Therefore, the dashboard does not meet the requirements for displaying accurate real-time statistics with appropriate loading and error states.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/badge.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/sonner.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/components/ui/tooltip.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@react-refresh:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/37d53001-7c35-4ad4-9ef2-1ac730213a39
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018
- **Test Name:** Mobile Responsiveness and Accessibility Compliance
- **Test Code:** [TC018_Mobile_Responsiveness_and_Accessibility_Compliance.py](./TC018_Mobile_Responsiveness_and_Accessibility_Compliance.py)
- **Test Error:** Testing halted due to authentication issue. The dashboard and other main pages are inaccessible without login. Please verify session management and login persistence before resuming tests.
Browser Console Logs:
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/CreateOrganization.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Agents.tsx:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/src/pages/Conversations.tsx:0:0)
[ERROR] WebSocket connection to 'ws://localhost:8080/?token=hWaU5JRTDtPp' failed: Error in connection establishment: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/@vite/client:535:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8080/node_modules/.vite/deps/react.js?v=8a1c247f:0:0)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&order=created_at.desc:0:0)
[ERROR] {code: 42P17, details: null, hint: null, message: infinite recursion detected in policy for relation "organization_members"} (at http://localhost:8080/src/pages/Agents.tsx:49:20)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=edb0c4e2:4392:12)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-27&sent_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/agents?select=*&is_active=eq.true:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-11-02:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&created_at=gte.2025-10-27&created_at=lt.2025-10-28:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/conversations?select=*&status=eq.active:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/messages?select=*&sent_at=gte.2025-10-28&sent_at=lt.2025-10-29:0:0)
[ERROR] Failed to load resource: the server responded with a status of 500 () (at https://spelmdubhsyvynzzmufm.supabase.co/rest/v1/appointments?select=*&start_time=gte.2025-11-02&status=eq.scheduled:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/ad298acb-4853-44f7-8cb1-c9934cec1aef/d43ced6c-686e-4ca5-a75a-4dced932d612
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **11.11** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---