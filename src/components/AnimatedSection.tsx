import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

// Tipos para as animações disponíveis
type AnimationType = "fadeInUp" | "fadeInLeft" | "zoomIn";

// Variantes de animação com tipagem do Framer Motion
const animations: Record<AnimationType, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  },
};

// Props tipadas para o componente
interface AnimatedSectionProps {
  children: ReactNode;
  type?: AnimationType;
  delay?: number;
  margin?: string;
}

export default function AnimatedSection({
  children,
  type = "fadeInUp",
  delay = 0,
  margin = "-50px",
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin }}
      variants={animations[type]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}