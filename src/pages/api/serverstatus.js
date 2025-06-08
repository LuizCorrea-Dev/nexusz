export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.battlemetrics.com/servers?filter[search]=172.84.94.147:2450"
    );
    const data = await response.json();

    const server = data.data.find(
      (server) => server.attributes.ip === "172.84.94.147"
    );

    if (!server) {
      return res.status(404).json({ error: "Servidor não encontrado" });
    }

    const attributes = server.attributes;

    const serverStatus = {
      name: attributes.name,
      ip: attributes.ip,
      port: attributes.port,
      status: attributes.status,
      players: `${attributes.players}/${attributes.maxPlayers}`,
      version: attributes.details.version,
      lastRestart: attributes.details.lastRestart,
      modded: attributes.details.modded,
      country: attributes.country,
    };

    res.status(200).json(serverStatus);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados do servidor" });
  }
}
