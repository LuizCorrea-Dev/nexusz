import { useEffect, useState } from "react";

const dayzImages = Array.from(
  { length: 19 },
  (_, i) => `/wallpaper_NexusZ/nexus_dayz (${i + 1}).png`
);

export default function SlideBG({ theme }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    let interval;

    if (theme === "dayz") {
      document.documentElement.style.setProperty(
        "--background-image",
        `url(${dayzImages[currentImage]})`
      );

      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % dayzImages.length);
      }, 5000);
    } else {
      document.documentElement.style.setProperty("--background-image", "none");
    }

    return () => clearInterval(interval);
  }, [theme, currentImage]);

  return null;
}
