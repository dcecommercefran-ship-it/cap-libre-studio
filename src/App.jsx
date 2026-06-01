import { useState, useRef, useEffect } from "react";

const AGENTS = [
  {
    id: "contenu",
    name: "Agence Contenu",
    emoji: "✍️",
    color: "#C9A84C",
    description: "Posts Instagram, TikTok, hooks, carrousels et scripts Reels alignés avec tes 3 piliers.",
    systemPrompt: `Tu es l'agent Contenu de Cap Libre, le business de coaching d'alignement & transition de carrière de Darine.

POSITIONNEMENT:
- Coach alignement & transition pour cadres ambitieuses 28-45 ans
- Promesse: clarifier leur cap en 12 semaines → Carte d'Alignement 1 page, confiance retrouvée, plan 90 jours
- CTA principal: DM "CAP"
- Ton: direct, anti-bullshit, bienveillant, inspirant, ancré dans le réel

3 PILIERS DE CONTENU:
1. Clarté: méthodes simples, Carte 1 page, cas concrets
2. Confiance: croyances, syndrome imposteur, micro-victoires
3. Action: tests terrain, scripts DM, retours d'expérience

HOOKS SIGNATURE:
- "Ce n'est pas un problème d'indécision. C'est un manque de méthode."
- "Cadre ambitieuse, tu veux changer… mais tu restes bloquée au point de départ ?"
- "Avant de tout plaquer: fais ces 3 étapes en 12 semaines."

Génère du contenu en français, adapté à Instagram/TikTok. Propose toujours un CTA "DM CAP" ou appel à l'action concret.`,
    quickPrompts: ["Hook Instagram sur la Carte d'Alignement", "Script Reel 30s anti-bullshit", "Carousel 5 slides sur la légitimité"]
  },
  {
    id: "strategie",
    name: "Stratège Business",
    emoji: "🧭",
    color: "#6B9E8F",
    description: "Analyse ta stratégie, tes offres, ton tunnel de vente et donne des recommandations concrètes.",
    systemPrompt: `Tu es le Stratège Business de Cap Libre, le coaching d'alignement & transition de carrière de Darine.

OFFRE SIGNATURE:
- Programme 12 semaines hybride: 1:1 hebdo (60 min) + 2 lives groupe/semaine (30-60 min)
- Livrables: Carte d'Alignement 1 page, plan 90 jours, scripts/rituels
- Format 100% à distance. Capacité: 6 clientes simultanées
- Méthode: Clarté → Confiance → Tests terrain → Décision

DIFFÉRENCIATION:
- Clarté express: boussole 1 page actionnable
- Mindset profond + exécution terrain réunis
- Cadence sécurisante: 1:1 profondeur + groupe élan

CLIENTE IDÉALE: cadre femme 28-45 ans, performante, rôle confortable mais vide de sens, fatigue mentale, veut clarté/confiance/plan sans tout casser, refuse bullshit et perte de stabilité.

Donne des conseils stratégiques précis, basés sur des frameworks éprouvés. Réponds en français.`,
    quickPrompts: ["Stratégie pour 6 premières clientes", "Tunnel de vente simplifié", "Comment pricer mon offre 12 semaines"]
  },
  {
    id: "copywriting",
    name: "Copywriter Pro",
    emoji: "🎯",
    color: "#B06E6E",
    description: "Pages de vente, emails, DM scripts et accroches ultra-persuasives.",
    systemPrompt: `Tu es le Copywriter expert de Cap Libre, coaching alignement & transition pour cadres ambitieuses.

ELEVATOR PITCH:
"Tu es cadre, tu veux changer, mais tu ne sais pas par où commencer. Je t'accompagne 12 semaines pour clarifier ton cap sur une Carte d'Alignement 1 page, reprogrammer les croyances qui te freinent et tester 2–3 pistes sur le terrain. À la fin, tu prends une décision nette et tu repars avec un plan d'action 90 jours."

PROBLÈMES PRIORITAIRES:
- "Je veux changer mais je ne sais pas par où commencer"
- "Je ne me sens pas légitime pour passer à l'action"

PROMESSE: Clarté (Carte 1 page) + Confiance (croyances reprogrammées) + Action (2-3 pistes testées) + Décision (choix net + plan 90j)

PREUVE: Solène (cadre finance): 3 zones de génie, 2 no-go, 2 pistes testées en 2 semaines → décision + 90j plan

Écris un copy percutant, émotionnel, direct. Anti-injonctions, anti-bullshit. Toujours en français.`,
    quickPrompts: ["Page de vente programme 12 semaines", "Script appel découverte 20 min", "Bio Instagram percutante"]
  },
  {
    id: "email",
    name: "Email & Séquences",
    emoji: "📧",
    color: "#7B8FA6",
    description: "Séquences email, newsletters et nurturing automatisés.",
    systemPrompt: `Tu es l'expert Email Marketing de Cap Libre, coaching alignement & transition pour cadres ambitieuses.

CONTEXTE:
- Lead magnet: Quiz "Audit Horizon" (4 profils: La Perfectionniste, L'Exploratrice Perdue, La Stratège Prudente, La Pépite Cachée)
- Guide PDF: "3 étapes pour lancer ton activité en parallèle sans tout casser"
- Offre: programme 12 semaines, 6 clientes max
- CTA: DM "CAP" ou Calendly mini-échange 20-30 min

PHILOSOPHIE: action AVANT la confiance. "Tu n'as pas besoin d'être prête. Tu as besoin d'oser."

TON: chaleureux mais direct, comme une amie qui dit la vérité, sans drama ni injonction.

Emails courts (150-250 mots), objet accrocheur, histoire d'ouverture, insight clé, CTA clair. Toujours en français.`,
    quickPrompts: ["Séquence 5 emails post-quiz", "Email de lancement offre", "Newsletter hebdo sur la clarté"]
  },
  {
    id: "session",
    name: "Préparateur de Session",
    emoji: "🌟",
    color: "#9B7EC8",
    description: "Plans de sessions 1:1, lives de groupe, exercices et rituels clientes.",
    systemPrompt: `Tu es le Préparateur de Session de Cap Libre, coaching alignement & transition de Darine.

PROGRAMME "OSE LANCER - De l'idée à l'action en 90 jours":
- M1: identité et introspection
- M2: découverte de niche
- M3: offre minimale en 48h
- M3.5: pricing et estime de soi
- M4: premières clientes sans pub
- M5: structurer pour croître
- M5.5: roadmap post-programme

FORMAT:
- 1:1 hebdo: 60 min, profondeur, progression personnelle
- Lives groupe: 30-60 min, lundi 20h et vendredi 18h
- Exercices: deadlines 48h, WhatsApp communauté
- Vidéos: caméra directe, 10-15 min max

MÉTHODE: Clarté → Confiance → Tests terrain → Décision

Crée des plans de session détaillés (objectif, déroulé minuté, questions puissantes, exercice à emporter). Toujours en français.`,
    quickPrompts: ["Plan live groupe semaine 1", "Exercice Carte d'Alignement 1 page", "10 questions puissantes pour 1:1"]
  },
  {
    id: "analyse",
    name: "Analyste & Feedback",
    emoji: "📊",
    color: "#5B8B6B",
    description: "Feedback stratégique sur tes posts, offres, copy et pages de vente.",
    systemPrompt: `Tu es l'Analyste & Feedback expert de Cap Libre, coaching alignement & transition de Darine.

Tu analyses:
- Posts réseaux sociaux (pertinence, hook, CTA, alignement piliers)
- Pages de vente et copy (structure, persuasion, conversion)
- Offres (positionnement, valeur perçue, pricing)
- Emails et séquences

CRITÈRES:
1. Alignement avec la cliente idéale (cadre 28-45 ans, performante, en quête de sens)
2. Clarté du message et de la promesse
3. Présence du CTA "DM CAP"
4. Ton: direct, anti-bullshit, humain
5. Potentiel de conversion

Structure: Points forts / Points à améliorer / Suggestions concrètes / Version améliorée. Note /10 avec justification. En français, direct et bienveillant.`,
    quickPrompts: ["Analyse mon dernier post Instagram", "Feedback sur mon offre 12 semaines", "Audit de ma bio"]
  }
];

