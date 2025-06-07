import Card from "../components/Card";
import styles from "../styles/Home.module.css"; // importa os estilos da Home!

export default function CardContent() {
  return (
    <div className={styles.cardsRow}>
      {" "}
      {/* Novo estilo aqui */}
      <Card
        title="Servidor"
        content={
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
