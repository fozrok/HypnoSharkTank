import { useEffect, useRef } from 'react';

// ─── Particle definition ───────────────────────────────────────────
interface Particle {
    x: number;
    y: number;
    baseY: number;       // anchor row
    speed: number;       // horizontal drift speed
    amplitude: number;   // wave height
    frequency: number;   // wave frequency
    phase: number;       // phase offset (makes each particle unique)
    size: number;
    opacity: number;
    hue: number;         // slight hue variation in the blue range
}

// ─── Constants ────────────────────────────────────────────────────
const PARTICLE_COUNT = 120;
const CONNECTION_DIST = 120;   // px — max distance to draw a line
const LINE_WIDTH = 0.6;
const BASE_SPEED = 0.18;
const WAVE_ROWS = 8;           // number of horizontal wave bands

// Palette: ocean blues and steel greys
const LIGHT_COLORS = { r: 30, g: 100, b: 200 };
const DARK_COLORS = { r: 66, g: 165, b: 245 };

function makeParticle(canvasW: number, canvasH: number): Particle {
    const row = Math.floor(Math.random() * WAVE_ROWS);
    const bandH = canvasH / WAVE_ROWS;
    return {
        x: Math.random() * canvasW,
        y: row * bandH + bandH / 2,
        baseY: row * bandH + bandH / 2,
        speed: BASE_SPEED + Math.random() * 0.22,
        amplitude: 18 + Math.random() * 38,
        frequency: 0.006 + Math.random() * 0.008,
        phase: Math.random() * Math.PI * 2,
        size: 1.2 + Math.random() * 2,
        opacity: 0.25 + Math.random() * 0.55,
        hue: Math.random() * 40 - 20,  // ±20° around the base blue
    };
}

// ─── Component ────────────────────────────────────────────────────
export default function ParticleWaveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // ── Resize handler
        let W = 0, H = 0;
        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize, { passive: true });

        // ── Initialise particles
        const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
            makeParticle(W, H)
        );

        // ── Detect dark mode
        const isDark = () =>
            document.documentElement.getAttribute('data-theme') === 'dark';

        // ── Main render loop
        let t = 0;
        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            const dark = isDark();
            const base = dark ? DARK_COLORS : LIGHT_COLORS;
            t += 0.008;

            // Update positions
            for (const p of particles) {
                p.x += p.speed;
                if (p.x > W + 20) p.x = -20;  // wrap
                p.y = p.baseY + Math.sin(p.x * p.frequency + p.phase + t) * p.amplitude;
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.12 * (dark ? 1.4 : 1);
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(${base.r},${base.g},${base.b},${alpha})`;
                        ctx.lineWidth = LINE_WIDTH;
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            for (const p of particles) {
                const alpha = p.opacity * (dark ? 0.85 : 0.7);
                // Adjust hue by shifting rgb slightly
                const rr = Math.max(0, Math.min(255, base.r + p.hue * 0.3));
                const gg = Math.max(0, Math.min(255, base.g + p.hue * 0.1));
                const bb = Math.min(255, base.b + Math.abs(p.hue) * 0.2);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${Math.round(rr)},${Math.round(gg)},${Math.round(bb)},${alpha})`;
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                pointerEvents: 'none',
                display: 'block',
            }}
        />
    );
}
