import { useEffect, useState } from "react";
import Card from "../components/Card";
import styles from "../styles/home.module.css";

export default function CardContent() {
  const [serverData, setServerData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/serverStatus");
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

  return (
    <div className={styles.cardsRow}>
      {" "}
      <Card
        title="Servidor"
        content={
          serverData && !error ? (
            <ul>
              <li>
                <strong>Nome:</strong> {serverData.name}
              </li>
              <li>
                <strong>IP:</strong> {serverData.ip}:{serverData.port}
              </li>
              <li>
                <strong>Status:</strong> {serverData.status}
              </li>
              <li>
                <strong>Jogadores:</strong> {serverData.players}
              </li>
              <li>
                <strong>Versão:</strong> {serverData.version}
              </li>
              <li>
                <strong>Último Restart:</strong>{" "}
                {new Date(serverData.lastRestart).toLocaleString()}
              </li>
              <li>
                <strong>Modificado:</strong> {serverData.modded ? "Sim" : "Não"}
              </li>
              <li>
                <strong>País:</strong> {serverData.country}
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <strong>Nome:</strong> [BR] NΣXUS Z | Survival
              </li>
              <li>
                <strong>IP:</strong> 172.84.94.147:2450
              </li>
              <li>
                <strong>Versão do Servidor:</strong> 1.28.160049
              </li>
              <li>
                <strong>Versão Requerida:</strong> 1.28.0
              </li>
              <li>
                <strong>Mapa:</strong> Chernarusplus
              </li>
              <li>
                <strong>Jogadores:</strong> 50
              </li>
              <li>
                <strong>Status:</strong> <span className="online">Online</span>
              </li>
            </ul>
          )
        }
      />
      <Card
        title="Loja"
        content={<p>Em breve: compre itens, skins e upgrades exclusivos!</p>}
        buttonText="Acessar Loja"
        buttonLink="/loja"
      />
      <Card
        title="Login"
        content={<></>}
        buttons={[
          {
            text: "Login com Steam",
            className: "steam",
            onClick: () => alert("Login Steam ainda não implementado!"),
          },
          {
            text: "Login com Discord",
            className: "discord",
            onClick: () => alert("Login Discord ainda não implementado!"),
          },
        ]}
      />
      <Card
        title="Lore"
        content={<p>🧬 Conheça a história oficial do servidor NΣXUS Z!</p>}
        buttonText="Ler a Lore"
        buttonLink="/lore"
      />
    </div>
  );
}
