import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceTipsModal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const voiceTips = [
    { text: "Say: 'go to profile'", color: "text-pink-400" },
    { text: "Say: 'go to about'", color: "text-blue-400" },
    { text: "Say: 'my experience'", color: "text-green-400" },
    { text: "Say: 'go to certificates'", color: "text-yellow-400" },
    { text: "Say: 'contact me'", color: "text-purple-400" },
    { text: "Say: 'My name is __'", color: "text-pink-400" },
    { text: "Say: 'My phone number is __'", color: "text-blue-400" },
    { text: "Say: 'My email is __'", color: "text-green-400" },
    { text: "Say: 'My message is __'", color: "text-yellow-400" },
    { text: "Say: 'Send message'", color: "text-purple-400" },
    { text: "Say: 'Download resume'", color: "text-orange-400" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % voiceTips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [voiceTips.length]);

  const textVariants = {
    enter: {
      opacity: 0,
      y: 30,
      scale: 0.8,
      rotateX: -90,
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.8,
      rotateX: 90,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
      <div className="relative">
        {/* Close button - smaller and less intrusive */}
        <motion.button
          onClick={() => setIsVisible(false)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-black/50 text-white rounded-full text-sm font-bold pointer-events-auto z-40 backdrop-blur-sm border border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ×
        </motion.button>

        {/* Animated Messages */}
        <div className="relative h-12 flex items-center justify-center min-w-[300px] max-w-[800px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute text-center w-full px-4"
            >
              <motion.span
                className={`text-lg md:text-xl lg:text-2xl font-bold ${voiceTips[currentIndex].color} drop-shadow-lg whitespace-nowrap`}
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px currentColor'
                }}
                animate={{
                  filter: [
                    'brightness(1) saturate(1)',
                    'brightness(1.2) saturate(1.3)',
                    'brightness(1) saturate(1)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {voiceTips[currentIndex].text}
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Simple progress dots - very minimal */}
        <motion.div 
          className="flex justify-center mt-2 gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
        >
          {voiceTips.map((_, index) => (
            <motion.div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
              animate={index === currentIndex ? { 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{ duration: 1, repeat: index === currentIndex ? Infinity : 0 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceTipsModal;