import { useEffect, useRef } from "react";

function AnimatedBackground() {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize particles
        const particleCount = 50;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.3,
            hue: Math.random() * 60 + 200, // Blue to purple range
        }));

        const animate = () => {
            // Clear canvas with fade effect
            ctx.fillStyle = "rgba(11, 11, 11, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
                    particle.vx *= -1;
                }
                if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
                    particle.vy *= -1;
                }

                // Keep in bounds
                particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
                particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));

                // Animate opacity
                particle.opacity += (Math.random() - 0.5) * 0.02;
                particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));

                // Draw particle with glow
                ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();

                // Draw glow effect
                ctx.strokeStyle = `hsla(${particle.hue}, 100%, 70%, ${particle.opacity * 0.5})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
                ctx.stroke();
            });

            // Draw connecting lines
            particlesRef.current.forEach((p1, i) => {
                particlesRef.current.slice(i + 1).forEach((p2) => {
                    const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);
                    if (distance < 150) {
                        ctx.strokeStyle = `hsla(220, 100%, 60%, ${(1 - distance / 150) * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(11, 11, 11, 1) 0%, rgba(20, 20, 40, 1) 100%)" }}
        />
    );
}

export default AnimatedBackground;
