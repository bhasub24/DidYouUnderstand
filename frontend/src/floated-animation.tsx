import { motion } from 'framer-motion';

export function AnimatedMessage({ text, onComplete }: { text: string; onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -200, scale: 0.8 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onAnimationComplete={onComplete}
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      {text}
    </motion.div>
  );
}