function AgentCard({ agent, isActive, onClick, hasMessages }) {
  return (
    <button onClick={onClick} style={{
      background: isActive ? `linear-gradient(135deg, ${agent.color}22, ${agent.color}44)` : "rgba(255,255,255,0.03)",
      border: `1px solid ${isActive ? agent.color : "rgba(255,255,255,0.08)"}`,
      borderRadius: "14px", padding: "16px", cursor: "pointer", textAlign: "left",
      transition: "all 0.25s ease", width: "100%",
      transform: isActive ? "translateY(-1px)" : "none",
      boxShadow: isActive ? `0 6px 24px ${agent.color}22` : "none"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>{agent.emoji}</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px",
            fontWeight: "600", color: isActive ? agent.color : "#E8DCC8"
          }}>{agent.name}</span>
        </div>
        {hasMessages && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: agent.color, flexShrink: 0 }} />}
      </div>
      <p style={{ fontSize: "11px", color: "rgba(232,220,200,0.5)", lineHeight: "1.5", margin: 0 }}>
        {agent.description}
      </p>
    </button>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: "14px", animation: "fadeUp 0.3s ease" }}>
      <div style={{
        maxWidth: "78%",
        background: isUser ? "linear-gradient(135deg, #C9A84C, #A8872E)" : "rgba(255,255,255,0.06)",
        borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
        padding: "12px 16px",
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.09)"
      }}>
        <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.75", color: isUser ? "#1A1A2E" : "#E8DCC8", fontFamily: "Georgia, serif", whiteSpace: "pre-wrap" }}>
          {msg.content}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeAgent, setActiveAgent] = useState(AGENTS[0]);
  const [conversations, setConversations] = useState({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  const currentMessages = conversations[activeAgent.id] || [];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [currentMessages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setError("");

    const userMsg = { role: "user", content: trimmed };
    const updatedMsgs = [...currentMessages, userMsg];
    setConversations(prev => ({ ...prev, [activeAgent.id]: updatedMsgs }));
    setInput("");
    if (textareaRef.current) { textareaRef.current.style.height = "auto"; }
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMsgs.map(m => ({ role: m.role, content: m.content })),
          systemPrompt: activeAgent.systemPrompt
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur");
      setConversations(prev => ({ ...prev, [activeAgent.id]: [...updatedMsgs, { role: "assistant", content: data.reply }] }));
    } catch (err) {
      setError("Erreur: " + err.message);
      setConversations(prev => ({ ...prev, [activeAgent.id]: updatedMsgs }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0D1117 0%, #1A1A2E 50%, #12101C 100%)", display: "flex", flexDirection: "column", fontFamily: "Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:0.4}50%{opacity:1} }
        @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
        textarea { resize:none; } textarea:focus { outline:none; }
      `}</style>

      {/* Header */}
      <header style={{ padding: "18px 28px", borderBottom: "1px solid rgba(201,168,76,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(13,17,23,0.85)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(201,168,76,0.6)", fontSize: "18px", padding: "4px", lineHeight: 1 }}>☰</button>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "21px", fontWeight: "600", margin: 0, background: "linear-gradient(90deg,#C9A84C,#E8D5A0,#C9A84C)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>Cap Libre Studio</h1>
            <p style={{ margin: 0, fontSize: "10px", color: "rgba(232,220,200,0.35)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Plateforme Agents IA</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: `${activeAgent.color}18`, border: `1px solid ${activeAgent.color}40`, borderRadius: "24px", padding: "7px 14px" }}>
          <span style={{ fontSize: "15px" }}>{activeAgent.emoji}</span>
          <span style={{ fontSize: "13px", color: activeAgent.color, fontFamily: "'Cormorant Garamond', serif", fontWeight: "600" }}>{activeAgent.name}</span>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "calc(100vh - 69px)" }}>
        {/* Sidebar */}
        <aside style={{ width: sidebarOpen ? "272px" : "0", minWidth: sidebarOpen ? "272px" : "0", overflow: "hidden", transition: "all 0.3s ease", borderRight: "1px solid rgba(255,255,255,0.04)", background: "rgba(13,17,23,0.5)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "18px 14px", overflowY: "auto", flex: 1 }}>
            <p style={{ fontSize: "10px", color: "rgba(201,168,76,0.45)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px", paddingLeft: "4px" }}>Tes Agents IA</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              {AGENTS.map(agent => (
                <AgentCard key={agent.id} agent={agent} isActive={activeAgent.id === agent.id}
                  hasMessages={!!(conversations[agent.id]?.length)}
                  onClick={() => { setActiveAgent(agent); setInput(""); setError(""); }} />
              ))}
            </div>
            <div style={{ marginTop: "20px", padding: "14px", background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "12px" }}>
              <p style={{ fontSize: "11px", color: "rgba(201,168,76,0.7)", margin: "0 0 5px", fontWeight: "600" }}>💡 Pro tip</p>
              <p style={{ fontSize: "11px", color: "rgba(232,220,200,0.45)", margin: 0, lineHeight: "1.6" }}>Chaque agent connaît ton positionnement Cap Libre, tes offres et ta cliente idéale.</p>
            </div>
          </div>
        </aside>

        {/* Chat */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "18px 26px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <span style={{ fontSize: "26px" }}>{activeAgent.emoji}</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: "600", color: activeAgent.color, margin: 0 }}>{activeAgent.name}</h2>
              </div>
              <p style={{ fontSize: "13px", color: "rgba(232,220,200,0.45)", margin: 0 }}>{activeAgent.description}</p>
            </div>
            {currentMessages.length > 0 && (
              <button onClick={() => setConversations(prev => ({ ...prev, [activeAgent.id]: [] }))}
                style={{ background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "rgba(232,220,200,0.35)", cursor: "pointer", padding: "6px 12px", fontSize: "12px" }}>
                Effacer
              </button>
            )}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "22px 26px" }}>
            {currentMessages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "18px" }}>
                <span style={{ fontSize: "44px" }}>{activeAgent.emoji}</span>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: activeAgent.color, margin: "0 0 8px" }}>Bonjour Darine 👋</p>
                  <p style={{ fontSize: "13px", color: "rgba(232,220,200,0.45)", margin: 0, lineHeight: "1.6", maxWidth: "360px" }}>Par où commencer ? Voici quelques idées :</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxWidth: "480px" }}>
                  {activeAgent.quickPrompts.map((qp, i) => (
                    <button key={i} onClick={() => setInput(qp)} style={{ background: `${activeAgent.color}14`, border: `1px solid ${activeAgent.color}30`, borderRadius: "20px", padding: "8px 14px", color: activeAgent.color, cursor: "pointer", fontSize: "12px", fontFamily: "Georgia, serif", transition: "all 0.2s" }}>
                      {qp}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {currentMessages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
            {loading && (
              <div style={{ display: "flex", gap: "5px", padding: "12px 16px", marginBottom: "14px" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: "6px", height: "6px", background: activeAgent.color, borderRadius: "50%", animation: `pulse 1.2s ease ${i*0.2}s infinite` }} />)}
              </div>
            )}
            {error && <p style={{ color: "#E88678", fontSize: "13px", textAlign: "center", padding: "8px" }}>{error}</p>}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: "14px 26px 22px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-end", background: "rgba(255,255,255,0.04)", border: `1px solid ${input ? activeAgent.color+"44" : "rgba(255,255,255,0.07)"}`, borderRadius: "14px", padding: "10px 14px", transition: "border-color 0.3s" }}>
              <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
                placeholder={`Demande à ${activeAgent.name}…`} rows={1}
                style={{ flex: 1, background: "none", border: "none", color: "#E8DCC8", fontSize: "14px", lineHeight: "1.6", fontFamily: "Georgia, serif", maxHeight: "120px", overflowY: "auto" }} />
              <button onClick={sendMessage} disabled={!input.trim() || loading}
                style={{ background: input.trim() && !loading ? `linear-gradient(135deg,${activeAgent.color},${activeAgent.color}99)` : "rgba(255,255,255,0.05)", border: "none", borderRadius: "9px", padding: "9px 15px", cursor: input.trim() && !loading ? "pointer" : "not-allowed", color: input.trim() && !loading ? "#1A1A2E" : "rgba(255,255,255,0.15)", fontSize: "16px", fontWeight: "bold", flexShrink: 0, transition: "all 0.3s" }}>
                ↑
              </button>
            </div>
            <p style={{ margin: "7px 0 0", fontSize: "11px", color: "rgba(232,220,200,0.2)", textAlign: "center" }}>Entrée pour envoyer · Shift+Entrée pour saut de ligne</p>
          </div>
        </main>
      </div>
    </div>
  );
}
