export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.battlemetrics.com/servers?filter[search]=172.84.94.147:2450&page[offset]=10"
    );
    const data = await response.json();

    // Procura pelo servidor correto no resultado
    const server = data.data.find(
      (srv) =>
        srv.attributes.ip === "172.84.94.147" && srv.attributes.port === 2450
    );

    if (!server) {
      return res.status(404).json({ error: "Servidor não encontrado" });
    }

    const attributes = server.attributes;
    const details = attributes.details || {};

    // Hora do servidor
    const time = details.time || "00:00";

    // Jogadores
    let playersCount = attributes.players || 0;
    const maxPlayers = attributes.maxPlayers || 50;

    // Se online e menos de 10 players, gera fake players entre 5-10
    if (attributes.status === "online" && playersCount < 10) {
      const fakePlayers = Math.floor(Math.random() * 6) + 5; // 5 a 10
      playersCount = fakePlayers;
    }

    const serverStatus = {
      name: attributes.name,
      ip: attributes.ip,
      port: attributes.port,
      status: attributes.status, // online, restart, offline
      players: `${playersCount}/${maxPlayers}`,
      time: time,
      lastRestart: details.lastRestart || "N/A",
      country: attributes.country || "N/A",
    };

    res.status(200).json(serverStatus);
  } catch (error) {
    console.error("Erro ao buscar dados do servidor:", error);
    res.status(500).json({ error: "Erro ao buscar dados do servidor" });
  }
}
