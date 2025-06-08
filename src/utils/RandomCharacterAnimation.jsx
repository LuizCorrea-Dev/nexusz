"use client";
import { useEffect } from "react";

export default function RandomCharacterAnimation({ targetId = "matrixHome" }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const titleElement = document.getElementById(targetId);
      if (!titleElement) return;

      const originalText = "NΣXUS Z";

      titleElement.classList.add("inactiveMatrix");

      class RandomCharacterAnimation {
        constructor(options) {
          this.options = options;
          this.originalText = options.originalText;
          this.letters = [];
          this.interval = null;
        }

        start() {
          this.letters = this.originalText.split("");
          this.interval = setInterval(() => {
            const randomChars = this.letters.map((letter) => {
              if (Math.random() < 0.5) {
                const rand = String.fromCharCode(
                  33 + Math.floor(Math.random() * 94)
                );
                return rand;
              }
              return letter;
            });
            titleElement.innerHTML = randomChars.join("");
          }, 50);
        }

        stop() {
          clearInterval(this.interval);
          titleElement.innerHTML = this.originalText;
        }
      }

      const animation = new RandomCharacterAnimation({
        target: targetId,
        originalText,
      });

      animation.start();

      titleElement.classList.add("glitch");

      setTimeout(() => {
        titleElement.classList.remove("inactiveMatrix");
        titleElement.classList.add("matrixActive");
      }, 300);

      setTimeout(() => {
        titleElement.classList.remove("glitch");
      }, 1000);

      setTimeout(() => {
        animation.stop();
        titleElement.classList.remove("matrixActive");
      }, 3000);
    }
  }, [targetId]);

  return null; // nada renderizado
}
