export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages, systemPrompt } = req.body;
    if (!messages || !systemPrompt) return res.status(400).json({ error: "Missing fields" });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 1500,
        system: systemPrompt,
        messages
      })
    });

    const text = await response.text();
    const data = JSON.parse(text);
    
    if (!response.ok) {
      return res.status(200).json({ reply: "Erreur API: " + (data.error?.message || text) });
    }
    
    res.status(200).json({ reply: data.content?.[0]?.text || "Pas de réponse" });
  } catch (err) {
    res.status(200).json({ reply: "Erreur serveur: " + err.message });
  }
}
