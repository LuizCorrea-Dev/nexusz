"use client";
import { useEffect } from "react";

export default function RandomCharacterAnimation({ targetId = "matrixHome" }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const titleElement = document.getElementById(targetId);
    if (!titleElement) return;

    const originalText = "NΣXUS Z";
    const letters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?*()@#$%^&_-+=[]{}:;'\"\\|<>,./~`";

    titleElement.classList.add("inactiveMatrix");

    let interval;

    function startMatrixAnimation() {
      const randomizeText = () => {
        const randomized = originalText.split("").map((char) => {
          if (char === " ") return " ";
          return letters.charAt(Math.floor(Math.random() * letters.length));
        });
        titleElement.innerHTML = randomized.join("");
      };

      interval = setInterval(randomizeText, 50);
    }

    function stopMatrixAnimation() {
      clearInterval(interval);
      titleElement.innerHTML = originalText;
    }

    // Start glitch and matrix effect
    startMatrixAnimation();
    titleElement.classList.add("glitch");

    setTimeout(() => {
      titleElement.classList.remove("inactiveMatrix");
      titleElement.classList.add("matrixActive");
    }, 300);

    setTimeout(() => {
      titleElement.classList.remove("glitch");
    }, 1000);

    setTimeout(() => {
      stopMatrixAnimation();
      titleElement.classList.remove("matrixActive");
    }, 3000);

    return () => {
      clearInterval(interval); // Clean up
    };
  }, [targetId]);

  return null; // Esse componente é apenas de efeito — não renderiza nada.
}
