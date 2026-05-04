import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200]"
      style={{ x: springX, y: springY }}
    >
      <div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: 400,
          height: 400,
          marginLeft: -200,
          marginTop: -200,
          background:
            'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(219,39,119,0.2) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-md opacity-40"
        style={{
          width: 24,
          height: 24,
          marginLeft: -12,
          marginTop: -12,
          background: 'rgba(168,85,247,0.6)',
        }}
      />
    </motion.div>
  );
}
