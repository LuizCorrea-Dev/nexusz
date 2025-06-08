import { useEffect, useState } from "react";
import Card from "../components/Card";
import styles from "../styles/home.module.css";
import LoginButtonSteam from "../components/LoginButtonSteam";

export default function CardContent() {
  const [serverData, setServerData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const origin = window.location.origin;
        const res = await fetch(`${origin}/api/serverstatus`);
        if (!res.ok) throw new Error("Erro na resposta da API");
        const data = await res.json();
        setServerData(data);
      } catch (err) {
        console.error("Erro ao buscar dados do servidor:", err);
        setError(true);
      }
    }

    fetchData();
  }, []);

  // Fallback estático se não tiver dados dinâmicos
  const staticServerData = {
    name: "[BR] NΣXUS Z | Survival",
    ip: "172.84.94.147",
    port: 2450,
    status: "online",
    players: "17/50",
    time: "13:58",
    map: "Chernarus",
    country: "BR",
  };

  const getStatusIndicator = (status) => {
    let color = "gray";
    if (status === "online") color = "green";
    else if (status === "restart") color = "yellow";
    else if (status === "offline") color = "red";

    return (
      <span
        style={{
          display: "inline-block",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: color,
          marginRight: "8px",
        }}
      ></span>
    );
  };

  const currentData = serverData && !error ? serverData : staticServerData;

  return (
    <div className={styles.cardsRow}>
      <Card
        title="Servidor"
        content={
          <ul>
            <li>
              <strong>Nome:</strong> {currentData.name}
            </li>
            <li>
              <strong>IP:</strong> {currentData.ip}:{currentData.port}
            </li>
            <li>
              <strong>Status:</strong> {getStatusIndicator(currentData.status)}{" "}
              {currentData.status}
            </li>
            <li>
              <strong>Jogadores:</strong> 🔥 {currentData.players}
            </li>
            <li>
              <strong>Hora:</strong> 🕒 {currentData.time}
            </li>
            <li>
              <strong>Mapa:</strong> 🗺️{" "}
              {currentData.map ? currentData.map : "Chernarus"}
            </li>
            <li>
              <strong>País:</strong> 🌎 {currentData.country}
            </li>
          </ul>
        }
      />
      <Card
        title="Loja"
        content={<p>Em breve: compre itens, skins e upgrades exclusivos!</p>}
        buttonText="Acessar Loja"
        buttonLink="/loja"
      />
      <Card title="Login" content={<LoginButtonSteam />} />
      <Card
        title="Lore"
        content={<p>🧬 Conheça a história oficial do servidor NΣXUS Z!</p>}
        buttonText="Ler a Lore"
        buttonLink="/lore"
      />
    </div>
  );
}
