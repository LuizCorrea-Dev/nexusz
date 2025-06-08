import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    const canvas = document.getElementById("loaderCanvas");
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const progressCircle = {
      x: w / 2,
      y: h / 2,
      diameter: 160,
      stroke: 16,
      color: "",
      start: Math.PI * 1.5,
      end: Math.PI * 1.5,
      percentage: 0,

      calcPercent(percentage) {
        if (percentage > 100) percentage = 100;
        percentage = percentage / 100;
        this.percentage = Math.round(percentage * 100);
        this.end = this.start + Math.PI * 2 * (percentage / 1);
        this.color = "hsl(" + this.percentage / 0.8 + ", 100%, 50%)";
      },

      setColor() {
        if (this.percentage === 100) {
          this.color = "#1E90FF";
        }
      },

      draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.lineWidth = this.stroke;
        ctx.strokeStyle = this.color;
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, this.start, this.end, false);
        ctx.stroke();

        ctx.globalAlpha = 1;
        ctx.setLineDash([1, 4.1]);
        ctx.lineWidth = this.stroke;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, this.start, this.end, false);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          this.diameter - this.stroke / 2,
          0,
          Math.PI * 2,
          false
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          this.diameter + this.stroke / 2,
          0,
          Math.PI * 2,
          false
        );
        ctx.stroke();

        ctx.font = "700 100px Lato";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.color;

        ctx.strokeText(this.percentage + "%", this.x, this.y);
        ctx.globalAlpha = 0.2;
        ctx.fillText(this.percentage + "%", this.x, this.y);

        range = 10;
        speed = 0.01;
        angle += speed;

        ctx.shadowBlur = 20 + Math.sin(angle) * range;
        ctx.shadowColor = this.color;
      },
    };

    let angle = 0;
    let range = 10;
    let speed = 0.03;
    let t = 0;
    const duration = 12; // seconds

    function loop() {
      t += 100 / (duration * 30); // 30fps approx
      progressCircle.calcPercent(t);
      progressCircle.setColor();
      progressCircle.draw();

      if (t < 100) {
        requestAnimationFrame(loop);
      }
    }

    loop();

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      progressCircle.x = w / 2;
      progressCircle.y = h / 2;
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      id="loaderCanvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#111",
        zIndex: 9999,
        opacity: 1,
        pointerEvents: "none",
      }}
    ></canvas>
  );
}
