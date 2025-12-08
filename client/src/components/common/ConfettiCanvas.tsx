import { useEffect, useRef } from "react";
import p5 from "p5";

type Particle = {
  pos: { x: number; y: number };
  vel: { x: number; y: number };
  size: number;
  color: string;
  rotation: number;
  angularVel: number;
};

export default function ConfettiCanvas() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  // keep sketch param as any to avoid tight coupling to p5 typings in this file
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sketch = new p5((p: any) => {
      const particles: Particle[] = [];
      const COLORS = ["#EF4444", "#F97316", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];

      function createParticle(x: number, y: number) {
        const angle = p.random(-Math.PI, Math.PI);
        const speed = p.random(1, 6);
        const particle: Particle = {
          pos: { x, y },
          vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed - p.random(1, 4) },
          size: p.random(6, 14),
          color: p.random(COLORS),
          rotation: p.random(0, Math.PI * 2),
          angularVel: p.random(-0.2, 0.2),
        };
        particles.push(particle);
      }

      p.setup = () => {
        const parent = canvasRef.current ?? document.body;
        p.createCanvas(p.windowWidth, p.windowHeight).parent(parent);
        // initial burst
        for (let i = 0; i < 300; i++) {
          createParticle(p.width / 2 + p.random(-80, 80), p.height / 4 + p.random(-40, 40));
        }
      };

      p.draw = () => {
        p.clear();
        p.noStroke();
        // subtle dark overlay to match app theme
        p.push();
        p.fill(17, 17, 17, 140);
        p.rect(0, 0, p.width, p.height);
        p.pop();

        // spawn a few particles occasionally
        if (p.frameCount % 6 === 0 && particles.length < 600) {
          createParticle(p.random(0, p.width), -10);
        }

        // update and draw
        for (let i = particles.length - 1; i >= 0; i--) {
          const t = particles[i];
          // apply gravity
          t.vel.y += 0.12;
          // air resistance
          t.vel.x *= 0.995;
          t.vel.y *= 0.999;

          t.pos.x += t.vel.x;
          t.pos.y += t.vel.y;
          t.rotation += t.angularVel;

          p.push();
          p.translate(t.pos.x, t.pos.y);
          p.rotate(t.rotation);
          p.fill(t.color);
          p.rectMode(p.CENTER);
          p.rect(0, 0, t.size, t.size * 0.6);
          p.pop();

          // remove when off-screen
          if (t.pos.y > p.height + 50) particles.splice(i, 1);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      p.mousePressed = () => {
        // burst at mouse
        for (let i = 0; i < 40; i++) {
          createParticle(p.mouseX, p.mouseY);
        }
      };
    });

    return () => {
      sketch.remove();
    };
  }, []);

  return <div ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}
