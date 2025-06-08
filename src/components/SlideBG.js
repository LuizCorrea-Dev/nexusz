import { useEffect, useState } from "react";

const dayzImages = Array.from(
  { length: 19 },
  (_, i) => `/wallpaper_nexusz/nexus_dayz%20%28${i + 1}%29.png`
);

export default function SlideBG({ theme }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    let interval;

    const backgroundSlide = document.getElementById("background-slide");

    if (theme === "dayz" && backgroundSlide) {
      backgroundSlide.style.backgroundImage = `url(${dayzImages[currentImage]})`;

      interval = setInterval(() => {
        const nextImage = (currentImage + 1) % dayzImages.length;
        setCurrentImage(nextImage);
        backgroundSlide.style.backgroundImage = `url(${dayzImages[nextImage]})`;
      }, 7000);
    } else if (backgroundSlide) {
      backgroundSlide.style.backgroundImage = "none";
    }

    return () => clearInterval(interval);
  }, [theme, currentImage]);

  return null;
}
