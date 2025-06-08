import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/lore.module.css";

import { useEffect } from "react";

export default function Lore() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const paragraphs = document.querySelectorAll(`.${styles.loreContent} p`);

      paragraphs.forEach((paragraph) => {
        const text = paragraph.innerText;
        paragraph.innerHTML = "";

        text.split("").forEach((char, index) => {
          const span = document.createElement("span");
          span.innerText = char;

          // Inicialmente, aplica glitch
          if (Math.random() < 0.15 && char !== " ") {
            span.classList.add(styles.glitchChar);
          }

          // Adiciona class para digitado com steps
          span.classList.add(styles.typedChar);
          span.style.animationDelay = `${index * 0.05}s`; // Efeito de digitação

          paragraph.appendChild(span);
        });
      });

      // Remove glitch depois de 1 segundo
      setTimeout(() => {
        const glitchChars = document.querySelectorAll(`.${styles.glitchChar}`);
        glitchChars.forEach((el) => {
          el.classList.remove(styles.glitchChar);
        });
      }, 1000);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.loreContent}>
        <h2>🧬 Lore oficial do servidor: NΣXUS Z</h2>
        <p>
          Em 2027, a humanidade foi abalada por uma epidemia desconhecida. O
          vírus SYN-Virus espalhou-se sem controle, dizimando populações
          inteiras e transformando os infectados em criaturas irracionais,
          sedentas por carne humana. Governos caíram, comunicações cessaram, e o
          mundo mergulhou no caos.
        </p>

        <p>Mas nem tudo foi perdido.</p>

        <p>
          No coração da antiga região de Chernarus, um complexo experimental
          ultra-secreto foi ativado: o Projeto NΣXUS — uma instalação
          subterrânea desenvolvida em parceria por cientistas russos e europeus.
          Seu objetivo: descobrir a origem do vírus, criar uma cura e preservar
          o que restava da civilização.
        </p>

        <p>Por meses, transmissões enigmáticas ecoavam pelos rádios:</p>

        <p>
          <em>
            “...aqui é o Nexus... estamos vivos... coordenadas 47°N, 30°E...
            tragam apenas os puros...”
          </em>
        </p>

        <p>
          Milhares de sobreviventes seguiram essas pistas, mas a verdade era
          outra.
        </p>

        <p>
          O NΣXUS Z não era apenas um centro de pesquisa. Era um nó
          biotecnológico, uma convergência de experiências genéticas, controle
          mental e armas biológicas — tudo alimentado pelo próprio vírus. Algo
          deu errado... ou talvez, deu certo demais.
        </p>

        <p>
          Hoje, Chernarus é o campo de batalha de um novo mundo. As zonas ao
          redor do antigo NΣXUS estão contaminadas, mas rumores dizem que há
          artefatos escondidos, arquivos de dados, e talvez... uma chave para
          reverter o apocalipse.
        </p>

        <p>
          Facções lutam por território, sobreviventes caçam uns aos outros por
          suprimentos, e a própria terra parece estar viva, mutante.
        </p>

        <p>
          Você acorda sem memória, apenas com uma mochila, fome... e um
          instinto:
        </p>

        <p>
          <strong>
            <em>Sobreviva. Descubra. Conquiste.</em>
          </strong>
        </p>

        <p>Você está no NΣXUS Z.</p>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="/"
            style={{
              color: "#00ff99",
              border: "2px solid #00ff99",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
            }}
          >
            Voltar para Home
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
