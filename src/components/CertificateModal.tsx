import { motion } from 'framer-motion';

export default function CertificateModal({ image, onClose }: { image: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[999] bg-black bg-opacity-80 flex justify-center items-center">
      <motion.img
        src={image}
        alt="Full Certificate"
        className="max-w-4xl max-h-[90vh] rounded-lg shadow-2xl"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
      />
      <button onClick={onClose} className="absolute top-6 right-8 text-white text-3xl font-bold">✕</button>
    </div>
  );
}
